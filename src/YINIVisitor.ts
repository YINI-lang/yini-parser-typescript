
import {ParseTreeVisitor} from 'antlr4';

import  YiniParserVisitor  from "./grammar/YiniParserVisitor";

import { YiniContext } from "./grammar/YiniParser.js";
import { SectionContext } from "./grammar/YiniParser.js";
import { Terminal_lineContext } from "./grammar/YiniParser.js";
import { Section_membersContext } from "./grammar/YiniParser.js";
import { MemberContext } from "./grammar/YiniParser.js";
import { Member_colon_listContext } from "./grammar/YiniParser.js";
import { ValueContext } from "./grammar/YiniParser.js";
import { ListContext } from "./grammar/YiniParser.js";
import { List_in_bracketsContext } from "./grammar/YiniParser.js";
import { ElementsContext } from "./grammar/YiniParser.js";
import { ElementContext } from "./grammar/YiniParser.js";
import { Number_literalContext } from "./grammar/YiniParser.js";
import { String_literalContext } from "./grammar/YiniParser.js";
import { String_concatContext } from "./grammar/YiniParser.js";
import { Boolean_literalContext } from "./grammar/YiniParser.js";

const SECTION_MARKER1 = '^';
const SECTION_MARKER2 = '~';

/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `YiniParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export default class YINIVisitor<Result> extends YiniParserVisitor<Result> {
	/**
	 * Visit a parse tree produced by `YiniParser.yini`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	// visitYini?: (ctx: YiniContext) => Result;
	visitYini = (ctx: YiniContext): Result => {
		console.log('-> Entered visitYini(..)');
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
		console.log('-> Entered visitSection(..)');

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
		console.log(`Got line = >>>${ line }<<<`);

		const lineLen: number = line.length
		let level = 0;

		for(let pos=0; pos<lineLen; pos++){
			if(line.charAt(pos)===SECTION_MARKER1 || line.charAt(pos)===SECTION_MARKER2 ){
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
				console.log('* consumed left most char!!')
			}else{
				isDone = true
			}
		} while(!isDone)

		const sectionName: string = subLine.trim()
		console.log(`Parsed sectionName = >>>${ sectionName }<<<`);

		// console.log('last subLine = ' + subLine);
		// if(!subLine.endsWith('\\n')){
		// 	console.error(`ERROR: No newline <Enter> after section head"`)
		// 	process.exit(1)
		// }
		/*
		const payload: any = {
			[sectionName]: res,
		}

		//return '' as Result;
		return {
			'payload': payload,
			'_meta': {}
		} as any
		*/

		//TODO: Maybe put all this inside another container (supertype) or root.
		return {
			[sectionName]: res,
			'_meta': {}
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
	visitSection_members = (ctx: Section_membersContext): Result =>{
		console.log('-> Entered visitSection_members(..)')
		
		return {} as Result
	}

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

