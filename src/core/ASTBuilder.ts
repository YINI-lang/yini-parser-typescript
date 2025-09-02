/**
 * Here is where we walk the parse tree (CST) and build/validate the AST.
 */
import assert from 'assert'
import { ParseTreeVisitor, TokenStream } from 'antlr4'
import { isDebug } from '../config/env'
import {
    AnnotationContext,
    AssignmentContext,
    Bad_memberContext,
    Bad_meta_textContext,
    Boolean_literalContext,
    Colon_list_declContext,
    DirectiveContext,
    ElementsContext,
    EolContext,
    List_literalContext,
    MemberContext,
    Meta_stmtContext,
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
// import parseNumber from '../parsers/parseNumber'
import parseSectionHeader from '../parsers/parseSectionHeader'
import parseStringLiteral from '../parsers/parseString'
import { isInfinityValue, isNaNValue } from '../utils/number'
import { debugPrint, printObject } from '../utils/print'
import {
    isEnclosedInBackticks,
    toLowerSnakeCase,
    trimBackticks,
} from '../utils/string'
import {
    isScalar,
    isValidBacktickedIdent,
    isValidSimpleIdent,
    printLiteral,
    stripCommentsAndAfter,
} from '../yiniHelpers'
import { ErrorDataHandler } from './ErrorDataHandler'
import {
    IBuildOptions,
    // IChainContainer,
    IParseMainOptions,
    // ISectionResult,
    IYiniAST,
    IYiniSection,
    TListValue,
    TScalarValue,
    TValueLiteral,
} from './types'

// -----------------------

// --- Helpers -------------------------------------------------------------

/**
 * @param {string | undefined} [tag]
 *        Debugging only. Its contents may change at any time and
 *        must not be relied upon for any functional purpose.
 */
const makeScalarValue = (
    type: 'String' | 'Number' | 'Boolean' | 'Null' | 'Undefined',
    value: string | number | boolean | null | undefined = null,
    tag: string | undefined = undefined,
): TScalarValue => {
    switch (type) {
        case 'String':
            return { type, value: value as string, tag }
        case 'Number':
            return { type, value: value as number, tag }
        case 'Boolean':
            return { type, value: !!value, tag }
        case 'Null':
            return { type: 'Null', value: null, tag }
        case 'Undefined':
            return { type: 'Undefined', value: undefined, tag }
        default:
            new ErrorDataHandler().pushOrBail(
                null,
                'Fatal-Error',
                `No such type in makeValue(..), type: ${type}, value: ${value}`,
                'Something in the code is done incorrectly in order for this to happen... :S',
            )
    }
    return { type: 'Null', value: null, tag }
}

/**
 * @param {string | undefined} [tag]
 *        Debugging only. Its contents may change at any time and
 *        must not be relied upon for any functional purpose.
 */
const makeListValue = (
    elems: TValueLiteral[] = [],
    tag: string | undefined = undefined,
): TValueLiteral => {
    return { type: 'List', elems, tag }
}

/**
 * @param {string | undefined} [tag]
 *        Debugging only. Its contents may change at any time and
 *        must not be relied upon for any functional purpose.
 */
const makeObjectValue = (
    entries: Record<string, TValueLiteral> = {},
    tag: string | undefined = undefined,
): TValueLiteral => {
    return { type: 'Object', entries, tag }
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

function makeSection(name: string, level: number): IYiniSection {
    return { sectionName: name, level, members: new Map(), children: [] }
}

/** Parse SECTION_HEAD token text → {level, name}.
 * Supports repeated markers (^^^^) and shorthand (^7) (Spec 5.2–5.3.1). :contentReference[oaicite:5]{index=5}:contentReference[oaicite:6]{index=6}
 */
// function parseSectionHeadToken(raw: string): { level: number; name: string } {
//     // SECTION_HEAD token text includes: optional WS, marker(s) or shorthand, WS, IDENT (possibly backticked), NL+
//     // We only need the visible line content up to NL.
//     const line = raw.split(/\r?\n/)[0]

//     // Extract marker block and name
//     // Examples: "^^ Section", "^7 `Section name`", "< MySection"
//     const m = line.match(/^\s*([\^<§€]+|\^|\<|§|€)(\d+)?[ \t]+(.+?)\s*$/)
//     if (m) {
//         const markerRun = m[1]
//         const numeric = m[2]
//         let level: number
//         if (numeric) {
//             level = parseInt(numeric, 10)
//         } else {
//             // count repeated marker chars (^^^^)
//             level = markerRun.length
//         }

//         // Section name may be backticked: `Name with spaces`
//         let name = m[3]
//         if (name.startsWith('`') && name.endsWith('`')) {
//             name = name.slice(1, -1)
//         }
//         return { level, name }
//     }

//     // Fallback: be defensive
//     return { level: 1, name: line.trim() }
// }

// --- Builder Visitor -----------------------------------------------------

/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `YiniParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
// export default class YINIVisitor<IResult> extends YiniParserVisitor<IResult> {
export default class ASTBuilder<Result> extends YiniParserVisitor<Result> {
    private errorHandler: ErrorDataHandler | null = null
    private readonly options: IParseMainOptions
    private readonly isStrict: boolean

    // private readonly mode: 'lenient' | 'strict'
    private readonly onDuplicateKey: IBuildOptions['onDuplicateKey']
    private ast: IYiniAST
    private sectionStack: IYiniSection[]

    private meta_hasYiniMarker = false // For stats.
    // private meta_numOfSections = 0 // For stats.
    private meta_numOfMembers = 0 // For stats.
    // private meta_numOfChains = 0 // For stats.
    private meta_maxLevel = 0 // For stats.

    public mapSectionNamePaths: Map<string, number> = new Map<string, number>()

    /**
     * @param metaFileName If parsing from a file, provide the file name here so the meta information can be updated accordingly.
     * @param metaLineCount Provide the line-count here so the meta information can be updated accordingly.
     */
    constructor(
        errorHandler: ErrorDataHandler,
        options: IParseMainOptions,
        metaFileName: string | null,
    ) {
        super()
        if (!errorHandler) {
            // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
            new ErrorDataHandler().pushOrBail(
                null,
                'Fatal-Error',
                'Has no ErrorDataHandler instance when calling visitYini(..)',
                'Something in the code is done incorrectly in order for this to happen... :S',
            )
        }
        this.options = options

        this.errorHandler = errorHandler
        this.isStrict = options.isStrict

        if (options.isStrict) {
            this.onDuplicateKey = 'error'
        } else {
            this.onDuplicateKey = 'warn'
        }

        const root = makeSection('(root)', 0)
        // this.mapSectionNamePaths.set('(root)', 0)
        this.ast = {
            root,
            isStrict: this.isStrict,
            sourceType: metaFileName ? 'File' : 'Inline',
            fileName: !!metaFileName ? metaFileName : undefined,
            terminatorSeen: false,
            yiniMarkerSeen: false,
            maxDepth: null,
            numOfSections: null,
            numOfMembers: null,
            sectionNamePaths: null,
        }
        this.sectionStack = [root]
    }

    // --- Private helper methods --------------------------------

    private hasDefinedSectionTitle = (keyPath: string): boolean => {
        return this.mapSectionNamePaths?.has(keyPath)
    }

    private setDefineSectionTitle = (keyPath: string, level: number) => {
        this.mapSectionNamePaths.set(keyPath, level)
    }

    /** Attach a section to the stack respecting up/down moves (Spec 5.3). :contentReference[oaicite:7]{index=7} */
    private attachSection(
        ctx: any,
        stack: IYiniSection[],
        section: IYiniSection,
        ast: IYiniAST,
    ) {
        const targetLevel = section.level
        const sectionName = section.sectionName

        if (targetLevel <= 0) {
            // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
            this.errorHandler!.pushOrBail(
                ctx,
                'Syntax-Warning',
                `Invalid section level: ${targetLevel}`,
            )

            return
        }

        // ------------------------------
        // Construct section name path.
        let keyPath = ''
        let i = targetLevel - 1
        for (const [key, value] of Array.from(
            this.mapSectionNamePaths.entries(),
        ).reverse()) {
            if (value === i) {
                keyPath += key + '.'
                break
            }
        }
        keyPath += sectionName // Append current section name last.
        debugPrint('section full path: keyPath = ' + keyPath)
        // ------------------------------

        if (this.hasDefinedSectionTitle(keyPath)) {
            // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
            this.errorHandler!.pushOrBail(
                ctx,
                'Syntax-Error',
                'Duplicate section name',
                `Section name: '${sectionName}' at level ${targetLevel} is already defined and cannot be redefined.`,
            )
        } else {
            if (section.members === undefined) {
                debugPrint(
                    'This sReslult does not hold any valid members (=undefined)',
                )
            } else {
                // this.existingSectionTitles.set(key, true)
                this.setDefineSectionTitle(keyPath, targetLevel)
                // printObject(this.existingSectionTitles)
            }
        }
        // ------------------------------

        // Ensure stack top has level targetLevel-1 (implicit root is level 0).
        while (
            stack.length > 0 &&
            stack[stack.length - 1].level >= targetLevel
        ) {
            stack.pop()
        }
        const parent = stack[stack.length - 1] // root or higher-level section
        parent.children.push(section)
        stack.push(section)

        if (targetLevel > this.meta_maxLevel) {
            this.meta_maxLevel = targetLevel
        }
    }

    /** Insert a key/value into current section (duplicate handling per options). */
    private putMember(
        errorHandler: ErrorDataHandler,
        ctx: any,
        sec: IYiniSection,
        key: string,
        value: TValueLiteral,
        mode: IBuildOptions['onDuplicateKey'] = 'warn',
    ) {
        isDebug() && console.log()
        debugPrint('-> Entered putMember(..)')
        debugPrint(`putMember(..): key: '${key}', value: ${value}`)

        if (sec.members.has(key)) {
            switch (mode) {
                case 'error':
                    errorHandler!.pushOrBail(
                        ctx,
                        'Syntax-Error',
                        'Hit a duplicate key in this section and scope',
                        `Key '${key}' already exists in section '${sec.sectionName}' on level ${sec.level}.`,
                    )
                    break
                case 'warn':
                    errorHandler!.pushOrBail(
                        ctx,
                        'Syntax-Warning',
                        'Hit a duplicate key (keeping first) in this section and scope',
                        `Key '${key}' already exists in section '${sec.sectionName}' on level ${sec.level}.`,
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
        this.meta_numOfMembers++
    }

    // --------------------------------

    // Public entry
    public buildAST(ctx: YiniContext): IYiniAST {
        this.visitYini?.(ctx)

        // The document terminator is optional by default.
        // If the option `isRequireDocTerminator` is set to true,
        // the '/END' terminator at the end of the document becomes required.
        if (this.options.isRequireDocTerminator && !this.ast.terminatorSeen) {
            const msgWhat: string = `Missing '/END' at end of document (strict mode).`
            const msgWhy: string = `The terminator '/END' (case insensitive) is required and must appear at the end of the document.`

            // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
            this.errorHandler!.pushOrBail(null, 'Syntax-Error', msgWhat, msgWhy)
        }

        if (this.options.isIncludeMeta) {
            // Attach collected meta information.
            this.ast.maxDepth = this.meta_maxLevel
            this.ast.numOfSections = this.mapSectionNamePaths.size
            this.ast.numOfMembers = this.meta_numOfMembers
            this.ast.sectionNamePaths = [...this.mapSectionNamePaths.keys()]
        }

        return this.ast
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
        return this.ast
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
        debugPrint('-> Entered visitTerminal_stmt(..)')
        let rawText: string = ctx.getText().trim()
        debugPrint('rawText = "' + rawText + '"')

        // rawText = extractYiniLine(rawText) // Remove possible comments.
        // rawText = stripCommentsAndAfter(rawText.split('\n', 1)[0]).trim() // Remove possible comments.
        rawText = stripCommentsAndAfter(rawText) // Remove possible comments.
        debugPrint('rawText2 = "' + rawText + '"')

        if (rawText.toLowerCase() === '/end') {
            if (this.ast.terminatorSeen) {
                // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
                this.errorHandler!.pushOrBail(
                    ctx,
                    'Syntax-Warning',
                    'Hit a duplicate terminator in document',
                    `'${rawText}' already exists in this file, there must only be one terminator at the end of file ('/END').`,
                )
            }
        } else {
            // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
            this.errorHandler!.pushOrBail(
                ctx,
                'Syntax-Error',
                'Encountered unknow syntax for terminator',
                `Got '${rawText}', but expected '/END' (case insensitive).`,
            )
        }

        this.ast.terminatorSeen = true
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
        if (ruleName.includes('Meta_stmtContext'))
            return this.visitMeta_stmt?.(child)

        debugPrint('S1')
        // let headerAlt = child.getText?.() ?? ''
        // let header = ctx.SECTION_HEAD()?.getText().trim() || ''
        let header = ctx.SECTION_HEAD()?.getText().trim() || ''
        // debugPrint('S2, lineAlt: >>>' + lineAlt + '<<<')
        debugPrint('S2, header: >>>' + header + '<<<')
        header = extractYiniLine(header)
        debugPrint('S3, header: >>>' + header + '<<<')

        if (!!header) {
            const { sectionName, sectionLevel } = parseSectionHeader(
                header,
                this.errorHandler!,
                ctx,
            )
            // Validate level sequencing per spec 5.3 (no skipping upward)
            const currentLevel =
                this.sectionStack[this.sectionStack.length - 1].level
            if (sectionLevel > currentLevel + 1) {
                // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
                this.errorHandler!.pushOrBail(
                    ctx,
                    'Syntax-Error',
                    'Invalid section level transition',
                    `Cannot skip levels: from ${currentLevel} to ${sectionLevel}.`,
                    `A section header may not start directly at level ${sectionLevel}, skipping previous section levels. Please start with one level further down.`,
                )
            }
            const section = makeSection(
                trimBackticks(sectionName),
                sectionLevel,
            )
            this.attachSection(ctx, this.sectionStack, section, this.ast) // respects up/down nesting
            return null
        }

        // bad_member fallback
        return this.visitBad_member?.(ctx.getChild(0) as any)
    }

    /**
     * Visit a parse tree produced by `YiniParser.meta_stmt`.
     * @param ctx the parse tree
     */
    visitMeta_stmt = (ctx: Meta_stmtContext): any => {
        debugPrint('-> Entered visitMeta_stmt(..)')
        let rawText: string = ctx.getText().trim()
        debugPrint('rawText = "' + rawText + '"')

        ctx.children?.forEach((c: any) => {
            let rawText: string = c?.getText().trim()
            debugPrint('visitMeta_stmt:child = "' + rawText + '"')

            this.visit?.(c)
        })

        return null
    }

    /**
     * Visit a parse tree produced by `YiniParser.directive`.
     * @param ctx the parse tree
     * @note Directive statements in YINI are special top-level commands that
     *       appear only at the beginning of a document, before any sections
     *       or members. Each directive may occur at most once per file.
     */
    visitDirective = (ctx: DirectiveContext): any => {
        debugPrint('-> Entered visitDirective(..)')
        let rawText: string = ctx.getText().trim()
        debugPrint('rawText = "' + rawText + '"')

        // NOTE: Important to strip any possible comments on the same line.
        rawText = stripCommentsAndAfter(rawText) // Remove possible comments.
        debugPrint('rawText2 = "' + rawText + '"')

        if (this.mapSectionNamePaths.size || this.meta_numOfMembers) {
            // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
            this.errorHandler!.pushOrBail(
                ctx,
                this.isStrict ? 'Syntax-Error' : 'Syntax-Warning',
                `Found a directive statement in the wrong place ${this.isStrict ? '(strict mode)' : '(lenient mode)'}`,
                `Directive '${rawText}' must appear only at the beginning of the document, before any sections or members.`,
                `Tip: Move the line with '${rawText}' to the very top of the file (but after a possible #! line or comments).`,
            )
        }

        if (rawText.toLowerCase().startsWith('@include')) {
            // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
            this.errorHandler!.pushOrBail(
                ctx,
                'Notice',
                `Detected unsupported directive '@include'`,
                `This directive is not currently supported by the parser.`,
            )
        } else if (rawText.toLowerCase() === '@yini') {
            if (this.ast.yiniMarkerSeen) {
                // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
                this.errorHandler!.pushOrBail(
                    ctx,
                    this.isStrict ? 'Syntax-Error' : 'Syntax-Warning',
                    `Hit a duplicate YINI Marker in document ${this.isStrict ? '(strict mode)' : '(lenient mode)'}`,
                    `'${rawText}' already exists in this file, it's enough with only one YINI Marker ('@YINI').`,
                )
            }
        } else {
            // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
            this.errorHandler!.pushOrBail(
                ctx,
                'Syntax-Error',
                'Encountered unknow directive statement',
                `Got '${rawText}', but expected '@YINI' (case insensitive).`,
            )
        }

        // @yini marker is advisory (no semantic value) per spec. We ignore it. (Spec 2.4) :contentReference[oaicite:9]{index=9}
        this.ast.yiniMarkerSeen = true
        return null
    }

    /**
     * Visit a parse tree produced by `YiniParser.annotation`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAnnotation = (ctx: AnnotationContext): any => {
        /*
        
        Experimental / for future.
        
        */

        debugPrint('-> Entered visitAnnotation(..)')
        let rawText: string = ctx.getText().trim()
        debugPrint('rawText = "' + rawText + '"')

        // NOTE: Important to strip any possible comments on the same line.
        rawText = stripCommentsAndAfter(rawText) // Remove possible comments.
        debugPrint('rawText2 = "' + rawText + '"')

        if (rawText.toLowerCase().startsWith('@deprecated')) {
            // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
            this.errorHandler!.pushOrBail(
                ctx,
                'Notice',
                `Detected unsupported annotation '@deprecated'`,
                `This annotation is not currently supported by the parser.`,
            )
        }

        // NOTE: Don't implement! Only experimental / testing for future.
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
        const rawKey = ctx.getChild(0).getText()
        debugPrint(`visitMember(..):   rawKey = '${rawKey}'`)
        if (rawKey) {
            debugPrint()
            debugPrint(
                'Has a key... Validate it either as a simple or a backticked ident...',
            )
            if (isEnclosedInBackticks(rawKey)) {
                if (!isValidBacktickedIdent(rawKey)) {
                    // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
                    this.errorHandler!.pushOrBail(
                        ctx,
                        'Syntax-Error',
                        `Invalid (backticked) key/identifier: '${rawKey}'`,
                        'Backticked key/identifier should be like e.g. `My section name`.',
                    )
                }
            } else {
                if (!isValidSimpleIdent(rawKey)) {
                    // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
                    this.errorHandler!.pushOrBail(
                        ctx,
                        'Syntax-Error',
                        `Invalid key/identifier name: '${rawKey}'`,
                        `Key/identifier names must start with: A-Z, a-z, or _, unless enclosed in backticks e.g.: \`${rawKey}\` or \`My key name\`.`,
                    )
                }
            }
        }

        const resultKey = trimBackticks(rawKey)
        const rawValue = ctx.value?.()?.getText()
        debugPrint(`visitMember(..): rawValue = ` + ctx.value?.()?.getText())

        let valueContext = ctx.value?.()
        let valueNode: TValueLiteral | undefined

        if (!rawValue) {
            // Empty value => Null in lenient mode, error in strict (Spec 12.3, 8.2). :contentReference[oaicite:10]{index=10}:contentReference[oaicite:11]{index=11}
            if (!this.isStrict) {
                debugPrint('HITTTTT!! - in visitMember(..)')
                valueNode = makeScalarValue('Null', null, 'Implicit null')
            } else {
                // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
                this.errorHandler!.pushOrBail(
                    ctx,
                    'Syntax-Error',
                    `Strict mode: missing value for key '${resultKey}'`,
                    'Expected a value but found nothing, strict mode does not allow implicit null.',
                    "If you intend to have a null value, please specify 'null' explicitly as the value.",
                )
            }
        } else {
            valueNode = this.visitValue?.(valueContext) as TValueLiteral
        }
        debugPrint('visitMember(..): valueNode:')
        if (isDebug()) {
            printObject(valueNode)
        }
        // const resultType = valueLiteral?.type
        // const resultValue = valueLiteral?.type
        if (!valueNode || valueNode.type === 'Undefined') {
            // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
            this.errorHandler!.pushOrBail(
                ctx,
                'Syntax-Error',
                'Invalid value',
                `Invalid value for key '${resultKey} in member (<key> = <value> pair)'.`,
                `Got '${rawValue}', but expected a valid value/literal (string, number, boolean, null, list, or object). Optionally with a single leading minus sign '-'.`,
            )
        }

        const current = this.sectionStack[this.sectionStack.length - 1]
        if (valueNode !== undefined) {
            this.putMember(
                this.errorHandler!,
                ctx,
                current,
                resultKey,
                valueNode,
                // this.ast,
                this.onDuplicateKey,
            )
        }
        return valueNode
    }

    /**
     * Visit a parse tree produced by `YiniParser.value`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    // visitValue?: (ctx: ValueContext) => Result
    visitValue = (ctx: ValueContext): any => {
        debugPrint('----------------------------')
        debugPrint('-> Entered visitValue(..)')

        let valueNode: TValueLiteral | undefined = undefined
        if (ctx.null_literal()) {
            debugPrint('  visiting visitNull_literal(..)')
            valueNode = this.visitNull_literal(
                ctx.null_literal()!,
            ) as TValueLiteral
        } else if (ctx.string_literal()) {
            debugPrint('  visiting visitString_literal(..)')
            valueNode = this.visitString_literal(
                ctx.string_literal()!,
            ) as TValueLiteral
        } else if (ctx.number_literal()) {
            debugPrint('  visiting visitNumber_literal(..)')
            valueNode = this.visitNumber_literal(
                ctx.number_literal()!,
            ) as TValueLiteral
        } else if (ctx.boolean_literal()) {
            debugPrint('  visiting visitBoolean_literal(..)')
            valueNode = this.visitBoolean_literal(
                ctx.boolean_literal()!,
            ) as TValueLiteral
        } else if (ctx.list_literal()) {
            debugPrint('  visiting visitList_literal(..)')
            valueNode = this.visitList_literal(
                ctx.list_literal()!,
            ) as TValueLiteral
        } else if (ctx.object_literal()) {
            debugPrint('  visiting visitObject_literal(..)')
            valueNode = this.visitObject_literal(
                ctx.object_literal()!,
            ) as TValueLiteral
        } else {
            debugPrint('  Entered else case in visitValue(..)')
            valueNode = makeScalarValue('Undefined', undefined, 'Invalid value')
        }

        debugPrint('<- About to exit visitValue(..): returning:')
        if (isDebug()) {
            printObject(valueNode)
        }
        debugPrint('----------------------------\n')

        return valueNode
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
     * Visit a parse tree produced by `YiniParser.number_literal`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    // visitNumber_literal?: (ctx: Number_literalContext) => Result
    visitNumber_literal = (ctx: Number_literalContext): any => {
        debugPrint('-> Entered visitNumber_literal(..)')

        const rawText = ctx.getText()
        const parsedNum = parseNumberLiteral(rawText)
        debugPrint('parseNumberLiteral(..) returned, parsedNum:')
        if (isDebug()) {
            printObject(parsedNum)
        }

        // Check if number is JS special type NaN, Infinity or -Infinity.
        // Note: Value with a zero (0) should pass OK!
        if (
            parsedNum?.value !== 0 &&
            (!parsedNum?.value ||
                isNaNValue(parsedNum.value) ||
                isInfinityValue(parsedNum.value))
        ) {
            // **************************************************
            // NOTE: (!) Currently a bit unsure if to return
            // option 1 or 2..!?, 2025-08-23

            // Option 1.
            // return makeScalarValue('Undefined', undefined, parsedNum?.tag)

            // Option 2.
            return undefined
            // **************************************************
        }

        const value: TScalarValue = makeScalarValue(
            'Number',
            parsedNum.value,
            parsedNum.tag,
        )

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
     * Visit a parse tree produced by `YiniParser.boolean_literal`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    // visitBoolean_literal?: (ctx: Boolean_literalContext) => Result
    visitBoolean_literal = (ctx: Boolean_literalContext): any => {
        debugPrint('-> Entered visitBoolean_literal(..)')
        const raw = ctx.getText()
        debugPrint('raw: "' + raw + '"')
        // Case-insensitive true/false/on/off/yes/no (Spec section, 8.1).
        return makeScalarValue('Boolean', parseBoolean(raw))
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
        return makeScalarValue('Null', null, 'Explicit Null')
    }

    /**
     * Visit a parse tree produced by `YiniParser.list_literal`.
     * @param ctx the parse tree
     * @grammarRule OB NL* elements? NL* CB NL* | EMPTY_LIST NL*
     * @return the visitor result
     */
    // visitList_literal?: (ctx: List_literalContext) => Result
    visitList_literal = (ctx: List_literalContext): any => {
        debugPrint('-> Entered visitList_literal(..)')

        // '[' elements? ']' ; empty_list handled by lexer (Spec section, 10.1). :contentReference[oaicite:14]{index=14}
        const elems = this.visitElements(ctx.elements())
        const value = makeListValue(elems, 'From bracketed list')

        debugPrint('<- About to exit visitList_literal(..)...')
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
                  const valueNode = this.visitValue(elem)
                  if (!valueNode) {
                      // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
                      this.errorHandler!.pushOrBail(
                          ctx,
                          'Syntax-Error',
                          'Invalid list element',
                          `Invalid list element: '${elem?.getText()}'`,
                          `Expected a valid value/literal (string, number, boolean, null, list, or object). Optionally with a single leading minus sign '-'.`,
                      )
                  }

                  return valueNode
              })

        debugPrint('<- About to exit visitElements(..)')
        if (isDebug()) {
            console.log('Mapped value_list of elements in a list:')
            printObject(elems)
        }
        return elems
    }

    /**
     * Visit a parse tree produced by `YiniParser.object_literal`.
     * @param ctx the parse tree
     * @grammarRule OC NL* object_members? NL* CC NL* | EMPTY_OBJECT NL*
     * @return the visitor result
     */
    visitObject_literal = (ctx: Object_literalContext): any => {
        debugPrint('-> Entered visitObject_literal(..)')
        // debugPrint('entries.EMPTY_OBJECT = ' + ctx?.EMPTY_OBJECT())
        // debugPrint('entries.length = ' + ctx?.object_members())
        // printObject(ctx)

        // const entries = this.visitObject_members(ctx?.object_members())
        const entries = ctx.object_members()
            ? this.visitObject_members(ctx.object_members())
            : {}
        const value = makeObjectValue(entries)

        debugPrint('<- About to exit visitObject_literal(..)...')
        if (isDebug()) {
            console.log('Object literal:')
            printObject(value)
        }
        return value
    }

    /**
     * Visit a parse tree produced by `YiniParser.object_members`.
     * @param ctx the parse tree
     * @grammarRule object_member (COMMA NL* object_member)* COMMA?
     * @return the visitor result
     */
    visitObject_members = (ctx: Object_membersContext): any => {
        debugPrint('-> Entered visitObject_members(..)')
        debugPrint('entries.length = ' + ctx?.object_member_list().length)

        const entries: Array<{ k: string; v: TValueLiteral }> = []
        ctx.object_member_list().forEach((member) => {
            const { key, value }: any = this.visitObject_member(member)
            debugPrint('   key = ' + key)
            entries[key] = value
        })

        debugPrint('<- About to exit visitObject_members(..)')
        return entries
    }

    /**
     * Visit a parse tree produced by `YiniParser.object_member`.
     * @param ctx the parse tree
     * @grammarRule KEY WS? COLON NL* value
     * @return the visitor result
     */
    // visitObject_member?: (ctx: Object_memberContext) => Result
    visitObject_member = (ctx: Object_memberContext): any => {
        debugPrint('-> Entered visitObject_member(..)')

        const rawKey = ctx.KEY().getText()
        const key = trimBackticks(rawKey)
        const rawValue = ctx.value().getText()
        const valueNode: TValueLiteral = ctx.value()
            ? this.visitValue(ctx.value())
            : makeScalarValue('Null', 'Implicit Null')

        debugPrint('  rawKey = ' + rawKey)
        debugPrint('     key = ' + key)
        debugPrint('rawValue = ' + rawValue)
        if (!valueNode) {
            // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
            this.errorHandler!.pushOrBail(
                ctx,
                'Syntax-Error',
                'Invalid object entry',
                `Invalid object entry for key '${key}'.`,
                `Got '${rawValue}', but expected a valid value/literal (string, number, boolean, null, list, or object). Optionally with a single leading minus sign '-'.`,
            )
        }

        debugPrint('<- About to exit visitObject_member(..)')
        if (isDebug()) {
            console.log('Returning:')
            printObject({ key, value: valueNode })
        }

        return { key, value: valueNode }
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
        const value = makeListValue(elems, 'From colon-list')
        const current = this.sectionStack[this.sectionStack.length - 1]

        // putMember(current, key, list, this.ast, this.onDuplicateKey)
        this.putMember(
            this.errorHandler!,
            ctx,
            current,
            key,
            value,
            // this.ast,
            this.onDuplicateKey,
        )
        debugPrint('<- About to exit visitColon_list_decl(..)...')
        if (isDebug()) {
            console.log('List literal: (from a Colon-list)')
            printObject(value)
        }
        return value
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
     * Visit a parse tree produced by `YiniParser.bad_member`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    // visitBad_member?: (ctx: Bad_memberContext) => Result
    visitBad_member = (ctx: Bad_memberContext): any => {
        debugPrint('-> Entered visitBad_member(..)')
        // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
        this.errorHandler!.pushOrBail(
            ctx,
            'Syntax-Error',
            'Invalid or malformed member (key-value pair) found.',
            `Offending text: ${ctx?.getText()?.trim()}`,
            'Members has the form: <key> = <value>, where <key> is a name/identifier and <value> is a value/literal.',
        )
        return null
    }

    /**
     * Visit a parse tree produced by `YiniParser.bad_meta_text`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitBad_meta_text = (ctx: Bad_meta_textContext): any => {
        debugPrint('-> Entered visitBad_meta_text(..)')
        // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
        this.errorHandler!.pushOrBail(
            ctx,
            'Syntax-Error',
            'Invalid or malformed directive or annotation statement',
            `Offending statement: ${ctx?.getText()?.trim()}`,
        )
        return null
    }
}
