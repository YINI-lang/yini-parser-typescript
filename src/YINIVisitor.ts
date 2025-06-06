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
import { debugPrint } from './utils/general'

// const isDebug = !!process.env.IS_DEBUG

const SECTION_MARKER1 = '^'
const SECTION_MARKER2 = '~'

interface YiniDocument {
    // sections: Record<string, any>
    _base: Record<string, any>
    // terminal?: string
    _hasTerminal?: boolean
}

type TDataType =
    | undefined
    | 'String'
    | 'Number-Integer'
    | 'Number-Real'
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
    value: any
    type: TDataType
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

    /**
     * Visit a parse tree produced by `YiniParser.yini`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    // visitYini?: (ctx: YiniContext) => IResult;
    // visitYini = (ctx: YiniContext): IResult => {
    visitYini = (ctx: YiniContext): any => {
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

        // ctx.children?.forEach((child: any)=>{
        // ctx.children?.forEach((child: any)=>{
        // ctx.section_list().forEach((section:any)=>{
        ctx.section_list().forEach((section: any) => {
            // const { name, members } = this.visit(section);
            // isDebug&&console.log('In forEach, got child = ' + name + ', got value = ' + members)

            // isDebug&&console.log(child);
            // isDebug&&console.log(section);
            // const value = child.accept(this);
            const value = section.accept(this)
            // isDebug&&console.log('In forEach, got child = ' + child + ', got value = ' + value)
            debugPrint(
                'In forEach, got child = ' + section + ', got value = ' + value,
            )

            const result: any = this.visit(section)
            debugPrint('result = ' + result)
            debugPrint('result:')
            debugPrint(result)
            if (result?.name) sections[result.name] = result.members

            // if(!value){
            // 	isDebug&&console.log('* skipped adding')
            // }else{
            //Object.assign(res, value)
            // }
        })

        // return res
        //const terminal = ctx.terminal_line()?.getText().trim()
        const hasTerminal = !!ctx.terminal_line()
        return { _base: sections, _hasTerminal: hasTerminal }
    }

    /*
	visitYini(ctx: YiniContext): YiniDocument {
		const sections: Record<string, any> = {}
		// for (const section of ctx.section()) {
			ctx.section_list().forEach((section:any)=>{
				const { name, members } = this.visit(section);
				sections[name] = members;
	  
			})
		}
		return { sections };
	  }
*/
    /**
     * Visit a parse tree produced by `YiniParser.section`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    // visitSection?: (ctx: SectionContext) => IResult;

    // visitSection = (ctx: SectionContext): IResult => {
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

        const line = '' + ctx.SECTION_HEAD().getText()
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

        // isDebug&&console.log('last subLine = ' + subLine);
        // if(!subLine.endsWith('\\n')){
        // 	console.error(`ERROR: No newline <Enter> after section head"`)
        // 	process.exit(1)
        // }

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

    // visitSection = (ctx: SectionContext): IResult => {
    // visitSection = (ctx: SectionContext): any => {

    // // visitSection(ctx: SectionContext) {
    // 	const head = ctx.SECTION_HEAD();
    // 	const nested = ctx.section();
    // 	if (head && !nested) {
    // 	  const name = head.getText().replace(/^\^+\s*/, '').trim();
    // 	  const members = ctx.section_members() ? this.visit(ctx.section_members()) : {};
    // 	  isDebug&&console.log('2name = ' + name);

    // 	  return { name, members };
    // 	}
    // 	if (!head && ctx.section_members()) {
    // 	  return { name: '', members: this.visit(ctx.section_members()) };
    // 	}
    // 	return null;
    //   }

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
    // visitSection_members = (ctx: Section_membersContext): IResult =>{
    // 	isDebug&&console.log('-> Entered visitSection_members(..)')

    // 	return {} as IResult
    // }
    // visitSection_members = (ctx: Section_membersContext): Record<string, any> => {
    visitSection_members = (ctx: Section_membersContext): any => {
        debugPrint('-> Entered visitSection_members(..)')

        /*
        const members: Record<string, any> = {}
        // for (const m of ctx?.member()) {
        ctx?.children?.forEach((member: any) => {
            // const { key, value } = this.visit(m);
            // members[key] = value
            // const res: any= this.visit(m)
            // isDebug&&console.log('member of visitSection_members:')
            // isDebug&&console.log('res.key = ' + res?.key)
            // isDebug&&console.log('res.value = ' + res?.value)
            const { key, value }: any = this.visit(member)
            if (!value) {
                debugPrint('Warning res.key = ' + key + ' found as undefined')
            } else {
                const value0 = value || value[0] // First value at index 0.
                debugPrint('\nmember of visitSection_members:')
                debugPrint(value0)
                debugPrint(value)
                debugPrint('res.key = >>>' + key + '<<<')
                debugPrint('res.value.dataType = >>>' + value0?.type + '<<<')
                debugPrint('res.value.value = >>>' + value0?.value + '<<<')
                // if(value instanceof IResult){

                // isDebug&&console.log('--- member: ---')
                // isDebug&&console.log(member)
                // isDebug&&console.log('---------------\n')

                members[key] = value0?.value
            }
        })
        //   const { key, value } = this.visit(m);
        //   members[key] = value;
        */
        const members: any = {}
        ctx.member_list().forEach((member) => {
            const { key, value, type }: any = this.visit(member)
            // const { key, value }: Result = this.visit(member)
            debugPrint('Item of member_list:')
            debugPrint('key = >>>' + key + '<<<')
            debugPrint('value = >>>' + value + '<<<')
            debugPrint('value?.value = >>>' + value?.value + '<<<')
            // debugPrint('type = >>>' + type + '<<<')
            debugPrint('value?.type = >>>' + value?.type + '<<<')
            debugPrint('--')

            // members[key] = value
            members[key] = value?.value
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
        return { key, value, type: 'Integer' } as IResult
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

        if (ctx.number_literal()) return this.visit(ctx.number_literal())
        if (ctx.string_literal()) return this.visit(ctx.string_literal())
        if (ctx.boolean_literal()) return this.visit(ctx.boolean_literal())
        //   if (ctx.list()) return this.visit(ctx.list())
        //   if (ctx.string_concat()) return this.visit(ctx.string_concat())
        return null
    }

    /**
     * Visit a parse tree produced by `YiniParser.object_literal`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitObject_literal?: (ctx: Object_literalContext) => IResult
    /**
     * Visit a parse tree produced by `YiniParser.objectMemberList`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitObjectMemberList?: (ctx: ObjectMemberListContext) => IResult
    /**
     * Visit a parse tree produced by `YiniParser.objectMember`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitObjectMember?: (ctx: ObjectMemberContext) => IResult

    /**
     * Visit a parse tree produced by `YiniParser.list`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitList?: (ctx: ListContext) => IResult
    /**
     * Visit a parse tree produced by `YiniParser.list_in_brackets`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitList_in_brackets?: (ctx: List_in_bracketsContext) => IResult
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
    visitElement?: (ctx: ElementContext) => IResult
    /**
     * Visit a parse tree produced by `YiniParser.number_literal`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    // visitNumber_literal?: (ctx: Number_literalContext) => IResult
    visitNumber_literal = (ctx: Number_literalContext): IResult => {
        debugPrint('-> Entered visitNumber_literal(..)')

        const text = ctx.getText()
        // if (/^0[xX]/.test(text)) return parseInt(text, 16)
        // if (/^#/.test(text)) return parseInt(text.slice(1), 16)
        // if (/^0b/.test(text) || /^%/.test(text)) return parseInt(text.replace(/^%/, '0b'), 2)
        // if (/^0o/.test(text)) return parseInt(text, 8)
        // Duodecimal (0z...) not supported, fallback to number

        // In a regex literal the dot must be escaped (\.) to match a literal '.'
        if (/\./.test(text)) {
            return { type: 'Number-Real', value: parseFloat(text) } as IResult
        }

        return { type: 'Number-Integer', value: parseInt(text) } as IResult

        // TODO: Depending, on mode, below continue or break on error
        console.error('Error: Failed to parse number value: ' + text)
        return { type: 'Number', value: undefined } as IResult
    }

    /**
     * Visit a parse tree produced by `YiniParser.string_literal`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    // visitString_literal?: (ctx: String_literalContext) => Result
    visitString_literal = (ctx: String_literalContext): IResult => {
        debugPrint('-> Entered visitString_literal(..)')

        let raw = ctx.getText()
        debugPrint('raw = >>>' + raw + '<<<')

        return { value: raw, type: 'String' } as any
    }

    /**
     * Visit a parse tree produced by `YiniParser.string_concat`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitString_concat?: (ctx: String_concatContext) => IResult

    /**
     * Visit a parse tree produced by `YiniParser.null_literal`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitNull_literal = (ctx: Null_literalContext): IResult => {
        debugPrint('-> Entered visitNull_literal(..)')

        //const txt = ctx.getText().toLowerCase()

        return { type: 'Null', value: 'Null' } as IResult
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
        const value: boolean = !!(
            txt === 'true' ||
            txt === 'yes' ||
            txt === 'on'
        )

        return { type: 'Boolean', value } as IResult
    }
}
