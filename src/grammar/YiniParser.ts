// Generated from grammar/v1.0.0-rc.2x/YiniParser.g4 by ANTLR 4.13.2
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
	public static readonly EUR = 7;
	public static readonly CARET = 8;
	public static readonly GT = 9;
	public static readonly LT = 10;
	public static readonly EQ = 11;
	public static readonly HASH = 12;
	public static readonly COMMA = 13;
	public static readonly COLON = 14;
	public static readonly OB = 15;
	public static readonly CB = 16;
	public static readonly OC = 17;
	public static readonly CC = 18;
	public static readonly PLUS = 19;
	public static readonly DOLLAR = 20;
	public static readonly PC = 21;
	public static readonly AT = 22;
	public static readonly SEMICOLON = 23;
	public static readonly BOOLEAN_FALSE = 24;
	public static readonly BOOLEAN_TRUE = 25;
	public static readonly NULL = 26;
	public static readonly EMPTY_OBJECT = 27;
	public static readonly EMPTY_LIST = 28;
	public static readonly SHEBANG = 29;
	public static readonly NUMBER = 30;
	public static readonly KEY = 31;
	public static readonly IDENT = 32;
	public static readonly IDENT_BACKTICKED = 33;
	public static readonly STRING = 34;
	public static readonly TRIPLE_QUOTED_STRING = 35;
	public static readonly SINGLE_OR_DOUBLE = 36;
	public static readonly R_AND_C_STRING = 37;
	public static readonly HYPER_STRING = 38;
	public static readonly ESC_SEQ = 39;
	public static readonly ESC_SEQ_BASE = 40;
	public static readonly NL = 41;
	public static readonly SINGLE_NL = 42;
	public static readonly WS = 43;
	public static readonly BLOCK_COMMENT = 44;
	public static readonly COMMENT = 45;
	public static readonly LINE_COMMENT = 46;
	public static readonly INLINE_COMMENT = 47;
	public static readonly IDENT_INVALID = 48;
	public static readonly REST = 49;
	public static readonly META_INVALID = 50;
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
	public static readonly RULE_colon_list_decl = 10;
	public static readonly RULE_value = 11;
	public static readonly RULE_object_literal = 12;
	public static readonly RULE_object_members = 13;
	public static readonly RULE_object_member = 14;
	public static readonly RULE_list_literal = 15;
	public static readonly RULE_elements = 16;
	public static readonly RULE_number_literal = 17;
	public static readonly RULE_null_literal = 18;
	public static readonly RULE_string_literal = 19;
	public static readonly RULE_string_concat = 20;
	public static readonly RULE_boolean_literal = 21;
	public static readonly RULE_bad_meta_text = 22;
	public static readonly RULE_bad_member = 23;
	public static readonly literalNames: (string | null)[] = [ null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            "'\\u00A7'", 
                                                            "'\\u20AC'", 
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
                                                             "SS", "EUR", 
                                                             "CARET", "GT", 
                                                             "LT", "EQ", 
                                                             "HASH", "COMMA", 
                                                             "COLON", "OB", 
                                                             "CB", "OC", 
                                                             "CC", "PLUS", 
                                                             "DOLLAR", "PC", 
                                                             "AT", "SEMICOLON", 
                                                             "BOOLEAN_FALSE", 
                                                             "BOOLEAN_TRUE", 
                                                             "NULL", "EMPTY_OBJECT", 
                                                             "EMPTY_LIST", 
                                                             "SHEBANG", 
                                                             "NUMBER", "KEY", 
                                                             "IDENT", "IDENT_BACKTICKED", 
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
		"eol", "assignment", "member", "colon_list_decl", "value", "object_literal", 
		"object_members", "object_member", "list_literal", "elements", "number_literal", 
		"null_literal", "string_literal", "string_concat", "boolean_literal", 
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
			this.state = 49;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 0, this._ctx) ) {
			case 1:
				{
				this.state = 48;
				this.prolog();
				}
				break;
			}
			this.state = 54;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3741485086) !== 0) || ((((_la - 34)) & ~0x1F) === 0 && ((1 << (_la - 34)) & 107137) !== 0)) {
				{
				{
				this.state = 51;
				this.stmt();
				}
				}
				this.state = 56;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 58;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===5) {
				{
				this.state = 57;
				this.terminal_stmt();
				}
			}

			this.state = 60;
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
			this.state = 74;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 29:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 62;
				this.match(YiniParser.SHEBANG);
				this.state = 66;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 3, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 63;
						this.eol();
						}
						}
					}
					this.state = 68;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 3, this._ctx);
				}
				}
				break;
			case 41:
			case 47:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 70;
				this._errHandler.sync(this);
				_alt = 1;
				do {
					switch (_alt) {
					case 1:
						{
						{
						this.state = 69;
						this.eol();
						}
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					this.state = 72;
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
			this.state = 76;
			this.match(YiniParser.TERMINAL_TOKEN);
			this.state = 79;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 6, this._ctx) ) {
			case 1:
				{
				this.state = 77;
				this.eol();
				}
				break;
			case 2:
				{
				this.state = 78;
				this.match(YiniParser.INLINE_COMMENT);
				}
				break;
			}
			this.state = 84;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===41) {
				{
				{
				this.state = 81;
				this.match(YiniParser.NL);
				}
				}
				this.state = 86;
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
			this.state = 93;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 8, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 87;
				this.eol();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 88;
				this.match(YiniParser.SECTION_HEAD);
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 89;
				this.assignment();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 90;
				this.colon_list_decl();
				}
				break;
			case 5:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 91;
				this.meta_stmt();
				}
				break;
			case 6:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 92;
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
	public meta_stmt(): Meta_stmtContext {
		let localctx: Meta_stmtContext = new Meta_stmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 8, YiniParser.RULE_meta_stmt);
		try {
			this.state = 100;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 1:
			case 2:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 95;
				this.directive();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 96;
				this.annotation();
				}
				break;
			case 50:
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
		this.enterRule(localctx, 10, YiniParser.RULE_directive);
		let _la: number;
		try {
			this.state = 115;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 102;
				this.match(YiniParser.YINI_TOKEN);
				this.state = 103;
				this.eol();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 104;
				this.match(YiniParser.INCLUDE_TOKEN);
				this.state = 108;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===43) {
					{
					{
					this.state = 105;
					this.match(YiniParser.WS);
					}
					}
					this.state = 110;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 112;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===34) {
					{
					this.state = 111;
					this.string_literal();
					}
				}

				this.state = 114;
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
			this.state = 117;
			this.match(YiniParser.DEPRECATED_TOKEN);
			this.state = 118;
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
			this.state = 121;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===47) {
				{
				this.state = 120;
				this.match(YiniParser.INLINE_COMMENT);
				}
			}

			this.state = 124;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 123;
					this.match(YiniParser.NL);
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 126;
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
			this.state = 128;
			this.member();
			this.state = 129;
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
			this.state = 131;
			this.match(YiniParser.KEY);
			this.state = 133;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===43) {
				{
				this.state = 132;
				this.match(YiniParser.WS);
				}
			}

			this.state = 135;
			this.match(YiniParser.EQ);
			this.state = 137;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===43) {
				{
				this.state = 136;
				this.match(YiniParser.WS);
				}
			}

			this.state = 140;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 15)) & ~0x1F) === 0 && ((1 << (_la - 15)) & 572933) !== 0)) {
				{
				this.state = 139;
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
	public colon_list_decl(): Colon_list_declContext {
		let localctx: Colon_list_declContext = new Colon_list_declContext(this, this._ctx, this.state);
		this.enterRule(localctx, 20, YiniParser.RULE_colon_list_decl);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 142;
			this.match(YiniParser.KEY);
			this.state = 144;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===43) {
				{
				this.state = 143;
				this.match(YiniParser.WS);
				}
			}

			this.state = 146;
			this.match(YiniParser.COLON);
			this.state = 155;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 69) !== 0)) {
				{
				this.state = 153;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 41:
				case 47:
					{
					this.state = 147;
					this.eol();
					}
					break;
				case 43:
					{
					this.state = 149;
					this._errHandler.sync(this);
					_alt = 1;
					do {
						switch (_alt) {
						case 1:
							{
							{
							this.state = 148;
							this.match(YiniParser.WS);
							}
							}
							break;
						default:
							throw new NoViableAltException(this);
						}
						this.state = 151;
						this._errHandler.sync(this);
						_alt = this._interp.adaptivePredict(this._input, 19, this._ctx);
					} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 157;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 158;
			this.elements();
			this.state = 167;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 24, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					this.state = 165;
					this._errHandler.sync(this);
					switch (this._input.LA(1)) {
					case 41:
					case 47:
						{
						this.state = 159;
						this.eol();
						}
						break;
					case 43:
						{
						this.state = 161;
						this._errHandler.sync(this);
						_alt = 1;
						do {
							switch (_alt) {
							case 1:
								{
								{
								this.state = 160;
								this.match(YiniParser.WS);
								}
								}
								break;
							default:
								throw new NoViableAltException(this);
							}
							this.state = 163;
							this._errHandler.sync(this);
							_alt = this._interp.adaptivePredict(this._input, 22, this._ctx);
						} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					}
				}
				this.state = 169;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 24, this._ctx);
			}
			this.state = 170;
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
	public value(): ValueContext {
		let localctx: ValueContext = new ValueContext(this, this._ctx, this.state);
		this.enterRule(localctx, 22, YiniParser.RULE_value);
		try {
			this.state = 178;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 26:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 172;
				this.null_literal();
				}
				break;
			case 34:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 173;
				this.string_literal();
				}
				break;
			case 30:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 174;
				this.number_literal();
				}
				break;
			case 24:
			case 25:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 175;
				this.boolean_literal();
				}
				break;
			case 15:
			case 28:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 176;
				this.list_literal();
				}
				break;
			case 17:
			case 27:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 177;
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
			this.state = 210;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 17:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 180;
				this.match(YiniParser.OC);
				this.state = 184;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 26, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 181;
						this.match(YiniParser.NL);
						}
						}
					}
					this.state = 186;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 26, this._ctx);
				}
				this.state = 188;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===31) {
					{
					this.state = 187;
					this.object_members();
					}
				}

				this.state = 193;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===41) {
					{
					{
					this.state = 190;
					this.match(YiniParser.NL);
					}
					}
					this.state = 195;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 196;
				this.match(YiniParser.CC);
				this.state = 200;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 29, this._ctx);
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
					_alt = this._interp.adaptivePredict(this._input, 29, this._ctx);
				}
				}
				break;
			case 27:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 203;
				this.match(YiniParser.EMPTY_OBJECT);
				this.state = 207;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 30, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 204;
						this.match(YiniParser.NL);
						}
						}
					}
					this.state = 209;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 30, this._ctx);
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
			this.state = 212;
			this.object_member();
			this.state = 223;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 33, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 213;
					this.match(YiniParser.COMMA);
					this.state = 217;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la===41) {
						{
						{
						this.state = 214;
						this.match(YiniParser.NL);
						}
						}
						this.state = 219;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					this.state = 220;
					this.object_member();
					}
					}
				}
				this.state = 225;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 33, this._ctx);
			}
			this.state = 227;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===13) {
				{
				this.state = 226;
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
			this.state = 229;
			this.match(YiniParser.KEY);
			this.state = 231;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===43) {
				{
				this.state = 230;
				this.match(YiniParser.WS);
				}
			}

			this.state = 233;
			this.match(YiniParser.COLON);
			this.state = 237;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===41) {
				{
				{
				this.state = 234;
				this.match(YiniParser.NL);
				}
				}
				this.state = 239;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 240;
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
		this.enterRule(localctx, 30, YiniParser.RULE_list_literal);
		let _la: number;
		try {
			let _alt: number;
			this.state = 272;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 15:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 242;
				this.match(YiniParser.OB);
				this.state = 246;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 37, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 243;
						this.match(YiniParser.NL);
						}
						}
					}
					this.state = 248;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 37, this._ctx);
				}
				this.state = 250;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 15)) & ~0x1F) === 0 && ((1 << (_la - 15)) & 572933) !== 0)) {
					{
					this.state = 249;
					this.elements();
					}
				}

				this.state = 255;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===41) {
					{
					{
					this.state = 252;
					this.match(YiniParser.NL);
					}
					}
					this.state = 257;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 258;
				this.match(YiniParser.CB);
				this.state = 262;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 40, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 259;
						this.match(YiniParser.NL);
						}
						}
					}
					this.state = 264;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 40, this._ctx);
				}
				}
				break;
			case 28:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 265;
				this.match(YiniParser.EMPTY_LIST);
				this.state = 269;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 41, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 266;
						this.match(YiniParser.NL);
						}
						}
					}
					this.state = 271;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 41, this._ctx);
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
		this.enterRule(localctx, 32, YiniParser.RULE_elements);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 274;
			this.value();
			this.state = 291;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 45, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 278;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la===41) {
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
					this.match(YiniParser.COMMA);
					this.state = 285;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la===41) {
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
					this.value();
					}
					}
				}
				this.state = 293;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 45, this._ctx);
			}
			this.state = 295;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===13) {
				{
				this.state = 294;
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
		this.enterRule(localctx, 34, YiniParser.RULE_number_literal);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 297;
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
		this.enterRule(localctx, 36, YiniParser.RULE_null_literal);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 299;
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
		this.enterRule(localctx, 38, YiniParser.RULE_string_literal);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 301;
			this.match(YiniParser.STRING);
			this.state = 305;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 47, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 302;
					this.string_concat();
					}
					}
				}
				this.state = 307;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 47, this._ctx);
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
		this.enterRule(localctx, 40, YiniParser.RULE_string_concat);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 311;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===41) {
				{
				{
				this.state = 308;
				this.match(YiniParser.NL);
				}
				}
				this.state = 313;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 314;
			this.match(YiniParser.PLUS);
			this.state = 318;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===41) {
				{
				{
				this.state = 315;
				this.match(YiniParser.NL);
				}
				}
				this.state = 320;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 321;
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
		this.enterRule(localctx, 42, YiniParser.RULE_boolean_literal);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 323;
			_la = this._input.LA(1);
			if(!(_la===24 || _la===25)) {
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
		this.enterRule(localctx, 44, YiniParser.RULE_bad_meta_text);
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
		this.enterRule(localctx, 46, YiniParser.RULE_bad_member);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 328;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 50, this._ctx) ) {
			case 1:
				{
				this.state = 327;
				this.match(YiniParser.WS);
				}
				break;
			}
			this.state = 332;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 49:
				{
				this.state = 330;
				this.match(YiniParser.REST);
				}
				break;
			case 15:
			case 17:
			case 24:
			case 25:
			case 26:
			case 27:
			case 28:
			case 30:
			case 34:
				{
				this.state = 331;
				this.value();
				}
				break;
			case 11:
			case 43:
				break;
			default:
				break;
			}
			this.state = 335;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===43) {
				{
				this.state = 334;
				this.match(YiniParser.WS);
				}
			}

			this.state = 337;
			this.match(YiniParser.EQ);
			this.state = 340;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 15:
			case 17:
			case 24:
			case 25:
			case 26:
			case 27:
			case 28:
			case 30:
			case 34:
				{
				this.state = 338;
				this.value();
				}
				break;
			case 49:
				{
				this.state = 339;
				this.match(YiniParser.REST);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 343;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 54, this._ctx) ) {
			case 1:
				{
				this.state = 342;
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

	public static readonly _serializedATN: number[] = [4,1,50,346,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,
	10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,
	7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,1,0,3,
	0,50,8,0,1,0,5,0,53,8,0,10,0,12,0,56,9,0,1,0,3,0,59,8,0,1,0,1,0,1,1,1,1,
	5,1,65,8,1,10,1,12,1,68,9,1,1,1,4,1,71,8,1,11,1,12,1,72,3,1,75,8,1,1,2,
	1,2,1,2,3,2,80,8,2,1,2,5,2,83,8,2,10,2,12,2,86,9,2,1,3,1,3,1,3,1,3,1,3,
	1,3,3,3,94,8,3,1,4,1,4,1,4,1,4,1,4,3,4,101,8,4,1,5,1,5,1,5,1,5,5,5,107,
	8,5,10,5,12,5,110,9,5,1,5,3,5,113,8,5,1,5,3,5,116,8,5,1,6,1,6,1,6,1,7,3,
	7,122,8,7,1,7,4,7,125,8,7,11,7,12,7,126,1,8,1,8,1,8,1,9,1,9,3,9,134,8,9,
	1,9,1,9,3,9,138,8,9,1,9,3,9,141,8,9,1,10,1,10,3,10,145,8,10,1,10,1,10,1,
	10,4,10,150,8,10,11,10,12,10,151,5,10,154,8,10,10,10,12,10,157,9,10,1,10,
	1,10,1,10,4,10,162,8,10,11,10,12,10,163,5,10,166,8,10,10,10,12,10,169,9,
	10,1,10,1,10,1,11,1,11,1,11,1,11,1,11,1,11,3,11,179,8,11,1,12,1,12,5,12,
	183,8,12,10,12,12,12,186,9,12,1,12,3,12,189,8,12,1,12,5,12,192,8,12,10,
	12,12,12,195,9,12,1,12,1,12,5,12,199,8,12,10,12,12,12,202,9,12,1,12,1,12,
	5,12,206,8,12,10,12,12,12,209,9,12,3,12,211,8,12,1,13,1,13,1,13,5,13,216,
	8,13,10,13,12,13,219,9,13,1,13,5,13,222,8,13,10,13,12,13,225,9,13,1,13,
	3,13,228,8,13,1,14,1,14,3,14,232,8,14,1,14,1,14,5,14,236,8,14,10,14,12,
	14,239,9,14,1,14,1,14,1,15,1,15,5,15,245,8,15,10,15,12,15,248,9,15,1,15,
	3,15,251,8,15,1,15,5,15,254,8,15,10,15,12,15,257,9,15,1,15,1,15,5,15,261,
	8,15,10,15,12,15,264,9,15,1,15,1,15,5,15,268,8,15,10,15,12,15,271,9,15,
	3,15,273,8,15,1,16,1,16,5,16,277,8,16,10,16,12,16,280,9,16,1,16,1,16,5,
	16,284,8,16,10,16,12,16,287,9,16,1,16,5,16,290,8,16,10,16,12,16,293,9,16,
	1,16,3,16,296,8,16,1,17,1,17,1,18,1,18,1,19,1,19,5,19,304,8,19,10,19,12,
	19,307,9,19,1,20,5,20,310,8,20,10,20,12,20,313,9,20,1,20,1,20,5,20,317,
	8,20,10,20,12,20,320,9,20,1,20,1,20,1,21,1,21,1,22,1,22,1,23,3,23,329,8,
	23,1,23,1,23,3,23,333,8,23,1,23,3,23,336,8,23,1,23,1,23,1,23,3,23,341,8,
	23,1,23,3,23,344,8,23,1,23,0,0,24,0,2,4,6,8,10,12,14,16,18,20,22,24,26,
	28,30,32,34,36,38,40,42,44,46,0,1,1,0,24,25,387,0,49,1,0,0,0,2,74,1,0,0,
	0,4,76,1,0,0,0,6,93,1,0,0,0,8,100,1,0,0,0,10,115,1,0,0,0,12,117,1,0,0,0,
	14,121,1,0,0,0,16,128,1,0,0,0,18,131,1,0,0,0,20,142,1,0,0,0,22,178,1,0,
	0,0,24,210,1,0,0,0,26,212,1,0,0,0,28,229,1,0,0,0,30,272,1,0,0,0,32,274,
	1,0,0,0,34,297,1,0,0,0,36,299,1,0,0,0,38,301,1,0,0,0,40,311,1,0,0,0,42,
	323,1,0,0,0,44,325,1,0,0,0,46,328,1,0,0,0,48,50,3,2,1,0,49,48,1,0,0,0,49,
	50,1,0,0,0,50,54,1,0,0,0,51,53,3,6,3,0,52,51,1,0,0,0,53,56,1,0,0,0,54,52,
	1,0,0,0,54,55,1,0,0,0,55,58,1,0,0,0,56,54,1,0,0,0,57,59,3,4,2,0,58,57,1,
	0,0,0,58,59,1,0,0,0,59,60,1,0,0,0,60,61,5,0,0,1,61,1,1,0,0,0,62,66,5,29,
	0,0,63,65,3,14,7,0,64,63,1,0,0,0,65,68,1,0,0,0,66,64,1,0,0,0,66,67,1,0,
	0,0,67,75,1,0,0,0,68,66,1,0,0,0,69,71,3,14,7,0,70,69,1,0,0,0,71,72,1,0,
	0,0,72,70,1,0,0,0,72,73,1,0,0,0,73,75,1,0,0,0,74,62,1,0,0,0,74,70,1,0,0,
	0,75,3,1,0,0,0,76,79,5,5,0,0,77,80,3,14,7,0,78,80,5,47,0,0,79,77,1,0,0,
	0,79,78,1,0,0,0,79,80,1,0,0,0,80,84,1,0,0,0,81,83,5,41,0,0,82,81,1,0,0,
	0,83,86,1,0,0,0,84,82,1,0,0,0,84,85,1,0,0,0,85,5,1,0,0,0,86,84,1,0,0,0,
	87,94,3,14,7,0,88,94,5,4,0,0,89,94,3,16,8,0,90,94,3,20,10,0,91,94,3,8,4,
	0,92,94,3,46,23,0,93,87,1,0,0,0,93,88,1,0,0,0,93,89,1,0,0,0,93,90,1,0,0,
	0,93,91,1,0,0,0,93,92,1,0,0,0,94,7,1,0,0,0,95,101,3,10,5,0,96,101,3,12,
	6,0,97,98,3,44,22,0,98,99,3,14,7,0,99,101,1,0,0,0,100,95,1,0,0,0,100,96,
	1,0,0,0,100,97,1,0,0,0,101,9,1,0,0,0,102,103,5,1,0,0,103,116,3,14,7,0,104,
	108,5,2,0,0,105,107,5,43,0,0,106,105,1,0,0,0,107,110,1,0,0,0,108,106,1,
	0,0,0,108,109,1,0,0,0,109,112,1,0,0,0,110,108,1,0,0,0,111,113,3,38,19,0,
	112,111,1,0,0,0,112,113,1,0,0,0,113,114,1,0,0,0,114,116,3,14,7,0,115,102,
	1,0,0,0,115,104,1,0,0,0,116,11,1,0,0,0,117,118,5,3,0,0,118,119,3,14,7,0,
	119,13,1,0,0,0,120,122,5,47,0,0,121,120,1,0,0,0,121,122,1,0,0,0,122,124,
	1,0,0,0,123,125,5,41,0,0,124,123,1,0,0,0,125,126,1,0,0,0,126,124,1,0,0,
	0,126,127,1,0,0,0,127,15,1,0,0,0,128,129,3,18,9,0,129,130,3,14,7,0,130,
	17,1,0,0,0,131,133,5,31,0,0,132,134,5,43,0,0,133,132,1,0,0,0,133,134,1,
	0,0,0,134,135,1,0,0,0,135,137,5,11,0,0,136,138,5,43,0,0,137,136,1,0,0,0,
	137,138,1,0,0,0,138,140,1,0,0,0,139,141,3,22,11,0,140,139,1,0,0,0,140,141,
	1,0,0,0,141,19,1,0,0,0,142,144,5,31,0,0,143,145,5,43,0,0,144,143,1,0,0,
	0,144,145,1,0,0,0,145,146,1,0,0,0,146,155,5,14,0,0,147,154,3,14,7,0,148,
	150,5,43,0,0,149,148,1,0,0,0,150,151,1,0,0,0,151,149,1,0,0,0,151,152,1,
	0,0,0,152,154,1,0,0,0,153,147,1,0,0,0,153,149,1,0,0,0,154,157,1,0,0,0,155,
	153,1,0,0,0,155,156,1,0,0,0,156,158,1,0,0,0,157,155,1,0,0,0,158,167,3,32,
	16,0,159,166,3,14,7,0,160,162,5,43,0,0,161,160,1,0,0,0,162,163,1,0,0,0,
	163,161,1,0,0,0,163,164,1,0,0,0,164,166,1,0,0,0,165,159,1,0,0,0,165,161,
	1,0,0,0,166,169,1,0,0,0,167,165,1,0,0,0,167,168,1,0,0,0,168,170,1,0,0,0,
	169,167,1,0,0,0,170,171,3,14,7,0,171,21,1,0,0,0,172,179,3,36,18,0,173,179,
	3,38,19,0,174,179,3,34,17,0,175,179,3,42,21,0,176,179,3,30,15,0,177,179,
	3,24,12,0,178,172,1,0,0,0,178,173,1,0,0,0,178,174,1,0,0,0,178,175,1,0,0,
	0,178,176,1,0,0,0,178,177,1,0,0,0,179,23,1,0,0,0,180,184,5,17,0,0,181,183,
	5,41,0,0,182,181,1,0,0,0,183,186,1,0,0,0,184,182,1,0,0,0,184,185,1,0,0,
	0,185,188,1,0,0,0,186,184,1,0,0,0,187,189,3,26,13,0,188,187,1,0,0,0,188,
	189,1,0,0,0,189,193,1,0,0,0,190,192,5,41,0,0,191,190,1,0,0,0,192,195,1,
	0,0,0,193,191,1,0,0,0,193,194,1,0,0,0,194,196,1,0,0,0,195,193,1,0,0,0,196,
	200,5,18,0,0,197,199,5,41,0,0,198,197,1,0,0,0,199,202,1,0,0,0,200,198,1,
	0,0,0,200,201,1,0,0,0,201,211,1,0,0,0,202,200,1,0,0,0,203,207,5,27,0,0,
	204,206,5,41,0,0,205,204,1,0,0,0,206,209,1,0,0,0,207,205,1,0,0,0,207,208,
	1,0,0,0,208,211,1,0,0,0,209,207,1,0,0,0,210,180,1,0,0,0,210,203,1,0,0,0,
	211,25,1,0,0,0,212,223,3,28,14,0,213,217,5,13,0,0,214,216,5,41,0,0,215,
	214,1,0,0,0,216,219,1,0,0,0,217,215,1,0,0,0,217,218,1,0,0,0,218,220,1,0,
	0,0,219,217,1,0,0,0,220,222,3,28,14,0,221,213,1,0,0,0,222,225,1,0,0,0,223,
	221,1,0,0,0,223,224,1,0,0,0,224,227,1,0,0,0,225,223,1,0,0,0,226,228,5,13,
	0,0,227,226,1,0,0,0,227,228,1,0,0,0,228,27,1,0,0,0,229,231,5,31,0,0,230,
	232,5,43,0,0,231,230,1,0,0,0,231,232,1,0,0,0,232,233,1,0,0,0,233,237,5,
	14,0,0,234,236,5,41,0,0,235,234,1,0,0,0,236,239,1,0,0,0,237,235,1,0,0,0,
	237,238,1,0,0,0,238,240,1,0,0,0,239,237,1,0,0,0,240,241,3,22,11,0,241,29,
	1,0,0,0,242,246,5,15,0,0,243,245,5,41,0,0,244,243,1,0,0,0,245,248,1,0,0,
	0,246,244,1,0,0,0,246,247,1,0,0,0,247,250,1,0,0,0,248,246,1,0,0,0,249,251,
	3,32,16,0,250,249,1,0,0,0,250,251,1,0,0,0,251,255,1,0,0,0,252,254,5,41,
	0,0,253,252,1,0,0,0,254,257,1,0,0,0,255,253,1,0,0,0,255,256,1,0,0,0,256,
	258,1,0,0,0,257,255,1,0,0,0,258,262,5,16,0,0,259,261,5,41,0,0,260,259,1,
	0,0,0,261,264,1,0,0,0,262,260,1,0,0,0,262,263,1,0,0,0,263,273,1,0,0,0,264,
	262,1,0,0,0,265,269,5,28,0,0,266,268,5,41,0,0,267,266,1,0,0,0,268,271,1,
	0,0,0,269,267,1,0,0,0,269,270,1,0,0,0,270,273,1,0,0,0,271,269,1,0,0,0,272,
	242,1,0,0,0,272,265,1,0,0,0,273,31,1,0,0,0,274,291,3,22,11,0,275,277,5,
	41,0,0,276,275,1,0,0,0,277,280,1,0,0,0,278,276,1,0,0,0,278,279,1,0,0,0,
	279,281,1,0,0,0,280,278,1,0,0,0,281,285,5,13,0,0,282,284,5,41,0,0,283,282,
	1,0,0,0,284,287,1,0,0,0,285,283,1,0,0,0,285,286,1,0,0,0,286,288,1,0,0,0,
	287,285,1,0,0,0,288,290,3,22,11,0,289,278,1,0,0,0,290,293,1,0,0,0,291,289,
	1,0,0,0,291,292,1,0,0,0,292,295,1,0,0,0,293,291,1,0,0,0,294,296,5,13,0,
	0,295,294,1,0,0,0,295,296,1,0,0,0,296,33,1,0,0,0,297,298,5,30,0,0,298,35,
	1,0,0,0,299,300,5,26,0,0,300,37,1,0,0,0,301,305,5,34,0,0,302,304,3,40,20,
	0,303,302,1,0,0,0,304,307,1,0,0,0,305,303,1,0,0,0,305,306,1,0,0,0,306,39,
	1,0,0,0,307,305,1,0,0,0,308,310,5,41,0,0,309,308,1,0,0,0,310,313,1,0,0,
	0,311,309,1,0,0,0,311,312,1,0,0,0,312,314,1,0,0,0,313,311,1,0,0,0,314,318,
	5,19,0,0,315,317,5,41,0,0,316,315,1,0,0,0,317,320,1,0,0,0,318,316,1,0,0,
	0,318,319,1,0,0,0,319,321,1,0,0,0,320,318,1,0,0,0,321,322,5,34,0,0,322,
	41,1,0,0,0,323,324,7,0,0,0,324,43,1,0,0,0,325,326,5,50,0,0,326,45,1,0,0,
	0,327,329,5,43,0,0,328,327,1,0,0,0,328,329,1,0,0,0,329,332,1,0,0,0,330,
	333,5,49,0,0,331,333,3,22,11,0,332,330,1,0,0,0,332,331,1,0,0,0,332,333,
	1,0,0,0,333,335,1,0,0,0,334,336,5,43,0,0,335,334,1,0,0,0,335,336,1,0,0,
	0,336,337,1,0,0,0,337,340,5,11,0,0,338,341,3,22,11,0,339,341,5,49,0,0,340,
	338,1,0,0,0,340,339,1,0,0,0,341,343,1,0,0,0,342,344,3,14,7,0,343,342,1,
	0,0,0,343,344,1,0,0,0,344,47,1,0,0,0,55,49,54,58,66,72,74,79,84,93,100,
	108,112,115,121,126,133,137,140,144,151,153,155,163,165,167,178,184,188,
	193,200,207,210,217,223,227,231,237,246,250,255,262,269,272,278,285,291,
	295,305,311,318,328,332,335,340,343];

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
	public colon_list_decl(): Colon_list_declContext {
		return this.getTypedRuleContext(Colon_list_declContext, 0) as Colon_list_declContext;
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


export class Colon_list_declContext extends ParserRuleContext {
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
	public elements(): ElementsContext {
		return this.getTypedRuleContext(ElementsContext, 0) as ElementsContext;
	}
	public eol_list(): EolContext[] {
		return this.getTypedRuleContexts(EolContext) as EolContext[];
	}
	public eol(i: number): EolContext {
		return this.getTypedRuleContext(EolContext, i) as EolContext;
	}
	public WS_list(): TerminalNode[] {
	    	return this.getTokens(YiniParser.WS);
	}
	public WS(i: number): TerminalNode {
		return this.getToken(YiniParser.WS, i);
	}
    public get ruleIndex(): number {
    	return YiniParser.RULE_colon_list_decl;
	}
	// @Override
	public accept<Result>(visitor: YiniParserVisitor<Result>): Result {
		if (visitor.visitColon_list_decl) {
			return visitor.visitColon_list_decl(this);
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
