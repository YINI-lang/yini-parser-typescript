import assert from 'assert'
import { TokenStream } from 'antlr4'
import { isDebug } from '../config/env'
import {
    Bad_memberContext,
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
import { debugPrint, printObject } from '../utils/print'
import { isEnclosedInBackticks, trimBackticks } from '../utils/string'
import {
    isValidBacktickedIdent,
    isValidSimpleIdent,
    stripCommentsAndAfter,
} from '../yiniHelpers'
import { ErrorDataHandler } from './ErrorDataHandler'
import {
    IChainContainer,
    ISectionResult,
    TDataType,
    TSyntaxTree,
    TSyntaxTreeContainer,
} from './types'

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
    private isStrict: boolean

    private lastActiveSectionAtLevels: any[] = []
    private lastActiveSectionNameAtLevels: (string | undefined)[] = [] // Last active section name at each level.

    private numOfLevelOnes = 0 // Num of Level-1 sections.
    private level = 0
    private prevLevel = 0
    private prevSectionName = '' // For error reporting purposes.

    private meta_hasYiniMarker = false // For stats.
    private meta_numOfSections = 0 // For stats.
    private meta_numOfMembers = 0 // For stats.
    private meta_numOfChains = 0 // For stats.
    private meta_maxLevelSection = 0 // For stats.

    // private existingSectionTitles: Map<string, boolean> = new Map()

    private existingSectionTitlesAtLevels: Map<string, boolean>[] = []

    private hasDefinedSectionTitle = (
        sectionName: string,
        level: number,
    ): boolean => {
        const mapAtCurrentLevel: Map<string, boolean> =
            this.existingSectionTitlesAtLevels[level - 1]

        return mapAtCurrentLevel?.has(sectionName)
    }

    private setDefineSectionTitle = (sectionName: string, level: number) => {
        let mapAtCurrentLevel: Map<string, boolean> =
            this.existingSectionTitlesAtLevels[level - 1]

        if (!mapAtCurrentLevel) {
            mapAtCurrentLevel = new Map()
            this.existingSectionTitlesAtLevels[level - 1] = mapAtCurrentLevel
        }

        mapAtCurrentLevel.set(sectionName, true)
    }

    constructor(errorHandler: ErrorDataHandler, isStrict: boolean) {
        super()
        this.errorHandler = errorHandler
        this.isStrict = isStrict
    }

    /**
     * @note NOTE: Level with -100 has special meaning, it's a @yini-marker and should be ignored.
     */
    private pushOnTree = (ctx: any, sReslult: ISectionResult): void => {
        if (isDebug()) {
            console.log()
            debugPrint('--- In pushOnTree(..) --------')
            debugPrint('sReslult:')
            printObject(sReslult)
        }

        // if (sReslult.level === -100) {
        if (sReslult.name === '@yini') {
            // NOTE: Level with -100 has special meaning, it's a @yini-marker and should be ignored.
            // NOTE: Name with "@yini" has special meaning, it's a @yini-marker and should be ignored.
            // debugPrint(
            //     'Detected "-100" as a level in pushOnTree(..), ignoring to save it, and bailing function',
            // )
            debugPrint(
                'Detected no name or "@yini" as a level in pushOnTree(..), ignoring to save it, and bailing function',
            )
            return
        }
        const key = sReslult.level + '-' + sReslult.name
        debugPrint('KKKKKK, key = ' + key)
        // if (this.existingSectionTitles.has(key)) {
        if (this.hasDefinedSectionTitle(key, sReslult.level)) {
            this.errorHandler!.pushOrBail(
                ctx,
                'Syntax-Error',
                'Section name already exists',
                'Cannot redefine section name: "' +
                    sReslult.name +
                    '" at level ' +
                    sReslult.level +
                    '.',
            )
        } else {
            if (sReslult.members === undefined) {
                debugPrint(
                    'This sReslult does not hold any valid members (=undefined)',
                )
            } else {
                // this.existingSectionTitles.set(key, true)
                this.setDefineSectionTitle(key, sReslult.level)
                // printObject(this.existingSectionTitles)
            }
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
            chain: { [trimBackticks(sReslult.name)]: sReslult.members },
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
    visitYini = (ctx: YiniContext, isStrict: boolean = false): any => {
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

            const topSectionName: string | undefined = topSectionResult?.name
            const topSectionMembers: any = topSectionResult?.members
            const topSectionLevel: any = topSectionResult?.level // This must have a value of 1.

            this.pushOnTree(ctx, topSectionResult)

            debugPrint('\ntopSectionResult (visitSection(..)):')
            if (isDebug()) {
                console.log(topSectionResult)
            }

            if (
                topSectionLevel === -100
                //(<any>topSectionResult)?.level === -100
                //&& topSectionResult?.name.toLowerCase() === '@yini'
            ) {
                debugPrint(
                    `Detected "-100" as a level in section_list(..), ignoring to mount it (sectionName: "${topSectionName}")`,
                )
                return
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

        if (isDebug()) {
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
            _hasYiniMarker: this.meta_hasYiniMarker,
            _meta_numOfSections: this.meta_numOfSections,
            _meta_numOfMembers: this.meta_numOfMembers,
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
        type TLineEntity = 'Section-Header' | 'Section-Members' | 'Yini-Marker'

        isDebug() && console.log()
        debugPrint('-> Entered visitSection(..)')
        let entity: TLineEntity = 'Section-Header'

        const res: Record<string, any> = {}

        debugPrint('start')
        debugPrint(
            '           has section members = ' + !!ctx.section_members(),
        )
        debugPrint('XXXX0:ctx.getText()            = ' + ctx.getText())
        debugPrint('XXXX1:ctx.SECTION_HEAD()       = ' + ctx.SECTION_HEAD())
        debugPrint(
            'XXXX2:SECTION_HEAD().getText() = ' +
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

        let currentSectionName = ''
        let currentSectionLevel = 0
        this.prevLevel = this.level
        if (stripCommentsAndAfter(line).trim().toLowerCase() === '@yini') {
            // NOTE: The @yini marker has no functional meaning currently, it's purely syntactic sugar.
            debugPrint('Detected a @yini-marker, in visitSection(..)!!!')
            entity = 'Yini-Marker'
            this.meta_hasYiniMarker = true

            // debugPrint('members = ' + ctx.section_members())
            // const members = this.visitSection_members(ctx.section_members())
            return {
                level: -1,
                name: '@yini',
                members: undefined,
            } as ISectionResult
        } else {
            let { sectionName, sectionLevel } = parseSectionHeader(
                line,
                this.errorHandler!,
                ctx,
            )
            this.level = sectionLevel

            currentSectionName = sectionName
            currentSectionLevel = sectionLevel
        }

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
        debugPrint('            sectionName = ' + currentSectionName)
        debugPrint('           sectionLevel = ' + currentSectionLevel)
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
                            currentSectionName,
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
                            currentSectionName +
                            '"',
                        'Section header name "' +
                            currentSectionName +
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
        this.prevSectionName = currentSectionName

        let members: any
        // if (entity === 'Yini-Marker') {
        //     debugPrint(
        //         '(!) Skipping to visit members of section, due to yini-marker detected',
        //     )
        // } else {
        debugPrint('About to visit members of section...')
        if (!ctx.section_members()) {
            debugPrint('(!) Section has no members!')
        } else {
            members = this.visitSection_members(ctx.section_members())
        }
        // }

        // ---------------------------------------------------------------
        ctx.children?.forEach((child: any) => {
            debugPrint('* child: ' + child)
        })

        if (this.level === 1) {
            this.numOfLevelOnes++
        }

        //--------------------------------------

        // if (entity === 'Yini-Marker') {
        //     debugPrint(
        //         '(!) Skipping mounting anything in section, due to yini-marker detected',
        //     )
        // } else
        if (nestDirection !== 'higher') {
            debugPrint('About to reset result')
            printObject({ [currentSectionName]: members })

            debugPrint(`Current lastActiveSectionAtLevels[${this.level - 1}]`)
            printObject(this.lastActiveSectionAtLevels[this.level - 1])

            if (
                // (level === 0 && !currentSectionName) ||
                // (currentSectionName === 'undefined' && !!members)
                currentSectionLevel === 0 &&
                currentSectionName === 'undefined' &&
                !!members
            ) {
                debugPrint('HIT2!!!!')
                debugPrint(
                    '(!) Detected a member (that does not have a currentSectionName), but a memberless object in "members"',
                )
                currentSectionName = Object.keys(members)[0]
                debugPrint('currentSectionName = ' + currentSectionName)
                members = {}
                // this.lastActiveSectionAtLevels[0] = { [currentSectionName]: {} }

                // this.pushOnTree({ level: 1, name: currentSectionName, members: {} })
                debugPrint(
                    '(!) Skipping mounted since this is actually a memberless section',
                )
                debugPrint()
                debugPrint('<- Leaving visitSection(..) EARLY')
                if (isDebug()) {
                    console.log('returning (a memberless section):')
                    console.log({
                        level: 1,
                        name: currentSectionName,
                        members: members,
                    })
                    console.log()
                }

                return {
                    level: 1,
                    name: currentSectionName,
                    members: members,
                } as ISectionResult
            } else {
                // Mount as append
                this.lastActiveSectionAtLevels[this.level - 1] = {
                    [currentSectionName]: { ...members },
                }
                this.pushOnTree(ctx, {
                    level: currentSectionLevel,
                    name: currentSectionName,
                    members,
                })
                // this.lastActiveSectionNameAtLevels.push(currentSectionName)
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

            //this.lastActiveSectionNameAtLevels[this.level - 1] = currentSectionName

            debugPrint()
            debugPrint('Resetted local result')
            currentSectionName = ''
            members = undefined
        }

        //------------------------

        debugPrint()
        if (isDebug()) {
            if (members) {
                printObject({ [currentSectionName]: members })
                this.lastActiveSectionAtLevels[this.level - 1] = {
                    ...members,
                }
                // this.lastActiveSectionNameAtLevels[this.level - 1] = currentSectionName
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
                currentSectionLevel: currentSectionLevel,
                name: currentSectionName,
                members: members,
            })
            console.log()
        }

        // if (currentSectionLevel !== -100 && currentSectionName !== undefined) {
        if (currentSectionName) {
            debugPrint(
                `About inc meta_numOfSections, due to currentSectionName: "${currentSectionName}", level: ${currentSectionLevel}`,
            )
            this.meta_numOfSections += 1
        }

        return {
            level: currentSectionLevel,
            name: currentSectionName,
            members: members,
        } as ISectionResult
    }

    /**
     * Visit a parse tree produced by `YiniParser.bad_member`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitBad_member = (ctx: Bad_memberContext): any => {
        ctx.REST
        this.errorHandler!.pushOrBail(
            ctx,
            'Syntax-Error',
            'Invalid or malformed member found.',
            `Offending text: ${ctx.getText()}`,
        )
    }

    // public Bad_memberContext bad_member() {
    // 	return getRuleContext(Bad_memberContext.class,0);
    // }
    // bad_member = (ctx: any): any => {
    //     console.log('BBBBAD')
    //     process.exit()
    // }

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
                } else if ((type as TDataType) === 'Section') {
                    debugPrint(
                        `About inc meta_numOfSections in visitMember_members(..), due to key: "${key}", type: '${type}'`,
                    )
                    this.meta_numOfSections += 1
                } else {
                    // this.meta_numOfMembers +=1
                    // if ((value?.type as TDataType) === 'Null') {
                    if ((type as TDataType) === 'Null') {
                        members[key] = null
                    } else {
                        isDebug() && console.log()
                        // NOTE: (!) Only if nested section.
                        debugPrint(
                            'About to mount a single member or section onto members...',
                        )
                        isDebug() && console.log({ [key]: value })

                        // if ((type as TDataType) === 'Object') {
                        //     const isExistingSectionName =
                        //         this.hasDefinedSectionTitle(key, this.level)
                        //     debugPrint('      type = "' + type + '"')
                        //     debugPrint('this.level = "' + this.level + '"')
                        //     debugPrint(
                        //         'DDDDDDDD: currentSectionName / objectKey: ' + key,
                        //     )

                        //     debugPrint(
                        //         'Is already defined at this level? ' +
                        //             isExistingSectionName,
                        //     )
                        //     if (!isExistingSectionName) {
                        //         this.setDefineSectionTitle(key, this.level)
                        //     }
                        // }

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
        debugPrint('              key   = ' + ctx.KEY()?.getText().trim())
        debugPrint(
            'Or, section head = ' +
                ctx.SECTION_HEAD()?.getText().trim() +
                ' (head WITHOUT any members (ONLY detected here))',
        )
        debugPrint('        ctx.value() = ' + ctx.value())

        // For logging and debugging purposes.
        let entityType: 'Member-Key' | 'Section-Head' | 'Unknown' = 'Unknown'

        let resultType: TDataType = undefined
        let resultKey: string = ''
        let resultValue: any = {}
        let followingSection: ISectionResult | null = null

        // if (
        //     stripCommentsAndAfter(ctx.YINI_MARKER() + '')
        //         .trim()
        //         .toLowerCase() === '@yini'
        // ) {
        //     // NOTE: The @yini marker has no functional meaning currently, it's purely syntactic sugar.
        //     debugPrint('Detected a @yini-marker, in visitMember(..)!!!')
        //     // entity = 'Yini-Marker'
        //     this.meta_hasYiniMarker = true

        //     // debugPrint('members = ' + ctx.section_members())
        //     // const members = this.visitSection_members(ctx.section_members())

        //     debugPrint()
        //     debugPrint('<- Leaving visitMember(..) early due yini-marker found')
        //     resultType = undefined
        //     resultKey = ''
        //     resultValue = undefined
        //     if (isDebug()) {
        //         console.log('returning:')
        //         console.log({
        //             type: resultType,
        //             key: resultKey,
        //             value: resultValue,
        //         })
        //         console.log()
        //     }
        //     return {
        //         type: resultType,
        //         key: resultKey,
        //         value: resultValue,
        //     } as IResult
        // }

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

            // if (line) {
            //     debugPrint(
            //         `About inc meta_numOfSections in visitMember(..), due to line: "${line}"`,
            //     )
            //     this.meta_numOfSections += 1
            // }

            followingSection = this.visitSection(ctx as any)
            //  Object.assign(members, sectionObj)
            debugPrint(
                'Got constructed object of builtSection (visitSection(..):',
            )
            if (isDebug()) {
                console.log('followingSection:')
                console.log(followingSection)
            }

            //@todo  (Is this fixed now? 2025-07-10) Mount the nested object correctly!
            // resultType = 'Object'
            resultType = 'Section'
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

        if (resultValue === undefined) {
            debugPrint('Detected value as undefined')
            if (!this.isStrict) {
                debugPrint('Overloading undefined value with null')
                resultValue = null
            } else {
                this.errorHandler!.pushOrBail(
                    ctx,
                    'Syntax-Error',
                    'Encountered an empty/missing value in strict mode',
                    'Expected a value but found nothing, strict mode does not allow implicit null.',
                    'If you intend to have a null value, please specify "null" explicitly as the value.',
                )
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

        // if (resultType === 'Section') {
        //     debugPrint(
        //         `About inc meta_numOfSections in visitMember(..), due to resultKey: "${resultKey}", resultType: '${resultType}'`,
        //     )
        //     this.meta_numOfSections += 1
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

        if (resultType !== undefined && resultType !== 'Section') {
            // NOTE: (!) Count only literals, not any section headers!
            debugPrint(
                `About inc meta_numOfMembers, due to key of member: "${resultKey}", type: '${resultType}'`,
            )
            this.meta_numOfMembers += 1
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

        if (ctx.string_literal()) return this.visit(ctx.string_literal())
        if (ctx.number_literal()) return this.visit(ctx.number_literal())
        if (ctx.boolean_literal()) return this.visit(ctx.boolean_literal())
        if (ctx.null_literal()) return this.visit(ctx.null_literal())
        if (ctx.object_literal()) return this.visit(ctx.object_literal())
        if (ctx.list_in_brackets()) return this.visit(ctx.list_in_brackets())
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
        debugPrint('-> Entered visitList_in_brackets(..)')

        let elements: any = []

        if (!ctx.elements()) {
            debugPrint('Detected elements() is [], in list brackets')
            // elements = []
            return { type: 'List', value: [] } as IResult
        } else {
            debugPrint('Detected elements() has items, in list brackets')
            elements = this.visit(ctx.elements())
        }

        debugPrint('<- Leaving visitList_in_brackets(..)')
        if (isDebug()) {
            console.log('returning:')
            console.log({ type: 'List', value: elements.value })
            console.log()
        }

        return { type: 'List', value: elements.value } as IResult
    }

    /**
     * Visit a parse tree produced by `YiniParser.elements`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitElements = (ctx: ElementsContext): IResult => {
        debugPrint('-> Entered visitElements(..)')

        const firstElem = ctx.element()
        let elements: any = []

        debugPrint('            element  = ' + firstElem)
        debugPrint('  element.getText()  = ' + firstElem.getText())
        debugPrint('            elements = ' + !!ctx.elements())

        const resultElem = ctx.element()
            ? this.visitElement(ctx.element())
            : null
        const resultTypeElem = (<any>resultElem)?.type
        const resultValueElem = (<any>resultElem)?.value
        debugPrint(
            ' elem type  = ' + resultTypeElem + '          @visitElements(..)',
        )
        debugPrint(
            ' elem value = ' + resultValueElem + '         @visitElements(..)',
        )

        const resultElems = ctx.elements()
            ? this.visitElements(ctx.elements())
            : null
        const resultTypeElems = (<any>resultElems)?.type
        const resultValueElems = (<any>resultElems)?.value
        debugPrint(
            ' elems type  = ' +
                resultTypeElems +
                '          @visitElements(..)',
        )
        debugPrint(
            ' elems value = ' +
                resultValueElems +
                '         @visitElements(..)',
        )

        if (!ctx.elements()) {
            debugPrint(
                'In visitElements(..) detected that elements() has no elements',
            )
            elements = undefined
        } else {
            debugPrint('In visitElements(..) detected elements in elements()')
            elements = this.visit(ctx.elements())

            if (isDebug()) {
                console.log('result of visited elements:')
                printObject(elements)
            }
        }

        const returnValues: any[] = elements
            ? [resultElem].concat(elements.value)
            : [resultElem]

        debugPrint('<- Leaving visitElements(..)')
        if (isDebug()) {
            console.log('returnValues:')
            printObject(returnValues)
        }

        return {
            type: 'List',
            // value: [resultElem].concat(elements.value),
            value: returnValues,
        } as IResult
    }

    /**
     * Visit a parse tree produced by `YiniParser.element`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    // visitElement?: (ctx: ElementContext) => IResult
    // visitElement = (ctx: ElementContext): IResult => {
    visitElement = (ctx: ElementContext): any => {
        debugPrint('-> Entered visitElement(..)')

        // if (ctx.value()) {
        //     return this.visit(ctx.value())
        // } else {
        //     return { type: 'Null', value: null } as IResult
        // }
        let result: IResult
        if (ctx.value()) {
            result = this.visit(ctx.value()) as IResult
        } else {
            result = { type: 'Null', value: null } as IResult
        }

        debugPrint('<- Leaving visitElement(..)')
        if (isDebug()) {
            console.log('returning:')
            printObject(result)
            console.log()
        }

        //return 'value'
        switch ((<any>result).type) {
            case 'String':
                return `${(<any>result).value}`
            default:
                return (<any>result).value
        }
    }

    /**
     * Visit a parse tree produced by `YiniParser.string_concat`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitString_concat?: (ctx: String_concatContext) => IResult
}
