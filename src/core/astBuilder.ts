/**
 * Here is where we walk the parse tree (CST) and build/validate the AST.
 */
// src/core/astBuilder.ts
import { isDebug } from '../config/env'
import {
    AnnotationContext,
    AssignmentContext,
    Bad_memberContext,
    Bad_meta_textContext,
    Boolean_literalContext,
    Concat_expressionContext,
    Concat_operandContext,
    Concat_tailContext,
    DirectiveContext,
    ElementsContext,
    EolContext,
    List_literalContext,
    MemberContext,
    Meta_stmtContext,
    Null_literalContext,
    Number_literalContext,
    Object_literalContext,
    Object_member_separatorContext,
    Object_memberContext,
    Object_membersContext,
    PrologContext,
    Scalar_valueContext,
    StmtContext,
    String_literalContext,
    Terminal_stmtContext,
    ValueContext,
    YiniContext,
} from '../grammar/generated/YiniParser.js'
import YiniParserVisitor from '../grammar/generated/YiniParserVisitor'
import { extractYiniLine } from '../parsers/extractSignificantYiniLine'
import parseBoolean from '../parsers/parseBoolean'
import parseNullLiteral from '../parsers/parseNull'
import parseNumberLiteral from '../parsers/parseNumber'
// import parseNumber from '../parsers/parseNumber'
import parseSectionHeader from '../parsers/parseSectionHeader'
import parseStringLiteral, {
    CYiniStringParseError,
} from '../parsers/parseString'
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
} from '../utils/yiniHelpers'
import { ErrorDataHandler, toErrorLocation } from './errorDataHandler'
import {
    IBuildOptions,
    IParseCoreOptions,
    IParsedStringInput,
    IYiniAST,
    IYiniSection,
    TListValue,
    TScalarValue,
    TSourceType,
    TSubjectType,
    TValueLiteral,
} from './internalTypes'

// -----------------------

// --- Helpers -------------------------------------------------------------

