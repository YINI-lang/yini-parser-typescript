// Generated from specs/v1.0.0-beta.3/YiniParser.g4 by ANTLR 4.13.2

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
	visitYini?: (ctx: YiniContext) => Result;
	/**
	 * Visit a parse tree produced by `YiniParser.section`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSection?: (ctx: SectionContext) => Result;
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

