// Generated from grammar/v1.0.0-rc.2x/YiniParser.g4 by ANTLR 4.13.2

import {ParseTreeVisitor} from 'antlr4';


import { YiniContext } from "./YiniParser.js";
import { PrologContext } from "./YiniParser.js";
import { Terminal_stmtContext } from "./YiniParser.js";
import { StmtContext } from "./YiniParser.js";
import { Meta_stmtContext } from "./YiniParser.js";
import { DirectiveContext } from "./YiniParser.js";
import { Pre_processing_commandContext } from "./YiniParser.js";
import { EolContext } from "./YiniParser.js";
import { AssignmentContext } from "./YiniParser.js";
import { MemberContext } from "./YiniParser.js";
import { Colon_list_declContext } from "./YiniParser.js";
import { ValueContext } from "./YiniParser.js";
import { Object_literalContext } from "./YiniParser.js";
import { Object_membersContext } from "./YiniParser.js";
import { Object_memberContext } from "./YiniParser.js";
import { List_literalContext } from "./YiniParser.js";
import { ElementsContext } from "./YiniParser.js";
import { Number_literalContext } from "./YiniParser.js";
import { Null_literalContext } from "./YiniParser.js";
import { String_literalContext } from "./YiniParser.js";
import { String_concatContext } from "./YiniParser.js";
import { Boolean_literalContext } from "./YiniParser.js";
import { Bad_meta_textContext } from "./YiniParser.js";
import { Bad_memberContext } from "./YiniParser.js";


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
	 * Visit a parse tree produced by `YiniParser.prolog`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProlog?: (ctx: PrologContext) => Result;
	/**
	 * Visit a parse tree produced by `YiniParser.terminal_stmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTerminal_stmt?: (ctx: Terminal_stmtContext) => Result;
	/**
	 * Visit a parse tree produced by `YiniParser.stmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStmt?: (ctx: StmtContext) => Result;
	/**
	 * Visit a parse tree produced by `YiniParser.meta_stmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMeta_stmt?: (ctx: Meta_stmtContext) => Result;
	/**
	 * Visit a parse tree produced by `YiniParser.directive`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDirective?: (ctx: DirectiveContext) => Result;
	/**
	 * Visit a parse tree produced by `YiniParser.pre_processing_command`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPre_processing_command?: (ctx: Pre_processing_commandContext) => Result;
	/**
	 * Visit a parse tree produced by `YiniParser.eol`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEol?: (ctx: EolContext) => Result;
	/**
	 * Visit a parse tree produced by `YiniParser.assignment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssignment?: (ctx: AssignmentContext) => Result;
	/**
	 * Visit a parse tree produced by `YiniParser.member`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMember?: (ctx: MemberContext) => Result;
	/**
	 * Visit a parse tree produced by `YiniParser.colon_list_decl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColon_list_decl?: (ctx: Colon_list_declContext) => Result;
	/**
	 * Visit a parse tree produced by `YiniParser.value`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitValue?: (ctx: ValueContext) => Result;
	/**
	 * Visit a parse tree produced by `YiniParser.object_literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitObject_literal?: (ctx: Object_literalContext) => Result;
	/**
	 * Visit a parse tree produced by `YiniParser.object_members`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitObject_members?: (ctx: Object_membersContext) => Result;
	/**
	 * Visit a parse tree produced by `YiniParser.object_member`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitObject_member?: (ctx: Object_memberContext) => Result;
	/**
	 * Visit a parse tree produced by `YiniParser.list_literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_literal?: (ctx: List_literalContext) => Result;
	/**
	 * Visit a parse tree produced by `YiniParser.elements`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitElements?: (ctx: ElementsContext) => Result;
	/**
	 * Visit a parse tree produced by `YiniParser.number_literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumber_literal?: (ctx: Number_literalContext) => Result;
	/**
	 * Visit a parse tree produced by `YiniParser.null_literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNull_literal?: (ctx: Null_literalContext) => Result;
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
	/**
	 * Visit a parse tree produced by `YiniParser.bad_meta_text`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBad_meta_text?: (ctx: Bad_meta_textContext) => Result;
	/**
	 * Visit a parse tree produced by `YiniParser.bad_member`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBad_member?: (ctx: Bad_memberContext) => Result;
}

