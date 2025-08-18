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
	public static readonly YINI_MARKER = 1;
	public static readonly SECTION_HEAD = 2;
	public static readonly TERMINAL_TOKEN = 3;
	public static readonly SS = 4;
	public static readonly EUR = 5;
	public static readonly CARET = 6;
	public static readonly GT = 7;
	public static readonly LT = 8;
	public static readonly EQ = 9;
	public static readonly HASH = 10;
	public static readonly COMMA = 11;
	public static readonly COLON = 12;
	public static readonly OB = 13;
	public static readonly CB = 14;
	public static readonly OC = 15;
	public static readonly CC = 16;
	public static readonly PLUS = 17;
	public static readonly DOLLAR = 18;
	public static readonly PC = 19;
	public static readonly AT = 20;
	public static readonly BOOLEAN_FALSE = 21;
	public static readonly BOOLEAN_TRUE = 22;
	public static readonly NULL = 23;
	public static readonly EMPTY_OBJECT = 24;
	public static readonly EMPTY_LIST = 25;
	public static readonly SHEBANG = 26;
	public static readonly NUMBER = 27;
	public static readonly KEY = 28;
	public static readonly IDENT = 29;
	public static readonly IDENT_BACKTICKED = 30;
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
	public static override readonly EOF = Token.EOF;
	public static readonly RULE_yini = 0;
	public static readonly RULE_prolog = 1;
	public static readonly RULE_terminal_stmt = 2;
	public static readonly RULE_stmt = 3;
	public static readonly RULE_marker_stmt = 4;
	public static readonly RULE_eol = 5;
	public static readonly RULE_assignment = 6;
	public static readonly RULE_member = 7;
	public static readonly RULE_listAfterColon = 8;
	public static readonly RULE_value = 9;
	public static readonly RULE_object_literal = 10;
	public static readonly RULE_object_members = 11;
	public static readonly RULE_object_member = 12;
	public static readonly RULE_list_literal = 13;
	public static readonly RULE_elements = 14;
	public static readonly RULE_number_literal = 15;
	public static readonly RULE_null_literal = 16;
	public static readonly RULE_string_literal = 17;
	public static readonly RULE_string_concat = 18;
	public static readonly RULE_boolean_literal = 19;
	public static readonly RULE_bad_member = 20;
	public static readonly literalNames: (string | null)[] = [ null, null, 
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
                                                            "'@'", null, 
                                                            null, null, 
                                                            "'{}'", "'[]'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, "YINI_MARKER", 
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
                                                             "AT", "BOOLEAN_FALSE", 
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
                                                             "REST" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"yini", "prolog", "terminal_stmt", "stmt", "marker_stmt", "eol", "assignment", 
		"member", "listAfterColon", "value", "object_literal", "object_members", 
		"object_member", "list_literal", "elements", "number_literal", "null_literal", 
		"string_literal", "string_concat", "boolean_literal", "bad_member",
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
			this.state = 43;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 0, this._ctx) ) {
			case 1:
				{
				this.state = 42;
				this.prolog();
				}
				break;
			}
			this.state = 48;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2615190022) !== 0) || ((((_la - 38)) & ~0x1F) === 0 && ((1 << (_la - 38)) & 325) !== 0)) {
				{
				{
				this.state = 45;
				this.stmt();
				}
				}
				this.state = 50;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 52;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===3) {
				{
				this.state = 51;
				this.terminal_stmt();
				}
			}

			this.state = 54;
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
			this.state = 68;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 26:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 56;
				this.match(YiniParser.SHEBANG);
				this.state = 60;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 3, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 57;
						this.eol();
						}
						}
					}
					this.state = 62;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 3, this._ctx);
				}
				}
				break;
			case 38:
			case 44:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 64;
				this._errHandler.sync(this);
				_alt = 1;
				do {
					switch (_alt) {
					case 1:
						{
						{
						this.state = 63;
						this.eol();
						}
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					this.state = 66;
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
			this.state = 70;
			this.match(YiniParser.TERMINAL_TOKEN);
			this.state = 73;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 6, this._ctx) ) {
			case 1:
				{
				this.state = 71;
				this.eol();
				}
				break;
			case 2:
				{
				this.state = 72;
				this.match(YiniParser.INLINE_COMMENT);
				}
				break;
			}
			this.state = 78;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===38) {
				{
				{
				this.state = 75;
				this.match(YiniParser.NL);
				}
				}
				this.state = 80;
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
			this.state = 87;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 8, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 81;
				this.eol();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 82;
				this.match(YiniParser.SECTION_HEAD);
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 83;
				this.assignment();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 84;
				this.listAfterColon();
				}
				break;
			case 5:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 85;
				this.marker_stmt();
				}
				break;
			case 6:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 86;
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
	public marker_stmt(): Marker_stmtContext {
		let localctx: Marker_stmtContext = new Marker_stmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 8, YiniParser.RULE_marker_stmt);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 89;
			this.match(YiniParser.YINI_MARKER);
			this.state = 90;
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
		this.enterRule(localctx, 10, YiniParser.RULE_eol);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 93;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===44) {
				{
				this.state = 92;
				this.match(YiniParser.INLINE_COMMENT);
				}
			}

			this.state = 96;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 95;
					this.match(YiniParser.NL);
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 98;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 10, this._ctx);
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
		this.enterRule(localctx, 12, YiniParser.RULE_assignment);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 100;
			this.member();
			this.state = 101;
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
		this.enterRule(localctx, 14, YiniParser.RULE_member);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 103;
			this.match(YiniParser.KEY);
			this.state = 105;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===40) {
				{
				this.state = 104;
				this.match(YiniParser.WS);
				}
			}

			this.state = 107;
			this.match(YiniParser.EQ);
			this.state = 109;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===40) {
				{
				this.state = 108;
				this.match(YiniParser.WS);
				}
			}

			this.state = 112;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2346754048) !== 0)) {
				{
				this.state = 111;
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
	public listAfterColon(): ListAfterColonContext {
		let localctx: ListAfterColonContext = new ListAfterColonContext(this, this._ctx, this.state);
		this.enterRule(localctx, 16, YiniParser.RULE_listAfterColon);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 114;
			this.match(YiniParser.KEY);
			this.state = 116;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===40) {
				{
				this.state = 115;
				this.match(YiniParser.WS);
				}
			}

			this.state = 118;
			this.match(YiniParser.COLON);
			this.state = 127;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 38)) & ~0x1F) === 0 && ((1 << (_la - 38)) & 69) !== 0)) {
				{
				this.state = 125;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 38:
				case 44:
					{
					this.state = 119;
					this.eol();
					}
					break;
				case 40:
					{
					this.state = 121;
					this._errHandler.sync(this);
					_alt = 1;
					do {
						switch (_alt) {
						case 1:
							{
							{
							this.state = 120;
							this.match(YiniParser.WS);
							}
							}
							break;
						default:
							throw new NoViableAltException(this);
						}
						this.state = 123;
						this._errHandler.sync(this);
						_alt = this._interp.adaptivePredict(this._input, 15, this._ctx);
					} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 129;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 130;
			this.elements();
			this.state = 139;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 20, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					this.state = 137;
					this._errHandler.sync(this);
					switch (this._input.LA(1)) {
					case 38:
					case 44:
						{
						this.state = 131;
						this.eol();
						}
						break;
					case 40:
						{
						this.state = 133;
						this._errHandler.sync(this);
						_alt = 1;
						do {
							switch (_alt) {
							case 1:
								{
								{
								this.state = 132;
								this.match(YiniParser.WS);
								}
								}
								break;
							default:
								throw new NoViableAltException(this);
							}
							this.state = 135;
							this._errHandler.sync(this);
							_alt = this._interp.adaptivePredict(this._input, 18, this._ctx);
						} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					}
				}
				this.state = 141;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 20, this._ctx);
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
	public value(): ValueContext {
		let localctx: ValueContext = new ValueContext(this, this._ctx, this.state);
		this.enterRule(localctx, 18, YiniParser.RULE_value);
		try {
			this.state = 150;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 23:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 144;
				this.null_literal();
				}
				break;
			case 31:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 145;
				this.string_literal();
				}
				break;
			case 27:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 146;
				this.number_literal();
				}
				break;
			case 21:
			case 22:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 147;
				this.boolean_literal();
				}
				break;
			case 13:
			case 25:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 148;
				this.list_literal();
				}
				break;
			case 15:
			case 24:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 149;
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
		this.enterRule(localctx, 20, YiniParser.RULE_object_literal);
		let _la: number;
		try {
			let _alt: number;
			this.state = 182;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 15:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 152;
				this.match(YiniParser.OC);
				this.state = 156;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 22, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 153;
						this.match(YiniParser.NL);
						}
						}
					}
					this.state = 158;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 22, this._ctx);
				}
				this.state = 160;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===28) {
					{
					this.state = 159;
					this.object_members();
					}
				}

				this.state = 165;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===38) {
					{
					{
					this.state = 162;
					this.match(YiniParser.NL);
					}
					}
					this.state = 167;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 168;
				this.match(YiniParser.CC);
				this.state = 172;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 25, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 169;
						this.match(YiniParser.NL);
						}
						}
					}
					this.state = 174;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 25, this._ctx);
				}
				}
				break;
			case 24:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 175;
				this.match(YiniParser.EMPTY_OBJECT);
				this.state = 179;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 26, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 176;
						this.match(YiniParser.NL);
						}
						}
					}
					this.state = 181;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 26, this._ctx);
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
		this.enterRule(localctx, 22, YiniParser.RULE_object_members);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 184;
			this.object_member();
			this.state = 195;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 29, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 185;
					this.match(YiniParser.COMMA);
					this.state = 189;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la===38) {
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
					this.object_member();
					}
					}
				}
				this.state = 197;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 29, this._ctx);
			}
			this.state = 199;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===11) {
				{
				this.state = 198;
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
		this.enterRule(localctx, 24, YiniParser.RULE_object_member);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 201;
			this.match(YiniParser.KEY);
			this.state = 203;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===40) {
				{
				this.state = 202;
				this.match(YiniParser.WS);
				}
			}

			this.state = 205;
			this.match(YiniParser.COLON);
			this.state = 209;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===38) {
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
		this.enterRule(localctx, 26, YiniParser.RULE_list_literal);
		let _la: number;
		try {
			let _alt: number;
			this.state = 244;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 13:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 214;
				this.match(YiniParser.OB);
				this.state = 218;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 33, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 215;
						this.match(YiniParser.NL);
						}
						}
					}
					this.state = 220;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 33, this._ctx);
				}
				this.state = 222;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2346754048) !== 0)) {
					{
					this.state = 221;
					this.elements();
					}
				}

				this.state = 227;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===38) {
					{
					{
					this.state = 224;
					this.match(YiniParser.NL);
					}
					}
					this.state = 229;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 230;
				this.match(YiniParser.CB);
				this.state = 234;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 36, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 231;
						this.match(YiniParser.NL);
						}
						}
					}
					this.state = 236;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 36, this._ctx);
				}
				}
				break;
			case 25:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 237;
				this.match(YiniParser.EMPTY_LIST);
				this.state = 241;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 37, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 238;
						this.match(YiniParser.NL);
						}
						}
					}
					this.state = 243;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 37, this._ctx);
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
		this.enterRule(localctx, 28, YiniParser.RULE_elements);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 246;
			this.value();
			this.state = 263;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 41, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 250;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la===38) {
						{
						{
						this.state = 247;
						this.match(YiniParser.NL);
						}
						}
						this.state = 252;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					this.state = 253;
					this.match(YiniParser.COMMA);
					this.state = 257;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la===38) {
						{
						{
						this.state = 254;
						this.match(YiniParser.NL);
						}
						}
						this.state = 259;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					this.state = 260;
					this.value();
					}
					}
				}
				this.state = 265;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 41, this._ctx);
			}
			this.state = 267;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===11) {
				{
				this.state = 266;
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
		this.enterRule(localctx, 30, YiniParser.RULE_number_literal);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 269;
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
		this.enterRule(localctx, 32, YiniParser.RULE_null_literal);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 271;
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
		this.enterRule(localctx, 34, YiniParser.RULE_string_literal);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 273;
			this.match(YiniParser.STRING);
			this.state = 277;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 43, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 274;
					this.string_concat();
					}
					}
				}
				this.state = 279;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 43, this._ctx);
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
		this.enterRule(localctx, 36, YiniParser.RULE_string_concat);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 283;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===38) {
				{
				{
				this.state = 280;
				this.match(YiniParser.NL);
				}
				}
				this.state = 285;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 286;
			this.match(YiniParser.PLUS);
			this.state = 290;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===38) {
				{
				{
				this.state = 287;
				this.match(YiniParser.NL);
				}
				}
				this.state = 292;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 293;
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
		this.enterRule(localctx, 38, YiniParser.RULE_boolean_literal);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 295;
			_la = this._input.LA(1);
			if(!(_la===21 || _la===22)) {
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
	public bad_member(): Bad_memberContext {
		let localctx: Bad_memberContext = new Bad_memberContext(this, this._ctx, this.state);
		this.enterRule(localctx, 40, YiniParser.RULE_bad_member);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 298;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 46, this._ctx) ) {
			case 1:
				{
				this.state = 297;
				this.match(YiniParser.WS);
				}
				break;
			}
			this.state = 302;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 46:
				{
				this.state = 300;
				this.match(YiniParser.REST);
				}
				break;
			case 13:
			case 15:
			case 21:
			case 22:
			case 23:
			case 24:
			case 25:
			case 27:
			case 31:
				{
				this.state = 301;
				this.value();
				}
				break;
			case 9:
			case 40:
				break;
			default:
				break;
			}
			this.state = 305;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===40) {
				{
				this.state = 304;
				this.match(YiniParser.WS);
				}
			}

			this.state = 307;
			this.match(YiniParser.EQ);
			this.state = 310;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 13:
			case 15:
			case 21:
			case 22:
			case 23:
			case 24:
			case 25:
			case 27:
			case 31:
				{
				this.state = 308;
				this.value();
				}
				break;
			case 46:
				{
				this.state = 309;
				this.match(YiniParser.REST);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 313;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 50, this._ctx) ) {
			case 1:
				{
				this.state = 312;
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

	public static readonly _serializedATN: number[] = [4,1,46,316,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,
	10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,
	7,17,2,18,7,18,2,19,7,19,2,20,7,20,1,0,3,0,44,8,0,1,0,5,0,47,8,0,10,0,12,
	0,50,9,0,1,0,3,0,53,8,0,1,0,1,0,1,1,1,1,5,1,59,8,1,10,1,12,1,62,9,1,1,1,
	4,1,65,8,1,11,1,12,1,66,3,1,69,8,1,1,2,1,2,1,2,3,2,74,8,2,1,2,5,2,77,8,
	2,10,2,12,2,80,9,2,1,3,1,3,1,3,1,3,1,3,1,3,3,3,88,8,3,1,4,1,4,1,4,1,5,3,
	5,94,8,5,1,5,4,5,97,8,5,11,5,12,5,98,1,6,1,6,1,6,1,7,1,7,3,7,106,8,7,1,
	7,1,7,3,7,110,8,7,1,7,3,7,113,8,7,1,8,1,8,3,8,117,8,8,1,8,1,8,1,8,4,8,122,
	8,8,11,8,12,8,123,5,8,126,8,8,10,8,12,8,129,9,8,1,8,1,8,1,8,4,8,134,8,8,
	11,8,12,8,135,5,8,138,8,8,10,8,12,8,141,9,8,1,8,1,8,1,9,1,9,1,9,1,9,1,9,
	1,9,3,9,151,8,9,1,10,1,10,5,10,155,8,10,10,10,12,10,158,9,10,1,10,3,10,
	161,8,10,1,10,5,10,164,8,10,10,10,12,10,167,9,10,1,10,1,10,5,10,171,8,10,
	10,10,12,10,174,9,10,1,10,1,10,5,10,178,8,10,10,10,12,10,181,9,10,3,10,
	183,8,10,1,11,1,11,1,11,5,11,188,8,11,10,11,12,11,191,9,11,1,11,5,11,194,
	8,11,10,11,12,11,197,9,11,1,11,3,11,200,8,11,1,12,1,12,3,12,204,8,12,1,
	12,1,12,5,12,208,8,12,10,12,12,12,211,9,12,1,12,1,12,1,13,1,13,5,13,217,
	8,13,10,13,12,13,220,9,13,1,13,3,13,223,8,13,1,13,5,13,226,8,13,10,13,12,
	13,229,9,13,1,13,1,13,5,13,233,8,13,10,13,12,13,236,9,13,1,13,1,13,5,13,
	240,8,13,10,13,12,13,243,9,13,3,13,245,8,13,1,14,1,14,5,14,249,8,14,10,
	14,12,14,252,9,14,1,14,1,14,5,14,256,8,14,10,14,12,14,259,9,14,1,14,5,14,
	262,8,14,10,14,12,14,265,9,14,1,14,3,14,268,8,14,1,15,1,15,1,16,1,16,1,
	17,1,17,5,17,276,8,17,10,17,12,17,279,9,17,1,18,5,18,282,8,18,10,18,12,
	18,285,9,18,1,18,1,18,5,18,289,8,18,10,18,12,18,292,9,18,1,18,1,18,1,19,
	1,19,1,20,3,20,299,8,20,1,20,1,20,3,20,303,8,20,1,20,3,20,306,8,20,1,20,
	1,20,1,20,3,20,311,8,20,1,20,3,20,314,8,20,1,20,0,0,21,0,2,4,6,8,10,12,
	14,16,18,20,22,24,26,28,30,32,34,36,38,40,0,1,1,0,21,22,355,0,43,1,0,0,
	0,2,68,1,0,0,0,4,70,1,0,0,0,6,87,1,0,0,0,8,89,1,0,0,0,10,93,1,0,0,0,12,
	100,1,0,0,0,14,103,1,0,0,0,16,114,1,0,0,0,18,150,1,0,0,0,20,182,1,0,0,0,
	22,184,1,0,0,0,24,201,1,0,0,0,26,244,1,0,0,0,28,246,1,0,0,0,30,269,1,0,
	0,0,32,271,1,0,0,0,34,273,1,0,0,0,36,283,1,0,0,0,38,295,1,0,0,0,40,298,
	1,0,0,0,42,44,3,2,1,0,43,42,1,0,0,0,43,44,1,0,0,0,44,48,1,0,0,0,45,47,3,
	6,3,0,46,45,1,0,0,0,47,50,1,0,0,0,48,46,1,0,0,0,48,49,1,0,0,0,49,52,1,0,
	0,0,50,48,1,0,0,0,51,53,3,4,2,0,52,51,1,0,0,0,52,53,1,0,0,0,53,54,1,0,0,
	0,54,55,5,0,0,1,55,1,1,0,0,0,56,60,5,26,0,0,57,59,3,10,5,0,58,57,1,0,0,
	0,59,62,1,0,0,0,60,58,1,0,0,0,60,61,1,0,0,0,61,69,1,0,0,0,62,60,1,0,0,0,
	63,65,3,10,5,0,64,63,1,0,0,0,65,66,1,0,0,0,66,64,1,0,0,0,66,67,1,0,0,0,
	67,69,1,0,0,0,68,56,1,0,0,0,68,64,1,0,0,0,69,3,1,0,0,0,70,73,5,3,0,0,71,
	74,3,10,5,0,72,74,5,44,0,0,73,71,1,0,0,0,73,72,1,0,0,0,73,74,1,0,0,0,74,
	78,1,0,0,0,75,77,5,38,0,0,76,75,1,0,0,0,77,80,1,0,0,0,78,76,1,0,0,0,78,
	79,1,0,0,0,79,5,1,0,0,0,80,78,1,0,0,0,81,88,3,10,5,0,82,88,5,2,0,0,83,88,
	3,12,6,0,84,88,3,16,8,0,85,88,3,8,4,0,86,88,3,40,20,0,87,81,1,0,0,0,87,
	82,1,0,0,0,87,83,1,0,0,0,87,84,1,0,0,0,87,85,1,0,0,0,87,86,1,0,0,0,88,7,
	1,0,0,0,89,90,5,1,0,0,90,91,3,10,5,0,91,9,1,0,0,0,92,94,5,44,0,0,93,92,
	1,0,0,0,93,94,1,0,0,0,94,96,1,0,0,0,95,97,5,38,0,0,96,95,1,0,0,0,97,98,
	1,0,0,0,98,96,1,0,0,0,98,99,1,0,0,0,99,11,1,0,0,0,100,101,3,14,7,0,101,
	102,3,10,5,0,102,13,1,0,0,0,103,105,5,28,0,0,104,106,5,40,0,0,105,104,1,
	0,0,0,105,106,1,0,0,0,106,107,1,0,0,0,107,109,5,9,0,0,108,110,5,40,0,0,
	109,108,1,0,0,0,109,110,1,0,0,0,110,112,1,0,0,0,111,113,3,18,9,0,112,111,
	1,0,0,0,112,113,1,0,0,0,113,15,1,0,0,0,114,116,5,28,0,0,115,117,5,40,0,
	0,116,115,1,0,0,0,116,117,1,0,0,0,117,118,1,0,0,0,118,127,5,12,0,0,119,
	126,3,10,5,0,120,122,5,40,0,0,121,120,1,0,0,0,122,123,1,0,0,0,123,121,1,
	0,0,0,123,124,1,0,0,0,124,126,1,0,0,0,125,119,1,0,0,0,125,121,1,0,0,0,126,
	129,1,0,0,0,127,125,1,0,0,0,127,128,1,0,0,0,128,130,1,0,0,0,129,127,1,0,
	0,0,130,139,3,28,14,0,131,138,3,10,5,0,132,134,5,40,0,0,133,132,1,0,0,0,
	134,135,1,0,0,0,135,133,1,0,0,0,135,136,1,0,0,0,136,138,1,0,0,0,137,131,
	1,0,0,0,137,133,1,0,0,0,138,141,1,0,0,0,139,137,1,0,0,0,139,140,1,0,0,0,
	140,142,1,0,0,0,141,139,1,0,0,0,142,143,3,10,5,0,143,17,1,0,0,0,144,151,
	3,32,16,0,145,151,3,34,17,0,146,151,3,30,15,0,147,151,3,38,19,0,148,151,
	3,26,13,0,149,151,3,20,10,0,150,144,1,0,0,0,150,145,1,0,0,0,150,146,1,0,
	0,0,150,147,1,0,0,0,150,148,1,0,0,0,150,149,1,0,0,0,151,19,1,0,0,0,152,
	156,5,15,0,0,153,155,5,38,0,0,154,153,1,0,0,0,155,158,1,0,0,0,156,154,1,
	0,0,0,156,157,1,0,0,0,157,160,1,0,0,0,158,156,1,0,0,0,159,161,3,22,11,0,
	160,159,1,0,0,0,160,161,1,0,0,0,161,165,1,0,0,0,162,164,5,38,0,0,163,162,
	1,0,0,0,164,167,1,0,0,0,165,163,1,0,0,0,165,166,1,0,0,0,166,168,1,0,0,0,
	167,165,1,0,0,0,168,172,5,16,0,0,169,171,5,38,0,0,170,169,1,0,0,0,171,174,
	1,0,0,0,172,170,1,0,0,0,172,173,1,0,0,0,173,183,1,0,0,0,174,172,1,0,0,0,
	175,179,5,24,0,0,176,178,5,38,0,0,177,176,1,0,0,0,178,181,1,0,0,0,179,177,
	1,0,0,0,179,180,1,0,0,0,180,183,1,0,0,0,181,179,1,0,0,0,182,152,1,0,0,0,
	182,175,1,0,0,0,183,21,1,0,0,0,184,195,3,24,12,0,185,189,5,11,0,0,186,188,
	5,38,0,0,187,186,1,0,0,0,188,191,1,0,0,0,189,187,1,0,0,0,189,190,1,0,0,
	0,190,192,1,0,0,0,191,189,1,0,0,0,192,194,3,24,12,0,193,185,1,0,0,0,194,
	197,1,0,0,0,195,193,1,0,0,0,195,196,1,0,0,0,196,199,1,0,0,0,197,195,1,0,
	0,0,198,200,5,11,0,0,199,198,1,0,0,0,199,200,1,0,0,0,200,23,1,0,0,0,201,
	203,5,28,0,0,202,204,5,40,0,0,203,202,1,0,0,0,203,204,1,0,0,0,204,205,1,
	0,0,0,205,209,5,12,0,0,206,208,5,38,0,0,207,206,1,0,0,0,208,211,1,0,0,0,
	209,207,1,0,0,0,209,210,1,0,0,0,210,212,1,0,0,0,211,209,1,0,0,0,212,213,
	3,18,9,0,213,25,1,0,0,0,214,218,5,13,0,0,215,217,5,38,0,0,216,215,1,0,0,
	0,217,220,1,0,0,0,218,216,1,0,0,0,218,219,1,0,0,0,219,222,1,0,0,0,220,218,
	1,0,0,0,221,223,3,28,14,0,222,221,1,0,0,0,222,223,1,0,0,0,223,227,1,0,0,
	0,224,226,5,38,0,0,225,224,1,0,0,0,226,229,1,0,0,0,227,225,1,0,0,0,227,
	228,1,0,0,0,228,230,1,0,0,0,229,227,1,0,0,0,230,234,5,14,0,0,231,233,5,
	38,0,0,232,231,1,0,0,0,233,236,1,0,0,0,234,232,1,0,0,0,234,235,1,0,0,0,
	235,245,1,0,0,0,236,234,1,0,0,0,237,241,5,25,0,0,238,240,5,38,0,0,239,238,
	1,0,0,0,240,243,1,0,0,0,241,239,1,0,0,0,241,242,1,0,0,0,242,245,1,0,0,0,
	243,241,1,0,0,0,244,214,1,0,0,0,244,237,1,0,0,0,245,27,1,0,0,0,246,263,
	3,18,9,0,247,249,5,38,0,0,248,247,1,0,0,0,249,252,1,0,0,0,250,248,1,0,0,
	0,250,251,1,0,0,0,251,253,1,0,0,0,252,250,1,0,0,0,253,257,5,11,0,0,254,
	256,5,38,0,0,255,254,1,0,0,0,256,259,1,0,0,0,257,255,1,0,0,0,257,258,1,
	0,0,0,258,260,1,0,0,0,259,257,1,0,0,0,260,262,3,18,9,0,261,250,1,0,0,0,
	262,265,1,0,0,0,263,261,1,0,0,0,263,264,1,0,0,0,264,267,1,0,0,0,265,263,
	1,0,0,0,266,268,5,11,0,0,267,266,1,0,0,0,267,268,1,0,0,0,268,29,1,0,0,0,
	269,270,5,27,0,0,270,31,1,0,0,0,271,272,5,23,0,0,272,33,1,0,0,0,273,277,
	5,31,0,0,274,276,3,36,18,0,275,274,1,0,0,0,276,279,1,0,0,0,277,275,1,0,
	0,0,277,278,1,0,0,0,278,35,1,0,0,0,279,277,1,0,0,0,280,282,5,38,0,0,281,
	280,1,0,0,0,282,285,1,0,0,0,283,281,1,0,0,0,283,284,1,0,0,0,284,286,1,0,
	0,0,285,283,1,0,0,0,286,290,5,17,0,0,287,289,5,38,0,0,288,287,1,0,0,0,289,
	292,1,0,0,0,290,288,1,0,0,0,290,291,1,0,0,0,291,293,1,0,0,0,292,290,1,0,
	0,0,293,294,5,31,0,0,294,37,1,0,0,0,295,296,7,0,0,0,296,39,1,0,0,0,297,
	299,5,40,0,0,298,297,1,0,0,0,298,299,1,0,0,0,299,302,1,0,0,0,300,303,5,
	46,0,0,301,303,3,18,9,0,302,300,1,0,0,0,302,301,1,0,0,0,302,303,1,0,0,0,
	303,305,1,0,0,0,304,306,5,40,0,0,305,304,1,0,0,0,305,306,1,0,0,0,306,307,
	1,0,0,0,307,310,5,9,0,0,308,311,3,18,9,0,309,311,5,46,0,0,310,308,1,0,0,
	0,310,309,1,0,0,0,311,313,1,0,0,0,312,314,3,10,5,0,313,312,1,0,0,0,313,
	314,1,0,0,0,314,41,1,0,0,0,51,43,48,52,60,66,68,73,78,87,93,98,105,109,
	112,116,123,125,127,135,137,139,150,156,160,165,172,179,182,189,195,199,
	203,209,218,222,227,234,241,244,250,257,263,267,277,283,290,298,302,305,
	310,313];

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
	public listAfterColon(): ListAfterColonContext {
		return this.getTypedRuleContext(ListAfterColonContext, 0) as ListAfterColonContext;
	}
	public marker_stmt(): Marker_stmtContext {
		return this.getTypedRuleContext(Marker_stmtContext, 0) as Marker_stmtContext;
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


export class Marker_stmtContext extends ParserRuleContext {
	constructor(parser?: YiniParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public YINI_MARKER(): TerminalNode {
		return this.getToken(YiniParser.YINI_MARKER, 0);
	}
	public eol(): EolContext {
		return this.getTypedRuleContext(EolContext, 0) as EolContext;
	}
    public get ruleIndex(): number {
    	return YiniParser.RULE_marker_stmt;
	}
	// @Override
	public accept<Result>(visitor: YiniParserVisitor<Result>): Result {
		if (visitor.visitMarker_stmt) {
			return visitor.visitMarker_stmt(this);
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


export class ListAfterColonContext extends ParserRuleContext {
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
    	return YiniParser.RULE_listAfterColon;
	}
	// @Override
	public accept<Result>(visitor: YiniParserVisitor<Result>): Result {
		if (visitor.visitListAfterColon) {
			return visitor.visitListAfterColon(this);
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
