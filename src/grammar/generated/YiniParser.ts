// Generated from ./grammar/v1.0.0-rc.5xx/YiniParser.g4 by ANTLR 4.13.2
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
	public static readonly TRIPLE_QUOTED_STRING = 14;
	public static readonly SINGLE_OR_DOUBLE = 15;
	public static readonly R_AND_C_STRING = 16;
	public static readonly NUMBER = 17;
	public static readonly SS = 18;
	public static readonly CARET = 19;
	public static readonly GT = 20;
	public static readonly LT = 21;
	public static readonly EQ = 22;
	public static readonly COMMA = 23;
	public static readonly COLON = 24;
	public static readonly OB = 25;
	public static readonly CB = 26;
	public static readonly OC = 27;
	public static readonly CC = 28;
	public static readonly PLUS = 29;
	public static readonly DOLLAR = 30;
	public static readonly PC = 31;
	public static readonly AT = 32;
	public static readonly SEMICOLON = 33;
	public static readonly NL = 34;
	public static readonly WS = 35;
	public static readonly BLOCK_COMMENT = 36;
	public static readonly FULL_LINE_COMMENT = 37;
	public static readonly INLINE_COMMENT = 38;
	public static readonly KEY = 39;
	public static readonly IDENT_INVALID = 40;
	public static readonly REST = 41;
	public static readonly META_INVALID = 42;
	public static override readonly EOF = Token.EOF;
	public static readonly RULE_yini = 0;
	public static readonly RULE_prolog = 1;
	public static readonly RULE_terminal_stmt = 2;
	public static readonly RULE_stmt = 3;
	public static readonly RULE_invalid_section_stmt = 4;
	public static readonly RULE_meta_stmt = 5;
	public static readonly RULE_directive = 6;
	public static readonly RULE_annotation = 7;
	public static readonly RULE_eol = 8;
	public static readonly RULE_assignment = 9;
	public static readonly RULE_member = 10;
	public static readonly RULE_value = 11;
	public static readonly RULE_object_literal = 12;
	public static readonly RULE_object_members = 13;
	public static readonly RULE_object_member = 14;
	public static readonly RULE_object_member_separator = 15;
	public static readonly RULE_list_literal = 16;
	public static readonly RULE_elements = 17;
	public static readonly RULE_number_literal = 18;
	public static readonly RULE_null_literal = 19;
	public static readonly RULE_string_literal = 20;
	public static readonly RULE_string_concat = 21;
	public static readonly RULE_boolean_literal = 22;
	public static readonly RULE_bad_meta_text = 23;
	public static readonly RULE_bad_member = 24;
	public static readonly literalNames: (string | null)[] = [ null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            null, "'{}'", 
                                                            "'[]'", null, 
                                                            null, null, 
                                                            null, null, 
                                                            "'\\u00A7'", 
                                                            "'^'", "'>'", 
                                                            "'<'", "'='", 
                                                            "','", "':'", 
                                                            "'['", "']'", 
                                                            "'{'", "'}'", 
                                                            "'+'", "'$'", 
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
                                                             "STRING", "TRIPLE_QUOTED_STRING", 
                                                             "SINGLE_OR_DOUBLE", 
                                                             "R_AND_C_STRING", 
                                                             "NUMBER", "SS", 
                                                             "CARET", "GT", 
                                                             "LT", "EQ", 
                                                             "COMMA", "COLON", 
                                                             "OB", "CB", 
                                                             "OC", "CC", 
                                                             "PLUS", "DOLLAR", 
                                                             "PC", "AT", 
                                                             "SEMICOLON", 
                                                             "NL", "WS", 
                                                             "BLOCK_COMMENT", 
                                                             "FULL_LINE_COMMENT", 
                                                             "INLINE_COMMENT", 
                                                             "KEY", "IDENT_INVALID", 
                                                             "REST", "META_INVALID" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"yini", "prolog", "terminal_stmt", "stmt", "invalid_section_stmt", "meta_stmt", 
		"directive", "annotation", "eol", "assignment", "member", "value", "object_literal", 
		"object_members", "object_member", "object_member_separator", "list_literal", 
		"elements", "number_literal", "null_literal", "string_literal", "string_concat", 
		"boolean_literal", "bad_meta_text", "bad_member",
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
			this.state = 51;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 0, this._ctx) ) {
			case 1:
				{
				this.state = 50;
				this.prolog();
				}
				break;
			}
			this.state = 56;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 172113884) !== 0) || ((((_la - 34)) & ~0x1F) === 0 && ((1 << (_la - 34)) & 417) !== 0)) {
				{
				{
				this.state = 53;
				this.stmt();
				}
				}
				this.state = 58;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 60;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===5) {
				{
				this.state = 59;
				this.terminal_stmt();
				}
			}

			this.state = 62;
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
			this.state = 76;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 64;
				this.match(YiniParser.SHEBANG);
				this.state = 68;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 3, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 65;
						this.eol();
						}
						}
					}
					this.state = 70;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 3, this._ctx);
				}
				}
				break;
			case 34:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 72;
				this._errHandler.sync(this);
				_alt = 1;
				do {
					switch (_alt) {
					case 1:
						{
						{
						this.state = 71;
						this.eol();
						}
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					this.state = 74;
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
			this.state = 78;
			this.match(YiniParser.TERMINAL_TOKEN);
			this.state = 82;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===34) {
				{
				{
				this.state = 79;
				this.eol();
				}
				}
				this.state = 84;
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
	public stmt(): StmtContext {
		let localctx: StmtContext = new StmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 6, YiniParser.RULE_stmt);
		try {
			this.state = 91;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 34:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 85;
				this.eol();
				}
				break;
			case 6:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 86;
				this.match(YiniParser.SECTION_HEAD);
				}
				break;
			case 7:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 87;
				this.invalid_section_stmt();
				}
				break;
			case 39:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 88;
				this.assignment();
				}
				break;
			case 2:
			case 3:
			case 4:
			case 42:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 89;
				this.meta_stmt();
				}
				break;
			case 8:
			case 9:
			case 10:
			case 11:
			case 12:
			case 13:
			case 17:
			case 22:
			case 25:
			case 27:
			case 41:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 90;
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
	public invalid_section_stmt(): Invalid_section_stmtContext {
		let localctx: Invalid_section_stmtContext = new Invalid_section_stmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 8, YiniParser.RULE_invalid_section_stmt);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 93;
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
		this.enterRule(localctx, 10, YiniParser.RULE_meta_stmt);
		try {
			this.state = 100;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 2:
			case 3:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 95;
				this.directive();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 96;
				this.annotation();
				}
				break;
			case 42:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 97;
				this.bad_meta_text();
				this.state = 98;
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
		this.enterRule(localctx, 12, YiniParser.RULE_directive);
		let _la: number;
		try {
			this.state = 109;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 2:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 102;
				this.match(YiniParser.YINI_TOKEN);
				this.state = 103;
				this.eol();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 104;
				this.match(YiniParser.INCLUDE_TOKEN);
				this.state = 106;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===13) {
					{
					this.state = 105;
					this.string_literal();
					}
				}

				this.state = 108;
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
	public annotation(): AnnotationContext {
		let localctx: AnnotationContext = new AnnotationContext(this, this._ctx, this.state);
		this.enterRule(localctx, 14, YiniParser.RULE_annotation);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 111;
			this.match(YiniParser.DEPRECATED_TOKEN);
			this.state = 112;
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
		this.enterRule(localctx, 16, YiniParser.RULE_eol);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 115;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 114;
					this.match(YiniParser.NL);
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 117;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 11, this._ctx);
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
		this.enterRule(localctx, 18, YiniParser.RULE_assignment);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 119;
			this.member();
			this.state = 120;
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
		this.enterRule(localctx, 20, YiniParser.RULE_member);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 122;
			this.match(YiniParser.KEY);
			this.state = 123;
			this.match(YiniParser.EQ);
			this.state = 125;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 167919360) !== 0)) {
				{
				this.state = 124;
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
		this.enterRule(localctx, 22, YiniParser.RULE_value);
		try {
			this.state = 133;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 10:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 127;
				this.null_literal();
				}
				break;
			case 13:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 128;
				this.string_literal();
				}
				break;
			case 17:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 129;
				this.number_literal();
				}
				break;
			case 8:
			case 9:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 130;
				this.boolean_literal();
				}
				break;
			case 12:
			case 25:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 131;
				this.list_literal();
				}
				break;
			case 11:
			case 27:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 132;
				this.object_literal();
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
	public object_literal(): Object_literalContext {
		let localctx: Object_literalContext = new Object_literalContext(this, this._ctx, this.state);
		this.enterRule(localctx, 24, YiniParser.RULE_object_literal);
		let _la: number;
		try {
			let _alt: number;
			this.state = 165;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 27:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 135;
				this.match(YiniParser.OC);
				this.state = 139;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 14, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 136;
						this.match(YiniParser.NL);
						}
						}
					}
					this.state = 141;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 14, this._ctx);
				}
				this.state = 143;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===39) {
					{
					this.state = 142;
					this.object_members();
					}
				}

				this.state = 148;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===34) {
					{
					{
					this.state = 145;
					this.match(YiniParser.NL);
					}
					}
					this.state = 150;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 151;
				this.match(YiniParser.CC);
				this.state = 155;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 17, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 152;
						this.match(YiniParser.NL);
						}
						}
					}
					this.state = 157;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 17, this._ctx);
				}
				}
				break;
			case 11:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 158;
				this.match(YiniParser.EMPTY_OBJECT);
				this.state = 162;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 18, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 159;
						this.match(YiniParser.NL);
						}
						}
					}
					this.state = 164;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 18, this._ctx);
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
		this.enterRule(localctx, 26, YiniParser.RULE_object_members);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 167;
			this.object_member();
			this.state = 178;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 21, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 168;
					this.match(YiniParser.COMMA);
					this.state = 172;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la===34) {
						{
						{
						this.state = 169;
						this.match(YiniParser.NL);
						}
						}
						this.state = 174;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					this.state = 175;
					this.object_member();
					}
					}
				}
				this.state = 180;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 21, this._ctx);
			}
			this.state = 182;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===23) {
				{
				this.state = 181;
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
		this.enterRule(localctx, 28, YiniParser.RULE_object_member);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 184;
			this.match(YiniParser.KEY);
			this.state = 185;
			this.object_member_separator();
			this.state = 189;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===34) {
				{
				{
				this.state = 186;
				this.match(YiniParser.NL);
				}
				}
				this.state = 191;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 192;
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
		this.enterRule(localctx, 30, YiniParser.RULE_object_member_separator);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 194;
			_la = this._input.LA(1);
			if(!(_la===22 || _la===24)) {
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
		this.enterRule(localctx, 32, YiniParser.RULE_list_literal);
		let _la: number;
		try {
			let _alt: number;
			this.state = 226;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 25:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 196;
				this.match(YiniParser.OB);
				this.state = 200;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 24, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 197;
						this.match(YiniParser.NL);
						}
						}
					}
					this.state = 202;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 24, this._ctx);
				}
				this.state = 204;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 167919360) !== 0)) {
					{
					this.state = 203;
					this.elements();
					}
				}

				this.state = 209;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===34) {
					{
					{
					this.state = 206;
					this.match(YiniParser.NL);
					}
					}
					this.state = 211;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 212;
				this.match(YiniParser.CB);
				this.state = 216;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 27, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 213;
						this.match(YiniParser.NL);
						}
						}
					}
					this.state = 218;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 27, this._ctx);
				}
				}
				break;
			case 12:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 219;
				this.match(YiniParser.EMPTY_LIST);
				this.state = 223;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 28, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 220;
						this.match(YiniParser.NL);
						}
						}
					}
					this.state = 225;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 28, this._ctx);
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
		this.enterRule(localctx, 34, YiniParser.RULE_elements);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 228;
			this.value();
			this.state = 245;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 32, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 232;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la===34) {
						{
						{
						this.state = 229;
						this.match(YiniParser.NL);
						}
						}
						this.state = 234;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					this.state = 235;
					this.match(YiniParser.COMMA);
					this.state = 239;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la===34) {
						{
						{
						this.state = 236;
						this.match(YiniParser.NL);
						}
						}
						this.state = 241;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					this.state = 242;
					this.value();
					}
					}
				}
				this.state = 247;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 32, this._ctx);
			}
			this.state = 249;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===23) {
				{
				this.state = 248;
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
		this.enterRule(localctx, 36, YiniParser.RULE_number_literal);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 251;
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
		this.enterRule(localctx, 38, YiniParser.RULE_null_literal);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 253;
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
	public string_literal(): String_literalContext {
		let localctx: String_literalContext = new String_literalContext(this, this._ctx, this.state);
		this.enterRule(localctx, 40, YiniParser.RULE_string_literal);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 255;
			this.match(YiniParser.STRING);
			this.state = 259;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 34, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 256;
					this.string_concat();
					}
					}
				}
				this.state = 261;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 34, this._ctx);
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
	public string_concat(): String_concatContext {
		let localctx: String_concatContext = new String_concatContext(this, this._ctx, this.state);
		this.enterRule(localctx, 42, YiniParser.RULE_string_concat);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 265;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===34) {
				{
				{
				this.state = 262;
				this.match(YiniParser.NL);
				}
				}
				this.state = 267;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 268;
			this.match(YiniParser.PLUS);
			this.state = 272;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===34) {
				{
				{
				this.state = 269;
				this.match(YiniParser.NL);
				}
				}
				this.state = 274;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 275;
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
	public boolean_literal(): Boolean_literalContext {
		let localctx: Boolean_literalContext = new Boolean_literalContext(this, this._ctx, this.state);
		this.enterRule(localctx, 44, YiniParser.RULE_boolean_literal);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 277;
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
		this.enterRule(localctx, 46, YiniParser.RULE_bad_meta_text);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 279;
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
		this.enterRule(localctx, 48, YiniParser.RULE_bad_member);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 283;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 41:
				{
				this.state = 281;
				this.match(YiniParser.REST);
				}
				break;
			case 8:
			case 9:
			case 10:
			case 11:
			case 12:
			case 13:
			case 17:
			case 25:
			case 27:
				{
				this.state = 282;
				this.value();
				}
				break;
			case 22:
				break;
			default:
				break;
			}
			this.state = 285;
			this.match(YiniParser.EQ);
			this.state = 288;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 8:
			case 9:
			case 10:
			case 11:
			case 12:
			case 13:
			case 17:
			case 25:
			case 27:
				{
				this.state = 286;
				this.value();
				}
				break;
			case 41:
				{
				this.state = 287;
				this.match(YiniParser.REST);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 291;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 39, this._ctx) ) {
			case 1:
				{
				this.state = 290;
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

	public static readonly _serializedATN: number[] = [4,1,42,294,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,
	10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,
	7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,
	24,1,0,3,0,52,8,0,1,0,5,0,55,8,0,10,0,12,0,58,9,0,1,0,3,0,61,8,0,1,0,1,
	0,1,1,1,1,5,1,67,8,1,10,1,12,1,70,9,1,1,1,4,1,73,8,1,11,1,12,1,74,3,1,77,
	8,1,1,2,1,2,5,2,81,8,2,10,2,12,2,84,9,2,1,3,1,3,1,3,1,3,1,3,1,3,3,3,92,
	8,3,1,4,1,4,1,5,1,5,1,5,1,5,1,5,3,5,101,8,5,1,6,1,6,1,6,1,6,3,6,107,8,6,
	1,6,3,6,110,8,6,1,7,1,7,1,7,1,8,4,8,116,8,8,11,8,12,8,117,1,9,1,9,1,9,1,
	10,1,10,1,10,3,10,126,8,10,1,11,1,11,1,11,1,11,1,11,1,11,3,11,134,8,11,
	1,12,1,12,5,12,138,8,12,10,12,12,12,141,9,12,1,12,3,12,144,8,12,1,12,5,
	12,147,8,12,10,12,12,12,150,9,12,1,12,1,12,5,12,154,8,12,10,12,12,12,157,
	9,12,1,12,1,12,5,12,161,8,12,10,12,12,12,164,9,12,3,12,166,8,12,1,13,1,
	13,1,13,5,13,171,8,13,10,13,12,13,174,9,13,1,13,5,13,177,8,13,10,13,12,
	13,180,9,13,1,13,3,13,183,8,13,1,14,1,14,1,14,5,14,188,8,14,10,14,12,14,
	191,9,14,1,14,1,14,1,15,1,15,1,16,1,16,5,16,199,8,16,10,16,12,16,202,9,
	16,1,16,3,16,205,8,16,1,16,5,16,208,8,16,10,16,12,16,211,9,16,1,16,1,16,
	5,16,215,8,16,10,16,12,16,218,9,16,1,16,1,16,5,16,222,8,16,10,16,12,16,
	225,9,16,3,16,227,8,16,1,17,1,17,5,17,231,8,17,10,17,12,17,234,9,17,1,17,
	1,17,5,17,238,8,17,10,17,12,17,241,9,17,1,17,5,17,244,8,17,10,17,12,17,
	247,9,17,1,17,3,17,250,8,17,1,18,1,18,1,19,1,19,1,20,1,20,5,20,258,8,20,
	10,20,12,20,261,9,20,1,21,5,21,264,8,21,10,21,12,21,267,9,21,1,21,1,21,
	5,21,271,8,21,10,21,12,21,274,9,21,1,21,1,21,1,22,1,22,1,23,1,23,1,24,1,
	24,3,24,284,8,24,1,24,1,24,1,24,3,24,289,8,24,1,24,3,24,292,8,24,1,24,0,
	0,25,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,
	48,0,2,2,0,22,22,24,24,1,0,8,9,318,0,51,1,0,0,0,2,76,1,0,0,0,4,78,1,0,0,
	0,6,91,1,0,0,0,8,93,1,0,0,0,10,100,1,0,0,0,12,109,1,0,0,0,14,111,1,0,0,
	0,16,115,1,0,0,0,18,119,1,0,0,0,20,122,1,0,0,0,22,133,1,0,0,0,24,165,1,
	0,0,0,26,167,1,0,0,0,28,184,1,0,0,0,30,194,1,0,0,0,32,226,1,0,0,0,34,228,
	1,0,0,0,36,251,1,0,0,0,38,253,1,0,0,0,40,255,1,0,0,0,42,265,1,0,0,0,44,
	277,1,0,0,0,46,279,1,0,0,0,48,283,1,0,0,0,50,52,3,2,1,0,51,50,1,0,0,0,51,
	52,1,0,0,0,52,56,1,0,0,0,53,55,3,6,3,0,54,53,1,0,0,0,55,58,1,0,0,0,56,54,
	1,0,0,0,56,57,1,0,0,0,57,60,1,0,0,0,58,56,1,0,0,0,59,61,3,4,2,0,60,59,1,
	0,0,0,60,61,1,0,0,0,61,62,1,0,0,0,62,63,5,0,0,1,63,1,1,0,0,0,64,68,5,1,
	0,0,65,67,3,16,8,0,66,65,1,0,0,0,67,70,1,0,0,0,68,66,1,0,0,0,68,69,1,0,
	0,0,69,77,1,0,0,0,70,68,1,0,0,0,71,73,3,16,8,0,72,71,1,0,0,0,73,74,1,0,
	0,0,74,72,1,0,0,0,74,75,1,0,0,0,75,77,1,0,0,0,76,64,1,0,0,0,76,72,1,0,0,
	0,77,3,1,0,0,0,78,82,5,5,0,0,79,81,3,16,8,0,80,79,1,0,0,0,81,84,1,0,0,0,
	82,80,1,0,0,0,82,83,1,0,0,0,83,5,1,0,0,0,84,82,1,0,0,0,85,92,3,16,8,0,86,
	92,5,6,0,0,87,92,3,8,4,0,88,92,3,18,9,0,89,92,3,10,5,0,90,92,3,48,24,0,
	91,85,1,0,0,0,91,86,1,0,0,0,91,87,1,0,0,0,91,88,1,0,0,0,91,89,1,0,0,0,91,
	90,1,0,0,0,92,7,1,0,0,0,93,94,5,7,0,0,94,9,1,0,0,0,95,101,3,12,6,0,96,101,
	3,14,7,0,97,98,3,46,23,0,98,99,3,16,8,0,99,101,1,0,0,0,100,95,1,0,0,0,100,
	96,1,0,0,0,100,97,1,0,0,0,101,11,1,0,0,0,102,103,5,2,0,0,103,110,3,16,8,
	0,104,106,5,3,0,0,105,107,3,40,20,0,106,105,1,0,0,0,106,107,1,0,0,0,107,
	108,1,0,0,0,108,110,3,16,8,0,109,102,1,0,0,0,109,104,1,0,0,0,110,13,1,0,
	0,0,111,112,5,4,0,0,112,113,3,16,8,0,113,15,1,0,0,0,114,116,5,34,0,0,115,
	114,1,0,0,0,116,117,1,0,0,0,117,115,1,0,0,0,117,118,1,0,0,0,118,17,1,0,
	0,0,119,120,3,20,10,0,120,121,3,16,8,0,121,19,1,0,0,0,122,123,5,39,0,0,
	123,125,5,22,0,0,124,126,3,22,11,0,125,124,1,0,0,0,125,126,1,0,0,0,126,
	21,1,0,0,0,127,134,3,38,19,0,128,134,3,40,20,0,129,134,3,36,18,0,130,134,
	3,44,22,0,131,134,3,32,16,0,132,134,3,24,12,0,133,127,1,0,0,0,133,128,1,
	0,0,0,133,129,1,0,0,0,133,130,1,0,0,0,133,131,1,0,0,0,133,132,1,0,0,0,134,
	23,1,0,0,0,135,139,5,27,0,0,136,138,5,34,0,0,137,136,1,0,0,0,138,141,1,
	0,0,0,139,137,1,0,0,0,139,140,1,0,0,0,140,143,1,0,0,0,141,139,1,0,0,0,142,
	144,3,26,13,0,143,142,1,0,0,0,143,144,1,0,0,0,144,148,1,0,0,0,145,147,5,
	34,0,0,146,145,1,0,0,0,147,150,1,0,0,0,148,146,1,0,0,0,148,149,1,0,0,0,
	149,151,1,0,0,0,150,148,1,0,0,0,151,155,5,28,0,0,152,154,5,34,0,0,153,152,
	1,0,0,0,154,157,1,0,0,0,155,153,1,0,0,0,155,156,1,0,0,0,156,166,1,0,0,0,
	157,155,1,0,0,0,158,162,5,11,0,0,159,161,5,34,0,0,160,159,1,0,0,0,161,164,
	1,0,0,0,162,160,1,0,0,0,162,163,1,0,0,0,163,166,1,0,0,0,164,162,1,0,0,0,
	165,135,1,0,0,0,165,158,1,0,0,0,166,25,1,0,0,0,167,178,3,28,14,0,168,172,
	5,23,0,0,169,171,5,34,0,0,170,169,1,0,0,0,171,174,1,0,0,0,172,170,1,0,0,
	0,172,173,1,0,0,0,173,175,1,0,0,0,174,172,1,0,0,0,175,177,3,28,14,0,176,
	168,1,0,0,0,177,180,1,0,0,0,178,176,1,0,0,0,178,179,1,0,0,0,179,182,1,0,
	0,0,180,178,1,0,0,0,181,183,5,23,0,0,182,181,1,0,0,0,182,183,1,0,0,0,183,
	27,1,0,0,0,184,185,5,39,0,0,185,189,3,30,15,0,186,188,5,34,0,0,187,186,
	1,0,0,0,188,191,1,0,0,0,189,187,1,0,0,0,189,190,1,0,0,0,190,192,1,0,0,0,
	191,189,1,0,0,0,192,193,3,22,11,0,193,29,1,0,0,0,194,195,7,0,0,0,195,31,
	1,0,0,0,196,200,5,25,0,0,197,199,5,34,0,0,198,197,1,0,0,0,199,202,1,0,0,
	0,200,198,1,0,0,0,200,201,1,0,0,0,201,204,1,0,0,0,202,200,1,0,0,0,203,205,
	3,34,17,0,204,203,1,0,0,0,204,205,1,0,0,0,205,209,1,0,0,0,206,208,5,34,
	0,0,207,206,1,0,0,0,208,211,1,0,0,0,209,207,1,0,0,0,209,210,1,0,0,0,210,
	212,1,0,0,0,211,209,1,0,0,0,212,216,5,26,0,0,213,215,5,34,0,0,214,213,1,
	0,0,0,215,218,1,0,0,0,216,214,1,0,0,0,216,217,1,0,0,0,217,227,1,0,0,0,218,
	216,1,0,0,0,219,223,5,12,0,0,220,222,5,34,0,0,221,220,1,0,0,0,222,225,1,
	0,0,0,223,221,1,0,0,0,223,224,1,0,0,0,224,227,1,0,0,0,225,223,1,0,0,0,226,
	196,1,0,0,0,226,219,1,0,0,0,227,33,1,0,0,0,228,245,3,22,11,0,229,231,5,
	34,0,0,230,229,1,0,0,0,231,234,1,0,0,0,232,230,1,0,0,0,232,233,1,0,0,0,
	233,235,1,0,0,0,234,232,1,0,0,0,235,239,5,23,0,0,236,238,5,34,0,0,237,236,
	1,0,0,0,238,241,1,0,0,0,239,237,1,0,0,0,239,240,1,0,0,0,240,242,1,0,0,0,
	241,239,1,0,0,0,242,244,3,22,11,0,243,232,1,0,0,0,244,247,1,0,0,0,245,243,
	1,0,0,0,245,246,1,0,0,0,246,249,1,0,0,0,247,245,1,0,0,0,248,250,5,23,0,
	0,249,248,1,0,0,0,249,250,1,0,0,0,250,35,1,0,0,0,251,252,5,17,0,0,252,37,
	1,0,0,0,253,254,5,10,0,0,254,39,1,0,0,0,255,259,5,13,0,0,256,258,3,42,21,
	0,257,256,1,0,0,0,258,261,1,0,0,0,259,257,1,0,0,0,259,260,1,0,0,0,260,41,
	1,0,0,0,261,259,1,0,0,0,262,264,5,34,0,0,263,262,1,0,0,0,264,267,1,0,0,
	0,265,263,1,0,0,0,265,266,1,0,0,0,266,268,1,0,0,0,267,265,1,0,0,0,268,272,
	5,29,0,0,269,271,5,34,0,0,270,269,1,0,0,0,271,274,1,0,0,0,272,270,1,0,0,
	0,272,273,1,0,0,0,273,275,1,0,0,0,274,272,1,0,0,0,275,276,5,13,0,0,276,
	43,1,0,0,0,277,278,7,1,0,0,278,45,1,0,0,0,279,280,5,42,0,0,280,47,1,0,0,
	0,281,284,5,41,0,0,282,284,3,22,11,0,283,281,1,0,0,0,283,282,1,0,0,0,283,
	284,1,0,0,0,284,285,1,0,0,0,285,288,5,22,0,0,286,289,3,22,11,0,287,289,
	5,41,0,0,288,286,1,0,0,0,288,287,1,0,0,0,289,291,1,0,0,0,290,292,3,16,8,
	0,291,290,1,0,0,0,291,292,1,0,0,0,292,49,1,0,0,0,40,51,56,60,68,74,76,82,
	91,100,106,109,117,125,133,139,143,148,155,162,165,172,178,182,189,200,
	204,209,216,223,226,232,239,245,249,259,265,272,283,288,291];

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
	public eol_list(): EolContext[] {
		return this.getTypedRuleContexts(EolContext) as EolContext[];
	}
	public eol(i: number): EolContext {
		return this.getTypedRuleContext(EolContext, i) as EolContext;
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


export class StmtContext extends ParserRuleContext {
	constructor(parser?: YiniParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public eol(): EolContext {
		return this.getTypedRuleContext(EolContext, 0) as EolContext;
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
	public YINI_TOKEN(): TerminalNode {
		return this.getToken(YiniParser.YINI_TOKEN, 0);
	}
	public eol(): EolContext {
		return this.getTypedRuleContext(EolContext, 0) as EolContext;
	}
	public INCLUDE_TOKEN(): TerminalNode {
		return this.getToken(YiniParser.INCLUDE_TOKEN, 0);
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
	public NL_list(): TerminalNode[] {
	    	return this.getTokens(YiniParser.NL);
	}
	public NL(i: number): TerminalNode {
		return this.getToken(YiniParser.NL, i);
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


export class String_literalContext extends ParserRuleContext {
	constructor(parser?: YiniParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public STRING(): TerminalNode {
		return this.getToken(YiniParser.STRING, 0);
	}
	public string_concat_list(): String_concatContext[] {
		return this.getTypedRuleContexts(String_concatContext) as String_concatContext[];
	}
	public string_concat(i: number): String_concatContext {
		return this.getTypedRuleContext(String_concatContext, i) as String_concatContext;
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


export class String_concatContext extends ParserRuleContext {
	constructor(parser?: YiniParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public PLUS(): TerminalNode {
		return this.getToken(YiniParser.PLUS, 0);
	}
	public STRING(): TerminalNode {
		return this.getToken(YiniParser.STRING, 0);
	}
	public NL_list(): TerminalNode[] {
	    	return this.getTokens(YiniParser.NL);
	}
	public NL(i: number): TerminalNode {
		return this.getToken(YiniParser.NL, i);
	}
    public get ruleIndex(): number {
    	return YiniParser.RULE_string_concat;
	}
	// @Override
	public accept<Result>(visitor: YiniParserVisitor<Result>): Result {
		if (visitor.visitString_concat) {
			return visitor.visitString_concat(this);
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
