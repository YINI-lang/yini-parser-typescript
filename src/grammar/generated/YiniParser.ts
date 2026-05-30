// Generated from ./grammar/v1.0.0-rc.6/YiniParser.g4 by ANTLR 4.13.2
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols

import {
	ATN,
	ATNDeserializer, DecisionState, DFA, FailedPredicateException,
	RecognitionException, NoViableAltException, BailErrorStrategy,
	Parser, ParserATNSimulator,
	RuleContext, ParserRuleContext, PredictionMode, PredictionContextCache,
	TerminalNode, RuleNode,
	Token, TokenStream,
	Interval, IntervalSet
} from 'antlr4';
import YiniParserVisitor from "./YiniParserVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;

export default class YiniParser extends Parser {
	public static readonly SHEBANG = 1;
	public static readonly YINI_TOKEN = 2;
	public static readonly INCLUDE_TOKEN = 3;
	public static readonly DEPRECATED_TOKEN = 4;
	public static readonly TERMINAL_TOKEN = 5;
	public static readonly SECTION_HEAD = 6;
	public static readonly INVALID_SECTION_HEAD = 7;
	public static readonly BOOLEAN_FALSE = 8;
	public static readonly BOOLEAN_TRUE = 9;
	public static readonly NULL = 10;
	public static readonly EMPTY_OBJECT = 11;
	public static readonly EMPTY_LIST = 12;
	public static readonly STRING = 13;
	public static readonly NUMBER = 14;
	public static readonly CARET = 15;
	public static readonly SS = 16;
	public static readonly GT = 17;
	public static readonly LT = 18;
	public static readonly EQ = 19;
	public static readonly COMMA = 20;
	public static readonly COLON = 21;
	public static readonly OB = 22;
	public static readonly CB = 23;
	public static readonly OC = 24;
	public static readonly CC = 25;
	public static readonly PLUS = 26;
	public static readonly DOLLAR = 27;
	public static readonly PC = 28;
	public static readonly AT = 29;
	public static readonly SEMICOLON = 30;
	public static readonly NL = 31;
	public static readonly WS = 32;
	public static readonly BLOCK_COMMENT = 33;
	public static readonly DISABLED_LINE = 34;
	public static readonly FULL_LINE_COMMENT = 35;
	public static readonly INLINE_COMMENT = 36;
	public static readonly KEY = 37;
	public static readonly IDENT_INVALID = 38;
	public static readonly REST = 39;
	public static readonly META_INVALID = 40;
	public static override readonly EOF = Token.EOF;
	public static readonly RULE_yini = 0;
	public static readonly RULE_prolog = 1;
	public static readonly RULE_terminal_stmt = 2;
	public static readonly RULE_terminal_trivia = 3;
	public static readonly RULE_stmt = 4;
	public static readonly RULE_full_line_comment_stmt = 5;
	public static readonly RULE_disabled_line_stmt = 6;
	public static readonly RULE_invalid_section_stmt = 7;
	public static readonly RULE_meta_stmt = 8;
	public static readonly RULE_directive = 9;
	public static readonly RULE_yini_directive = 10;
	public static readonly RULE_yini_mode_declaration = 11;
	public static readonly RULE_annotation = 12;
	public static readonly RULE_eol = 13;
	public static readonly RULE_assignment = 14;
	public static readonly RULE_member = 15;
	public static readonly RULE_value = 16;
	public static readonly RULE_scalar_value = 17;
	public static readonly RULE_concat_expression = 18;
	public static readonly RULE_concat_tail = 19;
	public static readonly RULE_concat_operand = 20;
	public static readonly RULE_string_literal = 21;
	public static readonly RULE_object_literal = 22;
	public static readonly RULE_object_members = 23;
	public static readonly RULE_object_member = 24;
	public static readonly RULE_object_member_separator = 25;
	public static readonly RULE_list_literal = 26;
	public static readonly RULE_elements = 27;
	public static readonly RULE_number_literal = 28;
	public static readonly RULE_null_literal = 29;
	public static readonly RULE_boolean_literal = 30;
	public static readonly RULE_bad_meta_text = 31;
	public static readonly RULE_bad_member = 32;
	public static readonly literalNames: (string | null)[] = [ null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            null, "'{}'", 
                                                            "'[]'", null, 
                                                            null, "'^'", 
                                                            "'\\u00A7'", 
                                                            "'>'", "'<'", 
                                                            "'='", "','", 
                                                            "':'", "'['", 
                                                            "']'", "'{'", 
                                                            "'}'", "'+'", 
                                                            "'$'", "'%'", 
                                                            "'@'", "';'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, "SHEBANG", 
                                                             "YINI_TOKEN", 
                                                             "INCLUDE_TOKEN", 
                                                             "DEPRECATED_TOKEN", 
                                                             "TERMINAL_TOKEN", 
                                                             "SECTION_HEAD", 
                                                             "INVALID_SECTION_HEAD", 
                                                             "BOOLEAN_FALSE", 
                                                             "BOOLEAN_TRUE", 
                                                             "NULL", "EMPTY_OBJECT", 
                                                             "EMPTY_LIST", 
                                                             "STRING", "NUMBER", 
                                                             "CARET", "SS", 
                                                             "GT", "LT", 
                                                             "EQ", "COMMA", 
                                                             "COLON", "OB", 
                                                             "CB", "OC", 
                                                             "CC", "PLUS", 
                                                             "DOLLAR", "PC", 
                                                             "AT", "SEMICOLON", 
                                                             "NL", "WS", 
                                                             "BLOCK_COMMENT", 
                                                             "DISABLED_LINE", 
                                                             "FULL_LINE_COMMENT", 
                                                             "INLINE_COMMENT", 
                                                             "KEY", "IDENT_INVALID", 
                                                             "REST", "META_INVALID" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"yini", "prolog", "terminal_stmt", "terminal_trivia", "stmt", "full_line_comment_stmt", 
		"disabled_line_stmt", "invalid_section_stmt", "meta_stmt", "directive", 
		"yini_directive", "yini_mode_declaration", "annotation", "eol", "assignment", 
		"member", "value", "scalar_value", "concat_expression", "concat_tail", 
		"concat_operand", "string_literal", "object_literal", "object_members", 
		"object_member", "object_member_separator", "list_literal", "elements", 
		"number_literal", "null_literal", "boolean_literal", "bad_meta_text", 
		"bad_member",
	];
	public get grammarFileName(): string { return "YiniParser.g4"; }
	public get literalNames(): (string | null)[] { return YiniParser.literalNames; }
	public get symbolicNames(): (string | null)[] { return YiniParser.symbolicNames; }
	public get ruleNames(): string[] { return YiniParser.ruleNames; }
	public get serializedATN(): number[] { return YiniParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(this, YiniParser._ATN, YiniParser.DecisionsToDFA, new PredictionContextCache());
	}
	// @RuleVersion(0)
	public yini(): YiniContext {
		let localctx: YiniContext = new YiniContext(this, this._ctx, this.state);
		this.enterRule(localctx, 0, YiniParser.RULE_yini);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 67;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 0, this._ctx) ) {
			case 1:
				{
				this.state = 66;
				this.prolog();
				}
				break;
			}
			this.state = 72;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2169012188) !== 0) || ((((_la - 34)) & ~0x1F) === 0 && ((1 << (_la - 34)) & 107) !== 0)) {
				{
				{
				this.state = 69;
				this.stmt();
				}
				}
				this.state = 74;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 76;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===5) {
				{
				this.state = 75;
				this.terminal_stmt();
				}
			}

			this.state = 78;
			this.match(YiniParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public prolog(): PrologContext {
		let localctx: PrologContext = new PrologContext(this, this._ctx, this.state);
		this.enterRule(localctx, 2, YiniParser.RULE_prolog);
		try {
			let _alt: number;
			this.state = 92;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 80;
				this.match(YiniParser.SHEBANG);
				this.state = 84;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 3, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 81;
						this.eol();
						}
						}
					}
					this.state = 86;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 3, this._ctx);
				}
				}
				break;
			case 31:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 88;
				this._errHandler.sync(this);
				_alt = 1;
				do {
					switch (_alt) {
					case 1:
						{
						{
						this.state = 87;
						this.eol();
						}
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					this.state = 90;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 4, this._ctx);
				} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public terminal_stmt(): Terminal_stmtContext {
		let localctx: Terminal_stmtContext = new Terminal_stmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 4, YiniParser.RULE_terminal_stmt);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 94;
			this.match(YiniParser.TERMINAL_TOKEN);
			this.state = 98;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===31 || _la===35) {
				{
				{
				this.state = 95;
				this.terminal_trivia();
				}
				}
				this.state = 100;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public terminal_trivia(): Terminal_triviaContext {
		let localctx: Terminal_triviaContext = new Terminal_triviaContext(this, this._ctx, this.state);
		this.enterRule(localctx, 6, YiniParser.RULE_terminal_trivia);
		try {
			this.state = 103;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 31:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 101;
				this.eol();
				}
				break;
			case 35:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 102;
				this.full_line_comment_stmt();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public stmt(): StmtContext {
		let localctx: StmtContext = new StmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 8, YiniParser.RULE_stmt);
		try {
			this.state = 113;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 31:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 105;
				this.eol();
				}
				break;
			case 35:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 106;
				this.full_line_comment_stmt();
				}
				break;
			case 34:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 107;
				this.disabled_line_stmt();
				}
				break;
			case 6:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 108;
				this.match(YiniParser.SECTION_HEAD);
				}
				break;
			case 7:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 109;
				this.invalid_section_stmt();
				}
				break;
			case 37:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 110;
				this.assignment();
				}
				break;
			case 2:
			case 3:
			case 4:
			case 40:
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 111;
				this.meta_stmt();
				}
				break;
			case 8:
			case 9:
			case 10:
			case 11:
			case 12:
			case 13:
			case 14:
			case 19:
			case 22:
			case 24:
			case 39:
				this.enterOuterAlt(localctx, 8);
				{
				this.state = 112;
				this.bad_member();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public full_line_comment_stmt(): Full_line_comment_stmtContext {
		let localctx: Full_line_comment_stmtContext = new Full_line_comment_stmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 10, YiniParser.RULE_full_line_comment_stmt);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 115;
			this.match(YiniParser.FULL_LINE_COMMENT);
			this.state = 117;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 9, this._ctx) ) {
			case 1:
				{
				this.state = 116;
				this.eol();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public disabled_line_stmt(): Disabled_line_stmtContext {
		let localctx: Disabled_line_stmtContext = new Disabled_line_stmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 12, YiniParser.RULE_disabled_line_stmt);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 119;
			this.match(YiniParser.DISABLED_LINE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public invalid_section_stmt(): Invalid_section_stmtContext {
		let localctx: Invalid_section_stmtContext = new Invalid_section_stmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 14, YiniParser.RULE_invalid_section_stmt);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 121;
			this.match(YiniParser.INVALID_SECTION_HEAD);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public meta_stmt(): Meta_stmtContext {
		let localctx: Meta_stmtContext = new Meta_stmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 16, YiniParser.RULE_meta_stmt);
		try {
			this.state = 128;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 2:
			case 3:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 123;
				this.directive();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 124;
				this.annotation();
				}
				break;
			case 40:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 125;
				this.bad_meta_text();
				this.state = 126;
				this.eol();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public directive(): DirectiveContext {
		let localctx: DirectiveContext = new DirectiveContext(this, this._ctx, this.state);
		this.enterRule(localctx, 18, YiniParser.RULE_directive);
		let _la: number;
		try {
			this.state = 136;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 2:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 130;
				this.yini_directive();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 131;
				this.match(YiniParser.INCLUDE_TOKEN);
				this.state = 133;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===13) {
					{
					this.state = 132;
					this.string_literal();
					}
				}

				this.state = 135;
				this.eol();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public yini_directive(): Yini_directiveContext {
		let localctx: Yini_directiveContext = new Yini_directiveContext(this, this._ctx, this.state);
		this.enterRule(localctx, 20, YiniParser.RULE_yini_directive);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 138;
			this.match(YiniParser.YINI_TOKEN);
			this.state = 140;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===37) {
				{
				this.state = 139;
				this.yini_mode_declaration();
				}
			}

			this.state = 142;
			this.eol();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public yini_mode_declaration(): Yini_mode_declarationContext {
		let localctx: Yini_mode_declarationContext = new Yini_mode_declarationContext(this, this._ctx, this.state);
		this.enterRule(localctx, 22, YiniParser.RULE_yini_mode_declaration);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 144;
			this.match(YiniParser.KEY);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public annotation(): AnnotationContext {
		let localctx: AnnotationContext = new AnnotationContext(this, this._ctx, this.state);
		this.enterRule(localctx, 24, YiniParser.RULE_annotation);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 146;
			this.match(YiniParser.DEPRECATED_TOKEN);
			this.state = 147;
			this.eol();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public eol(): EolContext {
		let localctx: EolContext = new EolContext(this, this._ctx, this.state);
		this.enterRule(localctx, 26, YiniParser.RULE_eol);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 150;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 149;
					this.match(YiniParser.NL);
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 152;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 14, this._ctx);
			} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public assignment(): AssignmentContext {
		let localctx: AssignmentContext = new AssignmentContext(this, this._ctx, this.state);
		this.enterRule(localctx, 28, YiniParser.RULE_assignment);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 154;
			this.member();
			this.state = 155;
			this.eol();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public member(): MemberContext {
		let localctx: MemberContext = new MemberContext(this, this._ctx, this.state);
		this.enterRule(localctx, 30, YiniParser.RULE_member);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 157;
			this.match(YiniParser.KEY);
			this.state = 158;
			this.match(YiniParser.EQ);
			this.state = 160;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 21004032) !== 0)) {
				{
				this.state = 159;
				this.value();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public value(): ValueContext {
		let localctx: ValueContext = new ValueContext(this, this._ctx, this.state);
		this.enterRule(localctx, 32, YiniParser.RULE_value);
		try {
			this.state = 166;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 16, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 162;
				this.concat_expression();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 163;
				this.scalar_value();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 164;
				this.list_literal();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 165;
				this.object_literal();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public scalar_value(): Scalar_valueContext {
		let localctx: Scalar_valueContext = new Scalar_valueContext(this, this._ctx, this.state);
		this.enterRule(localctx, 34, YiniParser.RULE_scalar_value);
		try {
			this.state = 172;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 10:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 168;
				this.null_literal();
				}
				break;
			case 13:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 169;
				this.string_literal();
				}
				break;
			case 14:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 170;
				this.number_literal();
				}
				break;
			case 8:
			case 9:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 171;
				this.boolean_literal();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public concat_expression(): Concat_expressionContext {
		let localctx: Concat_expressionContext = new Concat_expressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 36, YiniParser.RULE_concat_expression);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 174;
			this.match(YiniParser.STRING);
			this.state = 176;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 175;
				this.concat_tail();
				}
				}
				this.state = 178;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la===26);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public concat_tail(): Concat_tailContext {
		let localctx: Concat_tailContext = new Concat_tailContext(this, this._ctx, this.state);
		this.enterRule(localctx, 38, YiniParser.RULE_concat_tail);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 180;
			this.match(YiniParser.PLUS);
			this.state = 184;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===31) {
				{
				{
				this.state = 181;
				this.match(YiniParser.NL);
				}
				}
				this.state = 186;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 187;
			this.concat_operand();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public concat_operand(): Concat_operandContext {
		let localctx: Concat_operandContext = new Concat_operandContext(this, this._ctx, this.state);
		this.enterRule(localctx, 40, YiniParser.RULE_concat_operand);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 189;
			_la = this._input.LA(1);
			if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 26368) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public string_literal(): String_literalContext {
		let localctx: String_literalContext = new String_literalContext(this, this._ctx, this.state);
		this.enterRule(localctx, 42, YiniParser.RULE_string_literal);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 191;
			this.match(YiniParser.STRING);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public object_literal(): Object_literalContext {
		let localctx: Object_literalContext = new Object_literalContext(this, this._ctx, this.state);
		this.enterRule(localctx, 44, YiniParser.RULE_object_literal);
		let _la: number;
		try {
			let _alt: number;
			this.state = 223;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 24:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 193;
				this.match(YiniParser.OC);
				this.state = 197;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 20, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 194;
						this.match(YiniParser.NL);
						}
						}
					}
					this.state = 199;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 20, this._ctx);
				}
				this.state = 201;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===37) {
					{
					this.state = 200;
					this.object_members();
					}
				}

				this.state = 206;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===31) {
					{
					{
					this.state = 203;
					this.match(YiniParser.NL);
					}
					}
					this.state = 208;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 209;
				this.match(YiniParser.CC);
				this.state = 213;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 23, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 210;
						this.match(YiniParser.NL);
						}
						}
					}
					this.state = 215;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 23, this._ctx);
				}
				}
				break;
			case 11:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 216;
				this.match(YiniParser.EMPTY_OBJECT);
				this.state = 220;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 24, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 217;
						this.match(YiniParser.NL);
						}
						}
					}
					this.state = 222;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 24, this._ctx);
				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public object_members(): Object_membersContext {
		let localctx: Object_membersContext = new Object_membersContext(this, this._ctx, this.state);
		this.enterRule(localctx, 46, YiniParser.RULE_object_members);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 225;
			this.object_member();
			this.state = 236;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 27, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 226;
					this.match(YiniParser.COMMA);
					this.state = 230;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la===31) {
						{
						{
						this.state = 227;
						this.match(YiniParser.NL);
						}
						}
						this.state = 232;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					this.state = 233;
					this.object_member();
					}
					}
				}
				this.state = 238;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 27, this._ctx);
			}
			this.state = 240;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===20) {
				{
				this.state = 239;
				this.match(YiniParser.COMMA);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public object_member(): Object_memberContext {
		let localctx: Object_memberContext = new Object_memberContext(this, this._ctx, this.state);
		this.enterRule(localctx, 48, YiniParser.RULE_object_member);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 242;
			this.match(YiniParser.KEY);
			this.state = 243;
			this.object_member_separator();
			this.state = 244;
			this.value();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public object_member_separator(): Object_member_separatorContext {
		let localctx: Object_member_separatorContext = new Object_member_separatorContext(this, this._ctx, this.state);
		this.enterRule(localctx, 50, YiniParser.RULE_object_member_separator);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 246;
			_la = this._input.LA(1);
			if(!(_la===19 || _la===21)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public list_literal(): List_literalContext {
		let localctx: List_literalContext = new List_literalContext(this, this._ctx, this.state);
		this.enterRule(localctx, 52, YiniParser.RULE_list_literal);
		let _la: number;
		try {
			let _alt: number;
			this.state = 278;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 22:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 248;
				this.match(YiniParser.OB);
				this.state = 252;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 29, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 249;
						this.match(YiniParser.NL);
						}
						}
					}
					this.state = 254;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 29, this._ctx);
				}
				this.state = 256;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 21004032) !== 0)) {
					{
					this.state = 255;
					this.elements();
					}
				}

				this.state = 261;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===31) {
					{
					{
					this.state = 258;
					this.match(YiniParser.NL);
					}
					}
					this.state = 263;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 264;
				this.match(YiniParser.CB);
				this.state = 268;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 32, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 265;
						this.match(YiniParser.NL);
						}
						}
					}
					this.state = 270;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 32, this._ctx);
				}
				}
				break;
			case 12:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 271;
				this.match(YiniParser.EMPTY_LIST);
				this.state = 275;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 33, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 272;
						this.match(YiniParser.NL);
						}
						}
					}
					this.state = 277;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 33, this._ctx);
				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public elements(): ElementsContext {
		let localctx: ElementsContext = new ElementsContext(this, this._ctx, this.state);
		this.enterRule(localctx, 54, YiniParser.RULE_elements);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 280;
			this.value();
			this.state = 297;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 37, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 284;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la===31) {
						{
						{
						this.state = 281;
						this.match(YiniParser.NL);
						}
						}
						this.state = 286;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					this.state = 287;
					this.match(YiniParser.COMMA);
					this.state = 291;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la===31) {
						{
						{
						this.state = 288;
						this.match(YiniParser.NL);
						}
						}
						this.state = 293;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					this.state = 294;
					this.value();
					}
					}
				}
				this.state = 299;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 37, this._ctx);
			}
			this.state = 301;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===20) {
				{
				this.state = 300;
				this.match(YiniParser.COMMA);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public number_literal(): Number_literalContext {
		let localctx: Number_literalContext = new Number_literalContext(this, this._ctx, this.state);
		this.enterRule(localctx, 56, YiniParser.RULE_number_literal);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 303;
			this.match(YiniParser.NUMBER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public null_literal(): Null_literalContext {
		let localctx: Null_literalContext = new Null_literalContext(this, this._ctx, this.state);
		this.enterRule(localctx, 58, YiniParser.RULE_null_literal);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 305;
			this.match(YiniParser.NULL);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public boolean_literal(): Boolean_literalContext {
		let localctx: Boolean_literalContext = new Boolean_literalContext(this, this._ctx, this.state);
		this.enterRule(localctx, 60, YiniParser.RULE_boolean_literal);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 307;
			_la = this._input.LA(1);
			if(!(_la===8 || _la===9)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public bad_meta_text(): Bad_meta_textContext {
		let localctx: Bad_meta_textContext = new Bad_meta_textContext(this, this._ctx, this.state);
		this.enterRule(localctx, 62, YiniParser.RULE_bad_meta_text);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 309;
			this.match(YiniParser.META_INVALID);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public bad_member(): Bad_memberContext {
		let localctx: Bad_memberContext = new Bad_memberContext(this, this._ctx, this.state);
		this.enterRule(localctx, 64, YiniParser.RULE_bad_member);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 313;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 39:
				{
				this.state = 311;
				this.match(YiniParser.REST);
				}
				break;
			case 8:
			case 9:
			case 10:
			case 11:
			case 12:
			case 13:
			case 14:
			case 22:
			case 24:
				{
				this.state = 312;
				this.value();
				}
				break;
			case 19:
				break;
			default:
				break;
			}
			this.state = 315;
			this.match(YiniParser.EQ);
			this.state = 318;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 8:
			case 9:
			case 10:
			case 11:
			case 12:
			case 13:
			case 14:
			case 22:
			case 24:
				{
				this.state = 316;
				this.value();
				}
				break;
			case 39:
				{
				this.state = 317;
				this.match(YiniParser.REST);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 321;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 41, this._ctx) ) {
			case 1:
				{
				this.state = 320;
				this.eol();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public static readonly _serializedATN: number[] = [4,1,40,324,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,
	10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,
	7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,
	24,2,25,7,25,2,26,7,26,2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,
	2,32,7,32,1,0,3,0,68,8,0,1,0,5,0,71,8,0,10,0,12,0,74,9,0,1,0,3,0,77,8,0,
	1,0,1,0,1,1,1,1,5,1,83,8,1,10,1,12,1,86,9,1,1,1,4,1,89,8,1,11,1,12,1,90,
	3,1,93,8,1,1,2,1,2,5,2,97,8,2,10,2,12,2,100,9,2,1,3,1,3,3,3,104,8,3,1,4,
	1,4,1,4,1,4,1,4,1,4,1,4,1,4,3,4,114,8,4,1,5,1,5,3,5,118,8,5,1,6,1,6,1,7,
	1,7,1,8,1,8,1,8,1,8,1,8,3,8,129,8,8,1,9,1,9,1,9,3,9,134,8,9,1,9,3,9,137,
	8,9,1,10,1,10,3,10,141,8,10,1,10,1,10,1,11,1,11,1,12,1,12,1,12,1,13,4,13,
	151,8,13,11,13,12,13,152,1,14,1,14,1,14,1,15,1,15,1,15,3,15,161,8,15,1,
	16,1,16,1,16,1,16,3,16,167,8,16,1,17,1,17,1,17,1,17,3,17,173,8,17,1,18,
	1,18,4,18,177,8,18,11,18,12,18,178,1,19,1,19,5,19,183,8,19,10,19,12,19,
	186,9,19,1,19,1,19,1,20,1,20,1,21,1,21,1,22,1,22,5,22,196,8,22,10,22,12,
	22,199,9,22,1,22,3,22,202,8,22,1,22,5,22,205,8,22,10,22,12,22,208,9,22,
	1,22,1,22,5,22,212,8,22,10,22,12,22,215,9,22,1,22,1,22,5,22,219,8,22,10,
	22,12,22,222,9,22,3,22,224,8,22,1,23,1,23,1,23,5,23,229,8,23,10,23,12,23,
	232,9,23,1,23,5,23,235,8,23,10,23,12,23,238,9,23,1,23,3,23,241,8,23,1,24,
	1,24,1,24,1,24,1,25,1,25,1,26,1,26,5,26,251,8,26,10,26,12,26,254,9,26,1,
	26,3,26,257,8,26,1,26,5,26,260,8,26,10,26,12,26,263,9,26,1,26,1,26,5,26,
	267,8,26,10,26,12,26,270,9,26,1,26,1,26,5,26,274,8,26,10,26,12,26,277,9,
	26,3,26,279,8,26,1,27,1,27,5,27,283,8,27,10,27,12,27,286,9,27,1,27,1,27,
	5,27,290,8,27,10,27,12,27,293,9,27,1,27,5,27,296,8,27,10,27,12,27,299,9,
	27,1,27,3,27,302,8,27,1,28,1,28,1,29,1,29,1,30,1,30,1,31,1,31,1,32,1,32,
	3,32,314,8,32,1,32,1,32,1,32,3,32,319,8,32,1,32,3,32,322,8,32,1,32,0,0,
	33,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,
	50,52,54,56,58,60,62,64,0,3,2,0,8,10,13,14,2,0,19,19,21,21,1,0,8,9,344,
	0,67,1,0,0,0,2,92,1,0,0,0,4,94,1,0,0,0,6,103,1,0,0,0,8,113,1,0,0,0,10,115,
	1,0,0,0,12,119,1,0,0,0,14,121,1,0,0,0,16,128,1,0,0,0,18,136,1,0,0,0,20,
	138,1,0,0,0,22,144,1,0,0,0,24,146,1,0,0,0,26,150,1,0,0,0,28,154,1,0,0,0,
	30,157,1,0,0,0,32,166,1,0,0,0,34,172,1,0,0,0,36,174,1,0,0,0,38,180,1,0,
	0,0,40,189,1,0,0,0,42,191,1,0,0,0,44,223,1,0,0,0,46,225,1,0,0,0,48,242,
	1,0,0,0,50,246,1,0,0,0,52,278,1,0,0,0,54,280,1,0,0,0,56,303,1,0,0,0,58,
	305,1,0,0,0,60,307,1,0,0,0,62,309,1,0,0,0,64,313,1,0,0,0,66,68,3,2,1,0,
	67,66,1,0,0,0,67,68,1,0,0,0,68,72,1,0,0,0,69,71,3,8,4,0,70,69,1,0,0,0,71,
	74,1,0,0,0,72,70,1,0,0,0,72,73,1,0,0,0,73,76,1,0,0,0,74,72,1,0,0,0,75,77,
	3,4,2,0,76,75,1,0,0,0,76,77,1,0,0,0,77,78,1,0,0,0,78,79,5,0,0,1,79,1,1,
	0,0,0,80,84,5,1,0,0,81,83,3,26,13,0,82,81,1,0,0,0,83,86,1,0,0,0,84,82,1,
	0,0,0,84,85,1,0,0,0,85,93,1,0,0,0,86,84,1,0,0,0,87,89,3,26,13,0,88,87,1,
	0,0,0,89,90,1,0,0,0,90,88,1,0,0,0,90,91,1,0,0,0,91,93,1,0,0,0,92,80,1,0,
	0,0,92,88,1,0,0,0,93,3,1,0,0,0,94,98,5,5,0,0,95,97,3,6,3,0,96,95,1,0,0,
	0,97,100,1,0,0,0,98,96,1,0,0,0,98,99,1,0,0,0,99,5,1,0,0,0,100,98,1,0,0,
	0,101,104,3,26,13,0,102,104,3,10,5,0,103,101,1,0,0,0,103,102,1,0,0,0,104,
	7,1,0,0,0,105,114,3,26,13,0,106,114,3,10,5,0,107,114,3,12,6,0,108,114,5,
	6,0,0,109,114,3,14,7,0,110,114,3,28,14,0,111,114,3,16,8,0,112,114,3,64,
	32,0,113,105,1,0,0,0,113,106,1,0,0,0,113,107,1,0,0,0,113,108,1,0,0,0,113,
	109,1,0,0,0,113,110,1,0,0,0,113,111,1,0,0,0,113,112,1,0,0,0,114,9,1,0,0,
	0,115,117,5,35,0,0,116,118,3,26,13,0,117,116,1,0,0,0,117,118,1,0,0,0,118,
	11,1,0,0,0,119,120,5,34,0,0,120,13,1,0,0,0,121,122,5,7,0,0,122,15,1,0,0,
	0,123,129,3,18,9,0,124,129,3,24,12,0,125,126,3,62,31,0,126,127,3,26,13,
	0,127,129,1,0,0,0,128,123,1,0,0,0,128,124,1,0,0,0,128,125,1,0,0,0,129,17,
	1,0,0,0,130,137,3,20,10,0,131,133,5,3,0,0,132,134,3,42,21,0,133,132,1,0,
	0,0,133,134,1,0,0,0,134,135,1,0,0,0,135,137,3,26,13,0,136,130,1,0,0,0,136,
	131,1,0,0,0,137,19,1,0,0,0,138,140,5,2,0,0,139,141,3,22,11,0,140,139,1,
	0,0,0,140,141,1,0,0,0,141,142,1,0,0,0,142,143,3,26,13,0,143,21,1,0,0,0,
	144,145,5,37,0,0,145,23,1,0,0,0,146,147,5,4,0,0,147,148,3,26,13,0,148,25,
	1,0,0,0,149,151,5,31,0,0,150,149,1,0,0,0,151,152,1,0,0,0,152,150,1,0,0,
	0,152,153,1,0,0,0,153,27,1,0,0,0,154,155,3,30,15,0,155,156,3,26,13,0,156,
	29,1,0,0,0,157,158,5,37,0,0,158,160,5,19,0,0,159,161,3,32,16,0,160,159,
	1,0,0,0,160,161,1,0,0,0,161,31,1,0,0,0,162,167,3,36,18,0,163,167,3,34,17,
	0,164,167,3,52,26,0,165,167,3,44,22,0,166,162,1,0,0,0,166,163,1,0,0,0,166,
	164,1,0,0,0,166,165,1,0,0,0,167,33,1,0,0,0,168,173,3,58,29,0,169,173,3,
	42,21,0,170,173,3,56,28,0,171,173,3,60,30,0,172,168,1,0,0,0,172,169,1,0,
	0,0,172,170,1,0,0,0,172,171,1,0,0,0,173,35,1,0,0,0,174,176,5,13,0,0,175,
	177,3,38,19,0,176,175,1,0,0,0,177,178,1,0,0,0,178,176,1,0,0,0,178,179,1,
	0,0,0,179,37,1,0,0,0,180,184,5,26,0,0,181,183,5,31,0,0,182,181,1,0,0,0,
	183,186,1,0,0,0,184,182,1,0,0,0,184,185,1,0,0,0,185,187,1,0,0,0,186,184,
	1,0,0,0,187,188,3,40,20,0,188,39,1,0,0,0,189,190,7,0,0,0,190,41,1,0,0,0,
	191,192,5,13,0,0,192,43,1,0,0,0,193,197,5,24,0,0,194,196,5,31,0,0,195,194,
	1,0,0,0,196,199,1,0,0,0,197,195,1,0,0,0,197,198,1,0,0,0,198,201,1,0,0,0,
	199,197,1,0,0,0,200,202,3,46,23,0,201,200,1,0,0,0,201,202,1,0,0,0,202,206,
	1,0,0,0,203,205,5,31,0,0,204,203,1,0,0,0,205,208,1,0,0,0,206,204,1,0,0,
	0,206,207,1,0,0,0,207,209,1,0,0,0,208,206,1,0,0,0,209,213,5,25,0,0,210,
	212,5,31,0,0,211,210,1,0,0,0,212,215,1,0,0,0,213,211,1,0,0,0,213,214,1,
	0,0,0,214,224,1,0,0,0,215,213,1,0,0,0,216,220,5,11,0,0,217,219,5,31,0,0,
	218,217,1,0,0,0,219,222,1,0,0,0,220,218,1,0,0,0,220,221,1,0,0,0,221,224,
	1,0,0,0,222,220,1,0,0,0,223,193,1,0,0,0,223,216,1,0,0,0,224,45,1,0,0,0,
	225,236,3,48,24,0,226,230,5,20,0,0,227,229,5,31,0,0,228,227,1,0,0,0,229,
	232,1,0,0,0,230,228,1,0,0,0,230,231,1,0,0,0,231,233,1,0,0,0,232,230,1,0,
	0,0,233,235,3,48,24,0,234,226,1,0,0,0,235,238,1,0,0,0,236,234,1,0,0,0,236,
	237,1,0,0,0,237,240,1,0,0,0,238,236,1,0,0,0,239,241,5,20,0,0,240,239,1,
	0,0,0,240,241,1,0,0,0,241,47,1,0,0,0,242,243,5,37,0,0,243,244,3,50,25,0,
	244,245,3,32,16,0,245,49,1,0,0,0,246,247,7,1,0,0,247,51,1,0,0,0,248,252,
	5,22,0,0,249,251,5,31,0,0,250,249,1,0,0,0,251,254,1,0,0,0,252,250,1,0,0,
	0,252,253,1,0,0,0,253,256,1,0,0,0,254,252,1,0,0,0,255,257,3,54,27,0,256,
	255,1,0,0,0,256,257,1,0,0,0,257,261,1,0,0,0,258,260,5,31,0,0,259,258,1,
	0,0,0,260,263,1,0,0,0,261,259,1,0,0,0,261,262,1,0,0,0,262,264,1,0,0,0,263,
	261,1,0,0,0,264,268,5,23,0,0,265,267,5,31,0,0,266,265,1,0,0,0,267,270,1,
	0,0,0,268,266,1,0,0,0,268,269,1,0,0,0,269,279,1,0,0,0,270,268,1,0,0,0,271,
	275,5,12,0,0,272,274,5,31,0,0,273,272,1,0,0,0,274,277,1,0,0,0,275,273,1,
	0,0,0,275,276,1,0,0,0,276,279,1,0,0,0,277,275,1,0,0,0,278,248,1,0,0,0,278,
	271,1,0,0,0,279,53,1,0,0,0,280,297,3,32,16,0,281,283,5,31,0,0,282,281,1,
	0,0,0,283,286,1,0,0,0,284,282,1,0,0,0,284,285,1,0,0,0,285,287,1,0,0,0,286,
	284,1,0,0,0,287,291,5,20,0,0,288,290,5,31,0,0,289,288,1,0,0,0,290,293,1,
	0,0,0,291,289,1,0,0,0,291,292,1,0,0,0,292,294,1,0,0,0,293,291,1,0,0,0,294,
	296,3,32,16,0,295,284,1,0,0,0,296,299,1,0,0,0,297,295,1,0,0,0,297,298,1,
	0,0,0,298,301,1,0,0,0,299,297,1,0,0,0,300,302,5,20,0,0,301,300,1,0,0,0,
	301,302,1,0,0,0,302,55,1,0,0,0,303,304,5,14,0,0,304,57,1,0,0,0,305,306,
	5,10,0,0,306,59,1,0,0,0,307,308,7,2,0,0,308,61,1,0,0,0,309,310,5,40,0,0,
	310,63,1,0,0,0,311,314,5,39,0,0,312,314,3,32,16,0,313,311,1,0,0,0,313,312,
	1,0,0,0,313,314,1,0,0,0,314,315,1,0,0,0,315,318,5,19,0,0,316,319,3,32,16,
	0,317,319,5,39,0,0,318,316,1,0,0,0,318,317,1,0,0,0,319,321,1,0,0,0,320,
	322,3,26,13,0,321,320,1,0,0,0,321,322,1,0,0,0,322,65,1,0,0,0,42,67,72,76,
	84,90,92,98,103,113,117,128,133,136,140,152,160,166,172,178,184,197,201,
	206,213,220,223,230,236,240,252,256,261,268,275,278,284,291,297,301,313,
	318,321];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!YiniParser.__ATN) {
			YiniParser.__ATN = new ATNDeserializer().deserialize(YiniParser._serializedATN);
		}

		return YiniParser.__ATN;
	}


	static DecisionsToDFA = YiniParser._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );

}

export class YiniContext extends ParserRuleContext {
	constructor(parser?: YiniParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public EOF(): TerminalNode {
		return this.getToken(YiniParser.EOF, 0);
	}
	public prolog(): PrologContext {
		return this.getTypedRuleContext(PrologContext, 0) as PrologContext;
	}
	public stmt_list(): StmtContext[] {
		return this.getTypedRuleContexts(StmtContext) as StmtContext[];
	}
	public stmt(i: number): StmtContext {
		return this.getTypedRuleContext(StmtContext, i) as StmtContext;
	}
	public terminal_stmt(): Terminal_stmtContext {
		return this.getTypedRuleContext(Terminal_stmtContext, 0) as Terminal_stmtContext;
	}
    public get ruleIndex(): number {
    	return YiniParser.RULE_yini;
	}
	// @Override
	public accept<Result>(visitor: YiniParserVisitor<Result>): Result {
		if (visitor.visitYini) {
			return visitor.visitYini(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PrologContext extends ParserRuleContext {
	constructor(parser?: YiniParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public SHEBANG(): TerminalNode {
		return this.getToken(YiniParser.SHEBANG, 0);
	}
	public eol_list(): EolContext[] {
		return this.getTypedRuleContexts(EolContext) as EolContext[];
	}
	public eol(i: number): EolContext {
		return this.getTypedRuleContext(EolContext, i) as EolContext;
	}
    public get ruleIndex(): number {
    	return YiniParser.RULE_prolog;
	}
	// @Override
	public accept<Result>(visitor: YiniParserVisitor<Result>): Result {
		if (visitor.visitProlog) {
			return visitor.visitProlog(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Terminal_stmtContext extends ParserRuleContext {
	constructor(parser?: YiniParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public TERMINAL_TOKEN(): TerminalNode {
		return this.getToken(YiniParser.TERMINAL_TOKEN, 0);
	}
	public terminal_trivia_list(): Terminal_triviaContext[] {
		return this.getTypedRuleContexts(Terminal_triviaContext) as Terminal_triviaContext[];
	}
	public terminal_trivia(i: number): Terminal_triviaContext {
		return this.getTypedRuleContext(Terminal_triviaContext, i) as Terminal_triviaContext;
	}
    public get ruleIndex(): number {
    	return YiniParser.RULE_terminal_stmt;
	}
	// @Override
	public accept<Result>(visitor: YiniParserVisitor<Result>): Result {
		if (visitor.visitTerminal_stmt) {
			return visitor.visitTerminal_stmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Terminal_triviaContext extends ParserRuleContext {
	constructor(parser?: YiniParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public eol(): EolContext {
		return this.getTypedRuleContext(EolContext, 0) as EolContext;
	}
	public full_line_comment_stmt(): Full_line_comment_stmtContext {
		return this.getTypedRuleContext(Full_line_comment_stmtContext, 0) as Full_line_comment_stmtContext;
	}
    public get ruleIndex(): number {
    	return YiniParser.RULE_terminal_trivia;
	}
	// @Override
	public accept<Result>(visitor: YiniParserVisitor<Result>): Result {
		if (visitor.visitTerminal_trivia) {
			return visitor.visitTerminal_trivia(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StmtContext extends ParserRuleContext {
	constructor(parser?: YiniParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public eol(): EolContext {
		return this.getTypedRuleContext(EolContext, 0) as EolContext;
	}
	public full_line_comment_stmt(): Full_line_comment_stmtContext {
		return this.getTypedRuleContext(Full_line_comment_stmtContext, 0) as Full_line_comment_stmtContext;
	}
	public disabled_line_stmt(): Disabled_line_stmtContext {
		return this.getTypedRuleContext(Disabled_line_stmtContext, 0) as Disabled_line_stmtContext;
	}
	public SECTION_HEAD(): TerminalNode {
		return this.getToken(YiniParser.SECTION_HEAD, 0);
	}
	public invalid_section_stmt(): Invalid_section_stmtContext {
		return this.getTypedRuleContext(Invalid_section_stmtContext, 0) as Invalid_section_stmtContext;
	}
	public assignment(): AssignmentContext {
		return this.getTypedRuleContext(AssignmentContext, 0) as AssignmentContext;
	}
	public meta_stmt(): Meta_stmtContext {
		return this.getTypedRuleContext(Meta_stmtContext, 0) as Meta_stmtContext;
	}
	public bad_member(): Bad_memberContext {
		return this.getTypedRuleContext(Bad_memberContext, 0) as Bad_memberContext;
	}
    public get ruleIndex(): number {
    	return YiniParser.RULE_stmt;
	}
	// @Override
	public accept<Result>(visitor: YiniParserVisitor<Result>): Result {
		if (visitor.visitStmt) {
			return visitor.visitStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Full_line_comment_stmtContext extends ParserRuleContext {
	constructor(parser?: YiniParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public FULL_LINE_COMMENT(): TerminalNode {
		return this.getToken(YiniParser.FULL_LINE_COMMENT, 0);
	}
	public eol(): EolContext {
		return this.getTypedRuleContext(EolContext, 0) as EolContext;
	}
    public get ruleIndex(): number {
    	return YiniParser.RULE_full_line_comment_stmt;
	}
	// @Override
	public accept<Result>(visitor: YiniParserVisitor<Result>): Result {
		if (visitor.visitFull_line_comment_stmt) {
			return visitor.visitFull_line_comment_stmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Disabled_line_stmtContext extends ParserRuleContext {
	constructor(parser?: YiniParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public DISABLED_LINE(): TerminalNode {
		return this.getToken(YiniParser.DISABLED_LINE, 0);
	}
    public get ruleIndex(): number {
    	return YiniParser.RULE_disabled_line_stmt;
	}
	// @Override
	public accept<Result>(visitor: YiniParserVisitor<Result>): Result {
		if (visitor.visitDisabled_line_stmt) {
			return visitor.visitDisabled_line_stmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Invalid_section_stmtContext extends ParserRuleContext {
	constructor(parser?: YiniParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public INVALID_SECTION_HEAD(): TerminalNode {
		return this.getToken(YiniParser.INVALID_SECTION_HEAD, 0);
	}
    public get ruleIndex(): number {
    	return YiniParser.RULE_invalid_section_stmt;
	}
	// @Override
	public accept<Result>(visitor: YiniParserVisitor<Result>): Result {
		if (visitor.visitInvalid_section_stmt) {
			return visitor.visitInvalid_section_stmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Meta_stmtContext extends ParserRuleContext {
	constructor(parser?: YiniParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public directive(): DirectiveContext {
		return this.getTypedRuleContext(DirectiveContext, 0) as DirectiveContext;
	}
	public annotation(): AnnotationContext {
		return this.getTypedRuleContext(AnnotationContext, 0) as AnnotationContext;
	}
	public bad_meta_text(): Bad_meta_textContext {
		return this.getTypedRuleContext(Bad_meta_textContext, 0) as Bad_meta_textContext;
	}
	public eol(): EolContext {
		return this.getTypedRuleContext(EolContext, 0) as EolContext;
	}
    public get ruleIndex(): number {
    	return YiniParser.RULE_meta_stmt;
	}
	// @Override
	public accept<Result>(visitor: YiniParserVisitor<Result>): Result {
		if (visitor.visitMeta_stmt) {
			return visitor.visitMeta_stmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DirectiveContext extends ParserRuleContext {
	constructor(parser?: YiniParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public yini_directive(): Yini_directiveContext {
		return this.getTypedRuleContext(Yini_directiveContext, 0) as Yini_directiveContext;
	}
	public INCLUDE_TOKEN(): TerminalNode {
		return this.getToken(YiniParser.INCLUDE_TOKEN, 0);
	}
	public eol(): EolContext {
		return this.getTypedRuleContext(EolContext, 0) as EolContext;
	}
	public string_literal(): String_literalContext {
		return this.getTypedRuleContext(String_literalContext, 0) as String_literalContext;
	}
    public get ruleIndex(): number {
    	return YiniParser.RULE_directive;
	}
	// @Override
	public accept<Result>(visitor: YiniParserVisitor<Result>): Result {
		if (visitor.visitDirective) {
			return visitor.visitDirective(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Yini_directiveContext extends ParserRuleContext {
	constructor(parser?: YiniParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public YINI_TOKEN(): TerminalNode {
		return this.getToken(YiniParser.YINI_TOKEN, 0);
	}
	public eol(): EolContext {
		return this.getTypedRuleContext(EolContext, 0) as EolContext;
	}
	public yini_mode_declaration(): Yini_mode_declarationContext {
		return this.getTypedRuleContext(Yini_mode_declarationContext, 0) as Yini_mode_declarationContext;
	}
    public get ruleIndex(): number {
    	return YiniParser.RULE_yini_directive;
	}
	// @Override
	public accept<Result>(visitor: YiniParserVisitor<Result>): Result {
		if (visitor.visitYini_directive) {
			return visitor.visitYini_directive(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Yini_mode_declarationContext extends ParserRuleContext {
	constructor(parser?: YiniParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public KEY(): TerminalNode {
		return this.getToken(YiniParser.KEY, 0);
	}
    public get ruleIndex(): number {
    	return YiniParser.RULE_yini_mode_declaration;
	}
	// @Override
	public accept<Result>(visitor: YiniParserVisitor<Result>): Result {
		if (visitor.visitYini_mode_declaration) {
			return visitor.visitYini_mode_declaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AnnotationContext extends ParserRuleContext {
	constructor(parser?: YiniParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public DEPRECATED_TOKEN(): TerminalNode {
		return this.getToken(YiniParser.DEPRECATED_TOKEN, 0);
	}
	public eol(): EolContext {
		return this.getTypedRuleContext(EolContext, 0) as EolContext;
	}
    public get ruleIndex(): number {
    	return YiniParser.RULE_annotation;
	}
	// @Override
	public accept<Result>(visitor: YiniParserVisitor<Result>): Result {
		if (visitor.visitAnnotation) {
			return visitor.visitAnnotation(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EolContext extends ParserRuleContext {
	constructor(parser?: YiniParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public NL_list(): TerminalNode[] {
	    	return this.getTokens(YiniParser.NL);
	}
	public NL(i: number): TerminalNode {
		return this.getToken(YiniParser.NL, i);
	}
    public get ruleIndex(): number {
    	return YiniParser.RULE_eol;
	}
	// @Override
	public accept<Result>(visitor: YiniParserVisitor<Result>): Result {
		if (visitor.visitEol) {
			return visitor.visitEol(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AssignmentContext extends ParserRuleContext {
	constructor(parser?: YiniParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public member(): MemberContext {
		return this.getTypedRuleContext(MemberContext, 0) as MemberContext;
	}
	public eol(): EolContext {
		return this.getTypedRuleContext(EolContext, 0) as EolContext;
	}
    public get ruleIndex(): number {
    	return YiniParser.RULE_assignment;
	}
	// @Override
	public accept<Result>(visitor: YiniParserVisitor<Result>): Result {
		if (visitor.visitAssignment) {
			return visitor.visitAssignment(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MemberContext extends ParserRuleContext {
	constructor(parser?: YiniParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public KEY(): TerminalNode {
		return this.getToken(YiniParser.KEY, 0);
	}
	public EQ(): TerminalNode {
		return this.getToken(YiniParser.EQ, 0);
	}
	public value(): ValueContext {
		return this.getTypedRuleContext(ValueContext, 0) as ValueContext;
	}
    public get ruleIndex(): number {
    	return YiniParser.RULE_member;
	}
	// @Override
	public accept<Result>(visitor: YiniParserVisitor<Result>): Result {
		if (visitor.visitMember) {
			return visitor.visitMember(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ValueContext extends ParserRuleContext {
	constructor(parser?: YiniParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public concat_expression(): Concat_expressionContext {
		return this.getTypedRuleContext(Concat_expressionContext, 0) as Concat_expressionContext;
	}
	public scalar_value(): Scalar_valueContext {
		return this.getTypedRuleContext(Scalar_valueContext, 0) as Scalar_valueContext;
	}
	public list_literal(): List_literalContext {
		return this.getTypedRuleContext(List_literalContext, 0) as List_literalContext;
	}
	public object_literal(): Object_literalContext {
		return this.getTypedRuleContext(Object_literalContext, 0) as Object_literalContext;
	}
    public get ruleIndex(): number {
    	return YiniParser.RULE_value;
	}
	// @Override
	public accept<Result>(visitor: YiniParserVisitor<Result>): Result {
		if (visitor.visitValue) {
			return visitor.visitValue(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Scalar_valueContext extends ParserRuleContext {
	constructor(parser?: YiniParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public null_literal(): Null_literalContext {
		return this.getTypedRuleContext(Null_literalContext, 0) as Null_literalContext;
	}
	public string_literal(): String_literalContext {
		return this.getTypedRuleContext(String_literalContext, 0) as String_literalContext;
	}
	public number_literal(): Number_literalContext {
		return this.getTypedRuleContext(Number_literalContext, 0) as Number_literalContext;
	}
	public boolean_literal(): Boolean_literalContext {
		return this.getTypedRuleContext(Boolean_literalContext, 0) as Boolean_literalContext;
	}
    public get ruleIndex(): number {
    	return YiniParser.RULE_scalar_value;
	}
	// @Override
	public accept<Result>(visitor: YiniParserVisitor<Result>): Result {
		if (visitor.visitScalar_value) {
			return visitor.visitScalar_value(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Concat_expressionContext extends ParserRuleContext {
	constructor(parser?: YiniParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public STRING(): TerminalNode {
		return this.getToken(YiniParser.STRING, 0);
	}
	public concat_tail_list(): Concat_tailContext[] {
		return this.getTypedRuleContexts(Concat_tailContext) as Concat_tailContext[];
	}
	public concat_tail(i: number): Concat_tailContext {
		return this.getTypedRuleContext(Concat_tailContext, i) as Concat_tailContext;
	}
    public get ruleIndex(): number {
    	return YiniParser.RULE_concat_expression;
	}
	// @Override
	public accept<Result>(visitor: YiniParserVisitor<Result>): Result {
		if (visitor.visitConcat_expression) {
			return visitor.visitConcat_expression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Concat_tailContext extends ParserRuleContext {
	constructor(parser?: YiniParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public PLUS(): TerminalNode {
		return this.getToken(YiniParser.PLUS, 0);
	}
	public concat_operand(): Concat_operandContext {
		return this.getTypedRuleContext(Concat_operandContext, 0) as Concat_operandContext;
	}
	public NL_list(): TerminalNode[] {
	    	return this.getTokens(YiniParser.NL);
	}
	public NL(i: number): TerminalNode {
		return this.getToken(YiniParser.NL, i);
	}
    public get ruleIndex(): number {
    	return YiniParser.RULE_concat_tail;
	}
	// @Override
	public accept<Result>(visitor: YiniParserVisitor<Result>): Result {
		if (visitor.visitConcat_tail) {
			return visitor.visitConcat_tail(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Concat_operandContext extends ParserRuleContext {
	constructor(parser?: YiniParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public STRING(): TerminalNode {
		return this.getToken(YiniParser.STRING, 0);
	}
	public NUMBER(): TerminalNode {
		return this.getToken(YiniParser.NUMBER, 0);
	}
	public BOOLEAN_TRUE(): TerminalNode {
		return this.getToken(YiniParser.BOOLEAN_TRUE, 0);
	}
	public BOOLEAN_FALSE(): TerminalNode {
		return this.getToken(YiniParser.BOOLEAN_FALSE, 0);
	}
	public NULL(): TerminalNode {
		return this.getToken(YiniParser.NULL, 0);
	}
    public get ruleIndex(): number {
    	return YiniParser.RULE_concat_operand;
	}
	// @Override
	public accept<Result>(visitor: YiniParserVisitor<Result>): Result {
		if (visitor.visitConcat_operand) {
			return visitor.visitConcat_operand(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class String_literalContext extends ParserRuleContext {
	constructor(parser?: YiniParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public STRING(): TerminalNode {
		return this.getToken(YiniParser.STRING, 0);
	}
    public get ruleIndex(): number {
    	return YiniParser.RULE_string_literal;
	}
	// @Override
	public accept<Result>(visitor: YiniParserVisitor<Result>): Result {
		if (visitor.visitString_literal) {
			return visitor.visitString_literal(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Object_literalContext extends ParserRuleContext {
	constructor(parser?: YiniParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public OC(): TerminalNode {
		return this.getToken(YiniParser.OC, 0);
	}
	public CC(): TerminalNode {
		return this.getToken(YiniParser.CC, 0);
	}
	public NL_list(): TerminalNode[] {
	    	return this.getTokens(YiniParser.NL);
	}
	public NL(i: number): TerminalNode {
		return this.getToken(YiniParser.NL, i);
	}
	public object_members(): Object_membersContext {
		return this.getTypedRuleContext(Object_membersContext, 0) as Object_membersContext;
	}
	public EMPTY_OBJECT(): TerminalNode {
		return this.getToken(YiniParser.EMPTY_OBJECT, 0);
	}
    public get ruleIndex(): number {
    	return YiniParser.RULE_object_literal;
	}
	// @Override
	public accept<Result>(visitor: YiniParserVisitor<Result>): Result {
		if (visitor.visitObject_literal) {
			return visitor.visitObject_literal(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Object_membersContext extends ParserRuleContext {
	constructor(parser?: YiniParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public object_member_list(): Object_memberContext[] {
		return this.getTypedRuleContexts(Object_memberContext) as Object_memberContext[];
	}
	public object_member(i: number): Object_memberContext {
		return this.getTypedRuleContext(Object_memberContext, i) as Object_memberContext;
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(YiniParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(YiniParser.COMMA, i);
	}
	public NL_list(): TerminalNode[] {
	    	return this.getTokens(YiniParser.NL);
	}
	public NL(i: number): TerminalNode {
		return this.getToken(YiniParser.NL, i);
	}
    public get ruleIndex(): number {
    	return YiniParser.RULE_object_members;
	}
	// @Override
	public accept<Result>(visitor: YiniParserVisitor<Result>): Result {
		if (visitor.visitObject_members) {
			return visitor.visitObject_members(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Object_memberContext extends ParserRuleContext {
	constructor(parser?: YiniParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public KEY(): TerminalNode {
		return this.getToken(YiniParser.KEY, 0);
	}
	public object_member_separator(): Object_member_separatorContext {
		return this.getTypedRuleContext(Object_member_separatorContext, 0) as Object_member_separatorContext;
	}
	public value(): ValueContext {
		return this.getTypedRuleContext(ValueContext, 0) as ValueContext;
	}
    public get ruleIndex(): number {
    	return YiniParser.RULE_object_member;
	}
	// @Override
	public accept<Result>(visitor: YiniParserVisitor<Result>): Result {
		if (visitor.visitObject_member) {
			return visitor.visitObject_member(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Object_member_separatorContext extends ParserRuleContext {
	constructor(parser?: YiniParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public COLON(): TerminalNode {
		return this.getToken(YiniParser.COLON, 0);
	}
	public EQ(): TerminalNode {
		return this.getToken(YiniParser.EQ, 0);
	}
    public get ruleIndex(): number {
    	return YiniParser.RULE_object_member_separator;
	}
	// @Override
	public accept<Result>(visitor: YiniParserVisitor<Result>): Result {
		if (visitor.visitObject_member_separator) {
			return visitor.visitObject_member_separator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class List_literalContext extends ParserRuleContext {
	constructor(parser?: YiniParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public OB(): TerminalNode {
		return this.getToken(YiniParser.OB, 0);
	}
	public CB(): TerminalNode {
		return this.getToken(YiniParser.CB, 0);
	}
	public NL_list(): TerminalNode[] {
	    	return this.getTokens(YiniParser.NL);
	}
	public NL(i: number): TerminalNode {
		return this.getToken(YiniParser.NL, i);
	}
	public elements(): ElementsContext {
		return this.getTypedRuleContext(ElementsContext, 0) as ElementsContext;
	}
	public EMPTY_LIST(): TerminalNode {
		return this.getToken(YiniParser.EMPTY_LIST, 0);
	}
    public get ruleIndex(): number {
    	return YiniParser.RULE_list_literal;
	}
	// @Override
	public accept<Result>(visitor: YiniParserVisitor<Result>): Result {
		if (visitor.visitList_literal) {
			return visitor.visitList_literal(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ElementsContext extends ParserRuleContext {
	constructor(parser?: YiniParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public value_list(): ValueContext[] {
		return this.getTypedRuleContexts(ValueContext) as ValueContext[];
	}
	public value(i: number): ValueContext {
		return this.getTypedRuleContext(ValueContext, i) as ValueContext;
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(YiniParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(YiniParser.COMMA, i);
	}
	public NL_list(): TerminalNode[] {
	    	return this.getTokens(YiniParser.NL);
	}
	public NL(i: number): TerminalNode {
		return this.getToken(YiniParser.NL, i);
	}
    public get ruleIndex(): number {
    	return YiniParser.RULE_elements;
	}
	// @Override
	public accept<Result>(visitor: YiniParserVisitor<Result>): Result {
		if (visitor.visitElements) {
			return visitor.visitElements(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Number_literalContext extends ParserRuleContext {
	constructor(parser?: YiniParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public NUMBER(): TerminalNode {
		return this.getToken(YiniParser.NUMBER, 0);
	}
    public get ruleIndex(): number {
    	return YiniParser.RULE_number_literal;
	}
	// @Override
	public accept<Result>(visitor: YiniParserVisitor<Result>): Result {
		if (visitor.visitNumber_literal) {
			return visitor.visitNumber_literal(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Null_literalContext extends ParserRuleContext {
	constructor(parser?: YiniParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public NULL(): TerminalNode {
		return this.getToken(YiniParser.NULL, 0);
	}
    public get ruleIndex(): number {
    	return YiniParser.RULE_null_literal;
	}
	// @Override
	public accept<Result>(visitor: YiniParserVisitor<Result>): Result {
		if (visitor.visitNull_literal) {
			return visitor.visitNull_literal(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Boolean_literalContext extends ParserRuleContext {
	constructor(parser?: YiniParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public BOOLEAN_TRUE(): TerminalNode {
		return this.getToken(YiniParser.BOOLEAN_TRUE, 0);
	}
	public BOOLEAN_FALSE(): TerminalNode {
		return this.getToken(YiniParser.BOOLEAN_FALSE, 0);
	}
    public get ruleIndex(): number {
    	return YiniParser.RULE_boolean_literal;
	}
	// @Override
	public accept<Result>(visitor: YiniParserVisitor<Result>): Result {
		if (visitor.visitBoolean_literal) {
			return visitor.visitBoolean_literal(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Bad_meta_textContext extends ParserRuleContext {
	constructor(parser?: YiniParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public META_INVALID(): TerminalNode {
		return this.getToken(YiniParser.META_INVALID, 0);
	}
    public get ruleIndex(): number {
    	return YiniParser.RULE_bad_meta_text;
	}
	// @Override
	public accept<Result>(visitor: YiniParserVisitor<Result>): Result {
		if (visitor.visitBad_meta_text) {
			return visitor.visitBad_meta_text(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Bad_memberContext extends ParserRuleContext {
	constructor(parser?: YiniParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public EQ(): TerminalNode {
		return this.getToken(YiniParser.EQ, 0);
	}
	public value_list(): ValueContext[] {
		return this.getTypedRuleContexts(ValueContext) as ValueContext[];
	}
	public value(i: number): ValueContext {
		return this.getTypedRuleContext(ValueContext, i) as ValueContext;
	}
	public REST_list(): TerminalNode[] {
	    	return this.getTokens(YiniParser.REST);
	}
	public REST(i: number): TerminalNode {
		return this.getToken(YiniParser.REST, i);
	}
	public eol(): EolContext {
		return this.getTypedRuleContext(EolContext, 0) as EolContext;
	}
    public get ruleIndex(): number {
    	return YiniParser.RULE_bad_member;
	}
	// @Override
	public accept<Result>(visitor: YiniParserVisitor<Result>): Result {
		if (visitor.visitBad_member) {
			return visitor.visitBad_member(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
