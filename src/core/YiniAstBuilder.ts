import assert from 'assert'
import { ParseTreeVisitor, TokenStream } from 'antlr4'
import { isDebug } from '../config/env'
import {
    AssignmentContext,
    Bad_memberContext,
    Boolean_literalContext,
    Colon_list_declContext,
    ElementsContext,
    EolContext,
    List_literalContext,
    Marker_stmtContext,
    MemberContext,
    Null_literalContext,
    Number_literalContext,
    Object_literalContext,
    Object_memberContext,
    Object_membersContext,
    PrologContext,
    StmtContext,
    String_concatContext,
    String_literalContext,
    Terminal_stmtContext,
    ValueContext,
    YiniContext,
} from '../grammar/YiniParser.js'
import YiniParserVisitor from '../grammar/YiniParserVisitor'
import { extractYiniLine } from '../parsers/extractSignificantYiniLine'
import parseBooleanLiteral from '../parsers/parseBoolean'
import parseBoolean from '../parsers/parseBoolean'
import parseNullLiteral from '../parsers/parseNull'
import parseNumberLiteral from '../parsers/parseNumber'
import parseNumber from '../parsers/parseNumber'
import parseSectionHeader from '../parsers/parseSectionHeader'
import parseStringLiteral from '../parsers/parseString'
import { debugPrint, printObject } from '../utils/print'
import { isEnclosedInBackticks, trimBackticks } from '../utils/string'
import {
    isValidBacktickedIdent,
    isValidSimpleIdent,
    printLiteral,
    stripCommentsAndAfter,
} from '../yiniHelpers'
import { ErrorDataHandler } from './ErrorDataHandler'
import {
    IChainContainer,
    IParseMainOptions,
    ISectionResult,
    TListValue,
    TScalarValue,
    TSyntaxTree,
    TSyntaxTreeContainer,
    TValueLiteral,
} from './types'

export interface YiniSection {
    sectionName: string
    level: number // 1..n
    members: Map<string, TValueLiteral> // Members at this section.
    children: YiniSection[] // Children sections (on the next level) of the current section.
}

export interface YiniDocument {
    root: YiniSection // Implicit root per spec impl. notes.
    terminatorSeen: boolean // '/END' in strict mode
    mode: 'lenient' | 'strict'
    errors: string[]
    warnings: string[]
}

export interface BuildOptions {
    mode?: 'lenient' | 'strict' // default: lenient
    onDuplicateKey?: 'error' | 'warn' | 'keep-first' | 'overwrite' // default: warn
}

// -----------------------

// Helpers -------------------------------------------------------------

const makeScalarValue = (
    type: 'String' | 'Number' | 'Boolean' | 'Null',
    value: string | number | boolean | null = null,
): TScalarValue => {
    switch (type) {
        case 'String':
            return { type, value: value as string }
        case 'Number':
            return { type, value: value as number }
        case 'Boolean':
            return { type, value: !!value }
        case 'Null':
            return { type: 'Null', value: null }
        default:
            new ErrorDataHandler().pushOrBail(
                null,
                'Fatal-Error',
                `No such type in makeValue(..), type: ${type}, value: ${value}`,
                'Something in the code is done incorrectly in order for this to happen... :S',
            )
    }
    return { type: 'Null', value: null }
}

const makeListValue = (elems: TValueLiteral[] = []): TValueLiteral => {
    return { type: 'List', elems }
}

function trimQuotes(text: string): string {
    // STRING token already excludes quotes; the rule returns the literal with quotes present.
    // We’ll reliably strip the outer quote(s) and leave contents as-is (concat pieces handled below).
    const q = text[0]
    if (
        (q === '"' || q === "'") &&
        text.length >= 2 &&
        text[text.length - 1] === q
    ) {
        return text.slice(1, -1)
    }
    // Triple-quoted cases are handled by the lexer too; same stripping works since token text begins with quotes.
    if (text.startsWith('"""') && text.endsWith('"""') && text.length >= 6) {
        return text.slice(3, -3)
    }
    return text
}

function makeSection(name: string, level: number): YiniSection {
    return { sectionName: name, level, members: new Map(), children: [] }
}

/** Parse SECTION_HEAD token text → {level, name}.
 * Supports repeated markers (^^^^) and shorthand (^7) (Spec 5.2–5.3.1). :contentReference[oaicite:5]{index=5}:contentReference[oaicite:6]{index=6}
 */
