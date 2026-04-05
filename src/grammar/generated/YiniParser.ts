// Generated from ./grammar/v1.0.0-rc.4x/YiniParser.g4 by ANTLR 4.13.2
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
	public static readonly YINI_TOKEN = 1;
	public static readonly INCLUDE_TOKEN = 2;
	public static readonly DEPRECATED_TOKEN = 3;
	public static readonly SECTION_HEAD = 4;
	public static readonly TERMINAL_TOKEN = 5;
	public static readonly SS = 6;
	public static readonly CARET = 7;
	public static readonly GT = 8;
	public static readonly LT = 9;
	public static readonly EQ = 10;
	public static readonly HASH = 11;
	public static readonly COMMA = 12;
	public static readonly COLON = 13;
	public static readonly OB = 14;
	public static readonly CB = 15;
	public static readonly OC = 16;
	public static readonly CC = 17;
	public static readonly PLUS = 18;
	public static readonly DOLLAR = 19;
	public static readonly PC = 20;
	public static readonly AT = 21;
	public static readonly SEMICOLON = 22;
	public static readonly BOOLEAN_FALSE = 23;
	public static readonly BOOLEAN_TRUE = 24;
	public static readonly NULL = 25;
	public static readonly EMPTY_OBJECT = 26;
	public static readonly EMPTY_LIST = 27;
	public static readonly SHEBANG = 28;
	public static readonly NUMBER = 29;
	public static readonly KEY = 30;
	public static readonly STRING = 31;
	public static readonly TRIPLE_QUOTED_STRING = 32;
	public static readonly SINGLE_OR_DOUBLE = 33;
	public static readonly R_AND_C_STRING = 34;
	public static readonly HYPER_STRING = 35;
	public static readonly ESC_SEQ = 36;
	public static readonly ESC_SEQ_BASE = 37;
	public static readonly NL = 38;
	public static readonly SINGLE_NL = 39;
	public static readonly WS = 40;
	public static readonly BLOCK_COMMENT = 41;
	public static readonly COMMENT = 42;
	public static readonly LINE_COMMENT = 43;
	public static readonly INLINE_COMMENT = 44;
	public static readonly IDENT_INVALID = 45;
	public static readonly REST = 46;
	public static readonly META_INVALID = 47;
	public static override readonly EOF = Token.EOF;
	public static readonly RULE_yini = 0;
	public static readonly RULE_prolog = 1;
	public static readonly RULE_terminal_stmt = 2;
	public static readonly RULE_stmt = 3;
	public static readonly RULE_meta_stmt = 4;
	public static readonly RULE_directive = 5;
	public static readonly RULE_annotation = 6;
	public static readonly RULE_eol = 7;
	public static readonly RULE_assignment = 8;
	public static readonly RULE_member = 9;
	public static readonly RULE_value = 10;
	public static readonly RULE_object_literal = 11;
	public static readonly RULE_object_members = 12;
	public static readonly RULE_object_member = 13;
	public static readonly RULE_list_literal = 14;
	public static readonly RULE_elements = 15;
	public static readonly RULE_number_literal = 16;
	public static readonly RULE_null_literal = 17;
	public static readonly RULE_string_literal = 18;
	public static readonly RULE_string_concat = 19;
	public static readonly RULE_boolean_literal = 20;
	public static readonly RULE_bad_meta_text = 21;
	public static readonly RULE_bad_member = 22;
	public static readonly literalNames: (string | null)[] = [ null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            "'\\u00A7'", 
                                                            "'^'", "'>'", 
                                                            "'<'", "'='", 
                                                            "'#'", "','", 
                                                            "':'", "'['", 
                                                            "']'", "'{'", 
                                                            "'}'", "'+'", 
                                                            "'$'", "'%'", 
                                                            "'@'", "';'", 
                                                            null, null, 
                                                            null, "'{}'", 
                                                            "'[]'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, "YINI_TOKEN", 
                                                             "INCLUDE_TOKEN", 
                                                             "DEPRECATED_TOKEN", 
                                                             "SECTION_HEAD", 
                                                             "TERMINAL_TOKEN", 
                                                             "SS", "CARET", 
                                                             "GT", "LT", 
                                                             "EQ", "HASH", 
                                                             "COMMA", "COLON", 
                                                             "OB", "CB", 
                                                             "OC", "CC", 
                                                             "PLUS", "DOLLAR", 
                                                             "PC", "AT", 
                                                             "SEMICOLON", 
                                                             "BOOLEAN_FALSE", 
                                                             "BOOLEAN_TRUE", 
                                                             "NULL", "EMPTY_OBJECT", 
                                                             "EMPTY_LIST", 
                                                             "SHEBANG", 
                                                             "NUMBER", "KEY", 
                                                             "STRING", "TRIPLE_QUOTED_STRING", 
                                                             "SINGLE_OR_DOUBLE", 
                                                             "R_AND_C_STRING", 
                                                             "HYPER_STRING", 
                                                             "ESC_SEQ", 
                                                             "ESC_SEQ_BASE", 
                                                             "NL", "SINGLE_NL", 
                                                             "WS", "BLOCK_COMMENT", 
                                                             "COMMENT", 
                                                             "LINE_COMMENT", 
                                                             "INLINE_COMMENT", 
                                                             "IDENT_INVALID", 
                                                             "REST", "META_INVALID" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"yini", "prolog", "terminal_stmt", "stmt", "meta_stmt", "directive", "annotation", 
		"eol", "assignment", "member", "value", "object_literal", "object_members", 
		"object_member", "list_literal", "elements", "number_literal", "null_literal", 
		"string_literal", "string_concat", "boolean_literal", "bad_meta_text", 
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
			this.state = 47;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 0, this._ctx) ) {
			case 1:
				{
				this.state = 46;
				this.prolog();
				}
				break;
			}
			this.state = 52;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4018226206) !== 0) || ((((_la - 38)) & ~0x1F) === 0 && ((1 << (_la - 38)) & 837) !== 0)) {
				{
				{
				this.state = 49;
				this.stmt();
				}
				}
				this.state = 54;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 56;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===5) {
				{
				this.state = 55;
				this.terminal_stmt();
				}
			}

			this.state = 58;
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
			this.state = 72;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 28:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 60;
				this.match(YiniParser.SHEBANG);
				this.state = 64;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 3, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 61;
						this.eol();
						}
						}
					}
					this.state = 66;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 3, this._ctx);
				}
				}
				break;
			case 38:
			case 44:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 68;
				this._errHandler.sync(this);
				_alt = 1;
				do {
					switch (_alt) {
					case 1:
						{
						{
						this.state = 67;
						this.eol();
						}
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					this.state = 70;
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
			this.state = 74;
			this.match(YiniParser.TERMINAL_TOKEN);
			this.state = 77;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 6, this._ctx) ) {
			case 1:
				{
				this.state = 75;
				this.eol();
				}
				break;
			case 2:
				{
				this.state = 76;
				this.match(YiniParser.INLINE_COMMENT);
				}
				break;
			}
			this.state = 82;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===38) {
				{
				{
				this.state = 79;
				this.match(YiniParser.NL);
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
			this.state = 90;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 38:
			case 44:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 85;
				this.eol();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 86;
				this.match(YiniParser.SECTION_HEAD);
				}
				break;
			case 30:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 87;
				this.assignment();
				}
				break;
			case 1:
			case 2:
			case 3:
			case 47:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 88;
				this.meta_stmt();
				}
				break;
			case 10:
			case 14:
			case 16:
			case 23:
			case 24:
			case 25:
			case 26:
			case 27:
			case 29:
			case 31:
			case 40:
			case 46:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 89;
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
	public meta_stmt(): Meta_stmtContext {
		let localctx: Meta_stmtContext = new Meta_stmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 8, YiniParser.RULE_meta_stmt);
		try {
			this.state = 97;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 1:
			case 2:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 92;
				this.directive();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 93;
				this.annotation();
				}
				break;
			case 47:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 94;
				this.bad_meta_text();
				this.state = 95;
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
		this.enterRule(localctx, 10, YiniParser.RULE_directive);
		let _la: number;
		try {
			this.state = 112;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 99;
				this.match(YiniParser.YINI_TOKEN);
				this.state = 100;
				this.eol();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 101;
				this.match(YiniParser.INCLUDE_TOKEN);
				this.state = 105;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===40) {
					{
					{
					this.state = 102;
					this.match(YiniParser.WS);
					}
					}
					this.state = 107;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 109;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===31) {
					{
					this.state = 108;
					this.string_literal();
					}
				}

				this.state = 111;
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
		this.enterRule(localctx, 12, YiniParser.RULE_annotation);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 114;
			this.match(YiniParser.DEPRECATED_TOKEN);
			this.state = 115;
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
		this.enterRule(localctx, 14, YiniParser.RULE_eol);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 118;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===44) {
				{
				this.state = 117;
				this.match(YiniParser.INLINE_COMMENT);
				}
			}

			this.state = 121;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 120;
					this.match(YiniParser.NL);
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 123;
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
		this.enterRule(localctx, 16, YiniParser.RULE_assignment);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 125;
			this.member();
			this.state = 126;
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
		this.enterRule(localctx, 18, YiniParser.RULE_member);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 128;
			this.match(YiniParser.KEY);
			this.state = 130;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===40) {
				{
				this.state = 129;
				this.match(YiniParser.WS);
				}
			}

			this.state = 132;
			this.match(YiniParser.EQ);
			this.state = 134;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===40) {
				{
				this.state = 133;
				this.match(YiniParser.WS);
				}
			}

			this.state = 137;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2944483328) !== 0)) {
				{
				this.state = 136;
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
		this.enterRule(localctx, 20, YiniParser.RULE_value);
		try {
			this.state = 145;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 25:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 139;
				this.null_literal();
				}
				break;
			case 31:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 140;
				this.string_literal();
				}
				break;
			case 29:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 141;
				this.number_literal();
				}
				break;
			case 23:
			case 24:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 142;
				this.boolean_literal();
				}
				break;
			case 14:
			case 27:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 143;
				this.list_literal();
				}
				break;
			case 16:
			case 26:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 144;
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
		this.enterRule(localctx, 22, YiniParser.RULE_object_literal);
		let _la: number;
		try {
			let _alt: number;
			this.state = 177;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 16:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 147;
				this.match(YiniParser.OC);
				this.state = 151;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 19, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 148;
						this.match(YiniParser.NL);
						}
						}
					}
					this.state = 153;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 19, this._ctx);
				}
				this.state = 155;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===30) {
					{
					this.state = 154;
					this.object_members();
					}
				}

				this.state = 160;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===38) {
					{
					{
					this.state = 157;
					this.match(YiniParser.NL);
					}
					}
					this.state = 162;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 163;
				this.match(YiniParser.CC);
				this.state = 167;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 22, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 164;
						this.match(YiniParser.NL);
						}
						}
					}
					this.state = 169;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 22, this._ctx);
				}
				}
				break;
			case 26:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 170;
				this.match(YiniParser.EMPTY_OBJECT);
				this.state = 174;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 23, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 171;
						this.match(YiniParser.NL);
						}
						}
					}
					this.state = 176;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 23, this._ctx);
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
		this.enterRule(localctx, 24, YiniParser.RULE_object_members);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 179;
			this.object_member();
			this.state = 190;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 26, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 180;
					this.match(YiniParser.COMMA);
					this.state = 184;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la===38) {
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
					this.object_member();
					}
					}
				}
				this.state = 192;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 26, this._ctx);
			}
			this.state = 194;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===12) {
				{
				this.state = 193;
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
		this.enterRule(localctx, 26, YiniParser.RULE_object_member);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 196;
			this.match(YiniParser.KEY);
			this.state = 198;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===40) {
				{
				this.state = 197;
				this.match(YiniParser.WS);
				}
			}

			this.state = 200;
			this.match(YiniParser.COLON);
			this.state = 204;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===38) {
				{
				{
				this.state = 201;
				this.match(YiniParser.NL);
				}
				}
				this.state = 206;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 207;
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
	public list_literal(): List_literalContext {
		let localctx: List_literalContext = new List_literalContext(this, this._ctx, this.state);
		this.enterRule(localctx, 28, YiniParser.RULE_list_literal);
		let _la: number;
		try {
			let _alt: number;
			this.state = 239;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 14:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 209;
				this.match(YiniParser.OB);
				this.state = 213;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 30, this._ctx);
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
					_alt = this._interp.adaptivePredict(this._input, 30, this._ctx);
				}
				this.state = 217;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2944483328) !== 0)) {
					{
					this.state = 216;
					this.elements();
					}
				}

				this.state = 222;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===38) {
					{
					{
					this.state = 219;
					this.match(YiniParser.NL);
					}
					}
					this.state = 224;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 225;
				this.match(YiniParser.CB);
				this.state = 229;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 33, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 226;
						this.match(YiniParser.NL);
						}
						}
					}
					this.state = 231;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 33, this._ctx);
				}
				}
				break;
			case 27:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 232;
				this.match(YiniParser.EMPTY_LIST);
				this.state = 236;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 34, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 233;
						this.match(YiniParser.NL);
						}
						}
					}
					this.state = 238;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 34, this._ctx);
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
		this.enterRule(localctx, 30, YiniParser.RULE_elements);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 241;
			this.value();
			this.state = 258;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 38, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 245;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la===38) {
						{
						{
						this.state = 242;
						this.match(YiniParser.NL);
						}
						}
						this.state = 247;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					this.state = 248;
					this.match(YiniParser.COMMA);
					this.state = 252;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la===38) {
						{
						{
						this.state = 249;
						this.match(YiniParser.NL);
						}
						}
						this.state = 254;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					this.state = 255;
					this.value();
					}
					}
				}
				this.state = 260;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 38, this._ctx);
			}
			this.state = 262;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===12) {
				{
				this.state = 261;
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
		this.enterRule(localctx, 32, YiniParser.RULE_number_literal);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 264;
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
		this.enterRule(localctx, 34, YiniParser.RULE_null_literal);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 266;
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
		this.enterRule(localctx, 36, YiniParser.RULE_string_literal);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 268;
			this.match(YiniParser.STRING);
			this.state = 272;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 40, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 269;
					this.string_concat();
					}
					}
				}
				this.state = 274;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 40, this._ctx);
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
		this.enterRule(localctx, 38, YiniParser.RULE_string_concat);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 278;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===38) {
				{
				{
				this.state = 275;
				this.match(YiniParser.NL);
				}
				}
				this.state = 280;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 281;
			this.match(YiniParser.PLUS);
			this.state = 285;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===38) {
				{
				{
				this.state = 282;
				this.match(YiniParser.NL);
				}
				}
				this.state = 287;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 288;
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
		this.enterRule(localctx, 40, YiniParser.RULE_boolean_literal);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 290;
			_la = this._input.LA(1);
			if(!(_la===23 || _la===24)) {
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
		this.enterRule(localctx, 42, YiniParser.RULE_bad_meta_text);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 292;
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
		this.enterRule(localctx, 44, YiniParser.RULE_bad_member);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 295;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 43, this._ctx) ) {
			case 1:
				{
				this.state = 294;
				this.match(YiniParser.WS);
				}
				break;
			}
			this.state = 299;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 46:
				{
				this.state = 297;
				this.match(YiniParser.REST);
				}
				break;
			case 14:
			case 16:
			case 23:
			case 24:
			case 25:
			case 26:
			case 27:
			case 29:
			case 31:
				{
				this.state = 298;
				this.value();
				}
				break;
			case 10:
			case 40:
				break;
			default:
				break;
			}
			this.state = 302;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===40) {
				{
				this.state = 301;
				this.match(YiniParser.WS);
				}
			}

			this.state = 304;
			this.match(YiniParser.EQ);
			this.state = 307;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 14:
			case 16:
			case 23:
			case 24:
			case 25:
			case 26:
			case 27:
			case 29:
			case 31:
				{
				this.state = 305;
				this.value();
				}
				break;
			case 46:
				{
				this.state = 306;
				this.match(YiniParser.REST);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 310;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 47, this._ctx) ) {
			case 1:
				{
				this.state = 309;
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

	public static readonly _serializedATN: number[] = [4,1,47,313,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,
	10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,
	7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,2,22,7,22,1,0,3,0,48,8,0,1,
	0,5,0,51,8,0,10,0,12,0,54,9,0,1,0,3,0,57,8,0,1,0,1,0,1,1,1,1,5,1,63,8,1,
	10,1,12,1,66,9,1,1,1,4,1,69,8,1,11,1,12,1,70,3,1,73,8,1,1,2,1,2,1,2,3,2,
	78,8,2,1,2,5,2,81,8,2,10,2,12,2,84,9,2,1,3,1,3,1,3,1,3,1,3,3,3,91,8,3,1,
	4,1,4,1,4,1,4,1,4,3,4,98,8,4,1,5,1,5,1,5,1,5,5,5,104,8,5,10,5,12,5,107,
	9,5,1,5,3,5,110,8,5,1,5,3,5,113,8,5,1,6,1,6,1,6,1,7,3,7,119,8,7,1,7,4,7,
	122,8,7,11,7,12,7,123,1,8,1,8,1,8,1,9,1,9,3,9,131,8,9,1,9,1,9,3,9,135,8,
	9,1,9,3,9,138,8,9,1,10,1,10,1,10,1,10,1,10,1,10,3,10,146,8,10,1,11,1,11,
	5,11,150,8,11,10,11,12,11,153,9,11,1,11,3,11,156,8,11,1,11,5,11,159,8,11,
	10,11,12,11,162,9,11,1,11,1,11,5,11,166,8,11,10,11,12,11,169,9,11,1,11,
	1,11,5,11,173,8,11,10,11,12,11,176,9,11,3,11,178,8,11,1,12,1,12,1,12,5,
	12,183,8,12,10,12,12,12,186,9,12,1,12,5,12,189,8,12,10,12,12,12,192,9,12,
	1,12,3,12,195,8,12,1,13,1,13,3,13,199,8,13,1,13,1,13,5,13,203,8,13,10,13,
	12,13,206,9,13,1,13,1,13,1,14,1,14,5,14,212,8,14,10,14,12,14,215,9,14,1,
	14,3,14,218,8,14,1,14,5,14,221,8,14,10,14,12,14,224,9,14,1,14,1,14,5,14,
	228,8,14,10,14,12,14,231,9,14,1,14,1,14,5,14,235,8,14,10,14,12,14,238,9,
	14,3,14,240,8,14,1,15,1,15,5,15,244,8,15,10,15,12,15,247,9,15,1,15,1,15,
	5,15,251,8,15,10,15,12,15,254,9,15,1,15,5,15,257,8,15,10,15,12,15,260,9,
	15,1,15,3,15,263,8,15,1,16,1,16,1,17,1,17,1,18,1,18,5,18,271,8,18,10,18,
	12,18,274,9,18,1,19,5,19,277,8,19,10,19,12,19,280,9,19,1,19,1,19,5,19,284,
	8,19,10,19,12,19,287,9,19,1,19,1,19,1,20,1,20,1,21,1,21,1,22,3,22,296,8,
	22,1,22,1,22,3,22,300,8,22,1,22,3,22,303,8,22,1,22,1,22,1,22,3,22,308,8,
	22,1,22,3,22,311,8,22,1,22,0,0,23,0,2,4,6,8,10,12,14,16,18,20,22,24,26,
	28,30,32,34,36,38,40,42,44,0,1,1,0,23,24,347,0,47,1,0,0,0,2,72,1,0,0,0,
	4,74,1,0,0,0,6,90,1,0,0,0,8,97,1,0,0,0,10,112,1,0,0,0,12,114,1,0,0,0,14,
	118,1,0,0,0,16,125,1,0,0,0,18,128,1,0,0,0,20,145,1,0,0,0,22,177,1,0,0,0,
	24,179,1,0,0,0,26,196,1,0,0,0,28,239,1,0,0,0,30,241,1,0,0,0,32,264,1,0,
	0,0,34,266,1,0,0,0,36,268,1,0,0,0,38,278,1,0,0,0,40,290,1,0,0,0,42,292,
	1,0,0,0,44,295,1,0,0,0,46,48,3,2,1,0,47,46,1,0,0,0,47,48,1,0,0,0,48,52,
	1,0,0,0,49,51,3,6,3,0,50,49,1,0,0,0,51,54,1,0,0,0,52,50,1,0,0,0,52,53,1,
	0,0,0,53,56,1,0,0,0,54,52,1,0,0,0,55,57,3,4,2,0,56,55,1,0,0,0,56,57,1,0,
	0,0,57,58,1,0,0,0,58,59,5,0,0,1,59,1,1,0,0,0,60,64,5,28,0,0,61,63,3,14,
	7,0,62,61,1,0,0,0,63,66,1,0,0,0,64,62,1,0,0,0,64,65,1,0,0,0,65,73,1,0,0,
	0,66,64,1,0,0,0,67,69,3,14,7,0,68,67,1,0,0,0,69,70,1,0,0,0,70,68,1,0,0,
	0,70,71,1,0,0,0,71,73,1,0,0,0,72,60,1,0,0,0,72,68,1,0,0,0,73,3,1,0,0,0,
	74,77,5,5,0,0,75,78,3,14,7,0,76,78,5,44,0,0,77,75,1,0,0,0,77,76,1,0,0,0,
	77,78,1,0,0,0,78,82,1,0,0,0,79,81,5,38,0,0,80,79,1,0,0,0,81,84,1,0,0,0,
	82,80,1,0,0,0,82,83,1,0,0,0,83,5,1,0,0,0,84,82,1,0,0,0,85,91,3,14,7,0,86,
	91,5,4,0,0,87,91,3,16,8,0,88,91,3,8,4,0,89,91,3,44,22,0,90,85,1,0,0,0,90,
	86,1,0,0,0,90,87,1,0,0,0,90,88,1,0,0,0,90,89,1,0,0,0,91,7,1,0,0,0,92,98,
	3,10,5,0,93,98,3,12,6,0,94,95,3,42,21,0,95,96,3,14,7,0,96,98,1,0,0,0,97,
	92,1,0,0,0,97,93,1,0,0,0,97,94,1,0,0,0,98,9,1,0,0,0,99,100,5,1,0,0,100,
	113,3,14,7,0,101,105,5,2,0,0,102,104,5,40,0,0,103,102,1,0,0,0,104,107,1,
	0,0,0,105,103,1,0,0,0,105,106,1,0,0,0,106,109,1,0,0,0,107,105,1,0,0,0,108,
	110,3,36,18,0,109,108,1,0,0,0,109,110,1,0,0,0,110,111,1,0,0,0,111,113,3,
	14,7,0,112,99,1,0,0,0,112,101,1,0,0,0,113,11,1,0,0,0,114,115,5,3,0,0,115,
	116,3,14,7,0,116,13,1,0,0,0,117,119,5,44,0,0,118,117,1,0,0,0,118,119,1,
	0,0,0,119,121,1,0,0,0,120,122,5,38,0,0,121,120,1,0,0,0,122,123,1,0,0,0,
	123,121,1,0,0,0,123,124,1,0,0,0,124,15,1,0,0,0,125,126,3,18,9,0,126,127,
	3,14,7,0,127,17,1,0,0,0,128,130,5,30,0,0,129,131,5,40,0,0,130,129,1,0,0,
	0,130,131,1,0,0,0,131,132,1,0,0,0,132,134,5,10,0,0,133,135,5,40,0,0,134,
	133,1,0,0,0,134,135,1,0,0,0,135,137,1,0,0,0,136,138,3,20,10,0,137,136,1,
	0,0,0,137,138,1,0,0,0,138,19,1,0,0,0,139,146,3,34,17,0,140,146,3,36,18,
	0,141,146,3,32,16,0,142,146,3,40,20,0,143,146,3,28,14,0,144,146,3,22,11,
	0,145,139,1,0,0,0,145,140,1,0,0,0,145,141,1,0,0,0,145,142,1,0,0,0,145,143,
	1,0,0,0,145,144,1,0,0,0,146,21,1,0,0,0,147,151,5,16,0,0,148,150,5,38,0,
	0,149,148,1,0,0,0,150,153,1,0,0,0,151,149,1,0,0,0,151,152,1,0,0,0,152,155,
	1,0,0,0,153,151,1,0,0,0,154,156,3,24,12,0,155,154,1,0,0,0,155,156,1,0,0,
	0,156,160,1,0,0,0,157,159,5,38,0,0,158,157,1,0,0,0,159,162,1,0,0,0,160,
	158,1,0,0,0,160,161,1,0,0,0,161,163,1,0,0,0,162,160,1,0,0,0,163,167,5,17,
	0,0,164,166,5,38,0,0,165,164,1,0,0,0,166,169,1,0,0,0,167,165,1,0,0,0,167,
	168,1,0,0,0,168,178,1,0,0,0,169,167,1,0,0,0,170,174,5,26,0,0,171,173,5,
	38,0,0,172,171,1,0,0,0,173,176,1,0,0,0,174,172,1,0,0,0,174,175,1,0,0,0,
	175,178,1,0,0,0,176,174,1,0,0,0,177,147,1,0,0,0,177,170,1,0,0,0,178,23,
	1,0,0,0,179,190,3,26,13,0,180,184,5,12,0,0,181,183,5,38,0,0,182,181,1,0,
	0,0,183,186,1,0,0,0,184,182,1,0,0,0,184,185,1,0,0,0,185,187,1,0,0,0,186,
	184,1,0,0,0,187,189,3,26,13,0,188,180,1,0,0,0,189,192,1,0,0,0,190,188,1,
	0,0,0,190,191,1,0,0,0,191,194,1,0,0,0,192,190,1,0,0,0,193,195,5,12,0,0,
	194,193,1,0,0,0,194,195,1,0,0,0,195,25,1,0,0,0,196,198,5,30,0,0,197,199,
	5,40,0,0,198,197,1,0,0,0,198,199,1,0,0,0,199,200,1,0,0,0,200,204,5,13,0,
	0,201,203,5,38,0,0,202,201,1,0,0,0,203,206,1,0,0,0,204,202,1,0,0,0,204,
	205,1,0,0,0,205,207,1,0,0,0,206,204,1,0,0,0,207,208,3,20,10,0,208,27,1,
	0,0,0,209,213,5,14,0,0,210,212,5,38,0,0,211,210,1,0,0,0,212,215,1,0,0,0,
	213,211,1,0,0,0,213,214,1,0,0,0,214,217,1,0,0,0,215,213,1,0,0,0,216,218,
	3,30,15,0,217,216,1,0,0,0,217,218,1,0,0,0,218,222,1,0,0,0,219,221,5,38,
	0,0,220,219,1,0,0,0,221,224,1,0,0,0,222,220,1,0,0,0,222,223,1,0,0,0,223,
	225,1,0,0,0,224,222,1,0,0,0,225,229,5,15,0,0,226,228,5,38,0,0,227,226,1,
	0,0,0,228,231,1,0,0,0,229,227,1,0,0,0,229,230,1,0,0,0,230,240,1,0,0,0,231,
	229,1,0,0,0,232,236,5,27,0,0,233,235,5,38,0,0,234,233,1,0,0,0,235,238,1,
	0,0,0,236,234,1,0,0,0,236,237,1,0,0,0,237,240,1,0,0,0,238,236,1,0,0,0,239,
	209,1,0,0,0,239,232,1,0,0,0,240,29,1,0,0,0,241,258,3,20,10,0,242,244,5,
	38,0,0,243,242,1,0,0,0,244,247,1,0,0,0,245,243,1,0,0,0,245,246,1,0,0,0,
	246,248,1,0,0,0,247,245,1,0,0,0,248,252,5,12,0,0,249,251,5,38,0,0,250,249,
	1,0,0,0,251,254,1,0,0,0,252,250,1,0,0,0,252,253,1,0,0,0,253,255,1,0,0,0,
	254,252,1,0,0,0,255,257,3,20,10,0,256,245,1,0,0,0,257,260,1,0,0,0,258,256,
	1,0,0,0,258,259,1,0,0,0,259,262,1,0,0,0,260,258,1,0,0,0,261,263,5,12,0,
	0,262,261,1,0,0,0,262,263,1,0,0,0,263,31,1,0,0,0,264,265,5,29,0,0,265,33,
	1,0,0,0,266,267,5,25,0,0,267,35,1,0,0,0,268,272,5,31,0,0,269,271,3,38,19,
	0,270,269,1,0,0,0,271,274,1,0,0,0,272,270,1,0,0,0,272,273,1,0,0,0,273,37,
	1,0,0,0,274,272,1,0,0,0,275,277,5,38,0,0,276,275,1,0,0,0,277,280,1,0,0,
	0,278,276,1,0,0,0,278,279,1,0,0,0,279,281,1,0,0,0,280,278,1,0,0,0,281,285,
	5,18,0,0,282,284,5,38,0,0,283,282,1,0,0,0,284,287,1,0,0,0,285,283,1,0,0,
	0,285,286,1,0,0,0,286,288,1,0,0,0,287,285,1,0,0,0,288,289,5,31,0,0,289,
	39,1,0,0,0,290,291,7,0,0,0,291,41,1,0,0,0,292,293,5,47,0,0,293,43,1,0,0,
	0,294,296,5,40,0,0,295,294,1,0,0,0,295,296,1,0,0,0,296,299,1,0,0,0,297,
	300,5,46,0,0,298,300,3,20,10,0,299,297,1,0,0,0,299,298,1,0,0,0,299,300,
	1,0,0,0,300,302,1,0,0,0,301,303,5,40,0,0,302,301,1,0,0,0,302,303,1,0,0,
	0,303,304,1,0,0,0,304,307,5,10,0,0,305,308,3,20,10,0,306,308,5,46,0,0,307,
	305,1,0,0,0,307,306,1,0,0,0,308,310,1,0,0,0,309,311,3,14,7,0,310,309,1,
	0,0,0,310,311,1,0,0,0,311,45,1,0,0,0,48,47,52,56,64,70,72,77,82,90,97,105,
	109,112,118,123,130,134,137,145,151,155,160,167,174,177,184,190,194,198,
	204,213,217,222,229,236,239,245,252,258,262,272,278,285,295,299,302,307,
	310];

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
	public eol(): EolContext {
		return this.getTypedRuleContext(EolContext, 0) as EolContext;
	}
	public INLINE_COMMENT(): TerminalNode {
		return this.getToken(YiniParser.INLINE_COMMENT, 0);
	}
	public NL_list(): TerminalNode[] {
	    	return this.getTokens(YiniParser.NL);
	}
	public NL(i: number): TerminalNode {
		return this.getToken(YiniParser.NL, i);
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
	public WS_list(): TerminalNode[] {
	    	return this.getTokens(YiniParser.WS);
	}
	public WS(i: number): TerminalNode {
		return this.getToken(YiniParser.WS, i);
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
	public INLINE_COMMENT(): TerminalNode {
		return this.getToken(YiniParser.INLINE_COMMENT, 0);
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
	public WS_list(): TerminalNode[] {
	    	return this.getTokens(YiniParser.WS);
	}
	public WS(i: number): TerminalNode {
		return this.getToken(YiniParser.WS, i);
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
	public COLON(): TerminalNode {
		return this.getToken(YiniParser.COLON, 0);
	}
	public value(): ValueContext {
		return this.getTypedRuleContext(ValueContext, 0) as ValueContext;
	}
	public WS(): TerminalNode {
		return this.getToken(YiniParser.WS, 0);
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
	public WS_list(): TerminalNode[] {
	    	return this.getTokens(YiniParser.WS);
	}
	public WS(i: number): TerminalNode {
		return this.getToken(YiniParser.WS, i);
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
