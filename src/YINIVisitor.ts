// import { isDebug&&console.log } from './utils/general'
import { ParseTreeVisitor } from 'antlr4'

import YiniParserVisitor from './grammar/YiniParserVisitor'

import { YiniContext } from './grammar/YiniParser.js'
import { SectionContext } from './grammar/YiniParser.js'
import { Terminal_lineContext } from './grammar/YiniParser.js'
import { Section_membersContext } from './grammar/YiniParser.js'
import { MemberContext } from './grammar/YiniParser.js'
import { Member_colon_listContext } from './grammar/YiniParser.js'
import { ValueContext } from './grammar/YiniParser.js'
import { ListContext } from './grammar/YiniParser.js'
import { List_in_bracketsContext } from './grammar/YiniParser.js'
import { ElementsContext } from './grammar/YiniParser.js'
import { ElementContext } from './grammar/YiniParser.js'
import { Number_literalContext } from './grammar/YiniParser.js'
import { String_literalContext } from './grammar/YiniParser.js'
import { String_concatContext } from './grammar/YiniParser.js'
import { Boolean_literalContext } from './grammar/YiniParser.js'

const isDebug = !!process.env.IS_DEBUG

const SECTION_MARKER1 = '^'
const SECTION_MARKER2 = '~'

interface YiniDocument {
    // sections: Record<string, any>
    _root: Record<string, any>
    // terminal?: string
    _hasTerminal?: boolean
}

