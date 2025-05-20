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

const SECTION_MARKER1 = '^'
const SECTION_MARKER2 = '~'

interface YiniDocument {
    // sections: Record<string, any>
    _root: Record<string, any>
    // terminal?: string
    _hasTerminal?: boolean
}

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
        console.log('-> Entered visitYini(..)')
        // const res: any = {};
        const sections: Record<string, any> = {}

        // ctx.children?.forEach((child: any)=>{
        // ctx.children?.forEach((child: any)=>{
        // ctx.section_list().forEach((section:any)=>{
        ctx.section_list().forEach((section: any) => {
            // const { name, members } = this.visit(section);
            // console.log('In forEach, got child = ' + name + ', got value = ' + members)

            // console.log(child);
            // console.log(section);
            // const value = child.accept(this);
            const value = section.accept(this)
            // console.log('In forEach, got child = ' + child + ', got value = ' + value)
            console.log('In forEach, got child = ' + section + ', got value = ' + value)

            const result: any = this.visit(section)
            console.log('result = ' + result)
            console.log('result:')
            console.log(result)
            if (result?.name) sections[result.name] = result.members

            // if(!value){
            // 	console.log('* skipped adding')
            // }else{
            //Object.assign(res, value)
            // }
        })

        // return res
        const terminal = ctx.terminal_line()?.getText().trim()
        return { _root: sections, _hasTerminal: !!terminal }
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
        console.log('-> Entered visitSection(..)')

        const res: Record<string, any> = {}
        // ctx.getText();
        // console.log(`@getText() = >>>${ ctx.getText() }<<<`);
        // console.log('@name = ' + ctx.SECTION_HEAD);

        console.log('start')
        // ctx.children?.forEach((child: any)=>{
        // 	console.log('@child = ' + child);
        // })
        console.log('XXXX1' + ctx.SECTION_HEAD())
        console.log('XXXX2' + ctx.section())
        console.log('end\n')

        const line = '' + ctx.SECTION_HEAD()
        console.log(`Got line = >>>${line}<<<`)

        const lineLen: number = line.length
        let level = 0

        for (let pos = 0; pos < lineLen; pos++) {
            if (line.charAt(pos) === SECTION_MARKER1 || line.charAt(pos) === SECTION_MARKER2) {
                level++
            } else {
                break
            }
        }
        console.log('level = ' + level)

        // const sectionName: string = "DymmySectionName"
        let subLine: string = line.substring(level)
        let isDone = false
        do {
            // console.log('subLine = ' + subLine);

            if (subLine.startsWith(' ') || subLine.startsWith('\t')) {
                subLine = subLine.substring(1) // Consume left most character.
                console.log('* consumed left most char!!')
            } else {
                isDone = true
            }
        } while (!isDone)

        const sectionName: string = subLine.trim()
        console.log(`Parsed sectionName = >>>${sectionName}<<<`)

        // console.log('last subLine = ' + subLine);
        // if(!subLine.endsWith('\\n')){
        // 	console.error(`ERROR: No newline <Enter> after section head"`)
        // 	process.exit(1)
        // }

        console.log('visit(ctx.section_members()')
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
    // 	  console.log('2name = ' + name);

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
    // 	console.log('-> Entered visitSection_members(..)')

    // 	return {} as Result
    // }
    // visitSection_members = (ctx: Section_membersContext): Record<string, any> => {
    visitSection_members = (ctx: Section_membersContext): any => {
        console.log('-> Entered visitSection_members(..)')

        const members: Record<string, any> = {}
        // for (const m of ctx?.member()) {
        ctx?.children?.forEach((member: any) => {
            // const { key, value } = this.visit(m);
            // members[key] = value
            // const res: any= this.visit(m)
            // console.log('member of visitSection_members:')
            // console.log('res.key = ' + res?.key)
            // console.log('res.value = ' + res?.value)
            const { key, value }: any = this.visit(member)
            console.log('member of visitSection_members:')
            console.log('res.key = ' + key)
            console.log('res.value = ' + value)

            members[key] = value
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
        console.log('-> Entered visitMember(..)')

        const key = ctx.KEY().getText()
        const value = ctx.value() ? this.visit(ctx.value()) : null

        return { key, value } as any
    }

    /**
     * Visit a parse tree produced by `YiniParser.member_colon_list`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitMember_colon_list?: (ctx: Member_colon_listContext) => Result
    /**
     * Visit a parse tree produced by `YiniParser.value`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitValue?: (ctx: ValueContext) => Result
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
    visitNumber_literal?: (ctx: Number_literalContext) => Result
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
    visitBoolean_literal?: (ctx: Boolean_literalContext) => Result
}