function parseSectionHeadToken(raw: string): { level: number; name: string } {
    // SECTION_HEAD token text includes: optional WS, marker(s) or shorthand, WS, IDENT (possibly backticked), NL+
    // We only need the visible line content up to NL.
    const line = raw.split(/\r?\n/)[0]

    // Extract marker block and name
    // Examples: "^^ Section", "^7 `Section name`", "< MySection"
    const m = line.match(/^\s*([\^<§€]+|\^|\<|§|€)(\d+)?[ \t]+(.+?)\s*$/)
    if (m) {
        const markerRun = m[1]
        const numeric = m[2]
        let level: number
        if (numeric) {
            level = parseInt(numeric, 10)
        } else {
            // count repeated marker chars (^^^^)
            level = markerRun.length
        }

        // Section name may be backticked: `Name with spaces`
        let name = m[3]
        if (name.startsWith('`') && name.endsWith('`')) {
            name = name.slice(1, -1)
        }
        return { level, name }
    }

    // Fallback: be defensive
    return { level: 1, name: line.trim() }
}

/** Attach a section to the stack respecting up/down moves (Spec 5.3). :contentReference[oaicite:7]{index=7} */
function attachSection(
    stack: YiniSection[],
    section: YiniSection,
    doc: YiniDocument,
) {
    const targetLevel = section.level
    if (targetLevel <= 0) {
        doc.errors.push(`Invalid section level: ${targetLevel}`)
        return
    }

    // Ensure stack top has level targetLevel-1 (implicit root is level 0).
    while (stack.length > 0 && stack[stack.length - 1].level >= targetLevel) {
        stack.pop()
    }
    const parent = stack[stack.length - 1] // root or higher-level section
    parent.children.push(section)
    stack.push(section)
}

/** Insert a key/value into current section (duplicate handling per options). */
function putMember(
    sec: YiniSection,
    key: string,
    value: TValueLiteral,
    doc: YiniDocument,
    mode: BuildOptions['onDuplicateKey'] = 'warn',
) {
    isDebug() && console.log()
    debugPrint('-> Entered putMember(..)')
    debugPrint(`putMember(..): key: '${key}', value: ${value}`)

    if (sec.members.has(key)) {
        switch (mode) {
            case 'error':
                doc.errors.push(
                    `Duplicate key '${key}' in section '${sec.sectionName}' (level ${sec.level}).`,
                )
                break
            case 'warn':
                doc.warnings.push(
                    `Duplicate key '${key}' in section '${sec.sectionName}' (keeping first).`,
                )
                return // keep first
            case 'keep-first':
                return
            case 'overwrite':
                // replace value
                break
        }
    }
    sec.members.set(key, value)
}