type TDataType = undefined | 'Integer' | 'Real' | 'Boolean'
/*
class CResult {
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

/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `YiniParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export default class YINIVisitor<Result> extends YiniParserVisitor<Result> {
    //export default class YINIVisitor extends YiniParserVisitor<any> {

    /**
     * Visit a parse tree produced by `YiniParser.yini`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    // visitYini?: (ctx: YiniContext) => Result;
    // visitYini = (ctx: YiniContext): Result => {
    visitYini = (ctx: YiniContext): any => {
        isDebug && console.log('\n-> Entered visitYini(..)')
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
            isDebug && console.log('In forEach, got child = ' + section + ', got value = ' + value)

            const result: any = this.visit(section)
            isDebug && console.log('result = ' + result)
            isDebug && console.log('result:')
            isDebug && console.log(result)
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
        return { _root: sections, _hasTerminal: hasTerminal }
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
    // visitSection?: (ctx: SectionContext) => Result;

    // visitSection = (ctx: SectionContext): Result => {
    visitSection = (ctx: SectionContext): any => {
        isDebug && console.log('\n-> Entered visitSection(..)')

        const res: Record<string, any> = {}
        // ctx.getText();
        // isDebug&&console.log(`@getText() = >>>${ ctx.getText() }<<<`);
        // isDebug&&console.log('@name = ' + ctx.SECTION_HEAD);

        isDebug && console.log('start')
        // ctx.children?.forEach((child: any)=>{
        // 	isDebug&&console.log('@child = ' + child);
        // })
        isDebug && console.log('XXXX1' + ctx.SECTION_HEAD())
        isDebug && console.log('XXXX2' + ctx.section())
        isDebug && console.log('end\n')

        const line = '' + ctx.SECTION_HEAD().getText()
        isDebug && console.log(`Got line = >>>${line}<<<`)

        // --- Determine nesting level. ---------
        const lineLen: number = line.length
        let level = 0

        for (let pos = 0; pos < lineLen; pos++) {
            if (line.charAt(pos) === SECTION_MARKER1 || line.charAt(pos) === SECTION_MARKER2) {
                level++
            } else {
                break
            }
        }
        isDebug && console.log('level = ' + level)
        // ------------------------------------

        // --- Extract section name after markers and whitespace. ---------
        let subLine: string = line.substring(level)
        let isDone = false
        do {
            // isDebug&&console.log('subLine = ' + subLine);

            if (subLine.startsWith(' ') || subLine.startsWith('\t')) {
                subLine = subLine.substring(1) // Consume left most character.
                isDebug && console.log('* consumed left most char!!')
            } else {
                isDone = true
            }
        } while (!isDone)

        const sectionName: string = subLine.trim()
        isDebug && console.log(`Parsed sectionName = >>>${sectionName}<<<`)
        // ---------------------------------------------------------------

        // isDebug&&console.log('last subLine = ' + subLine);
        // if(!subLine.endsWith('\\n')){
        // 	console.error(`ERROR: No newline <Enter> after section head"`)
        // 	process.exit(1)
        // }

        isDebug && console.log('visit(ctx.section_members()')
        const members = ctx.section_members() ? this.visit(ctx.section_members()) : {}

        //TODO: Maybe put all this inside another container (supertype) or root.
        // return {
        // 	[sectionName]: res,
        // 	'_meta': {}
        // } as Result
        return { name: sectionName, members }

        // return {} as Result
    }

    // visitSection = (ctx: SectionContext): Result => {
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
    visitTerminal_line?: (ctx: Terminal_lineContext) => Result

    /**
     * Visit a parse tree produced by `YiniParser.section_members`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    // visitSection_members = (ctx: Section_membersContext): Result =>{
    // 	isDebug&&console.log('-> Entered visitSection_members(..)')

    // 	return {} as Result
    // }
    // visitSection_members = (ctx: Section_membersContext): Record<string, any> => {
    visitSection_members = (ctx: Section_membersContext): any => {
        isDebug && console.log('-> Entered visitSection_members(..)')

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
                isDebug && console.log('Warning res.key = ' + key + ' found as undefined')
            } else {
                const value0 = value[0] // First value at index 0.
                isDebug && console.log('\nmember of visitSection_members:')
                isDebug && console.log(value0)
                isDebug && console.log(value)
                isDebug && console.log('res.key = ' + key)
                isDebug && console.log('res.value.dataType = ' + value0?.type)
                isDebug && console.log('res.value.value = ' + value0?.value)
                // if(value instanceof Result){

                // isDebug&&console.log('--- member: ---')
                // isDebug&&console.log(member)
                // isDebug&&console.log('---------------\n')

                members[key] = value0?.value
            }
        })
        //   const { key, value } = this.visit(m);
        //   members[key] = value;

        return members
    }

    /**
     * Visit a parse tree produced by `YiniParser.member`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    // visitMember?: (ctx: MemberContext) => Result;
    visitMember = (ctx: MemberContext) => {
        isDebug && console.log('-> Entered visitMember(..)')
        isDebug && console.log('key   = ' + ctx.KEY().getText())
        isDebug && console.log('ctx.value() = ' + ctx.value())

        const key = ctx.KEY().getText()
        const value = ctx.value() ? this.visit(ctx.value()) : null
        isDebug && console.log('value = ' + value)

        return { key, value } as Result
    }

    /**
     * Visit a parse tree produced by `YiniParser.member_colon_list`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    //visitMember_colon_list?: (ctx: Member_colon_listContext) => Result
    visitMember_colon_list = (ctx: Member_colon_listContext): Result => {
        isDebug && console.log('-> Entered visitMember_colon_list(..)')

        const key = ctx.KEY().getText()
        const values = this.visit(ctx.elements())
        return { key, value: values } as Result
    }

    /**
     * Visit a parse tree produced by `YiniParser.value`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    // visitValue?: (ctx: ValueContext) => Result
    /*
    visitValue = (ctx: ValueContext): any => {
        isDebug&&console.log('-> Entered visitValue(..)')

        isDebug&&console.log('ctx.number_literal(): ' + ctx.number_literal())
        isDebug&&console.log('ctx.boolean_literal(): ' + ctx.boolean_literal())

        if (ctx.number_literal()) return this.visit(ctx.number_literal())
        if (ctx.string_literal()) return this.visit(ctx.string_literal())
        if (ctx.boolean_literal()) return this.visit(ctx.boolean_literal())
        //   if (ctx.list()) return this.visit(ctx.list())
        //   if (ctx.string_concat()) return this.visit(ctx.string_concat())
        return null
    }
        */
    /**
     * Visit a parse tree produced by `YiniParser.list`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitList?: (ctx: ListContext) => Result
    /**
     * Visit a parse tree produced by `YiniParser.list_in_brackets`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitList_in_brackets?: (ctx: List_in_bracketsContext) => Result
    /**
     * Visit a parse tree produced by `YiniParser.elements`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitElements?: (ctx: ElementsContext) => Result
    /**
     * Visit a parse tree produced by `YiniParser.element`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitElement?: (ctx: ElementContext) => Result
    /**
     * Visit a parse tree produced by `YiniParser.number_literal`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    // visitNumber_literal?: (ctx: Number_literalContext) => Result
    visitNumber_literal = (ctx: Number_literalContext): Result => {
        const text = ctx.getText()
        // if (/^0[xX]/.test(text)) return parseInt(text, 16)
        // if (/^#/.test(text)) return parseInt(text.slice(1), 16)
        // if (/^0b/.test(text) || /^%/.test(text)) return parseInt(text.replace(/^%/, '0b'), 2)
        // if (/^0o/.test(text)) return parseInt(text, 8)
        // Duodecimal (0z...) not supported, fallback to number

        // In a regex literal the dot must be escaped (\.) to match a literal '.'
        if (/\./.test(text)) {
            return { type: 'Float', value: parseFloat(text) } as Result
        }

        return { type: 'Integer', value: parseInt(text) } as Result

        // TODO: Depending, on mode, below continue or break on error
        console.error('Error: Failed to parse number value: ' + text)
        return { type: 'Number', value: undefined } as Result
    }

    /**
     * Visit a parse tree produced by `YiniParser.string_literal`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitString_literal?: (ctx: String_literalContext) => Result
    /**
     * Visit a parse tree produced by `YiniParser.string_concat`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitString_concat?: (ctx: String_concatContext) => Result

    /**
     * Visit a parse tree produced by `YiniParser.boolean_literal`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    //visitBoolean_literal?: (ctx: Boolean_literalContext) => Result
    visitBoolean_literal = (ctx: Boolean_literalContext): Result => {
        isDebug && console.log('-> Entered visitBoolean_literal(..)')

        const text = ctx.getText().toLowerCase()
        // return ['true', 'yes', 'on'].includes(text) as Result
        const value: boolean = ['true', 'yes', 'on'].includes(text)

        return { type: 'Boolean', value } as Result
    }
}
