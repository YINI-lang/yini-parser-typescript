import { ParseTreeVisitor } from 'antlr4'
import { isDebug } from './config/env'
import {
    Boolean_literalContext,
    ElementContext,
    ElementsContext,
    List_in_bracketsContext,
    ListContext,
    Member_colon_listContext,
    MemberContext,
    Null_literalContext,
    Number_literalContext,
    Object_literalContext,
    ObjectMemberContext,
    ObjectMemberListContext,
    Section_membersContext,
    SectionContext,
    String_concatContext,
    String_literalContext,
    Terminal_lineContext,
    ValueContext,
    YiniContext,
} from './grammar/YiniParser.js'
import YiniParserVisitor from './grammar/YiniParserVisitor'
import { InvalidDataHandler } from './InvalidDataHandler'
import parseBooleanLiteral from './main-literal-parsers/parseBoolean'
import parseNullLiteral from './main-literal-parsers/parseNull'
import parseNumberLiteral from './main-literal-parsers/parseNumber'
import parseStringLiteral from './main-literal-parsers/parseString'
import { stripNLAndAfter, trimBackticks } from './utils/string'
import { debugPrint } from './utils/system'

const SECTION_MARKER1 = '^'
const SECTION_MARKER2 = '~'

interface YiniDocument {
    // sections: Record<string, any>
    _base: Record<string, any>
    // terminal?: string
    _hasTerminal?: boolean
}

export type TDataType =
    | undefined
    | 'String'
    | 'Number-Integer'
    | 'Number-Float'
    | 'Boolean'
    | 'Null'
    | 'Object'
    | 'List'
/*
class CIResult {
    private dataType: TDataType = undefined
    private valueBool: boolean | undefined = undefined

    //constructor() {}
    getType = (): TDataType => this.dataType

    makeBoolean = (isTrue: boolean) => {
        this.dataType = 'Boolean'
        this.valueBool = isTrue
    }
}
*/

interface YIResult {
    key: string
    type: TDataType
    value: any
}

