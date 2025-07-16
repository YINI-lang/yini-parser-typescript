import assert from 'assert'
import { isDebug } from '../config/env'
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
} from '../grammar/YiniParser.js'
import YiniParserVisitor from '../grammar/YiniParserVisitor'
import { extractYiniLine } from '../parsers/extractSignificantYiniLine'
import parseBooleanLiteral from '../parsers/parseBoolean'
import parseNullLiteral from '../parsers/parseNull'
import parseNumberLiteral from '../parsers/parseNumber'
import parseSectionHeader from '../parsers/parseSectionHeader'
import parseStringLiteral from '../parsers/parseString'
import { isEnclosedInBackticks, trimBackticks } from '../utils/string'
import { debugPrint, printObject } from '../utils/system'
import { isValidBacktickedIdent, isValidSimpleIdent } from '../yiniHelpers'
import { ErrorDataHandler } from './ErrorDataHandler'
import {
    IChainContainer,
    ISectionResult,
    TSyntaxTree,
    TSyntaxTreeContainer,
} from './types'

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

    private reversedTree: TSyntaxTree = []

    private errorHandler: ErrorDataHandler | null = null

    private lastActiveSectionAtLevels: any[] = []
    private lastActiveSectionNameAtLevels: (string | undefined)[] = [] // Last active section name at each level.

    private numOfLevelOnes = 0 // Num of Level-1 sections.
    private level = 0
    private prevLevel = 0
    private prevSectionName = '' // For error reporting purposes.

    private meta_numOfChains = 0 // For stats.
    private meta_numOfSections = 0 // For stats.
    private meta_maxLevelSection = 0 // For stats.

    constructor(errorHandler: ErrorDataHandler) {
        super()
        this.errorHandler = errorHandler
    }

    private pushOnTree = (sReslult: ISectionResult): void => {
        if (isDebug()) {
            console.log()
            debugPrint('--- In pushOnTree(..) --------')
            debugPrint('sReslult:')
            printObject(sReslult)
        }

        // if (
        //     sReslult.level === 0 &&
        //     (!sReslult.name || sReslult.name === 'undefined')
        // ) {
        //     // NOTE: This is a nasty fix, should try to do another way!
        //     debugPrint('HIT, Doing NASTY fix!!')
        //     // A memberless section, e.g. `^ Section` and then input ends.
        //     // Lift up the member in "members" to top.

        //     // --- Get the key-name of the entry in "members" ----------
        //     // "members": {
        //     //     "Title": {}
        //     //  }
        //     const sectionName = Object.keys(sReslult.members)[0]
        //     // ---------------------------------------------------------

        //     debugPrint('sectionName = ' + sectionName)
        //     const chain: IChainContainer = {
        //         originLevel: 1,
        //         chain: { [sectionName]: {} },
        //     }
        //     this.reversedTree.push(chain)
        // } else {

        const chain: IChainContainer = {
            originLevel: sReslult.level,
            chain: { [sReslult.name]: sReslult.members },
        }
        this.reversedTree.push(chain)
        // }
        this.meta_numOfChains++
        debugPrint('this.reversedTree: [list]')
        printObject(this.reversedTree)
        debugPrint('--- /end of pushOnTree(..) --------')
    }

    private getDepthOfLevels = (): number => {
        return this.lastActiveSectionNameAtLevels.length
    }

    private setLastActiveSection = (atLevel: number, sectionName: string) => {
        if (atLevel >= 1) {
            this.lastActiveSectionNameAtLevels[atLevel - 1] = sectionName
        } else {
            // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
            this.errorHandler!.pushOrBail(
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
        if (!this.errorHandler) {
            // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
            new ErrorDataHandler().pushOrBail(
                null,
                'Fatal-Error',
                'Has no ErrorDataHandler instance when calling visitYini(..)',
                'Something in the code is done incorrectly in order for this to happen... :S',
            )
        }

        debugPrint()
        debugPrint('abcde99')
        isDebug() && console.log()
        debugPrint('-> Entered visitYini(..) in YINIVisitor')
        debugPrint('QQQQ')

        ctx.section_list()?.forEach((section: any) => {
            // ctx?.section_list()?.forEach((section: any) => {
            debugPrint(
                '\nStart of each element in forEeach(..) of section_list():',
            )

            const topSectionResult: ISectionResult = this.visitSection(section)
            this.pushOnTree(topSectionResult)
            const topSectionName: string | undefined = topSectionResult?.name
            const topSectionMembers: any = topSectionResult?.members
            const topSectionLevel: any = topSectionResult?.level // This must have a value of 1.

            debugPrint('\ntopSectionResult (visitSection(..)):')
            if (isDebug()) {
                console.log(topSectionResult)
            }

            debugPrint(
                'Found section head, topSectionName = "' + topSectionName + '"',
            )
            topSectionMembers &&
                debugPrint(
                    'Num of Props of topSectionResult?.members: ' +
                        Object.keys(topSectionResult?.members).length,
                )
            debugPrint('topSectionMembers:')
            if (isDebug()) {
                console.log(topSectionMembers)
            }

            if (topSectionName) {
                debugPrint()
                debugPrint(
                    '-- Just extracted TOP/FIRST section info ---------------------------',
                )
                debugPrint('  TOP/FIRST topSectionName = ' + topSectionName)
                debugPrint('           topSectionLevel = ' + topSectionLevel)
                debugPrint('                this.level = ' + this.level)

                debugPrint('Mounted/assigned section onto resultSections...')
            }

            debugPrint(
                '\n=== resultSections: =====================================',
            )
            if (isDebug()) {
                console.log('2222222222222')
                console.log(`lastActiveSectionAtLevels[${this.level - 1}]`)
                printObject(this.lastActiveSectionAtLevels[this.level - 1])
            }
            debugPrint('==============================================\n')
            debugPrint('End of each element in forEeach(..) of section_list().')
            debugPrint()
        })

        const syntaxTree: TSyntaxTree = this.reversedTree.reverse()

        if (false && isDebug()) {
            console.log()
            console.log(
                '=========================================================================',
            )
            console.log(
                '=== syntaxTree: ==========================================================',
            )
            printObject(syntaxTree)
            console.log(
                '=========================================================================',
            )
            console.log(
                '=========================================================================',
            )
            console.log()
        }

        const hasTerminal = !!ctx.terminal_line()

        // Returns an Intermediate Tree (could even be an AST).
        const syntaxTreeC: TSyntaxTreeContainer = {
            // _base: this.resultSections,
            _syntaxTree: syntaxTree, // The Intermediate Tree, or AST.
            _hasTerminal: hasTerminal,
            _meta_numOfChains: this.meta_numOfChains,
        }
        return syntaxTreeC
    }

    /**
     * Will visit here on EVERY section.
     * @param ctx the parse tree
     * @returns { [sectionName]: sectionObj }
     */
    // visitSection?: (ctx: SectionContext) => IResult;
    visitSection = (ctx: SectionContext): any => {
        // let headMarkerType: TSectionHeaderType =
        //     'Classic-Header-Marker'

        isDebug() && console.log()
        debugPrint('-> Entered visitSection(..)')

        const res: Record<string, any> = {}

        debugPrint('start')
        debugPrint('XXXX0:ctx.getText()            = ' + ctx.getText())
        debugPrint('XXXX1:ctx.SECTION_HEAD()       = ' + ctx.SECTION_HEAD())
        debugPrint(
            'XXXX1:SECTION_HEAD().getText() = ' +
                ctx.SECTION_HEAD()?.getText().trim(),
        )
        debugPrint('end\n')

        let line: string = ''
        try {
            debugPrint('S1')
            line = ctx.SECTION_HEAD()?.getText().trim() || ''
            debugPrint('S2, line: >>>' + line + '<<<')
        } catch (error) {
            const msgWhat: string = `Unexpected syntax while parsing a member or section head`
            const msgWhy: string = `Found unexpected syntax while trying to read a key-value pair or a section header (such as a section marker or section name).`

            // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
            this.errorHandler!.pushOrBail(ctx, 'Syntax-Error', msgWhat, msgWhy)
        }

        // If no section head can be found in the above SECTION_HEAD(),
        // try alternative method of reading the section content.
        debugPrint('S3, line: >>>' + line + '<<<')
        if (!line) {
            debugPrint()
            debugPrint(
                'Nothing in SECTION_HEAD() is found, trying to read the section content directly...',
            )
            debugPrint(
                '--- Start: parse line from section content-----------------',
            )
            // const sectionContent = '' + ctx.getText().trim()
            const sectionContent = ctx.getText().trim()
            debugPrint('Section content: ' + ctx.getText())

            line = extractYiniLine(sectionContent)
            //     const contentLines = splitLines(sectionContent)
            //     if (isDebug()) {
            //         console.log('contentLines:')
            //         printObject(contentLines)
            //     }

            //     // contentLines.forEach((row: string) => {
            //     for (let row of contentLines) {
            //         debugPrint('---')
            //         debugPrint('row (a): >>>' + row + '<<<')
            //         row = stripNLAndAfter(row)
            //         debugPrint('row (b): >>>' + row + '<<<')
            //         row = stripCommentsAndAfter(row)
            //         debugPrint('row (c): >>>' + row + '<<<')
            //         row = row.trim()
            //         debugPrint('row (d): >>>' + row + '<<<')
            //         if (row) {
            //             debugPrint(
            //                 'Found some content in split row (non-comments).',
            //             )
            //             debugPrint('Split row: >>>' + row + '<<<')

            //             // Use this as input in line.
            //             line = row
            //             debugPrint('Will use row as line input')
            //             break
            //         }
            //     }
            //     debugPrint(
            //         '--- End: parse line from section content-----------------',
            //     )
            //     debugPrint()
        }
        debugPrint('S4, line: >>>' + line + '<<<')

        if (!line) {
            debugPrint('*** ERROR: Nothing to parse in section line')
        }

        this.prevLevel = this.level
        let { sectionName, sectionLevel } = parseSectionHeader(
            line,
            this.errorHandler!,
            ctx,
        )
        this.level = sectionLevel

        // ---------------------------------------------------------------

        let nestDirection: 'lower' | 'same' | 'higher'
        if (this.level === this.prevLevel) {
            nestDirection = 'same'
        } else if (this.level < this.prevLevel) {
            nestDirection = 'lower'
        } else {
            nestDirection = 'higher'
        }
        debugPrint('-- In visitSection(..) ---------------------------')
        debugPrint('            sectionName = ' + sectionName)
        debugPrint('           sectionLevel = ' + sectionLevel)
        debugPrint('             this.level = ' + this.level)
        debugPrint('         this.prevLevel = ' + this.prevLevel)
        debugPrint('   this.prevSectionName = ' + this.prevSectionName)
        debugPrint('          nestDirection = ' + nestDirection)
        debugPrint('    this.numOfLevelOnes = ' + this.numOfLevelOnes)
        debugPrint('this.getDepthOfLevels() = ' + this.getDepthOfLevels())
        debugPrint()

        if (nestDirection === 'higher') {
            debugPrint(
                `Is level skipping: ${this.level - this.prevLevel} >= 2?`,
            )
            // if (Math.abs(this.prevLevel - this.level) >= 2) {
            if (this.level - this.prevLevel >= 2) {
                if (this.level === 2) {
                    // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
                    this.errorHandler!.pushOrBail(
                        ctx,
                        'Syntax-Error',
                        'Invalid section header level ' +
                            this.level +
                            ', with section name "' +
                            sectionName,
                        'A section header may not start directly at level ' +
                            this.level +
                            ', skipping previous section levels. Please start with one level further down.',
                    )
                } else {
                    // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
                    this.errorHandler!.pushOrBail(
                        ctx,
                        'Syntax-Error',
                        'Invalid section level jump of section header "' +
                            sectionName +
                            '"',
                        'Section header name "' +
                            sectionName +
                            '" with level ' +
                            this.level +
                            ' may not jump over (skip) intermediate section levels, from section header name "' +
                            this.prevSectionName +
                            '" with level ' +
                            this.prevLevel +
                            '. Section levels should increase one at a time. Please adjust your section headers accordingly.',
                    )
                }
            }
        }
        this.prevSectionName = sectionName

        debugPrint('About to visit members of section...')
        let members: any

        if (!ctx.section_members()) {
            debugPrint('(!) Section has no members!')
        } else {
            members = this.visitSection_members(ctx.section_members())
        }

        // ---------------------------------------------------------------
        ctx.children?.forEach((child: any) => {
            debugPrint('* child: ' + child)
        })

        if (this.level === 1) {
            this.numOfLevelOnes++
        }

        //------------------------
        // if (nestDirection === 'higher') {
        //     debugPrint(
        //         `Is level skipping: ${this.level - this.prevLevel} >= 2?`,
        //     )

        //     // if (Math.abs(this.prevLevel - this.level) >= 2) {
        //     if (this.level - this.prevLevel >= 2) {
        //         // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
        //         this.errorHandler!.pushOrBail(
        //             ctx,
        //             'Syntax-Error',
        //             'Invalid section level jump of section header "' +
        //                 sectionName +
        //                 '"',
        //             'Section header name "' +
        //                 sectionName +
        //                 '" with level ' +
        //                 this.prevLevel +
        //                 ' may not jump over previous section levels, from a section with level ' +
        //                 this.level +
        //                 ' (section name: "' +
        //                 this.prevSectionName +
        //                 '").',
        //         )
        //     }
        // }
        // this.prevSectionName = sectionName

        if (nestDirection !== 'higher') {
            debugPrint('About to reset result')
            printObject({ [sectionName]: members })

            debugPrint(`Current lastActiveSectionAtLevels[${this.level - 1}]`)
            printObject(this.lastActiveSectionAtLevels[this.level - 1])

            if (
                // (level === 0 && !sectionName) ||
                // (sectionName === 'undefined' && !!members)
                sectionLevel === 0 &&
                sectionName === 'undefined' &&
                !!members
            ) {
                debugPrint('HIT2!!!!')
                debugPrint(
                    '(!) Detected a member (that does not have a sectionName), but a memberless object in "members"',
                )
                sectionName = Object.keys(members)[0]
                debugPrint('sectionName = ' + sectionName)
                members = {}
                // this.lastActiveSectionAtLevels[0] = { [sectionName]: {} }

                // this.pushOnTree({ level: 1, name: sectionName, members: {} })
                debugPrint(
                    '(!) Skipping mounted since this is actually a memberless section',
                )
                debugPrint()
                debugPrint('<- Leaving visitSection(..) EARLY')
                if (isDebug()) {
                    console.log('returning (a memberless section):')
                    console.log({
                        level: 1,
                        name: sectionName,
                        members: members,
                    })
                    console.log()
                }

                return {
                    level: 1,
                    name: sectionName,
                    members: members,
                } as ISectionResult
            } else {
                // Mount as append
                this.lastActiveSectionAtLevels[this.level - 1] = {
                    [sectionName]: { ...members },
                }
                this.pushOnTree({
                    level: sectionLevel,
                    name: sectionName,
                    members,
                })
                // this.lastActiveSectionNameAtLevels.push(sectionName)
                debugPrint('Mounted as append')
            }

            debugPrint(`After: lastActiveSectionAtLevels[${this.level - 1}]`)
            printObject(this.lastActiveSectionAtLevels[this.level - 1])

            if (isDebug()) {
                console.log(
                    `After append lastActiveSectionAtLevels[${this.level - 1}]`,
                )
                printObject(this.lastActiveSectionAtLevels[this.level - 1])

                debugPrint('Before this.lastActiveSectionNameAtLevels:')
                printObject(this.lastActiveSectionNameAtLevels)

                // Reset.
                let i = this.level
                while (this.lastActiveSectionNameAtLevels[i]) {
                    this.lastActiveSectionNameAtLevels[i++] = undefined
                }
                debugPrint('After this.lastActiveSectionNameAtLevels:')
                printObject(this.lastActiveSectionNameAtLevels)
            }
            debugPrint(
                'HIT!!! - Just a lower or same level section, a continues full (nested) section,',
            )
            debugPrint(
                `Has above in lastActiveSectionAtLevels[${this.level - 1}]`,
            )
            debugPrint('    this.level: ' + this.level)
            debugPrint('this.prevLevel: ' + this.prevLevel)
            debugPrint('     this.level: ' + this.level)

            debugPrint()
            debugPrint(
                ' HERE.... Should mount section to correct section at this.level: ' +
                    this.level,
            )

            //this.lastActiveSectionNameAtLevels[this.level - 1] = sectionName

            debugPrint()
            debugPrint('Resetted local result')
            sectionName = ''
            members = undefined
        }
        //------------------------
        debugPrint()
        if (isDebug()) {
            if (members) {
                printObject({ [sectionName]: members })
                this.lastActiveSectionAtLevels[this.level - 1] = {
                    ...members,
                }
                // this.lastActiveSectionNameAtLevels[this.level - 1] = sectionName
                debugPrint('Mounted as assigned')

                debugPrint(`lastActiveSectionAtLevels[${this.level - 1}]`)
                printObject(this.lastActiveSectionAtLevels[this.level - 1])
            }
        }

        debugPrint('-----------------------')

        if (isDebug()) {
            console.log(
                'At end of visitSection(..), this.lastActiveSectionNameAtLevels:',
            )
            printObject(this.lastActiveSectionNameAtLevels)
            debugPrint('    this.level: ' + this.level)
            debugPrint('this.prevLevel: ' + this.prevLevel)
            debugPrint('     this.level: ' + this.level)
            debugPrint('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
            debugPrint('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
            console.log()
        }

        debugPrint('<- Leaving visitSection(..)')
        if (isDebug()) {
            console.log('returning:')
            console.log({
                sectionLevel: sectionLevel,
                name: sectionName,
                members: members,
            })
            console.log()
        }

        return {
            level: sectionLevel,
            name: sectionName,
            members: members,
        } as ISectionResult
    }

    /**
     * Visit a parse tree produced by `YiniParser.terminal_line`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTerminal_line?: (ctx: Terminal_lineContext) => IResult

    /**
     * Visit a parse tree produced by `YiniParser.section_members`.
     * In here will mount object onto members object.
     * @param ctx the parse tree
     * @returns { key: value, ... }
     */
    // visitSection_members = (ctx: Section_membersContext): Record<string, any> => {
    // visitSection_members = (ctx: Section_membersContext): any => {
    visitSection_members = (ctx: Section_membersContext): any => {
        isDebug() && console.log()
        debugPrint(
            '************************************************************',
        )
        debugPrint('-> Entered visitSection_members(..)')

        const members: Record<string, any> = {}

        debugPrint('Will loop through each member (or section head)...')
        ctx.member_list().forEach((member) => {
            const { type, key, value }: any = this.visitMember(member)
            debugPrint('+++++++++++++++++++++++++++++++++++++++++++++++++++++')
            debugPrint('* Item of member_list:')
            if (isDebug()) {
                console.log(value)
            }
            debugPrint(' type = >>>' + type + '<<<')
            debugPrint('  key = >>>' + key + '<<<')
            debugPrint('value = >>>' + value + '<<<')
            debugPrint('value[key] = >>>' + value?.[key] + '<<<')
            debugPrint('--')

            if (key === '') {
                debugPrint('Skipping this member, due to key = ""')
            } else {
                if (members[key] !== undefined) {
                    // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
                    this.errorHandler!.pushOrBail(
                        ctx,
                        'Syntax-Error',
                        'Key already exists in this section scope (in this main section), key name: ' +
                            key,
                    )
                } else {
                    if ((value?.type as TDataType) === 'Null') {
                        members[key] = null
                    } else {
                        isDebug() && console.log()
                        // NOTE: (!) Only if nested section.
                        debugPrint(
                            'About to mount a single member or section onto members...',
                        )
                        isDebug() && console.log({ [key]: value })

                        Object.assign(members, { [key]: value })
                        debugPrint(
                            '+ Added member or section onto members: "' +
                                key +
                                '"',
                        )
                    }
                }
            }
        })

        if (isDebug()) {
            debugPrint(
                '~~~ After mounting in visitSection_members(..) ~~~~~~~~~~',
            )
            debugPrint('this.resultSections:')
            debugPrint(
                '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
            )
        }

        //@todo handle member colon list
        // ctx..member_colon_list().forEach((mcl) => {
        //     const { key, value } = this.visit(mcl)
        //     members[key] = value
        // })

        debugPrint()
        debugPrint('<- Leaving visitSection_members(..)')
        if (isDebug()) {
            console.log('returning:')
            console.log(members)
            console.log()
        }

        return members
    }

    /**
     * Visit every single section or member (any key-value pair such as
     * key=value or key=[...] etc.).
     * @returns {
            type: resultType,
            key: resultKey,
            value: resultValue,
        }: IResult
     */
    // visitMember?: (ctx: MemberContext) => IResult;
    visitMember = (ctx: MemberContext) => {
        isDebug() && console.log()
        debugPrint('-> Entered visitMember(..)')
        debugPrint('           key   = ' + ctx.KEY()?.getText().trim())
        debugPrint(
            'Or, section head = ' +
                ctx.SECTION_HEAD()?.getText().trim() +
                ' (head WITHOUT any members (ONLY detected here))',
        )
        debugPrint('     ctx.value() = ' + ctx.value())

        // For logging and debugging purposes.
        let entityType: 'Member-Key' | 'Section-Head' | 'Unknown' = 'Unknown'

        let resultType: TDataType = undefined
        let resultKey: string = ''
        let resultValue: any = {}
        let followingSection: ISectionResult | null = null

        // NOTE: (!) It can never be both a key and section head.
        if (ctx.KEY()?.getText().trim()) {
            entityType = 'Member-Key'

            try {
                resultKey = ctx.KEY().getText()
            } catch (error) {
                debugPrint('in catch..')
                const msg: string = `Unexpected syntax while parsing a member (key-value pair)`

                // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
                this.errorHandler!.pushOrBail(ctx, 'Syntax-Error', msg)
            }

            const result: IResult = ctx.value()
                ? this.visitValue(ctx.value())
                : null
            resultType = (<any>result)?.type
            resultValue = (<any>result)?.value
            debugPrint(' type = ' + resultType + '          @visitValue(..)')
            debugPrint('value = ' + resultValue + '          @visitValue(..)')
        } else if (ctx.SECTION_HEAD()?.getText().trim()) {
            entityType = 'Section-Head'

            //NOTE: There might be an issue here that some subsection gets missing!!

            // const line = '' + ctx.SECTION_HEAD().getText().trim()
            const line = ctx.SECTION_HEAD().getText().trim()
            debugPrint('(!) Detected a section head instead: ' + line)

            followingSection = this.visitSection(ctx)
            //  Object.assign(members, sectionObj)
            debugPrint(
                'Got constructed object of builtSection (visitSection(..):',
            )
            if (isDebug()) {
                console.log(followingSection)
            }

            //@todo  (Is this fixed now? 2025-07-10) Mount the nested object correctly!
            resultType = 'Object'
            // resultValue[nestedSection?.name] = nestedSection?.members
            resultValue = followingSection?.members || {}
            resultKey = followingSection!.name
            debugPrint("resultKey   = '" + resultKey + "'")
            debugPrint('resultValue:')
            if (isDebug()) {
                printObject(resultValue)
            }

            debugPrint('Mounted/assigned a section onto resultValue...')
            // Object.assign(value, { dummy: 6767 })
            // Object.assign(resultValue, {
            //     dummy: 'That was detected a section head instead!',
            // })
            debugPrint()
        }

        debugPrint()
        debugPrint("entity      = '" + entityType + "'")
        debugPrint("resultType  = '" + resultType + "'")
        debugPrint("resultKey   = '" + resultKey + "'")
        if (resultKey) {
            debugPrint()
            debugPrint(
                'Has a key... Validate it either as a simple or a backticked ident...',
            )
            if (isEnclosedInBackticks(resultKey)) {
                if (!isValidBacktickedIdent(resultKey)) {
                    this.errorHandler!.pushOrBail(
                        ctx,
                        'Syntax-Error',
                        'Invalid key name of this member, backticked key/identifier: "' +
                            resultKey +
                            '"',
                        'Section name should be backticked like e.g. `My section name`.',
                    )
                }

                resultKey = trimBackticks(resultKey)
                debugPrint("resultKey   = '" + resultKey + "'  (trimBackticks)")
            } else {
                if (!isValidSimpleIdent(resultKey)) {
                    this.errorHandler!.pushOrBail(
                        ctx,
                        'Syntax-Error',
                        'Invalid key name of this member, key/identifier: "' +
                            resultKey +
                            '"',
                        'Section name must start with: A-Z, a-z, or _, unless enclosed in backticks e.g. `' +
                            resultKey +
                            '`, `My key name`.',
                    )
                }
            }
        }

        debugPrint('*** Constructed JS object ***')
        debugPrint('resultValue:')
        if (isDebug()) {
            console.log(resultValue)
        }

        debugPrint()
        debugPrint('<- About to leave visitMember(..)')
        if (isDebug()) {
            console.log('returning:')
            console.log({
                type: resultType,
                key: resultKey,
                value: resultValue,
            })
            console.log()
        }

        if (!resultType && !resultKey) {
            // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
            this.errorHandler!.pushOrBail(ctx, 'Syntax-Error', 'Unknown input')
        }

        // if (!isValidSimpleIdent(resultKey)) {
        // if (resultType !== 'Object' && !isValidSimpleIdent(resultKey)) {
        //     this.errorHandler!.pushOrBail(
        //         ctx,
        //         'Syntax-Error',
        //         'Invalid name of this key of a member, key name: "' +
        //             resultKey +
        //             '"',
        //         'Key name must start with: A-Z, a-z, or _, unless enclosed in backticks e.g. `' +
        //             resultKey +
        //             '`, `My key name`.',
        //     )
        // }

        debugPrint()
        debugPrint('<- Leaving visitMember(..)')
        if (isDebug()) {
            console.log('returning:')
            console.log({
                type: resultType,
                key: resultKey,
                value: resultValue,
            })
            console.log()
        }

        return {
            type: resultType,
            key: resultKey,
            value: resultValue,
        } as IResult
    }

    /**
     * Visit a parse tree produced by `YiniParser.member_colon_list`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    //visitMember_colon_list?: (ctx: Member_colon_listContext) => IResult
    visitMember_colon_list = (ctx: Member_colon_listContext): IResult => {
        isDebug() && console.log()
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
        isDebug() && console.log()
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
