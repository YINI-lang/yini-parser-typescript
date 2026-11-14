// Generated from ./grammar/v1.0.0-rc.6x/YiniParser.g4 by ANTLR 4.13.2
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
	public static readonly MINUS = 27;
	public static readonly DOLLAR = 28;
	public static readonly PC = 29;
	public static readonly AT = 30;
	public static readonly SEMICOLON = 31;
	public static readonly NL = 32;
	public static readonly WS = 33;
	public static readonly BLOCK_COMMENT = 34;
	public static readonly DISABLED_LINE = 35;
	public static readonly FULL_LINE_COMMENT = 36;
	public static readonly INLINE_COMMENT = 37;
	public static readonly KEY = 38;
	public static readonly IDENT_INVALID = 39;
	public static readonly REST = 40;
	public static readonly META_INVALID = 41;
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
	public static readonly RULE_line_end = 14;
	public static readonly RULE_assignment = 15;
	public static readonly RULE_identifier = 16;
	public static readonly RULE_member = 17;
	public static readonly RULE_value = 18;
	public static readonly RULE_scalar_value = 19;
	public static readonly RULE_concat_expression = 20;
	public static readonly RULE_concat_tail = 21;
	public static readonly RULE_concat_operand = 22;
	public static readonly RULE_string_literal = 23;
	public static readonly RULE_object_literal = 24;
	public static readonly RULE_object_members = 25;
	public static readonly RULE_object_member = 26;
	public static readonly RULE_object_member_separator = 27;
	public static readonly RULE_list_literal = 28;
	public static readonly RULE_elements = 29;
	public static readonly RULE_multiline_trivia = 30;
	public static readonly RULE_number_literal = 31;
	public static readonly RULE_null_literal = 32;
	public static readonly RULE_boolean_literal = 33;
	public static readonly RULE_bad_meta_text = 34;
	public static readonly RULE_bad_member = 35;
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
                                                            "'-'", "'$'", 
                                                            "'%'", "'@'", 
                                                            "';'" ];
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
                                                             "MINUS", "DOLLAR", 
                                                             "PC", "AT", 
                                                             "SEMICOLON", 
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
		"yini_directive", "yini_mode_declaration", "annotation", "eol", "line_end", 
		"assignment", "identifier", "member", "value", "scalar_value", "concat_expression", 
		"concat_tail", "concat_operand", "string_literal", "object_literal", "object_members", 
		"object_member", "object_member_separator", "list_literal", "elements", 
		"multiline_trivia", "number_literal", "null_literal", "boolean_literal", 
		"bad_meta_text", "bad_member",
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
			this.state = 73;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 0, this._ctx) ) {
			case 1:
				{
				this.state = 72;
				this.prolog();
				}
				break;
			}
			this.state = 78;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 222855132) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 857) !== 0)) {
				{
				{
				this.state = 75;
				this.stmt();
				}
				}
				this.state = 80;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 82;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===5) {
				{
				this.state = 81;
				this.terminal_stmt();
				}
			}

			this.state = 84;
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
			this.state = 98;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 86;
				this.match(YiniParser.SHEBANG);
				this.state = 90;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 3, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 87;
						this.eol();
						}
						}
					}
					this.state = 92;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 3, this._ctx);
				}
				}
				break;
			case 32:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 94;
				this._errHandler.sync(this);
				_alt = 1;
				do {
					switch (_alt) {
					case 1:
						{
						{
						this.state = 93;
						this.eol();
						}
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					this.state = 96;
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
			this.state = 100;
			this.match(YiniParser.TERMINAL_TOKEN);
			this.state = 104;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===32 || _la===36) {
				{
				{
				this.state = 101;
				this.terminal_trivia();
				}
				}
				this.state = 106;
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
			this.state = 109;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 32:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 107;
				this.eol();
				}
				break;
			case 36:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 108;
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
			this.state = 119;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 8, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 111;
				this.eol();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 112;
				this.full_line_comment_stmt();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 113;
				this.disabled_line_stmt();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 114;
				this.match(YiniParser.SECTION_HEAD);
				}
				break;
			case 5:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 115;
				this.invalid_section_stmt();
				}
				break;
			case 6:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 116;
				this.assignment();
				}
				break;
			case 7:
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 117;
				this.meta_stmt();
				}
				break;
			case 8:
				this.enterOuterAlt(localctx, 8);
				{
				this.state = 118;
				this.bad_member();
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
	public full_line_comment_stmt(): Full_line_comment_stmtContext {
		let localctx: Full_line_comment_stmtContext = new Full_line_comment_stmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 10, YiniParser.RULE_full_line_comment_stmt);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 121;
			this.match(YiniParser.FULL_LINE_COMMENT);
			this.state = 123;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 9, this._ctx) ) {
			case 1:
				{
				this.state = 122;
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
			this.state = 125;
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
			this.state = 127;
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
			this.state = 134;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 2:
			case 3:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 129;
				this.directive();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 130;
				this.annotation();
				}
				break;
			case 41:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 131;
				this.bad_meta_text();
				this.state = 132;
				this.line_end();
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
			this.state = 142;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 2:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 136;
				this.yini_directive();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 137;
				this.match(YiniParser.INCLUDE_TOKEN);
				this.state = 139;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===13) {
					{
					this.state = 138;
					this.string_literal();
					}
				}

				this.state = 141;
				this.line_end();
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
			this.state = 144;
			this.match(YiniParser.YINI_TOKEN);
			this.state = 146;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===38) {
				{
				this.state = 145;
				this.yini_mode_declaration();
				}
			}

			this.state = 148;
			this.line_end();
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
			this.state = 150;
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
			this.state = 152;
			this.match(YiniParser.DEPRECATED_TOKEN);
			this.state = 153;
			this.line_end();
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
			this.state = 156;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 155;
					this.match(YiniParser.NL);
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 158;
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
	public line_end(): Line_endContext {
		let localctx: Line_endContext = new Line_endContext(this, this._ctx, this.state);
		this.enterRule(localctx, 28, YiniParser.RULE_line_end);
		try {
			this.state = 162;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 32:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 160;
				this.eol();
				}
				break;
			case -1:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 161;
				this.match(YiniParser.EOF);
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
	public assignment(): AssignmentContext {
		let localctx: AssignmentContext = new AssignmentContext(this, this._ctx, this.state);
		this.enterRule(localctx, 30, YiniParser.RULE_assignment);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 164;
			this.member();
			this.state = 165;
			this.line_end();
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
	public identifier(): IdentifierContext {
		let localctx: IdentifierContext = new IdentifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 32, YiniParser.RULE_identifier);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 167;
			_la = this._input.LA(1);
			if(!(((((_la - 8)) & ~0x1F) === 0 && ((1 << (_la - 8)) & 1073741831) !== 0))) {
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
	public member(): MemberContext {
		let localctx: MemberContext = new MemberContext(this, this._ctx, this.state);
		this.enterRule(localctx, 34, YiniParser.RULE_member);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 169;
			this.identifier();
			this.state = 170;
			this.match(YiniParser.EQ);
			this.state = 172;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 222330624) !== 0)) {
				{
				this.state = 171;
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
		this.enterRule(localctx, 36, YiniParser.RULE_value);
		try {
			this.state = 178;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 17, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 174;
				this.concat_expression();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 175;
				this.scalar_value();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 176;
				this.list_literal();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 177;
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
		this.enterRule(localctx, 38, YiniParser.RULE_scalar_value);
		try {
			this.state = 184;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 10:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 180;
				this.null_literal();
				}
				break;
			case 13:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 181;
				this.string_literal();
				}
				break;
			case 14:
			case 26:
			case 27:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 182;
				this.number_literal();
				}
				break;
			case 8:
			case 9:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 183;
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
		this.enterRule(localctx, 40, YiniParser.RULE_concat_expression);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 186;
			this.match(YiniParser.STRING);
			this.state = 188;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 187;
					this.concat_tail();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 190;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 19, this._ctx);
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
	public concat_tail(): Concat_tailContext {
		let localctx: Concat_tailContext = new Concat_tailContext(this, this._ctx, this.state);
		this.enterRule(localctx, 42, YiniParser.RULE_concat_tail);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 192;
			this.match(YiniParser.PLUS);
			this.state = 196;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 25) !== 0)) {
				{
				{
				this.state = 193;
				this.multiline_trivia();
				}
				}
				this.state = 198;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 199;
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
		this.enterRule(localctx, 44, YiniParser.RULE_concat_operand);
		try {
			this.state = 206;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 13:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 201;
				this.match(YiniParser.STRING);
				}
				break;
			case 14:
			case 26:
			case 27:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 202;
				this.number_literal();
				}
				break;
			case 9:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 203;
				this.match(YiniParser.BOOLEAN_TRUE);
				}
				break;
			case 8:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 204;
				this.match(YiniParser.BOOLEAN_FALSE);
				}
				break;
			case 10:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 205;
				this.match(YiniParser.NULL);
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
	public string_literal(): String_literalContext {
		let localctx: String_literalContext = new String_literalContext(this, this._ctx, this.state);
		this.enterRule(localctx, 46, YiniParser.RULE_string_literal);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 208;
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
		this.enterRule(localctx, 48, YiniParser.RULE_object_literal);
		let _la: number;
		try {
			let _alt: number;
			this.state = 228;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 24:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 210;
				this.match(YiniParser.OC);
				this.state = 214;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 22, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 211;
						this.multiline_trivia();
						}
						}
					}
					this.state = 216;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 22, this._ctx);
				}
				this.state = 218;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 8)) & ~0x1F) === 0 && ((1 << (_la - 8)) & 1073741831) !== 0)) {
					{
					this.state = 217;
					this.object_members();
					}
				}

				this.state = 223;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 25) !== 0)) {
					{
					{
					this.state = 220;
					this.multiline_trivia();
					}
					}
					this.state = 225;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 226;
				this.match(YiniParser.CC);
				}
				break;
			case 11:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 227;
				this.match(YiniParser.EMPTY_OBJECT);
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
		this.enterRule(localctx, 50, YiniParser.RULE_object_members);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 230;
			this.object_member();
			this.state = 247;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 28, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 234;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 25) !== 0)) {
						{
						{
						this.state = 231;
						this.multiline_trivia();
						}
						}
						this.state = 236;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					this.state = 237;
					this.match(YiniParser.COMMA);
					this.state = 241;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 25) !== 0)) {
						{
						{
						this.state = 238;
						this.multiline_trivia();
						}
						}
						this.state = 243;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					this.state = 244;
					this.object_member();
					}
					}
				}
				this.state = 249;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 28, this._ctx);
			}
			this.state = 257;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 30, this._ctx) ) {
			case 1:
				{
				this.state = 253;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 25) !== 0)) {
					{
					{
					this.state = 250;
					this.multiline_trivia();
					}
					}
					this.state = 255;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 256;
				this.match(YiniParser.COMMA);
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
	public object_member(): Object_memberContext {
		let localctx: Object_memberContext = new Object_memberContext(this, this._ctx, this.state);
		this.enterRule(localctx, 52, YiniParser.RULE_object_member);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 259;
			this.identifier();
			this.state = 260;
			this.object_member_separator();
			this.state = 261;
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
		this.enterRule(localctx, 54, YiniParser.RULE_object_member_separator);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 263;
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
		this.enterRule(localctx, 56, YiniParser.RULE_list_literal);
		let _la: number;
		try {
			let _alt: number;
			this.state = 283;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 22:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 265;
				this.match(YiniParser.OB);
				this.state = 269;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 31, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 266;
						this.multiline_trivia();
						}
						}
					}
					this.state = 271;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 31, this._ctx);
				}
				this.state = 273;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 222330624) !== 0)) {
					{
					this.state = 272;
					this.elements();
					}
				}

				this.state = 278;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 25) !== 0)) {
					{
					{
					this.state = 275;
					this.multiline_trivia();
					}
					}
					this.state = 280;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 281;
				this.match(YiniParser.CB);
				}
				break;
			case 12:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 282;
				this.match(YiniParser.EMPTY_LIST);
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
		this.enterRule(localctx, 58, YiniParser.RULE_elements);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 285;
			this.value();
			this.state = 302;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 37, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 289;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 25) !== 0)) {
						{
						{
						this.state = 286;
						this.multiline_trivia();
						}
						}
						this.state = 291;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					this.state = 292;
					this.match(YiniParser.COMMA);
					this.state = 296;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 25) !== 0)) {
						{
						{
						this.state = 293;
						this.multiline_trivia();
						}
						}
						this.state = 298;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					this.state = 299;
					this.value();
					}
					}
				}
				this.state = 304;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 37, this._ctx);
			}
			this.state = 312;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 39, this._ctx) ) {
			case 1:
				{
				this.state = 308;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 25) !== 0)) {
					{
					{
					this.state = 305;
					this.multiline_trivia();
					}
					}
					this.state = 310;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 311;
				this.match(YiniParser.COMMA);
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
	public multiline_trivia(): Multiline_triviaContext {
		let localctx: Multiline_triviaContext = new Multiline_triviaContext(this, this._ctx, this.state);
		this.enterRule(localctx, 60, YiniParser.RULE_multiline_trivia);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 314;
			_la = this._input.LA(1);
			if(!(((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 25) !== 0))) {
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
	public number_literal(): Number_literalContext {
		let localctx: Number_literalContext = new Number_literalContext(this, this._ctx, this.state);
		this.enterRule(localctx, 62, YiniParser.RULE_number_literal);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 317;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===26 || _la===27) {
				{
				this.state = 316;
				_la = this._input.LA(1);
				if(!(_la===26 || _la===27)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				}
			}

			this.state = 319;
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
		this.enterRule(localctx, 64, YiniParser.RULE_null_literal);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 321;
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
		this.enterRule(localctx, 66, YiniParser.RULE_boolean_literal);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 323;
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
		this.enterRule(localctx, 68, YiniParser.RULE_bad_meta_text);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 325;
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
		this.enterRule(localctx, 70, YiniParser.RULE_bad_member);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 329;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 40:
				{
				this.state = 327;
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
			case 26:
			case 27:
				{
				this.state = 328;
				this.value();
				}
				break;
			case 19:
				break;
			default:
				break;
			}
			this.state = 331;
			this.match(YiniParser.EQ);
			this.state = 334;
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
			case 26:
			case 27:
				{
				this.state = 332;
				this.value();
				}
				break;
			case 40:
				{
				this.state = 333;
				this.match(YiniParser.REST);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 337;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 43, this._ctx) ) {
			case 1:
				{
				this.state = 336;
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

	public static readonly _serializedATN: number[] = [4,1,41,340,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,
	10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,
	7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,
	24,2,25,7,25,2,26,7,26,2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,
	2,32,7,32,2,33,7,33,2,34,7,34,2,35,7,35,1,0,3,0,74,8,0,1,0,5,0,77,8,0,10,
	0,12,0,80,9,0,1,0,3,0,83,8,0,1,0,1,0,1,1,1,1,5,1,89,8,1,10,1,12,1,92,9,
	1,1,1,4,1,95,8,1,11,1,12,1,96,3,1,99,8,1,1,2,1,2,5,2,103,8,2,10,2,12,2,
	106,9,2,1,3,1,3,3,3,110,8,3,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,3,4,120,8,4,
	1,5,1,5,3,5,124,8,5,1,6,1,6,1,7,1,7,1,8,1,8,1,8,1,8,1,8,3,8,135,8,8,1,9,
	1,9,1,9,3,9,140,8,9,1,9,3,9,143,8,9,1,10,1,10,3,10,147,8,10,1,10,1,10,1,
	11,1,11,1,12,1,12,1,12,1,13,4,13,157,8,13,11,13,12,13,158,1,14,1,14,3,14,
	163,8,14,1,15,1,15,1,15,1,16,1,16,1,17,1,17,1,17,3,17,173,8,17,1,18,1,18,
	1,18,1,18,3,18,179,8,18,1,19,1,19,1,19,1,19,3,19,185,8,19,1,20,1,20,4,20,
	189,8,20,11,20,12,20,190,1,21,1,21,5,21,195,8,21,10,21,12,21,198,9,21,1,
	21,1,21,1,22,1,22,1,22,1,22,1,22,3,22,207,8,22,1,23,1,23,1,24,1,24,5,24,
	213,8,24,10,24,12,24,216,9,24,1,24,3,24,219,8,24,1,24,5,24,222,8,24,10,
	24,12,24,225,9,24,1,24,1,24,3,24,229,8,24,1,25,1,25,5,25,233,8,25,10,25,
	12,25,236,9,25,1,25,1,25,5,25,240,8,25,10,25,12,25,243,9,25,1,25,5,25,246,
	8,25,10,25,12,25,249,9,25,1,25,5,25,252,8,25,10,25,12,25,255,9,25,1,25,
	3,25,258,8,25,1,26,1,26,1,26,1,26,1,27,1,27,1,28,1,28,5,28,268,8,28,10,
	28,12,28,271,9,28,1,28,3,28,274,8,28,1,28,5,28,277,8,28,10,28,12,28,280,
	9,28,1,28,1,28,3,28,284,8,28,1,29,1,29,5,29,288,8,29,10,29,12,29,291,9,
	29,1,29,1,29,5,29,295,8,29,10,29,12,29,298,9,29,1,29,5,29,301,8,29,10,29,
	12,29,304,9,29,1,29,5,29,307,8,29,10,29,12,29,310,9,29,1,29,3,29,313,8,
	29,1,30,1,30,1,31,3,31,318,8,31,1,31,1,31,1,32,1,32,1,33,1,33,1,34,1,34,
	1,35,1,35,3,35,330,8,35,1,35,1,35,1,35,3,35,335,8,35,1,35,3,35,338,8,35,
	1,35,0,0,36,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,
	44,46,48,50,52,54,56,58,60,62,64,66,68,70,0,5,2,0,8,10,38,38,2,0,19,19,
	21,21,2,0,32,32,35,36,1,0,26,27,1,0,8,9,362,0,73,1,0,0,0,2,98,1,0,0,0,4,
	100,1,0,0,0,6,109,1,0,0,0,8,119,1,0,0,0,10,121,1,0,0,0,12,125,1,0,0,0,14,
	127,1,0,0,0,16,134,1,0,0,0,18,142,1,0,0,0,20,144,1,0,0,0,22,150,1,0,0,0,
	24,152,1,0,0,0,26,156,1,0,0,0,28,162,1,0,0,0,30,164,1,0,0,0,32,167,1,0,
	0,0,34,169,1,0,0,0,36,178,1,0,0,0,38,184,1,0,0,0,40,186,1,0,0,0,42,192,
	1,0,0,0,44,206,1,0,0,0,46,208,1,0,0,0,48,228,1,0,0,0,50,230,1,0,0,0,52,
	259,1,0,0,0,54,263,1,0,0,0,56,283,1,0,0,0,58,285,1,0,0,0,60,314,1,0,0,0,
	62,317,1,0,0,0,64,321,1,0,0,0,66,323,1,0,0,0,68,325,1,0,0,0,70,329,1,0,
	0,0,72,74,3,2,1,0,73,72,1,0,0,0,73,74,1,0,0,0,74,78,1,0,0,0,75,77,3,8,4,
	0,76,75,1,0,0,0,77,80,1,0,0,0,78,76,1,0,0,0,78,79,1,0,0,0,79,82,1,0,0,0,
	80,78,1,0,0,0,81,83,3,4,2,0,82,81,1,0,0,0,82,83,1,0,0,0,83,84,1,0,0,0,84,
	85,5,0,0,1,85,1,1,0,0,0,86,90,5,1,0,0,87,89,3,26,13,0,88,87,1,0,0,0,89,
	92,1,0,0,0,90,88,1,0,0,0,90,91,1,0,0,0,91,99,1,0,0,0,92,90,1,0,0,0,93,95,
	3,26,13,0,94,93,1,0,0,0,95,96,1,0,0,0,96,94,1,0,0,0,96,97,1,0,0,0,97,99,
	1,0,0,0,98,86,1,0,0,0,98,94,1,0,0,0,99,3,1,0,0,0,100,104,5,5,0,0,101,103,
	3,6,3,0,102,101,1,0,0,0,103,106,1,0,0,0,104,102,1,0,0,0,104,105,1,0,0,0,
	105,5,1,0,0,0,106,104,1,0,0,0,107,110,3,26,13,0,108,110,3,10,5,0,109,107,
	1,0,0,0,109,108,1,0,0,0,110,7,1,0,0,0,111,120,3,26,13,0,112,120,3,10,5,
	0,113,120,3,12,6,0,114,120,5,6,0,0,115,120,3,14,7,0,116,120,3,30,15,0,117,
	120,3,16,8,0,118,120,3,70,35,0,119,111,1,0,0,0,119,112,1,0,0,0,119,113,
	1,0,0,0,119,114,1,0,0,0,119,115,1,0,0,0,119,116,1,0,0,0,119,117,1,0,0,0,
	119,118,1,0,0,0,120,9,1,0,0,0,121,123,5,36,0,0,122,124,3,26,13,0,123,122,
	1,0,0,0,123,124,1,0,0,0,124,11,1,0,0,0,125,126,5,35,0,0,126,13,1,0,0,0,
	127,128,5,7,0,0,128,15,1,0,0,0,129,135,3,18,9,0,130,135,3,24,12,0,131,132,
	3,68,34,0,132,133,3,28,14,0,133,135,1,0,0,0,134,129,1,0,0,0,134,130,1,0,
	0,0,134,131,1,0,0,0,135,17,1,0,0,0,136,143,3,20,10,0,137,139,5,3,0,0,138,
	140,3,46,23,0,139,138,1,0,0,0,139,140,1,0,0,0,140,141,1,0,0,0,141,143,3,
	28,14,0,142,136,1,0,0,0,142,137,1,0,0,0,143,19,1,0,0,0,144,146,5,2,0,0,
	145,147,3,22,11,0,146,145,1,0,0,0,146,147,1,0,0,0,147,148,1,0,0,0,148,149,
	3,28,14,0,149,21,1,0,0,0,150,151,5,38,0,0,151,23,1,0,0,0,152,153,5,4,0,
	0,153,154,3,28,14,0,154,25,1,0,0,0,155,157,5,32,0,0,156,155,1,0,0,0,157,
	158,1,0,0,0,158,156,1,0,0,0,158,159,1,0,0,0,159,27,1,0,0,0,160,163,3,26,
	13,0,161,163,5,0,0,1,162,160,1,0,0,0,162,161,1,0,0,0,163,29,1,0,0,0,164,
	165,3,34,17,0,165,166,3,28,14,0,166,31,1,0,0,0,167,168,7,0,0,0,168,33,1,
	0,0,0,169,170,3,32,16,0,170,172,5,19,0,0,171,173,3,36,18,0,172,171,1,0,
	0,0,172,173,1,0,0,0,173,35,1,0,0,0,174,179,3,40,20,0,175,179,3,38,19,0,
	176,179,3,56,28,0,177,179,3,48,24,0,178,174,1,0,0,0,178,175,1,0,0,0,178,
	176,1,0,0,0,178,177,1,0,0,0,179,37,1,0,0,0,180,185,3,64,32,0,181,185,3,
	46,23,0,182,185,3,62,31,0,183,185,3,66,33,0,184,180,1,0,0,0,184,181,1,0,
	0,0,184,182,1,0,0,0,184,183,1,0,0,0,185,39,1,0,0,0,186,188,5,13,0,0,187,
	189,3,42,21,0,188,187,1,0,0,0,189,190,1,0,0,0,190,188,1,0,0,0,190,191,1,
	0,0,0,191,41,1,0,0,0,192,196,5,26,0,0,193,195,3,60,30,0,194,193,1,0,0,0,
	195,198,1,0,0,0,196,194,1,0,0,0,196,197,1,0,0,0,197,199,1,0,0,0,198,196,
	1,0,0,0,199,200,3,44,22,0,200,43,1,0,0,0,201,207,5,13,0,0,202,207,3,62,
	31,0,203,207,5,9,0,0,204,207,5,8,0,0,205,207,5,10,0,0,206,201,1,0,0,0,206,
	202,1,0,0,0,206,203,1,0,0,0,206,204,1,0,0,0,206,205,1,0,0,0,207,45,1,0,
	0,0,208,209,5,13,0,0,209,47,1,0,0,0,210,214,5,24,0,0,211,213,3,60,30,0,
	212,211,1,0,0,0,213,216,1,0,0,0,214,212,1,0,0,0,214,215,1,0,0,0,215,218,
	1,0,0,0,216,214,1,0,0,0,217,219,3,50,25,0,218,217,1,0,0,0,218,219,1,0,0,
	0,219,223,1,0,0,0,220,222,3,60,30,0,221,220,1,0,0,0,222,225,1,0,0,0,223,
	221,1,0,0,0,223,224,1,0,0,0,224,226,1,0,0,0,225,223,1,0,0,0,226,229,5,25,
	0,0,227,229,5,11,0,0,228,210,1,0,0,0,228,227,1,0,0,0,229,49,1,0,0,0,230,
	247,3,52,26,0,231,233,3,60,30,0,232,231,1,0,0,0,233,236,1,0,0,0,234,232,
	1,0,0,0,234,235,1,0,0,0,235,237,1,0,0,0,236,234,1,0,0,0,237,241,5,20,0,
	0,238,240,3,60,30,0,239,238,1,0,0,0,240,243,1,0,0,0,241,239,1,0,0,0,241,
	242,1,0,0,0,242,244,1,0,0,0,243,241,1,0,0,0,244,246,3,52,26,0,245,234,1,
	0,0,0,246,249,1,0,0,0,247,245,1,0,0,0,247,248,1,0,0,0,248,257,1,0,0,0,249,
	247,1,0,0,0,250,252,3,60,30,0,251,250,1,0,0,0,252,255,1,0,0,0,253,251,1,
	0,0,0,253,254,1,0,0,0,254,256,1,0,0,0,255,253,1,0,0,0,256,258,5,20,0,0,
	257,253,1,0,0,0,257,258,1,0,0,0,258,51,1,0,0,0,259,260,3,32,16,0,260,261,
	3,54,27,0,261,262,3,36,18,0,262,53,1,0,0,0,263,264,7,1,0,0,264,55,1,0,0,
	0,265,269,5,22,0,0,266,268,3,60,30,0,267,266,1,0,0,0,268,271,1,0,0,0,269,
	267,1,0,0,0,269,270,1,0,0,0,270,273,1,0,0,0,271,269,1,0,0,0,272,274,3,58,
	29,0,273,272,1,0,0,0,273,274,1,0,0,0,274,278,1,0,0,0,275,277,3,60,30,0,
	276,275,1,0,0,0,277,280,1,0,0,0,278,276,1,0,0,0,278,279,1,0,0,0,279,281,
	1,0,0,0,280,278,1,0,0,0,281,284,5,23,0,0,282,284,5,12,0,0,283,265,1,0,0,
	0,283,282,1,0,0,0,284,57,1,0,0,0,285,302,3,36,18,0,286,288,3,60,30,0,287,
	286,1,0,0,0,288,291,1,0,0,0,289,287,1,0,0,0,289,290,1,0,0,0,290,292,1,0,
	0,0,291,289,1,0,0,0,292,296,5,20,0,0,293,295,3,60,30,0,294,293,1,0,0,0,
	295,298,1,0,0,0,296,294,1,0,0,0,296,297,1,0,0,0,297,299,1,0,0,0,298,296,
	1,0,0,0,299,301,3,36,18,0,300,289,1,0,0,0,301,304,1,0,0,0,302,300,1,0,0,
	0,302,303,1,0,0,0,303,312,1,0,0,0,304,302,1,0,0,0,305,307,3,60,30,0,306,
	305,1,0,0,0,307,310,1,0,0,0,308,306,1,0,0,0,308,309,1,0,0,0,309,311,1,0,
	0,0,310,308,1,0,0,0,311,313,5,20,0,0,312,308,1,0,0,0,312,313,1,0,0,0,313,
	59,1,0,0,0,314,315,7,2,0,0,315,61,1,0,0,0,316,318,7,3,0,0,317,316,1,0,0,
	0,317,318,1,0,0,0,318,319,1,0,0,0,319,320,5,14,0,0,320,63,1,0,0,0,321,322,
	5,10,0,0,322,65,1,0,0,0,323,324,7,4,0,0,324,67,1,0,0,0,325,326,5,41,0,0,
	326,69,1,0,0,0,327,330,5,40,0,0,328,330,3,36,18,0,329,327,1,0,0,0,329,328,
	1,0,0,0,329,330,1,0,0,0,330,331,1,0,0,0,331,334,5,19,0,0,332,335,3,36,18,
	0,333,335,5,40,0,0,334,332,1,0,0,0,334,333,1,0,0,0,335,337,1,0,0,0,336,
	338,3,26,13,0,337,336,1,0,0,0,337,338,1,0,0,0,338,71,1,0,0,0,44,73,78,82,
	90,96,98,104,109,119,123,134,139,142,146,158,162,172,178,184,190,196,206,
	214,218,223,228,234,241,247,253,257,269,273,278,283,289,296,302,308,312,
	317,329,334,337];

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
	public line_end(): Line_endContext {
		return this.getTypedRuleContext(Line_endContext, 0) as Line_endContext;
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
	public line_end(): Line_endContext {
		return this.getTypedRuleContext(Line_endContext, 0) as Line_endContext;
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
	public line_end(): Line_endContext {
		return this.getTypedRuleContext(Line_endContext, 0) as Line_endContext;
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
	public line_end(): Line_endContext {
		return this.getTypedRuleContext(Line_endContext, 0) as Line_endContext;
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


export class Line_endContext extends ParserRuleContext {
	constructor(parser?: YiniParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public eol(): EolContext {
		return this.getTypedRuleContext(EolContext, 0) as EolContext;
	}
	public EOF(): TerminalNode {
		return this.getToken(YiniParser.EOF, 0);
	}
    public get ruleIndex(): number {
    	return YiniParser.RULE_line_end;
	}
	// @Override
	public accept<Result>(visitor: YiniParserVisitor<Result>): Result {
		if (visitor.visitLine_end) {
			return visitor.visitLine_end(this);
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
	public line_end(): Line_endContext {
		return this.getTypedRuleContext(Line_endContext, 0) as Line_endContext;
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


export class IdentifierContext extends ParserRuleContext {
	constructor(parser?: YiniParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public KEY(): TerminalNode {
		return this.getToken(YiniParser.KEY, 0);
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
    	return YiniParser.RULE_identifier;
	}
	// @Override
	public accept<Result>(visitor: YiniParserVisitor<Result>): Result {
		if (visitor.visitIdentifier) {
			return visitor.visitIdentifier(this);
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
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
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
	public multiline_trivia_list(): Multiline_triviaContext[] {
		return this.getTypedRuleContexts(Multiline_triviaContext) as Multiline_triviaContext[];
	}
	public multiline_trivia(i: number): Multiline_triviaContext {
		return this.getTypedRuleContext(Multiline_triviaContext, i) as Multiline_triviaContext;
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
	public number_literal(): Number_literalContext {
		return this.getTypedRuleContext(Number_literalContext, 0) as Number_literalContext;
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
	public multiline_trivia_list(): Multiline_triviaContext[] {
		return this.getTypedRuleContexts(Multiline_triviaContext) as Multiline_triviaContext[];
	}
	public multiline_trivia(i: number): Multiline_triviaContext {
		return this.getTypedRuleContext(Multiline_triviaContext, i) as Multiline_triviaContext;
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
	public multiline_trivia_list(): Multiline_triviaContext[] {
		return this.getTypedRuleContexts(Multiline_triviaContext) as Multiline_triviaContext[];
	}
	public multiline_trivia(i: number): Multiline_triviaContext {
		return this.getTypedRuleContext(Multiline_triviaContext, i) as Multiline_triviaContext;
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
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
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
	public multiline_trivia_list(): Multiline_triviaContext[] {
		return this.getTypedRuleContexts(Multiline_triviaContext) as Multiline_triviaContext[];
	}
	public multiline_trivia(i: number): Multiline_triviaContext {
		return this.getTypedRuleContext(Multiline_triviaContext, i) as Multiline_triviaContext;
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
	public multiline_trivia_list(): Multiline_triviaContext[] {
		return this.getTypedRuleContexts(Multiline_triviaContext) as Multiline_triviaContext[];
	}
	public multiline_trivia(i: number): Multiline_triviaContext {
		return this.getTypedRuleContext(Multiline_triviaContext, i) as Multiline_triviaContext;
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


export class Multiline_triviaContext extends ParserRuleContext {
	constructor(parser?: YiniParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public NL(): TerminalNode {
		return this.getToken(YiniParser.NL, 0);
	}
	public DISABLED_LINE(): TerminalNode {
		return this.getToken(YiniParser.DISABLED_LINE, 0);
	}
	public FULL_LINE_COMMENT(): TerminalNode {
		return this.getToken(YiniParser.FULL_LINE_COMMENT, 0);
	}
    public get ruleIndex(): number {
    	return YiniParser.RULE_multiline_trivia;
	}
	// @Override
	public accept<Result>(visitor: YiniParserVisitor<Result>): Result {
		if (visitor.visitMultiline_trivia) {
			return visitor.visitMultiline_trivia(this);
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
	public PLUS(): TerminalNode {
		return this.getToken(YiniParser.PLUS, 0);
	}
	public MINUS(): TerminalNode {
		return this.getToken(YiniParser.MINUS, 0);
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