/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `YiniParser`.
 *
 * @param <IResult> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export default class YINIVisitor<IResult> extends YiniParserVisitor<IResult> {
    //export default class YINIVisitor extends YiniParserVisitor<any> {

    private instanceInvalidData: InvalidDataHandler | null = null
    //private activeParents: any[] = []
    // private activeLevelSections: any[] = []
    // private lastActiveSectionAtLevels: string[] = []
    private lastActiveSectionTitlesAtLevels: string[] = [] // Last active section name at each level.
    private lastActiveSectionAtLevels: any[] = []

    private numOfLevelOnes = 0 // Num of Level-1 sections.
    private level = 0
    private prevLevel = 0
    private lastBuiltSectionObject: any = null
    private danglingTitle: string = ''

    private meta_numOfSections = 0 // For stats.
    private meta_maxLevelSection = 0 // For stats.

    private resultSections: Record<string, any> = {}

    mountSection = (
        level: number,
        sectionName: string,
        sectionMembers: any,
    ) => {
        if (!sectionName) {
            this.instanceInvalidData!.pushOrBail(
                null,
                'Internal-Error',
                'Invalid sectionName: ' + sectionName,
            )
        }

        let mountAt = this.lastActiveSectionAtLevels[level - 1]
        if (!mountAt) {
            mountAt = this.resultSections
        }

        if (sectionMembers && Object.keys(sectionMembers).length === 0) {
            debugPrint('HITTTT2')
            mountAt[sectionName] = { dummy: undefined }
        } else {
            mountAt[sectionName] = sectionMembers
        }

        this.lastActiveSectionAtLevels[level] = mountAt[sectionName]
    }

    // getLevelsDepth = (): number => {
    getDepthOfLevels = (): number => {
        return this.lastActiveSectionTitlesAtLevels.length
    }
    setLastActiveSection = (atLevel: number, sectionName: string) => {
        if (atLevel >= 1) {
            this.lastActiveSectionTitlesAtLevels[atLevel - 1] = sectionName
        } else {
            this.instanceInvalidData!.pushOrBail(
                null,
                'Internal-Error',
                'Invalid section level (<1), level: ' +
                    atLevel +
                    ', sectionName: "' +
                    sectionName +
                    '"',
            )
        }
    }

    /**
     * Visit a parse tree produced by `YiniParser.yini`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    // visitYini?: (ctx: YiniContext) => IResult;
    // visitYini = (ctx: YiniContext): IResult => {
    visitYini = (ctx: YiniContext): any => {
        this.instanceInvalidData =
            InvalidDataHandler.getInstance('1-Abort-on-Errors')
        debugPrint()
        debugPrint('abcde99')
        debugPrint('-> Entered visitYini(..) in YINIVisitor')
        debugPrint('QQQQ')

        // const resultSections: Record<string, any> = {}

        ctx.section_list()?.forEach((section: any) => {
            // ctx?.section_list()?.forEach((section: any) => {
            debugPrint(
                '\nStart of each element in forEeach(..) of section_list():',
            )

            // const value = section.accept(this)
            // debugPrint(
            //     'In forEach, got child = ' + section + ', got value = ' + value,
            // )

            // const sectionResult: any = this.visit(section)
            const sectionResult: any = this.visitSection(section)
            const sectionName: string | undefined = sectionResult?.name
            const sectionMembers: any = sectionResult?.members

            debugPrint('\nsectionResult:')
            if (isDebug()) {
                console.log(sectionResult)
            }

            debugPrint('sectionName = "' + sectionName + '"')
            sectionResult?.members &&
                debugPrint(
                    'Num of Props of sectionResult?.members: ' +
                        Object.keys(sectionResult?.members).length,
                )
            debugPrint('sectionMembers:')
            if (isDebug()) {
                console.log(sectionMembers)
            }

            if (sectionName) {
                let nestDirection: 'lower' | 'same' | 'higher'
                if (this.level === this.prevLevel) {
                    nestDirection = 'same'
                } else if (this.level < this.prevLevel) {
                    nestDirection = 'lower'
                } else {
                    nestDirection = 'higher'
                }
                this.prevLevel = this.level
                debugPrint()
                debugPrint(
                    '-- Above to build and mount new section ---------------------------',
                )
                debugPrint('            sectionName = ' + sectionName)
                debugPrint('             this.level = ' + this.level)
                debugPrint('         this.prevLevel = ' + this.prevLevel)
                debugPrint('          nestDirection = ' + nestDirection)
                debugPrint('    this.numOfLevelOnes = ' + this.numOfLevelOnes)
                debugPrint(
                    'this.getDepthOfLevels() = ' + this.getDepthOfLevels(),
                )
                debugPrint()

                if (nestDirection === 'higher') {
                    // this.lastBuiltSectionObject.push(resultSections)
                    if (isDebug()) {
                        debugPrint('this.lastBuiltSectionObject:')
                        console.log(this.lastBuiltSectionObject)
                    }

                    // if (!this.lastBuiltSectionObject) {
                    //     resultSections[sectionName] = sectionMembers
                    // } else {
                    //     this.lastBuiltSectionObject[sectionName] =
                    //         sectionMembers
                    // }
                }

                if (this.danglingTitle) {
                    debugPrint(
                        'Detected a dangling section "' +
                            this.danglingTitle +
                            '"',
                    )
                }

                /*
                let mountAt = this.lastActiveSectionAtLevels[this.level - 1]
                if (!mountAt) {
                    mountAt = this.resultSections
                }

                if (Object.keys(sectionResult?.members).length === 0) {
                    debugPrint('HITTTT')
                    //mountAt[sectionName] = { dummy: undefined }
                } else {
                    mountAt[sectionName] = sectionMembers
                }

                this.lastActiveSectionAtLevels[this.level] =
                    mountAt[sectionName]
                */
                this.mountSection(this.level, sectionName, sectionMembers)

                // resultSections[sectionName] = sectionMembers
                // this.lastActiveSectionAtLevels[this.level] =
                //     resultSections[sectionName]
                // this.lastBuiltSectionObject = resultSections[sectionName]
                // this.lastActiveSectionAtLevels[this.level] =
                //     resultSections[sectionName]
                debugPrint(
                    '*** Attached section with name "' + sectionName + '"',
                )
            }

            debugPrint(
                '\n=== resultSections: =====================================',
            )
            if (isDebug()) {
                console.log(this.resultSections)
            }
            debugPrint('==============================================\n')
            debugPrint('End of each element in forEeach(..) of section_list().')
            debugPrint()
        })

        const hasTerminal = !!ctx.terminal_line()
        return { _base: this.resultSections, _hasTerminal: hasTerminal }
    }

    /**
     * Visit a parse tree produced by `YiniParser.section`.
     * @param ctx the parse tree
     * @returns { [sectionName]: sectionObj }
     */
    // visitSection?: (ctx: SectionContext) => IResult;

    visitSection = (ctx: SectionContext): any => {
        debugPrint()
        debugPrint('-> Entered visitSection(..)')

        const res: Record<string, any> = {}

        debugPrint('start')
        debugPrint('XXXX1:ctx.SECTION_HEAD() = ' + ctx.SECTION_HEAD())
        debugPrint('XXXX2:     ctx.section():')
        // if (isDebug()) {
        //     ctx.section()
        // }
        // debugPrint('XXXX3: = ' + ctx.getChildCount())
        // debugPrint('XXXX4: = ' + ctx.ruleContext)
        // debugPrint('XXXX5: = ' + ctx.section_members.name)

        // ctx.children?.forEach((child: any) => {
        //     debugPrint('child in section:' + child)
        // })

        debugPrint('end\n')

        let line: string = ''
        try {
            line = '' + ctx.SECTION_HEAD().getText().trim()
        } catch (error) {
            const msg: string = `Unexpected syntax while parsing a section head (section marker or section title)`
            this.instanceInvalidData!.pushOrBail(ctx, 'Syntax-Error', msg)
        }

        // --- Determine nesting level. ---------
        const lineLen: number = line.length
        this.level = 0

        for (let pos = 0; pos < lineLen; pos++) {
            if (
                line.charAt(pos) === SECTION_MARKER1 ||
                line.charAt(pos) === SECTION_MARKER2
            ) {
                this.level++
            } else {
                break
            }
        }
        debugPrint('this.level = ' + this.level)
        // ------------------------------------

        // --- Extract section name after markers and whitespace. ---------
        let subLine: string = line.substring(this.level)
        let isDone = false
        do {
            if (subLine.startsWith(' ') || subLine.startsWith('\t')) {
                subLine = subLine.substring(1) // Consume left most character.
                debugPrint('* consumed left most char!!')
            } else {
                isDone = true
            }
        } while (!isDone)

        // NOTE: Any comments on next line after the section header, are included in subLine.
        let sectionName: string = subLine.trim()
        sectionName = stripNLAndAfter(sectionName) // Cut of anything after (and including) any newline (and possible commented next lines).
        sectionName = trimBackticks(sectionName)

        debugPrint('                        --------------')
        debugPrint(
            `           Parsed subLine = >>>${subLine.trim()}<<<, with this.level = ${this.level}`,
        )
        debugPrint(
            `Strip/trimmed sectionName = >>>${sectionName}<<<, with this.level = ${this.level}`,
        )
        debugPrint('                        --------------')
        // ---------------------------------------------------------------

        // if (!ctx.section_members()) {
        //     debugPrint('(!) Section has no members!')
        //     // this.lastActiveSectionAtLevels[this.level - 1] = { sdf: 354 }
        //     this.danglingTitle = sectionName
        // } else {
        //     this.danglingTitle = ''
        // }

        debugPrint('About to visit members of section...')
        // const members = ctx.section_members()
        //     ? this.visit(ctx.section_members())
        //     : // : {}
        //       this.visit(ctx.section())
        let members: any

        if (!ctx.section_members()) {
            debugPrint('(!) Section has no members!')
            this.danglingTitle = sectionName
        } else {
            this.danglingTitle = ''
            members = this.visitSection_members(ctx.section_members())
        }

        // if (ctx.section()) {
        // Has no members!
        // this.visit(ctx.section())
        // const dummyMember: Record<string, any> = {}
        // dummyMember['dummy'] = 999
        // const dummyMember = { dummy: 999 }
        // members = dummyMember
        // this.mountSection(this.level, sectionName, dummyMember)
        // // this.prevLevel++
        // // this.level++
        // debugPrint(
        //     '\n=== resultSections after mounting of memberless section: =====================================',
        // )
        // if (isDebug()) {
        //     console.log(this.resultSections)
        // }
        // this.visit(ctx.section())
        // Handle nested sections (recursively)
        // Below does not seem to work!!
        // ctx?.section_list?.()?.forEach((section: any) => {
        // for (let section of mCtx.section?.() ?? []) {
        //     debugPrint(
        //         '(!) Detected that this is a memberless section, section title: ' +
        //             sectionName,
        //     )

        //     debugPrint('getDepthOfLevels = ' + this.getDepthOfLevels())
        //     const nested = this.visitSection(ctx.section())
        //     // Object.assign(members, nested)
        //     this.mountSection(this.level, sectionName, nested)
        //     debugPrint('getDepthOfLevels = ' + this.getDepthOfLevels())
        // }

        // members = !sCtx.section_members()
        //     ? null
        //     : this.visitSection_members(sCtx.section_members())

        // ----------------

        // (?) traverse nested section
        // yCtx?.section_list()?.forEach((section: any) => {
        //     // ctx?.section_list()?.forEach((section: any) => {
        //     debugPrint(
        //         '\n(!) Detected nested section (yCtx.section_list() item):' +
        //             section,
        //     )
        // })

        // ---------------------------------------------------------------
        ctx.children?.forEach((child: any) => {
            debugPrint('* child: ' + child)
        })

        let nestDirection: 'lower' | 'same' | 'higher'
        if (this.level === this.prevLevel) {
            nestDirection = 'same'
        } else if (this.level < this.prevLevel) {
            nestDirection = 'lower'
        } else {
            nestDirection = 'higher'
        }

        if (this.level === 1) {
            this.numOfLevelOnes++
        }

        // debugPrint('-- Above entity ---------------------------')
        // debugPrint('            sectionName = ' + sectionName)
        // debugPrint('             this.level = ' + this.level)
        // debugPrint('         this.prevLevel = ' + this.prevLevel)
        // debugPrint('          nestDirection = ' + nestDirection)
        // debugPrint('    this.numOfLevelOnes = ' + this.numOfLevelOnes)
        // debugPrint('this.getDepthOfLevels() = ' + this.getDepthOfLevels())
        // debugPrint()
        //this.setLastActiveSection(0, 'sdf')

        if (this.level - 1 <= this.getDepthOfLevels()) {
            //this.lastActiveSectionTitlesAtLevels[this.level - 1] = sectionName
            this.setLastActiveSection(this.level, sectionName)
            // this.lastActiveSectionAtLevels =
        } else {
            //throw new Error('qqqqq')
            // this.instanceInvalidData!.pushOrBail(
            //     ctx,
            //     'Syntax-Error',
            //     'Invalid section level of section header "' + sectionName + '"',
            //     'Missing a section with level 1. Section header name "' +
            //         sectionName +
            //         '" with level ' +
            //         this.level +
            //         ' may not jump over previous section levels.',
            // )
        }

        /*
        if (Math.abs(this.prevLevel - this.level) >= 2) {
            this.instanceInvalidData!.pushOrBail(
                ctx,
                'Syntax-Error',
                'Invalid section level jump of section header "' +
                    sectionName +
                    '"',
                'Section header name "' +
                    sectionName +
                    '" with level ' +
                    this.level +
                    ' may not jump over previous section levels, from secton with level ' +
                    this.prevLevel +
                    '.',
            )
        }
*/
        // this.prevLevel = this.level
        return { name: sectionName, members }
    }

    /**
     * Visit a parse tree produced by `YiniParser.terminal_line`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTerminal_line?: (ctx: Terminal_lineContext) => IResult

    /**
     * Visit a parse tree produced by `YiniParser.section_members`.
     * @param ctx the parse tree
     * @returns { key: value, ... }
     */
    // visitSection_members = (ctx: Section_membersContext): Record<string, any> => {
    // visitSection_members = (ctx: Section_membersContext): any => {
    visitSection_members = (ctx: Section_membersContext): any => {
        // visitSection_members = (
        //     ctx: Section_membersContext | MemberContext,
        // ): any => {
        debugPrint('-> Entered visitSection_members(..)')

        // const sCtx: Section_membersContext = ctx as Section_membersContext
        // const mCtx: MemberContext = ctx as MemberContext

        const members: Record<string, any> = {}

        ctx.member_list().forEach((member) => {
            const { key, value }: any = this.visitMember(member)
            debugPrint('* Item of member_list:')
            if (isDebug()) {
                console.log(value)
            }
            debugPrint('key = >>>' + key + '<<<')
            debugPrint('value = >>>' + value + '<<<')
            debugPrint('value?.value = >>>' + value?.value + '<<<')
            debugPrint('value?.type = >>>' + value?.type + '<<<')
            debugPrint('value[key] = >>>' + value[key] + '<<<')
            debugPrint('--')

            if (members[key] !== undefined) {
                this.instanceInvalidData!.pushOrBail(
                    ctx,
                    'Syntax-Error',
                    'Key already exists in this section scope (in this main section), key name: ' +
                        key,
                )
            } else {
                // members[key] = value
                if ((value?.type as TDataType) === 'Null') {
                    members[key] = null
                } else {
                    // NOTE: (!) Only if nested section.
                    Object.assign(members, { [key]: value[key] })

                    // Otherwise, if append section, do the below:
                    Object.assign(this.resultSections, { [key]: value[key] })
                }
            }
        })

        //@todo handle member colon list
        // ctx..member_colon_list().forEach((mcl) => {
        //     const { key, value } = this.visit(mcl)
        //     members[key] = value
        // })

        // const line = '' + mCtx.SECTION_HEAD().getText().trim()
        // if (line) {
        //     debugPrint('222 Found section head instead: ' + line)
        //     // if (ctx.section?.()) {
        //     //     debugPrint(
        //     //         '(!) 22Detected that this is a memberless section, section title: ',
        //     //     )

        //     const sectionObj = this.visitSection(mCtx)
        //     Object.assign(members, sectionObj)
        // }

        return members
    }

    /**
     * Visit a single key=value or key=[...] member.
     * @returns { key, value }
     */
    // visitMember?: (ctx: MemberContext) => IResult;
    visitMember = (ctx: MemberContext) => {
        debugPrint('-> Entered visitMember(..)')
        debugPrint('key   = ' + ctx.KEY()?.getText())
        debugPrint('ctx.value() = ' + ctx.value())

        let key: string = ''
        let anotherSection: any = null
        try {
            key = ctx.KEY().getText()
        } catch (error) {
            debugPrint('in catch..')
            const line = '' + ctx.SECTION_HEAD().getText().trim()
            debugPrint('(!) Detected a section head instead: ' + line)
            // const msg: string = `Unexpected syntax while parsing a member (key-value pair)`
            // this.instanceInvalidData!.pushOrBail(ctx, 'Syntax-Error', msg)

            anotherSection = this.visitSection(ctx)
            //  Object.assign(members, sectionObj)
        }

        let value = ctx.value() ? this.visitValue(ctx.value()) : null
        debugPrint('value = ' + value + '  @visitMember(..)')

        if (!value) value = {}

        if (anotherSection) {
            debugPrint('Has constructed a following section, mounting...')
            // Object.assign(value, { dummy: 6767 })
            value[anotherSection?.name] = anotherSection?.members
            key = anotherSection!.name
            //this.mountSection(this.level + 1, 'dummy', anotherSection)
        }

        debugPrint('\nConstructed value (for key: ' + key + '):')
        if (isDebug()) {
            console.log(value)
        }

        // return { key, value } as IResult
        // return { key, value, type: 'Integer' } as IResult

        //@todo if a section, use the section key as key, its members
        // as value, and return as section
        // the function receiving this must know this is a section!!!
        return { key, value } as IResult
    }

    /**
     * Visit a parse tree produced by `YiniParser.member_colon_list`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    //visitMember_colon_list?: (ctx: Member_colon_listContext) => IResult
    visitMember_colon_list = (ctx: Member_colon_listContext): IResult => {
        debugPrint('-> Entered visitMember_colon_list(..)')

        const key = ctx.KEY().getText()
        const values = this.visit(ctx.elements())
        return { key, value: values } as IResult
    }

    /**
     * Visit a parse tree produced by `YiniParser.value`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    // visitValue?: (ctx: ValueContext) => IResult
    visitValue = (ctx: ValueContext): any => {
        debugPrint('-> Entered visitValue(..)')

        debugPrint('ctx.number_literal(): ' + ctx.number_literal())
        debugPrint('ctx.boolean_literal(): ' + ctx.boolean_literal())

        if (ctx.string_literal()) return this.visit(ctx.string_literal())
        if (ctx.number_literal()) return this.visit(ctx.number_literal())
        if (ctx.boolean_literal()) return this.visit(ctx.boolean_literal())
        if (ctx.null_literal()) return this.visit(ctx.null_literal())
        if (ctx.object_literal()) return this.visit(ctx.object_literal())
        //   if (ctx.list()) return this.visit(ctx.list())
        //   if (ctx.string_concat()) return this.visit(ctx.string_concat())
        return null
    }

    /**
     * Visit a parse tree produced by `YiniParser.string_literal`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    // visitString_literal?: (ctx: String_literalContext) => Result
    visitString_literal = (ctx: String_literalContext): IResult => {
        debugPrint('-> Entered visitString_literal(..)')

        // @todo TODO: Move the parsing of raw into a file into literal-parsers/
        const raw = ctx.getText()
        debugPrint('raw = >>>' + raw + '<<<')

        const value: string = parseStringLiteral(raw)

        return { type: 'String', value } as IResult
    }

    /**
     * Visit a parse tree produced by `YiniParser.number_literal`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    // visitNumber_literal?: (ctx: Number_literalContext) => IResult
    visitNumber_literal = (ctx: Number_literalContext): IResult => {
        debugPrint('-> Entered visitNumber_literal(..)')

        const txt = ctx.getText()
        const { type, value } = parseNumberLiteral(txt)

        return { type, value } as IResult
    }

    /**
     * Visit a parse tree produced by `YiniParser.boolean_literal`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    //visitBoolean_literal?: (ctx: Boolean_literalContext) => IResult
    visitBoolean_literal = (ctx: Boolean_literalContext): IResult => {
        debugPrint('-> Entered visitBoolean_literal(..)')

        const txt = ctx.getText().toLowerCase()
        // return ['true', 'yes', 'on'].includes(text) as IResult
        const value: boolean = parseBooleanLiteral(txt)

        return { type: 'Boolean', value } as IResult
    }

    /**
     * Visit a parse tree produced by `YiniParser.null_literal`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitNull_literal = (ctx: Null_literalContext): IResult => {
        debugPrint('-> Entered visitNull_literal(..)')
        const txt = ctx.getText()
        const value: null = parseNullLiteral(txt)

        return { type: 'Null', value } as IResult
    }

    /**
     * Visit a parse tree produced by `YiniParser.object_literal`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    // visitObject_literal?: (ctx: Object_literalContext) => IResult
    visitObject_literal = (ctx: Object_literalContext): IResult => {
        const members = ctx.objectMemberList()
            ? this.visit(ctx.objectMemberList())
            : {}
        return { type: 'Object', value: members } as IResult
    }

    /**
     * Visit a parse tree produced by `YiniParser.objectMemberList`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    //visitObjectMemberList?: (ctx: ObjectMemberListContext) => IResult
    visitObjectMemberList = (ctx: ObjectMemberListContext): IResult => {
        const obj: Record<string, any> = {}
        ctx.objectMember_list().forEach((member) => {
            const { key, value }: any = this.visit(member)
            obj[key] = value
        })
        return obj as IResult
    }

    /**
     * Visit a parse tree produced by `YiniParser.objectMember`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    // visitObjectMember?: (ctx: ObjectMemberContext) => IResult
    visitObjectMember = (ctx: ObjectMemberContext): IResult => {
        const key = ctx.KEY().getText()
        const value = ctx.value() ? this.visit(ctx.value()) : null
        return { key, value } as IResult
    }

    /**
     * Visit a parse tree produced by `YiniParser.list`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    // visitList?: (ctx: ListContext) => IResult
    visitList = (ctx: ListContext): IResult =>
        this.visit(ctx.list_in_brackets())

    /**
     * Visit a parse tree produced by `YiniParser.list_in_brackets`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    // visitList_in_brackets?: (ctx: List_in_bracketsContext) => IResult
    visitList_in_brackets = (ctx: List_in_bracketsContext): IResult => {
        const elements = ctx.elements() ? this.visit(ctx.elements()) : []
        return { type: 'List', value: elements } as IResult
    }

    /**
     * Visit a parse tree produced by `YiniParser.elements`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitElements?: (ctx: ElementsContext) => IResult

    /**
     * Visit a parse tree produced by `YiniParser.element`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    // visitElement?: (ctx: ElementContext) => IResult
    visitElement = (ctx: ElementContext): IResult => {
        if (ctx.value()) {
            return this.visit(ctx.value())
        } else {
            return { type: 'Null', value: null } as any
        }
    }

    /**
     * Visit a parse tree produced by `YiniParser.string_concat`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitString_concat?: (ctx: String_concatContext) => IResult
}
