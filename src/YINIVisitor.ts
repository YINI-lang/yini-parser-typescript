import { ParseTreeVisitor } from 'antlr4'
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
import { debugPrint, isDebug } from './utils/general'

// const isDebug = !!process.env.IS_DEBUG

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

    private invalidDataInstance: InvalidDataHandler | null = null
    private readLines: string[] = []

    /**
     * Visit a parse tree produced by `YiniParser.yini`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    // visitYini?: (ctx: YiniContext) => IResult;
    // visitYini = (ctx: YiniContext): IResult => {
    visitYini = (ctx: YiniContext): any => {
        this.invalidDataInstance =
            InvalidDataHandler.getInstance('1-Abort-on-Errors')
        debugPrint()
        debugPrint('abcde99')
        debugPrint('-> Entered visitYini(..) in YINIVisitor')
        debugPrint('QQQQ')

        // const isDebug = !!process.env.IS_DEBUG
        // debugPrint('env.IS_DEBUG:')
        // debugPrint(process.env.IS_DEBUG)
        // console.log('isDebug = ' + isDebug)
        // debugPrint('isDebug = ' + isDebug)
        // debugPrint()

        // const res: any = {};
        const sections: Record<string, any> = {}

        ctx.section_list().forEach((section: any) => {
            const value = section.accept(this)
            debugPrint(
                'In forEach, got child = ' + section + ', got value = ' + value,
            )

            const result: any = this.visit(section)
            debugPrint('result = ' + result)
            debugPrint('result:')
            debugPrint(result)
            if (result?.name) sections[result.name] = result.members
        })

        const hasTerminal = !!ctx.terminal_line()
        return { _base: sections, _hasTerminal: hasTerminal }
    }

    /**
     * Visit a parse tree produced by `YiniParser.section`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    // visitSection?: (ctx: SectionContext) => IResult;

    visitSection = (ctx: SectionContext): any => {
        debugPrint()
        debugPrint('-> Entered visitSection(..)')

        const res: Record<string, any> = {}
        // ctx.getText();
        // isDebug&&console.log(`@getText() = >>>${ ctx.getText() }<<<`);
        // isDebug&&console.log('@name = ' + ctx.SECTION_HEAD);

        debugPrint('start')
        // ctx.children?.forEach((child: any)=>{
        // 	isDebug&&console.log('@child = ' + child);
        // })
        debugPrint('XXXX1' + ctx.SECTION_HEAD())
        debugPrint('XXXX2' + ctx.section())
        debugPrint('end\n')

        let line: string = ''
        try {
            line = '' + ctx.SECTION_HEAD().getText()
            this.readLines.push(line)
        } catch (error) {
            const len = this.readLines.length
            const syntaxLine: string = this.readLines[len - 1].trim()
            let msg: string =
                'Syntax is wrong somewhere in or after around the following (YINI):\n'
            msg += '\`' + syntaxLine + '\`'
            this.invalidDataInstance!.handleData('Syntax-Error', msg)
        }
        debugPrint(`Got line = >>>${line}<<<`)

        // --- Determine nesting level. ---------
        const lineLen: number = line.length
        let level = 0

        for (let pos = 0; pos < lineLen; pos++) {
            if (
                line.charAt(pos) === SECTION_MARKER1 ||
                line.charAt(pos) === SECTION_MARKER2
            ) {
                level++
            } else {
                break
            }
        }
        debugPrint('level = ' + level)
        // ------------------------------------

        // --- Extract section name after markers and whitespace. ---------
        let subLine: string = line.substring(level)
        let isDone = false
        do {
            // isDebug&&console.log('subLine = ' + subLine);

            if (subLine.startsWith(' ') || subLine.startsWith('\t')) {
                subLine = subLine.substring(1) // Consume left most character.
                debugPrint('* consumed left most char!!')
            } else {
                isDone = true
            }
        } while (!isDone)

        const sectionName: string = subLine.trim()
        debugPrint(`Parsed sectionName = >>>${sectionName}<<<`)
        // ---------------------------------------------------------------

        debugPrint('visit(ctx.section_members()')
        const members = ctx.section_members()
            ? this.visit(ctx.section_members())
            : {}

        //TODO: Maybe put all this inside another container (supertype) or root.
        // return {
        // 	[sectionName]: res,
        // 	'_meta': {}
        // } as IResult
        return { name: sectionName, members }

        // return {} as IResult
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
     * @return the visitor result
     */
    // visitSection_members = (ctx: Section_membersContext): Record<string, any> => {
    visitSection_members = (ctx: Section_membersContext): any => {
        debugPrint('-> Entered visitSection_members(..)')

        const members: Record<string, any> = {}
        ctx.member_list().forEach((member) => {
            const { key, value }: any = this.visit(member)
            // const { key, value }: Result = this.visit(member)
            debugPrint('Item of member_list:')
            debugPrint('key = >>>' + key + '<<<')
            debugPrint('value = >>>' + value + '<<<')
            debugPrint('value?.value = >>>' + value?.value + '<<<')
            // debugPrint('type = >>>' + type + '<<<')
            debugPrint('value?.type = >>>' + value?.type + '<<<')
            debugPrint('--')

            // members[key] = value
            if ((value?.type as TDataType) === 'Null') {
                members[key] = null
            } else {
                members[key] = value?.value
            }
        })
        // ctx..member_colon_list().forEach((mcl) => {
        //     const { key, value } = this.visit(mcl)
        //     members[key] = value
        // })

        return members
    }

    /**
     * Visit a parse tree produced by `YiniParser.member`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    // visitMember?: (ctx: MemberContext) => IResult;
    visitMember = (ctx: MemberContext) => {
        debugPrint('-> Entered visitMember(..)')
        debugPrint('key   = ' + ctx.KEY().getText())
        debugPrint('ctx.value() = ' + ctx.value())

        const key = ctx.KEY().getText()
        const value = ctx.value() ? this.visit(ctx.value()) : null
        debugPrint('value = ' + value + '  @visitMember(..)')

        // return { key, value } as IResult
        // return { key, value, type: 'Integer' } as IResult
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
