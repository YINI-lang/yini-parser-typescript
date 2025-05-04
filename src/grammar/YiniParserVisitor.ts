// Generated from specs/v1.0.0-beta.4/YiniParser.g4 by ANTLR 4.13.2

import {ParseTreeVisitor} from 'antlr4';


import { YiniContext } from "./YiniParser.js";
import { SectionContext } from "./YiniParser.js";
import { Terminal_lineContext } from "./YiniParser.js";
import { Section_membersContext } from "./YiniParser.js";
import { MemberContext } from "./YiniParser.js";
import { Member_colon_listContext } from "./YiniParser.js";
import { ValueContext } from "./YiniParser.js";
import { ListContext } from "./YiniParser.js";
import { List_in_bracketsContext } from "./YiniParser.js";
import { ElementsContext } from "./YiniParser.js";
import { ElementContext } from "./YiniParser.js";
import { Number_literalContext } from "./YiniParser.js";
import { String_literalContext } from "./YiniParser.js";
import { String_concatContext } from "./YiniParser.js";
import { Boolean_literalContext } from "./YiniParser.js";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `YiniParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export default class YiniParserVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `YiniParser.yini`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	// visitYini?: (ctx: YiniContext) => Result;
	visitYini = (ctx: YiniContext): Result => {
		const res: any = {};

		ctx.children?.forEach((child: any)=>{
			const value = child.accept(this);
			Object.assign(res, value);
		})

		return res;
	}

	/**
	 * Visit a parse tree produced by `YiniParser.section`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	// visitSection?: (ctx: SectionContext) => Result;
	visitSection = (ctx: SectionContext): Result => {
		const res: Record<string, any> = {};
		// ctx.getText();
		// console.log(`@getText() = >>>${ ctx.getText() }<<<`);
		// console.log('@name = ' + ctx.SECTION_HEAD);

		console.log('start');
		// ctx.children?.forEach((child: any)=>{
		// 	console.log('@child = ' + child);
		// })
		console.log('XXXX'+ctx.SECTION_HEAD());
		console.log('end\n');

		const line = '' + ctx.SECTION_HEAD();		
		console.log('line = ' + line);

		const lineLen: number = line.length
		let level = 0;

		for(let pos=0; pos<lineLen; pos++){
			if(line.charAt(pos)==='#' || line.charAt(pos)==='~' || line.charAt(pos)==='>'){
				level++
			}else{
				break;
			}
		}
		console.log('level = ' + level);


		// const sectionName: string = "DymmySectionName"
		let subLine: string = line.substring(level)
		let isDone = false
		do {
			// console.log('subLine = ' + subLine);

			if(subLine.startsWith(' ') || subLine.startsWith('\t')){
				subLine = subLine.substring(1)	// Consume left most character.
			}else{
				isDone = true
			}
		} while(!isDone)

		const sectionName: string = subLine.trim()

		// console.log('last subLine = ' + subLine);
		// if(!subLine.endsWith('\\n')){
		// 	console.error(`ERROR: No newline <Enter> after section head"`)
		// 	process.exit(1)
		// }

		//return '' as Result;
		return {
			[sectionName]: res
		} as Result
	}

	/**
	 * Visit a parse tree produced by `YiniParser.terminal_line`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTerminal_line?: (ctx: Terminal_lineContext) => Result;
	/**
	 * Visit a parse tree produced by `YiniParser.section_members`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSection_members?: (ctx: Section_membersContext) => Result;
	/**
	 * Visit a parse tree produced by `YiniParser.member`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMember?: (ctx: MemberContext) => Result;
	/**
	 * Visit a parse tree produced by `YiniParser.member_colon_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMember_colon_list?: (ctx: Member_colon_listContext) => Result;
	/**
	 * Visit a parse tree produced by `YiniParser.value`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitValue?: (ctx: ValueContext) => Result;
	/**
	 * Visit a parse tree produced by `YiniParser.list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList?: (ctx: ListContext) => Result;
	/**
	 * Visit a parse tree produced by `YiniParser.list_in_brackets`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_in_brackets?: (ctx: List_in_bracketsContext) => Result;
	/**
	 * Visit a parse tree produced by `YiniParser.elements`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitElements?: (ctx: ElementsContext) => Result;
	/**
	 * Visit a parse tree produced by `YiniParser.element`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitElement?: (ctx: ElementContext) => Result;
	/**
	 * Visit a parse tree produced by `YiniParser.number_literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumber_literal?: (ctx: Number_literalContext) => Result;
	/**
	 * Visit a parse tree produced by `YiniParser.string_literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitString_literal?: (ctx: String_literalContext) => Result;
	/**
	 * Visit a parse tree produced by `YiniParser.string_concat`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitString_concat?: (ctx: String_concatContext) => Result;
	/**
	 * Visit a parse tree produced by `YiniParser.boolean_literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBoolean_literal?: (ctx: Boolean_literalContext) => Result;
}