// Builder Visitor -----------------------------------------------------
/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `YiniParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
// export default class YINIVisitor<IResult> extends YiniParserVisitor<IResult> {
export default class YiniAstBuilder<Result> extends YiniParserVisitor<Result> {
    private readonly mode: 'lenient' | 'strict'
    private readonly onDuplicateKey: BuildOptions['onDuplicateKey']
    private doc: YiniDocument
    private sectionStack: YiniSection[]

    // constructor(opts: BuildOptions = {}) {
    constructor(options: IParseMainOptions) {
        super()
        this.mode = options.isStrict ? 'strict' : 'lenient'
        if (options.isStrict) {
            this.onDuplicateKey = 'error'
        } else {
            this.onDuplicateKey = 'warn'
        }

        const root = makeSection('(root)', 0)
        this.doc = {
            root,
            terminatorSeen: false,
            mode: this.mode,
            errors: [],
            warnings: [],
        }
        this.sectionStack = [root]
    }

    // Public entry
    public buildAST(ctx: YiniContext): YiniDocument {
        this.visitYini?.(ctx)
        // Enforce strict-mode terminator rule (/END required) (Spec 12.3). :contentReference[oaicite:8]{index=8}
        if (this.mode === 'strict' && !this.doc.terminatorSeen) {
            this.doc.errors.push(
                "Strict mode: missing document terminator '/END'.",
            )
        }
        return this.doc
    }

    /**
     * Visit a parse tree produced by `YiniParser.yini`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    // visitYini?: (ctx: YiniContext) => Result
    // visitYini?: (ctx: YiniContext) => any
    visitYini = (ctx: YiniContext): any => {
        // children: prolog?, stmt*, terminal?, EOF
        ctx.children?.forEach((c: any) => this.visit?.(c))
        return this.doc
    }

    /**
     * Visit a parse tree produced by `YiniParser.prolog`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    // visitProlog?: (ctx: PrologContext) => Result
    visitProlog = (ctx: PrologContext): any => {
        // Ignored for structure; keeps column rules stable.
        return null
    }

    /**
     * Visit a parse tree produced by `YiniParser.terminal`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    // visitTerminal_stmt?: (ctx: Terminal_stmtContext) => Result;
    visitTerminal_stmt = (ctx: Terminal_stmtContext): any => {
        this.doc.terminatorSeen = true
        return null
    }

    /**
     * Visit a parse tree produced by `YiniParser.stmt`.
     * @param ctx the parse tree
     * @grammarRule eol | SECTION_HEAD | assignment | colon_list_decl | marker_stmt | bad_member
     * @return the visitor result
     */
    // visitStmt?: (ctx: StmtContext) => Result
    visitStmt = (ctx: StmtContext): any => {
        const child: any = ctx.getChild(0)
        const ruleName = child?.constructor?.name ?? ''

        if (ruleName.includes('EolContext')) return this.visitEol?.(child)
        if (ruleName.includes('AssignmentContext'))
            return this.visitAssignment?.(child)
        if (ruleName.includes('Colon_list_declContext'))
            return this.visitColon_list_decl?.(child)
        if (ruleName.includes('Marker_stmtContext'))
            return this.visitMarker_stmt?.(child)

        // SECTION_HEAD is a token (no sub-rule class)
        const text = child.getText?.() ?? ''
        if (text && /\^|<|§|€/.test(text)) {
            const { level, name } = parseSectionHeadToken(text)
            // Validate level sequencing per spec 5.3 (no skipping upward)
            const currentLevel =
                this.sectionStack[this.sectionStack.length - 1].level
            if (level > currentLevel + 1) {
                this.doc.errors.push(
                    `Invalid section level transition: from ${currentLevel} to ${level} (cannot skip levels).`,
                )
            }
            const section = makeSection(name, level)
            attachSection(this.sectionStack, section, this.doc) // respects up/down nesting
            return null
        }

        // bad_member fallback
        return this.visitBad_member?.(ctx.getChild(0) as any)
    }

    /**
     * Visit a parse tree produced by `YiniParser.marker_stmt`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    // visitMarker_stmt?: (ctx: Marker_stmtContext) => Result
    visitMarker_stmt = (ctx: Marker_stmtContext): any => {
        // @yini marker is advisory (no semantic value) per spec. We ignore it. (Spec 2.4) :contentReference[oaicite:9]{index=9}
        return null
    }

    /**
     * Visit a parse tree produced by `YiniParser.eol`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    // visitEol?: (ctx: EolContext) => Result
    visitEol = (ctx: EolContext): any => null

    /**
     * Visit a parse tree produced by `YiniParser.assignment`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    // visitAssignment?: (ctx: AssignmentContext) => Result
    visitAssignment = (ctx: AssignmentContext): any => {
        isDebug() && console.log()
        debugPrint('-> Entered visitAssignment(..)')

        // assignment : member eol
        const mem = ctx.member()
        this.visitMember?.(mem)
        return null
    }

    /**
     * Visit a parse tree produced by `YiniParser.member`.
     * @param ctx the parse tree
     * @grammarRule KEY WS? EQ WS? value?
     * @return the visitor result
     */
    // visitMember?: (ctx: MemberContext) => Result
    visitMember = (ctx: MemberContext): any => {
        isDebug() && console.log()
        debugPrint('-> Entered visitMember(..)')

        // member: KEY WS? EQ WS? value?
        const key = ctx.getChild(0).getText()
        debugPrint(`visitMember(..): key = '${key}'`)

        let valueNode = ctx.value?.()
        let value: TValueLiteral | undefined

        if (!valueNode) {
            // Empty value => Null in lenient mode, error in strict (Spec 12.3, 8.2). :contentReference[oaicite:10]{index=10}:contentReference[oaicite:11]{index=11}
            if (this.mode === 'lenient') value = makeScalarValue('Null')
            else
                this.doc.errors.push(
                    `Strict mode: missing value for key '${key}'.`,
                )
        } else {
            value = this.visitValue?.(valueNode) as TValueLiteral
        }
        debugPrint('visitMember(..): value = ' + value)

        const current = this.sectionStack[this.sectionStack.length - 1]
        if (value !== undefined) {
            putMember(current, key, value, this.doc, this.onDuplicateKey)
        }
        return value
    }

    /**
     * Visit a parse tree produced by `YiniParser.colon_list_decl`.
     * @param ctx the parse tree
     * @grammarRule KEY WS? COLON (eol | WS+)* elements (eol | WS+)* eol
     * @return the visitor result
     */
    // visitColon_list_decl?: (ctx: ListAfterColonContext) => Result
    visitColon_list_decl = (ctx: Colon_list_declContext): any => {
        debugPrint('-> Entered visitColon_list_decl(..)')

        const key = ctx.getChild(0).getText()
        debugPrint(`visitColon_list_decl(..): key = '${key}'`)

        const elems = this.visitElements(ctx.elements())
        const value = makeListValue(elems)
        const current = this.sectionStack[this.sectionStack.length - 1]

        // putMember(current, key, list, this.doc, this.onDuplicateKey)
        putMember(current, key, value, this.doc, this.onDuplicateKey)
        debugPrint('<- Exiting visitColon_list_decl(..)...')
        if (isDebug()) {
            console.log('List literal: (from a Colon-list)')
            printObject(value)
        }
        return value
    }

    /**
     * Visit a parse tree produced by `YiniParser.value`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    // visitValue?: (ctx: ValueContext) => Result
    visitValue = (ctx: ValueContext): any => {
        debugPrint('-> Entered visitValue(..)')

        if (ctx.null_literal())
            return this.visitNull_literal(ctx.null_literal()!) as TValueLiteral
        if (ctx.string_literal())
            return this.visitString_literal(
                ctx.string_literal()!,
            ) as TValueLiteral
        if (ctx.number_literal())
            return this.visitNumber_literal(
                ctx.number_literal()!,
            ) as TValueLiteral
        if (ctx.boolean_literal())
            return this.visitBoolean_literal(
                ctx.boolean_literal()!,
            ) as TValueLiteral
        if (ctx.list_literal())
            return this.visitList_literal(ctx.list_literal()!) as TValueLiteral
        if (ctx.object_literal())
            return this.visitObject_literal(
                ctx.object_literal()!,
            ) as TValueLiteral

        this.doc.errors.push('Unknown value node.')
        return null
    }

    /**
     * Visit a parse tree produced by `YiniParser.object_literal`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    // visitObject_literal?: (ctx: Object_literalContext) => Result
    visitObject_literal = (ctx: Object_literalContext): any => {
        // object: '{' object_members? '}'  (Spec 9.1). :contentReference[oaicite:13]{index=13}
        const obj: Record<string, TValueLiteral> = {}
        const members = ctx.object_members?.()
        if (members) {
            const list = this.visitObject_members?.(members) as Array<{
                k: string
                v: TValueLiteral
            }>
            for (const { k, v } of list) {
                if (Object.prototype.hasOwnProperty.call(obj, k)) {
                    // duplicates inside an object literal: treat like duplicates in a section
                    this.doc.warnings.push(
                        `Duplicate object key '${k}' (keeping first).`,
                    )
                    continue
                }
                obj[k] = v
            }
        }
        return obj
    }

    /**
     * Visit a parse tree produced by `YiniParser.object_members`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    // visitObject_members?: (ctx: Object_membersContext) => Result
    visitObject_members = (ctx: Object_membersContext): any => {
        const out: Array<{ k: string; v: TValueLiteral }> = []
        // for (const m of ctx.object_member()) {
        for (const m of ctx.object_member_list()) {
            debugPrint('m of ctx.object_member_list():')
            isDebug() && printObject(m)
            out.push(this.visitObject_member?.(m) as any)
        }
        return out
    }

    /**
     * Visit a parse tree produced by `YiniParser.object_member`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    // visitObject_member?: (ctx: Object_memberContext) => Result
    visitObject_member = (ctx: Object_memberContext): any => {
        // KEY ':' value
        const k = ctx.getChild(0).getText()
        const v = this.visitValue?.(ctx.value()!) as TValueLiteral
        return { k, v }
    }

    /**
     * Visit a parse tree produced by `YiniParser.list_literal`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    // visitList_literal?: (ctx: List_literalContext) => Result
    visitList_literal = (ctx: List_literalContext): any => {
        debugPrint('-> Entered visitList_literal(..)')

        // '[' elements? ']' ; empty_list handled by lexer (Spec section, 10.1). :contentReference[oaicite:14]{index=14}
        const elems = this.visitElements(ctx.elements())
        const value = makeListValue(elems)

        debugPrint('<- Exiting visitList_literal(..)...')
        if (isDebug()) {
            console.log('List literal:')
            printObject(value)
        }
        return value
    }

    /**
     * Visit a parse tree produced by `YiniParser.elements`.
     * @param ctx the parse tree
     * @grammarRule value (NL* COMMA NL* value)* COMMA?
     * @return the visitor result
     */
    visitElements = (ctx: ElementsContext): any => {
        debugPrint('-> Entered visitElements(..)')
        debugPrint('  elements.length = ' + ctx?.value_list().length)

        const elems = !ctx?.value_list()
            ? []
            : ctx.value_list().map((elem) => {
                  return this.visitValue(elem)
              })

        debugPrint('<- About to exit visitElements(..)')
        if (isDebug()) {
            console.log('Mapped value_list of elements in a list:')
            printObject(elems)
        }
        return makeListValue(elems)
    }

    /**
     * Visit a parse tree produced by `YiniParser.number_literal`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    // visitNumber_literal?: (ctx: Number_literalContext) => Result
    visitNumber_literal = (ctx: Number_literalContext): any => {
        debugPrint('-> Entered visitNumber_literal(..)')

        const rawText = ctx.getText()
        const parsedNum = parseNumber(rawText)
        const value: TScalarValue = makeScalarValue('Number', parsedNum.value)

        if (isDebug()) {
            console.log('  rawText = ' + rawText)
            console.log('parsedNum = ' + parsedNum.value)
            console.log('Number literal:')
            printLiteral(value)
            // return parseNumber(ctx.getText())
        }
        return value
    }

    /**
     * Visit a parse tree produced by `YiniParser.null_literal`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    // visitNull_literal?: (ctx: Null_literalContext) => Result
    visitNull_literal = (ctx: Null_literalContext): any => {
        debugPrint('-> Entered visitNull_literal(..)')
        debugPrint('raw = ' + ctx.getText())
        return makeScalarValue('Null')
    }

    /**
     * Visit a parse tree produced by `YiniParser.string_literal`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    // visitString_literal?: (ctx: String_literalContext) => Result
    visitString_literal = (ctx: String_literalContext): any => {
        debugPrint('-> Entered visitString_literal(..)')

        // STRING (string_concat)*
        // Concatenate pieces with PLUS (Spec 6.6). Each piece is a STRING token; '+' is structural. :contentReference[oaicite:17]{index=17}
        let text = trimQuotes(ctx.STRING().getText())
        // for (const c of ctx.string_concat() ?? []) {
        for (const c of ctx.string_concat_list() ?? []) {
            debugPrint('c of ctx.string_concat():')
            isDebug() && printObject(c)
            text += this.visitString_concat?.(c)
        }
        return makeScalarValue('String', text)
    }

    /**
     * Visit a parse tree produced by `YiniParser.string_concat`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    // visitString_concat?: (ctx: String_concatContext) => Result
    visitString_concat = (ctx: String_concatContext): any => {
        // PLUS STRING
        return trimQuotes(ctx.STRING().getText())
    }

    /**
     * Visit a parse tree produced by `YiniParser.boolean_literal`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    // visitBoolean_literal?: (ctx: Boolean_literalContext) => Result
    visitBoolean_literal = (ctx: Boolean_literalContext): any => {
        debugPrint('-> Entered visitBoolean_literal(..)')
        const raw = ctx.getText()
        // Case-insensitive true/false/on/off/yes/no (Spec section, 8.1).
        return makeScalarValue('Boolean', parseBoolean(raw))
    }

    /**
     * Visit a parse tree produced by `YiniParser.bad_member`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    // visitBad_member?: (ctx: Bad_memberContext) => Result
    visitBad_member = (ctx: Bad_memberContext): any => {
        const t = ctx.getText()
        this.doc.errors.push(
            `Malformed member near: ${JSON.stringify(t.slice(0, 60))}…`,
        )
        return null
    }
}