// let _subjectType: TSubjectType = 'None'
let _sourceType: TSourceType

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
            // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
            new ErrorDataHandler(_sourceType).pushOrBail(
                undefined,
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

function makeSection(name: string, level: number): IYiniSection {
    return { sectionName: name, level, members: new Map(), children: [] }
}

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
    private readonly options: IParseCoreOptions
    private readonly isStrict: boolean

    // private readonly mode: 'lenient' | 'strict'
    private readonly onDuplicateKey: IBuildOptions['onDuplicateKey']
    private ast: IYiniAST
    private sectionStack: IYiniSection[]

    private meta_hasYiniMarker = false // For stats.
    // private meta_numOfSections = 0 // For stats.
    private _numOfMembers = 0 // For error checking and stats.
    // private meta_numOfChains = 0 // For stats.
    private meta_maxLevel = 0 // For stats.

    public mapSectionNamePaths: Map<string, number> = new Map<string, number>()

    /**
     * @param metaFileName If parsing from a file, provide the file name here so the meta information can be updated accordingly.
     * @param metaLineCount Provide the line-count here so the meta information can be updated accordingly.
     */
    constructor(
        errorHandler: ErrorDataHandler,
        options: IParseCoreOptions,
        sourceType: TSourceType,
        metaFileName: string | null,
    ) {
        super()
        if (!errorHandler) {
            // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
            new ErrorDataHandler('None/Ignore').pushOrBail(
                undefined,
                'Fatal-Error',
                'Has no ErrorDataHandler instance when calling visitYini(..)',
                'Something in the code is done incorrectly in order for this to happen... :S',
            )
        }
        _sourceType = sourceType
        this.options = options

        this.errorHandler = errorHandler
        this.isStrict = options?.rules?.initialMode === 'strict'
        this.onDuplicateKey = options?.rules?.onDuplicateKey ?? 'error' // Different setting depending on mode.

        const root = makeSection('(root)', 0)
        this.ast = {
            root,
            isStrict: this.isStrict,
            sourceType: metaFileName ? 'File' : 'Inline',
            fileName: !!metaFileName ? metaFileName : undefined,
            terminatorSeen: false,
            yiniMarkerSeen: false,
            maxDepth: null,
            numOfSections: 0,
            numOfMembers: 0,
            sectionNamePaths: null,
        }
        this.sectionStack = [root]
    }

    // --- Private helper methods --------------------------------

    private validateStrictTopLevelStructure() {
        if (!this.isStrict) return

        const numTopLevelSections = this.ast.root.children.length
        const numTopLevelMembers = this.ast.root.members.size

        if (numTopLevelMembers > 0) {
            // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
            this.errorHandler!.pushOrBail(
                undefined,
                'Syntax-Error',
                'Top-level members are not allowed in strict mode.',
                'Members were found outside the single required explicit top-level section.',
                'Move all top-level members into the explicit top-level section, or parse the document in lenient mode.',
            )
        }

        // Exactly one explicit top-level section in strict mode.
        if (numTopLevelSections !== 1) {
            // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
            this.errorHandler!.pushOrBail(
                undefined,
                'Syntax-Error',
                'Strict mode requires exactly one explicit top-level section.',
                `Found ${numTopLevelSections} explicit top-level section${numTopLevelSections === 1 ? '' : 's'}.`,
                'Wrap the document in exactly one explicit top-level section and nest any additional sections beneath it.',
            )
        }
    }

    private hasDefinedSectionTitle = (keyPath: string): boolean => {
        return this.mapSectionNamePaths?.has(keyPath)
    }

    private setDefineSectionTitle = (keyPath: string, level: number) => {
        this.mapSectionNamePaths.set(keyPath, level)
    }

    // private extractStringParts(tokenText: string): IParsedStringInput {
    //     // Detect prefix
    //     let prefix = ''
    //     let rest = tokenText

    //     const prefixMatch = tokenText.match(/^(C|c|R|r)/)
    //     if (prefixMatch) {
    //         prefix = prefixMatch[1].toUpperCase()
    //         rest = tokenText.slice(1)
    //     }

    //     // Triple quoted
    //     if (rest.startsWith('"""')) {
    //         const inner = rest.slice(3, -3)

    //         if (prefix === 'C') {
    //             return { strKind: 'triple-classic', value: inner }
    //         }

    //         return { strKind: 'triple-raw', value: inner }
    //     }

    //     // Single quoted or double quoted
    //     const quote = rest[0]
    //     const inner = rest.slice(1, -1)

    //     switch (prefix) {
    //         case 'C':
    //             return { strKind: 'classic', value: inner }
    //         case 'R':
    //         case '':
    //             return { strKind: 'raw', value: inner }
    //         default:
    //             return { strKind: 'raw', value: inner }
    //     }
    // }

    private extractStringKindAndValue(raw: string): IParsedStringInput {
        const triple =
            raw.startsWith('C"""') ||
            raw.startsWith('c"""') ||
            raw.startsWith('R"""') ||
            raw.startsWith('r"""') ||
            raw.startsWith('"""')

        let prefix = ''
        let value = ''
        let strKind: IParsedStringInput['strKind']

        if (/^[Cc]/.test(raw)) prefix = 'C'
        // else if (/^[Hh]/.test(raw)) prefix = 'H'
        else if (/^[Rr]/.test(raw)) prefix = 'R'

        if (
            raw.startsWith('"""') ||
            raw.startsWith('C"""') ||
            raw.startsWith('c"""')
        ) {
            value = raw.replace(/^[CRcr]?"""/, '').replace(/"""$/, '')
            strKind = prefix === 'C' ? 'triple-classic' : 'triple-raw'
        } else {
            value = raw.replace(/^[CRcr]?['"]/, '').replace(/['"]$/, '')

            if (prefix === 'C') strKind = 'classic'
            else strKind = 'raw'
        }

        return { strKind, value }
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
                toErrorLocation(ctx),
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
            this.errorHandler!.pushOrBail(
                toErrorLocation(ctx),
                'Syntax-Error',
                'Duplicate section name',
                `Section name: '${sectionName}' at level ${targetLevel} is already defined and cannot be redefined.`,
            )

            return
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
        mode: IBuildOptions['onDuplicateKey'] = 'warn-and-keep-first',
    ) {
        isDebug() && console.log()
        debugPrint('-> Entered putMember(..)')
        debugPrint(`putMember(..): key: '${key}', value: ${value}`)

        if (sec.members.has(key)) {
            switch (mode) {
                case 'error':
                    // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
                    errorHandler!.pushOrBail(
                        toErrorLocation(ctx),
                        'Syntax-Error',
                        'Hit a duplicate key in this section and scope',
                        `Key '${key}' already exists in section '${sec.sectionName}' on level ${sec.level}.`,
                    )
                    break
                case 'warn-and-keep-first':
                    // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
                    errorHandler!.pushOrBail(
                        toErrorLocation(ctx),
                        'Syntax-Warning',
                        `Hit a duplicate key (will keep first value) in this section and scope`,
                        `Key '${key}' already exists in section '${sec.sectionName}' on level ${sec.level}.`,
                    )
                    return // Keep first, don't overwrite.
                case 'warn-and-overwrite':
                    // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
                    errorHandler!.pushOrBail(
                        toErrorLocation(ctx),
                        'Syntax-Warning',
                        `Overwrote a duplicate key (will keep last value) in this section and scope`,
                        `Key '${key}' was overwritten in section '${sec.sectionName}' on level ${sec.level}.`,
                    )
                    break // Overwrite, replace value.
                case 'keep-first':
                    return // Keep first, don't overwrite.
                case 'overwrite':
                    break // Overwrite, replace value.
            }
        } else {
            this._numOfMembers++
        }

        sec.members.set(key, value)
    }

    private stringifyConcatOperand(value: TScalarValue): string {
        switch (value.type) {
            case 'String':
                return value.value
            case 'Number':
                return String(value.value)
            case 'Boolean':
                return value.value ? 'true' : 'false'
            case 'Null':
                return 'null'
            default:
                return ''
        }
    }

    private parseStringToken(tokenText: string, ctx: any): TScalarValue {
        const parsed = this.extractStringKindAndValue(tokenText)

        try {
            const value = parseStringLiteral(parsed)
            return makeScalarValue('String', value)
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : String(err)

            let msgWhat = 'Parse error in string'
            let msgWhy = msg
            let msgHint = ''

            if (err instanceof CYiniStringParseError) {
                if (/Invalid escape sequence/i.test(msg)) {
                    msgWhat = 'Invalid escape sequence in string'
                    msgHint =
                        'Use double backslashes (\\\\) in C-strings, or use a raw string if escapes are not needed.'
                } else if (/end of string/i.test(msg)) {
                    msgWhat = 'Incomplete escape sequence in string'
                    msgHint =
                        'Check that all escape sequences in the C-string are complete and valid.'
                }
            }

            this.errorHandler!.pushOrBail(
                toErrorLocation(ctx),
                'Syntax-Error',
                msgWhat,
                msgWhy,
                msgHint,
            )

            return makeScalarValue(
                'Undefined',
                undefined,
                'Invalid string literal already reported',
            )
        }
    }

    // --------------------------------

    // Public entry
    public buildAST(ctx: YiniContext): IYiniAST {
        this.visitYini?.(ctx)

        // Strict-mode structural validation.
        this.validateStrictTopLevelStructure()

        const isMissingTerminator = !this.ast.terminatorSeen

        // In strict mode, the document terminator is required by default.
        // However, the parse option `requireDocTerminator` is authoritative
        // and may override that default behavior.
        const terminatorPolicy = this.options.rules.requireDocTerminator

        if (isMissingTerminator && terminatorPolicy === 'required') {
            // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
            this.errorHandler!.pushOrBail(
                undefined,
                'Syntax-Error',
                "Missing '/END' at end of document.",
                "The document terminator '/END' (case-insensitive) is required at the end of the document.",
                "Add '/END' as the final significant line, or change requireDocTerminator to 'optional' or 'warn-if-missing'.",
            )
        } else if (
            isMissingTerminator &&
            terminatorPolicy === 'warn-if-missing'
        ) {
            // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
            this.errorHandler!.pushOrBail(
                undefined,
                'Syntax-Warning',
                "Missing '/END' at end of document.",
                "The document terminator '/END' (case-insensitive) appears to be missing at the end of the document.",
                "Add '/END' as the final significant line, or change requireDocTerminator to 'optional'.",
            )
        }

        this.ast.numOfSections = this.mapSectionNamePaths.size
        this.ast.numOfMembers = this._numOfMembers

        if (this.options.isIncludeMeta) {
            this.ast.maxDepth = this.meta_maxLevel
            this.ast.sectionNamePaths = [...this.mapSectionNamePaths.keys()]
        }

        return this.ast
    }

    /**
     * Visit a parse tree produced by `YiniParser.yini`.
     * @param ctx the parse tree
     * @return the visitor result
     */
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

        rawText = stripCommentsAndAfter(rawText) // Remove possible comments.
        debugPrint('rawText2 = "' + rawText + '"')

        if (rawText.toLowerCase() === '/end') {
            // NOTE: Below, maybe not reached at all.
            if (this.ast.terminatorSeen) {
                // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
                this.errorHandler!.pushOrBail(
                    toErrorLocation(ctx),
                    'Syntax-Warning',
                    'Hit a duplicate terminator in document',
                    `'${rawText}' already exists in this file, there must only be one terminator at the end of file ('/END'). Also note that the terminator is optional in both lenient and strict mode, unless the option 'isRequireDocTerminator' is enabled.`,
                )
            }
        } else {
            // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
            this.errorHandler!.pushOrBail(
                toErrorLocation(ctx),
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

        // debugPrint('S0')
        // const badHeaderWDotName = ctx.BAD_SECTION_HEAD_W_DOT_NAME()?.getText()
        // if (badHeaderWDotName) {
        //     console.log('QQQQQQQQ = ' + badHeaderWDotName)
        // }

        if (ruleName.includes('EolContext')) return this.visitEol?.(child)
        if (ruleName.includes('AssignmentContext'))
            return this.visitAssignment?.(child)
        if (ruleName.includes('Meta_stmtContext'))
            return this.visitMeta_stmt?.(child)

        debugPrint('S1')

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
                    toErrorLocation(ctx),
                    'Syntax-Error',
                    'Invalid section level transition',
                    `Cannot skip levels: from ${currentLevel} to ${sectionLevel}.`,
                    `Section headers may not start directly at level ${sectionLevel}, skipping previous section levels. Please start with one level further down.`,
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

        if (this.mapSectionNamePaths.size || this._numOfMembers) {
            // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
            this.errorHandler!.pushOrBail(
                toErrorLocation(ctx),
                this.isStrict ? 'Syntax-Error' : 'Syntax-Warning',
                `Found a directive statement in the wrong place ${this.isStrict ? '(strict mode)' : '(lenient mode)'}`,
                `Directive '${rawText}' must appear only at the beginning of the document, before any sections or members.`,
                `Tip: Move the line with '${rawText}' to the very top of the file (but after a possible #! line or comments).`,
            )
        }

        if (rawText.toLowerCase().startsWith('@include')) {
            // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
            this.errorHandler!.pushOrBail(
                toErrorLocation(ctx),
                'Notice',
                `Detected unsupported directive '@include'`,
                `This directive is not currently supported by the parser.`,
            )
        } else if (rawText.toLowerCase() === '@yini') {
            if (this.ast.yiniMarkerSeen) {
                // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
                this.errorHandler!.pushOrBail(
                    toErrorLocation(ctx),
                    this.isStrict ? 'Syntax-Error' : 'Syntax-Warning',
                    `Hit a duplicate YINI Marker in document`,
                    `'${rawText}' already exists in this file, it's enough with only one YINI Marker ('@YINI').`,
                )
            }
        } else {
            // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
            this.errorHandler!.pushOrBail(
                toErrorLocation(ctx),
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
                toErrorLocation(ctx),
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
                        toErrorLocation(ctx),
                        'Syntax-Error',
                        `Invalid (backticked) key/identifier: '${rawKey}'`,
                        'Backticked key/identifier should be like e.g. `My section name`.',
                    )
                }
            } else {
                if (!isValidSimpleIdent(rawKey)) {
                    // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
                    this.errorHandler!.pushOrBail(
                        toErrorLocation(ctx),
                        'Syntax-Error',
                        `Invalid key/identifier name: '${rawKey}'`,
                        `Key/identifier names must start with: A-Z, a-z, or _, unless enclosed in backticks e.g.: \`${rawKey}\` or \`My key name\`.`,
                    )
                }
            }
        }

        const resultKey = trimBackticks(rawKey)
        const rawMemberText = ctx.getText()
        const rawValue = ctx.value?.()?.getText()
        debugPrint(`visitMember(..): rawValue = ` + ctx.value?.()?.getText())
        debugPrint(`visitMember(..): rawMemberText = ` + rawMemberText)

        /* NOTE:
            ctx.value() can be missing after parser recovery, even when the user did type something after ""=".

            Example:
                port = 54_32

            ANTLR may reject 54_32, and then ctx.value() may not exist in the AST as you expect.
            So rawValue alone is not enough to know whether this was:
                * truly empty: port =
                * malformed: port = 54_32
                * rawMemberText lets one inspect the whole member text.
         */

        let valueContext = ctx.value?.()
        let valueNode: TValueLiteral | undefined

        const hasEquals = rawMemberText.includes('=')
        // const hasTextAfterEquals = hasEquals
        //     ? rawMemberText.split('=').slice(1).join('=').trim().length > 0
        //     : false
        const eqIndex = rawMemberText.indexOf('=')
        const hasTextAfterEquals =
            eqIndex >= 0 && rawMemberText.slice(eqIndex + 1).trim().length > 0

        if (!valueContext || !rawValue) {
            // Case 1: there is text after '=' but parser could not form a valid value.
            // Parser-level syntax error has likely already been reported.
            if (hasTextAfterEquals) {
                return makeScalarValue(
                    'Undefined',
                    undefined,
                    'Parser syntax error already reported',
                )
            }

            // Case 2: truly empty value.
            switch (this.options.rules.treatEmptyValueAsNull) {
                case 'allow':
                    valueNode = makeScalarValue(
                        'Null',
                        null,
                        'Implicit null (empty value)',
                    )
                    break

                case 'allow-with-warning':
                    valueNode = makeScalarValue(
                        'Null',
                        null,
                        'Implicit null (empty value)',
                    )
                    // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
                    this.errorHandler!.pushOrBail(
                        toErrorLocation(ctx),
                        'Syntax-Warning',
                        `Empty value treated as null for key '${resultKey}'.`,
                        `An empty value after '=' was encountered. Per 'treatEmptyValueAsNull = allow-with-warning', interpreted as null.`,
                        `If you intended null, write it explicitly: ${resultKey} = null. Otherwise provide a non-empty value or set 'treatEmptyValueAsNull' to 'disallow'.`,
                    )
                    break

                case 'disallow':
                    // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
                    this.errorHandler!.pushOrBail(
                        toErrorLocation(ctx),
                        'Syntax-Error',
                        `Missing value for key '${resultKey}'`,
                        `Expected a value after '=' but found none. Implicit nulls are disallowed by 'treatEmptyValueAsNull = disallow'.`,
                        `Write 'null' explicitly (${resultKey} = null) if that is intended, or provide a concrete value.`,
                    )

                    return makeScalarValue(
                        'Undefined',
                        undefined,
                        'Missing value already reported',
                    )
            }
        } else {
            valueNode = this.visitValue(valueContext) as TValueLiteral
        }

        debugPrint('visitMember(..): valueNode:')
        if (isDebug()) {
            printObject(valueNode)
        }

        if (!valueNode) {
            // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
            this.errorHandler!.pushOrBail(
                toErrorLocation(ctx),
                'Syntax-Error',
                'Invalid value',
                `Invalid value for key '${resultKey}' in member (<key> = <value> pair).`,
                `Got '${rawValue}', but expected a valid value/literal (string, number, boolean, null, list, or object). Optionally with a single leading minus sign '-'.`,
            )
        } else if (
            valueNode.type === 'Undefined' &&
            valueNode.tag !== 'Invalid string literal already reported' &&
            valueNode.tag !== 'Missing value already reported' &&
            valueNode.tag !== 'Parser syntax error already reported'
        ) {
            // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
            this.errorHandler!.pushOrBail(
                toErrorLocation(ctx),
                'Syntax-Error',
                'Invalid value',
                `Invalid value for key '${resultKey}' in member (<key> = <value> pair).`,
                `Got '${rawValue}', but expected a valid value/literal (string, number, boolean, null, list, or object). Optionally with a single leading minus sign '-'.`,
            )
        }

        // It keeps the sentinel tags useful for control flow inside visitMember(..),
        // but prevents them from leaking into the final parsed structure.
        const current = this.sectionStack[this.sectionStack.length - 1]
        const shouldSkipMemberInsertion =
            valueNode?.type === 'Undefined' &&
            (valueNode.tag === 'Invalid string literal already reported' ||
                valueNode.tag === 'Missing value already reported' ||
                valueNode.tag === 'Parser syntax error already reported')

        if (!shouldSkipMemberInsertion && valueNode !== undefined) {
            this.putMember(
                this.errorHandler!,
                ctx,
                current,
                resultKey,
                valueNode,
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
    visitValue = (ctx: ValueContext): any => {
        debugPrint('----------------------------')
        debugPrint('-> Entered visitValue(..)')

        let valueNode: TValueLiteral | undefined = undefined

        if (ctx.concat_expression()) {
            debugPrint('  visiting visitConcat_expression(..)')
            valueNode = this.visitConcat_expression(
                ctx.concat_expression()!,
            ) as TValueLiteral
        } else if (ctx.scalar_value()) {
            debugPrint('  visiting visitScalar_value(..)')
            valueNode = this.visitScalar_value(
                ctx.scalar_value()!,
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
     * Visit a parse tree produced by `YiniParser.scalar_value`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitScalar_value = (ctx: Scalar_valueContext): any => {
        debugPrint('-> Entered visitScalar_value(..)')

        if (ctx.string_literal()) {
            return this.visitString_literal(ctx.string_literal()!)
        }

        if (ctx.number_literal()) {
            return this.visitNumber_literal(ctx.number_literal()!)
        }

        if (ctx.boolean_literal()) {
            return this.visitBoolean_literal(ctx.boolean_literal()!)
        }

        if (ctx.null_literal()) {
            return this.visitNull_literal(ctx.null_literal()!)
        }

        return makeScalarValue('Undefined', undefined, 'Invalid scalar value')
    }

    /**
     * Visit a parse tree produced by `YiniParser.concat_expression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitConcat_expression = (ctx: Concat_expressionContext): any => {
        debugPrint('-> Entered visitConcat_expression(..)')

        const firstToken = ctx.STRING()

        if (!firstToken) {
            this.errorHandler!.pushOrBail(
                toErrorLocation(ctx),
                'Syntax-Error',
                'Invalid string concatenation',
                'A concatenation expression must begin with a string literal.',
                'Start the expression with a string literal, for example: "prefix" + value.',
            )

            return makeScalarValue(
                'Undefined',
                undefined,
                'Invalid concatenation already reported',
            )
        }

        const firstValue = this.parseStringToken(firstToken.getText(), ctx)

        if (!firstValue || firstValue.type !== 'String') {
            return makeScalarValue(
                'Undefined',
                undefined,
                'Invalid string literal already reported',
            )
        }

        let result = firstValue.value

        for (const tail of ctx.concat_tail_list()) {
            const operandValue = this.visitConcat_tail(tail) as TScalarValue

            if (!operandValue || operandValue.type === 'Undefined') {
                return makeScalarValue(
                    'Undefined',
                    undefined,
                    'Invalid concatenation operand already reported',
                )
            }

            result += this.stringifyConcatOperand(operandValue)
        }

        return makeScalarValue('String', result, 'Concatenated string')
    }

    /**
     * Visit a parse tree produced by `YiniParser.concat_tail`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitConcat_tail = (ctx: Concat_tailContext): any => {
        debugPrint('-> Entered visitConcat_tail(..)')

        const operandCtx = ctx.concat_operand()

        if (!operandCtx) {
            this.errorHandler!.pushOrBail(
                toErrorLocation(ctx),
                'Syntax-Error',
                'Missing concatenation operand',
                'Expected a value after the + operator.',
                'Add a string literal, number, boolean, or null after +.',
            )

            return makeScalarValue(
                'Undefined',
                undefined,
                'Missing concatenation operand already reported',
            )
        }

        return this.visitConcat_operand(operandCtx)
    }

    /**
     * Visit a parse tree produced by `YiniParser.concat_operand`.
     *
     * @note Must use token accessors, not literal visitors.
     *       Use STRING() instead of string_literal(), etc.
     *
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitConcat_operand = (ctx: Concat_operandContext): any => {
        debugPrint('-> Entered visitConcat_operand(..)')

        if (ctx.STRING()) {
            return this.parseStringToken(ctx.STRING().getText(), ctx)
        }

        if (ctx.NUMBER()) {
            const parsedNum = parseNumberLiteral(ctx.NUMBER().getText())

            if (
                parsedNum?.value !== 0 &&
                (!parsedNum?.value ||
                    isNaNValue(parsedNum.value) ||
                    isInfinityValue(parsedNum.value))
            ) {
                return makeScalarValue(
                    'Undefined',
                    undefined,
                    parsedNum?.tag ?? 'Invalid number literal',
                )
            }

            if (this.isStrict) {
                this.errorHandler!.pushOrBail(
                    toErrorLocation(ctx),
                    'Syntax-Error',
                    'Invalid strict-mode concatenation operand',
                    'Number literals are not allowed as concatenation operands in strict mode.',
                    'Use an explicit string literal instead.',
                )

                return makeScalarValue(
                    'Undefined',
                    undefined,
                    'Invalid strict concatenation operand already reported',
                )
            }

            return makeScalarValue('Number', parsedNum.value, parsedNum.tag)
        }

        if (ctx.BOOLEAN_TRUE() || ctx.BOOLEAN_FALSE()) {
            if (this.isStrict) {
                this.errorHandler!.pushOrBail(
                    toErrorLocation(ctx),
                    'Syntax-Error',
                    'Invalid strict-mode concatenation operand',
                    'Boolean literals are not allowed as concatenation operands in strict mode.',
                    'Use an explicit string literal instead.',
                )

                return makeScalarValue(
                    'Undefined',
                    undefined,
                    'Invalid strict concatenation operand already reported',
                )
            }

            return makeScalarValue('Boolean', parseBoolean(ctx.getText()))
        }

        if (ctx.NULL()) {
            if (this.isStrict) {
                this.errorHandler!.pushOrBail(
                    toErrorLocation(ctx),
                    'Syntax-Error',
                    'Invalid strict-mode concatenation operand',
                    'Null literals are not allowed as concatenation operands in strict mode.',
                    'Use an explicit string literal instead.',
                )

                return makeScalarValue(
                    'Undefined',
                    undefined,
                    'Invalid strict concatenation operand already reported',
                )
            }

            return makeScalarValue('Null', null, 'Explicit Null')
        }

        this.errorHandler!.pushOrBail(
            toErrorLocation(ctx),
            'Syntax-Error',
            'Invalid concatenation operand',
            `Got '${ctx.getText()}', but expected a string literal, number literal, boolean literal, or null literal.`,
            'Lists and inline objects cannot be used as concatenation operands.',
        )

        return makeScalarValue(
            'Undefined',
            undefined,
            'Invalid concatenation operand already reported',
        )
    }

    /*
     * Visit a parse tree produced by `YiniParser.visitString_literal`.
     * @note Should parse exactly one string literal. No concatenation logic here.
     *
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitString_literal = (ctx: String_literalContext): any => {
        //     const rawText = ctx.getText()
        //     const parsed = this.extractStringKindAndValue(rawText)

        //     try {
        //         const value = parseStringLiteral(parsed)
        //         return makeScalarValue('String', value)
        //     } catch (err: unknown) {
        //         const msg = err instanceof Error ? err.message : String(err)

        //         let msgWhat = 'Parse error in string'
        //         let msgWhy = msg
        //         let msgHint = ''

        //         if (err instanceof CYiniStringParseError) {
        //             if (/Invalid escape sequence/i.test(msg)) {
        //                 msgWhat = 'Invalid escape sequence in string'
        //                 msgHint =
        //                     'Use double backslashes (\\\\) in C-strings, or use a raw string if escapes are not needed.'
        //             } else if (/end of string/i.test(msg)) {
        //                 msgWhat = 'Incomplete escape sequence in string'
        //                 msgHint =
        //                     'Check that all escape sequences in the C-string are complete and valid.'
        //             }
        //         }

        //         this.errorHandler!.pushOrBail(
        //             toErrorLocation(ctx),
        //             'Syntax-Error',
        //             msgWhat,
        //             msgWhy,
        //             msgHint,
        //         )

        //         return makeScalarValue(
        //             'Undefined',
        //             undefined,
        //             'Invalid string literal already reported',
        //         )
        //     }
        // }
        return this.parseStringToken(ctx.STRING().getText(), ctx)
    }

    /**
     * Visit a parse tree produced by `YiniParser.number_literal`.
     * @param ctx the parse tree
     * @return the visitor result
     */
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
        // debugPrint('raw = ' + ctx.getText())
        // return makeScalarValue('Null', null, 'Explicit Null')
        const raw = ctx.getText()
        debugPrint('raw:    "' + raw + '"')
        const parsed = parseNullLiteral(raw)
        debugPrint('parsed: "' + parsed + '"')
        // Case-insensitive true/false/on/off/yes/no (Spec section, 8.1).
        return makeScalarValue('Null', parsed, 'Explicit Null')
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
                          toErrorLocation(ctx),
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

        // const entries: Array<{ k: string; v: TValueLiteral }> = []
        const entries: Record<string, TValueLiteral> = {}
        ctx.object_member_list().forEach((member) => {
            const { key, value }: any = this.visitObject_member(member)

            debugPrint('   key = ' + key)
            if (!value || value.type === 'Undefined') {
                debugPrint('Skip inserting Undefined')
                return
            }

            entries[key] = value
        })

        debugPrint('<- About to exit visitObject_members(..)')
        return entries
    }

    /**
     * Visit a parse tree produced by `YiniParser.object_member`.
     * @param ctx the parse tree
     * @grammarRule KEY object_member_separator NL* value
     * @return the object member key and value
     */
    visitObject_member = (ctx: Object_memberContext): any => {
        debugPrint('-> Entered visitObject_member(..)')

        const rawKey = ctx.KEY().getText()
        const key = trimBackticks(rawKey)

        const separator = this.visitObject_member_separator(
            ctx.object_member_separator(),
        )

        if (separator === '=' && this.isStrict) {
            this.errorHandler!.pushOrBail(
                toErrorLocation(ctx.object_member_separator()),
                'Syntax-Error',
                "Invalid inline object member separator '=' in strict mode",
                "Inside inline objects, members must use ':' in strict mode.",
                `Use '${key}: <value>' instead of '${key} = <value>'.`,
            )

            return {
                key,
                value: makeScalarValue(
                    'Undefined',
                    undefined,
                    'Invalid object member separator already reported',
                ),
                separator,
            }
        }

        const valueCtx = ctx.value()
        const rawValue = valueCtx?.getText() ?? ''

        const valueNode: TValueLiteral = valueCtx
            ? this.visitValue(valueCtx)
            : makeScalarValue(
                  'Undefined',
                  undefined,
                  'Missing object member value',
              )

        debugPrint('  rawKey = ' + rawKey)
        debugPrint('     key = ' + key)
        debugPrint('separator = ' + separator)
        debugPrint('rawValue = ' + rawValue)

        if (!valueNode) {
            this.errorHandler!.pushOrBail(
                toErrorLocation(ctx),
                'Syntax-Error',
                'Invalid object entry',
                `Invalid object entry for key '${key}'.`,
                `Got '${rawValue}', but expected a valid value/literal (string, number, boolean, null, list, or object). Optionally with a single leading minus sign '-'.`,
            )
        }

        debugPrint('<- About to exit visitObject_member(..)')
        if (isDebug()) {
            console.log('Returning:')
            printObject({ key, value: valueNode, separator })
        }

        return { key, value: valueNode, separator }
    }

    /**
     * Visit a parse tree produced by `YiniParser.object_member_separator`.
     * @param ctx the parse tree
     * @grammarRule COLON | EQ
     * @return ':' or '='
     */
    visitObject_member_separator = (
        ctx: Object_member_separatorContext,
    ): any => {
        const sep = ctx.getText()

        if (sep === ':' || sep === '=') {
            return sep
        }

        this.errorHandler!.pushOrBail(
            toErrorLocation(ctx),
            'Syntax-Error',
            'Invalid inline object member separator',
            `Got '${sep}', but expected ':' or '='.`,
            "Use ':' for canonical inline object members. In lenient mode only, '=' may also be accepted.",
        )

        return ':'
    }

    //@ todo (?) Check that this function actually works, not sure this function is finished.
    // visitString_concat = (ctx: String_concatContext): any => {
    //     const rawText = ctx.STRING().getText()
    //     const parsedInput = this.extractStringKindAndValue(rawText)

    //     try {
    //         return parseStringLiteral(parsedInput)
    //     } catch (err: unknown) {
    //         const msg = err instanceof Error ? err.message : String(err)

    //         // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
    //         this.errorHandler!.pushOrBail(
    //             toErrorLocation(ctx),
    //             'Syntax-Error',
    //             'Parse error in string',
    //             msg,
    //         )

    //         return undefined
    //     }
    // }

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
            toErrorLocation(ctx),
            'Syntax-Error',
            'Invalid or malformed member (key-value pair) found.',
            `Offending text: ${ctx?.getText()?.trim()}`,
            'Members must have the form: <key> = <value>, where <key> is a name/identifier and <value> is a value/literal.',
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
            toErrorLocation(ctx),
            'Syntax-Error',
            'Invalid or malformed directive or annotation statement',
            `Offending statement: ${ctx?.getText()?.trim()}`,
        )
        return null
    }
}
