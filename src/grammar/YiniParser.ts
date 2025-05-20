// Generated from specs/v1.0.0-beta.6/YiniParser.g4 by ANTLR 4.13.2
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
	public static readonly SECTION_HEAD = 1;
	public static readonly TERMINAL_TOKEN = 2;
	public static readonly SS = 3;
	public static readonly EUR = 4;
	public static readonly CARET = 5;
	public static readonly TILDE = 6;
	public static readonly GT = 7;
	public static readonly EQ = 8;
	public static readonly HASH = 9;
	public static readonly COMMA = 10;
	public static readonly COLON = 11;
	public static readonly OB = 12;
	public static readonly CB = 13;
	public static readonly PLUS = 14;
	public static readonly DOLLAR = 15;
	public static readonly PC = 16;
	public static readonly AT = 17;
	public static readonly SEMICOLON = 18;
	public static readonly BOOLEAN_FALSE = 19;
	public static readonly BOOLEAN_TRUE = 20;
	public static readonly NULL = 21;
	public static readonly EMPTY_LIST = 22;
	public static readonly SHEBANG = 23;
	public static readonly KEY = 24;
	public static readonly IDENT = 25;
	public static readonly PHRASE = 26;
	public static readonly NUMBER = 27;
	public static readonly STRING = 28;
	public static readonly RAW_STRING = 29;
	public static readonly HYPER_STRING = 30;
	public static readonly CLASSIC_STRING = 31;
	public static readonly TRIPLE_QUOTED_STRING = 32;
	public static readonly ESC_SEQ = 33;
	public static readonly ESC_SEQ_BASE = 34;
	public static readonly NL = 35;
	public static readonly SINGLE_NL = 36;
	public static readonly WS = 37;
	public static readonly DISABLE_LINE = 38;
	public static readonly COMMENT = 39;
	public static readonly LINE_COMMENT = 40;
	public static readonly INLINE_COMMENT = 41;
	public static readonly BLOCK_COMMENT = 42;
	public static override readonly EOF = Token.EOF;
	public static readonly RULE_yini = 0;
	public static readonly RULE_section = 1;
	public static readonly RULE_terminal_line = 2;
	public static readonly RULE_section_members = 3;
	public static readonly RULE_member = 4;
	public static readonly RULE_member_colon_list = 5;
	public static readonly RULE_value = 6;
	public static readonly RULE_list = 7;
	public static readonly RULE_list_in_brackets = 8;
	public static readonly RULE_elements = 9;
	public static readonly RULE_element = 10;
	public static readonly RULE_number_literal = 11;
	public static readonly RULE_string_literal = 12;
	public static readonly RULE_string_concat = 13;
	public static readonly RULE_boolean_literal = 14;
	public static readonly literalNames: (string | null)[] = [ null, null, 
                                                            null, "'\\u00A7'", 
                                                            "'\\u20AC'", 
                                                            "'^'", "'~'", 
                                                            "'>'", "'='", 
                                                            "'#'", "','", 
                                                            "':'", "'['", 
                                                            "']'", "'+'", 
                                                            "'$'", "'%'", 
                                                            "'@'", "';'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, "SECTION_HEAD", 
                                                             "TERMINAL_TOKEN", 
                                                             "SS", "EUR", 
                                                             "CARET", "TILDE", 
                                                             "GT", "EQ", 
                                                             "HASH", "COMMA", 
                                                             "COLON", "OB", 
                                                             "CB", "PLUS", 
                                                             "DOLLAR", "PC", 
                                                             "AT", "SEMICOLON", 
                                                             "BOOLEAN_FALSE", 
                                                             "BOOLEAN_TRUE", 
                                                             "NULL", "EMPTY_LIST", 
                                                             "SHEBANG", 
                                                             "KEY", "IDENT", 
                                                             "PHRASE", "NUMBER", 
                                                             "STRING", "RAW_STRING", 
                                                             "HYPER_STRING", 
                                                             "CLASSIC_STRING", 
                                                             "TRIPLE_QUOTED_STRING", 
                                                             "ESC_SEQ", 
                                                             "ESC_SEQ_BASE", 
                                                             "NL", "SINGLE_NL", 
                                                             "WS", "DISABLE_LINE", 
                                                             "COMMENT", 
                                                             "LINE_COMMENT", 
                                                             "INLINE_COMMENT", 
                                                             "BLOCK_COMMENT" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"yini", "section", "terminal_line", "section_members", "member", "member_colon_list", 
		"value", "list", "list_in_brackets", "elements", "element", "number_literal", 
		"string_literal", "string_concat", "boolean_literal",
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
			this.state = 31;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===23) {
				{
				this.state = 30;
				this.match(YiniParser.SHEBANG);
				}
			}

			this.state = 36;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===41) {
				{
				{
				this.state = 33;
				this.match(YiniParser.INLINE_COMMENT);
				}
				}
				this.state = 38;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 42;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===35) {
				{
				{
				this.state = 39;
				this.match(YiniParser.NL);
				}
				}
				this.state = 44;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 46;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 45;
				this.section();
				}
				}
				this.state = 48;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la===1 || _la===24);
			this.state = 53;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===35) {
				{
				{
				this.state = 50;
				this.match(YiniParser.NL);
				}
				}
				this.state = 55;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 57;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===2) {
				{
				this.state = 56;
				this.terminal_line();
				}
			}

			this.state = 59;
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
	public section(): SectionContext {
		let localctx: SectionContext = new SectionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 2, YiniParser.RULE_section);
		let _la: number;
		try {
			this.state = 69;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 8, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 62;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===1) {
					{
					this.state = 61;
					this.match(YiniParser.SECTION_HEAD);
					}
				}

				this.state = 64;
				this.section_members();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 65;
				this.match(YiniParser.SECTION_HEAD);
				this.state = 67;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 7, this._ctx) ) {
				case 1:
					{
					this.state = 66;
					this.section();
					}
					break;
				}
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
	public terminal_line(): Terminal_lineContext {
		let localctx: Terminal_lineContext = new Terminal_lineContext(this, this._ctx, this.state);
		this.enterRule(localctx, 4, YiniParser.RULE_terminal_line);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 71;
			this.match(YiniParser.TERMINAL_TOKEN);
			this.state = 86;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 12, this._ctx) ) {
			case 1:
				{
				this.state = 73;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 72;
					this.match(YiniParser.NL);
					}
					}
					this.state = 75;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while (_la===35);
				}
				break;
			case 2:
				{
				this.state = 78;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===41) {
					{
					this.state = 77;
					this.match(YiniParser.INLINE_COMMENT);
					}
				}

				this.state = 83;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===35) {
					{
					{
					this.state = 80;
					this.match(YiniParser.NL);
					}
					}
					this.state = 85;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
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
	public section_members(): Section_membersContext {
		let localctx: Section_membersContext = new Section_membersContext(this, this._ctx, this.state);
		this.enterRule(localctx, 6, YiniParser.RULE_section_members);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 89;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 88;
					this.member();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 91;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 13, this._ctx);
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
	public member(): MemberContext {
		let localctx: MemberContext = new MemberContext(this, this._ctx, this.state);
		this.enterRule(localctx, 8, YiniParser.RULE_member);
		let _la: number;
		try {
			let _alt: number;
			this.state = 104;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 16, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 93;
				this.match(YiniParser.KEY);
				this.state = 94;
				this.match(YiniParser.EQ);
				this.state = 96;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 410521600) !== 0)) {
					{
					this.state = 95;
					this.value();
					}
				}

				this.state = 99;
				this._errHandler.sync(this);
				_alt = 1;
				do {
					switch (_alt) {
					case 1:
						{
						{
						this.state = 98;
						this.match(YiniParser.NL);
						}
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					this.state = 101;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 15, this._ctx);
				} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 103;
				this.member_colon_list();
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
	public member_colon_list(): Member_colon_listContext {
		let localctx: Member_colon_listContext = new Member_colon_listContext(this, this._ctx, this.state);
		this.enterRule(localctx, 10, YiniParser.RULE_member_colon_list);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 106;
			this.match(YiniParser.KEY);
			this.state = 107;
			this.match(YiniParser.COLON);
			this.state = 109;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 17, this._ctx) ) {
			case 1:
				{
				this.state = 108;
				this.elements();
				}
				break;
			}
			this.state = 112;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 111;
					this.match(YiniParser.NL);
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 114;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 18, this._ctx);
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
	public value(): ValueContext {
		let localctx: ValueContext = new ValueContext(this, this._ctx, this.state);
		this.enterRule(localctx, 12, YiniParser.RULE_value);
		try {
			this.state = 121;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 12:
			case 22:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 116;
				this.list_in_brackets();
				}
				break;
			case 28:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 117;
				this.string_literal();
				}
				break;
			case 27:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 118;
				this.number_literal();
				}
				break;
			case 19:
			case 20:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 119;
				this.boolean_literal();
				}
				break;
			case 21:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 120;
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
	public list(): ListContext {
		let localctx: ListContext = new ListContext(this, this._ctx, this.state);
		this.enterRule(localctx, 14, YiniParser.RULE_list);
		try {
			this.state = 125;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 20, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 123;
				this.elements();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 124;
				this.list_in_brackets();
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
	public list_in_brackets(): List_in_bracketsContext {
		let localctx: List_in_bracketsContext = new List_in_bracketsContext(this, this._ctx, this.state);
		this.enterRule(localctx, 16, YiniParser.RULE_list_in_brackets);
		let _la: number;
		try {
			let _alt: number;
			this.state = 144;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 12:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 127;
				this.match(YiniParser.OB);
				this.state = 131;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 21, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 128;
						this.match(YiniParser.NL);
						}
						}
					}
					this.state = 133;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 21, this._ctx);
				}
				this.state = 134;
				this.elements();
				this.state = 138;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===35) {
					{
					{
					this.state = 135;
					this.match(YiniParser.NL);
					}
					}
					this.state = 140;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 141;
				this.match(YiniParser.CB);
				}
				break;
			case 22:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 143;
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
		this.enterRule(localctx, 18, YiniParser.RULE_elements);
		let _la: number;
		try {
			this.state = 154;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 25, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 146;
				this.element();
				this.state = 148;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===10) {
					{
					this.state = 147;
					this.match(YiniParser.COMMA);
					}
				}

				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 150;
				this.element();
				this.state = 151;
				this.match(YiniParser.COMMA);
				this.state = 152;
				this.elements();
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
	public element(): ElementContext {
		let localctx: ElementContext = new ElementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 20, YiniParser.RULE_element);
		let _la: number;
		try {
			let _alt: number;
			this.state = 182;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 30, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 159;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===35) {
					{
					{
					this.state = 156;
					this.match(YiniParser.NL);
					}
					}
					this.state = 161;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 162;
				this.value();
				this.state = 166;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 27, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 163;
						this.match(YiniParser.NL);
						}
						}
					}
					this.state = 168;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 27, this._ctx);
				}
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 172;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===35) {
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
				this.list_in_brackets();
				this.state = 179;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 29, this._ctx);
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
					_alt = this._interp.adaptivePredict(this._input, 29, this._ctx);
				}
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
	public number_literal(): Number_literalContext {
		let localctx: Number_literalContext = new Number_literalContext(this, this._ctx, this.state);
		this.enterRule(localctx, 22, YiniParser.RULE_number_literal);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 184;
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
	public string_literal(): String_literalContext {
		let localctx: String_literalContext = new String_literalContext(this, this._ctx, this.state);
		this.enterRule(localctx, 24, YiniParser.RULE_string_literal);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 186;
			this.match(YiniParser.STRING);
			this.state = 190;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 31, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 187;
					this.string_concat();
					}
					}
				}
				this.state = 192;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 31, this._ctx);
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
		this.enterRule(localctx, 26, YiniParser.RULE_string_concat);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 196;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===35) {
				{
				{
				this.state = 193;
				this.match(YiniParser.NL);
				}
				}
				this.state = 198;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 199;
			this.match(YiniParser.PLUS);
			this.state = 203;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===35) {
				{
				{
				this.state = 200;
				this.match(YiniParser.NL);
				}
				}
				this.state = 205;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 206;
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
		this.enterRule(localctx, 28, YiniParser.RULE_boolean_literal);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 208;
			_la = this._input.LA(1);
			if(!(_la===19 || _la===20)) {
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

	public static readonly _serializedATN: number[] = [4,1,42,211,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,
	10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,1,0,3,0,32,8,0,1,0,5,0,
	35,8,0,10,0,12,0,38,9,0,1,0,5,0,41,8,0,10,0,12,0,44,9,0,1,0,4,0,47,8,0,
	11,0,12,0,48,1,0,5,0,52,8,0,10,0,12,0,55,9,0,1,0,3,0,58,8,0,1,0,1,0,1,1,
	3,1,63,8,1,1,1,1,1,1,1,3,1,68,8,1,3,1,70,8,1,1,2,1,2,4,2,74,8,2,11,2,12,
	2,75,1,2,3,2,79,8,2,1,2,5,2,82,8,2,10,2,12,2,85,9,2,3,2,87,8,2,1,3,4,3,
	90,8,3,11,3,12,3,91,1,4,1,4,1,4,3,4,97,8,4,1,4,4,4,100,8,4,11,4,12,4,101,
	1,4,3,4,105,8,4,1,5,1,5,1,5,3,5,110,8,5,1,5,4,5,113,8,5,11,5,12,5,114,1,
	6,1,6,1,6,1,6,1,6,3,6,122,8,6,1,7,1,7,3,7,126,8,7,1,8,1,8,5,8,130,8,8,10,
	8,12,8,133,9,8,1,8,1,8,5,8,137,8,8,10,8,12,8,140,9,8,1,8,1,8,1,8,3,8,145,
	8,8,1,9,1,9,3,9,149,8,9,1,9,1,9,1,9,1,9,3,9,155,8,9,1,10,5,10,158,8,10,
	10,10,12,10,161,9,10,1,10,1,10,5,10,165,8,10,10,10,12,10,168,9,10,1,10,
	5,10,171,8,10,10,10,12,10,174,9,10,1,10,1,10,5,10,178,8,10,10,10,12,10,
	181,9,10,3,10,183,8,10,1,11,1,11,1,12,1,12,5,12,189,8,12,10,12,12,12,192,
	9,12,1,13,5,13,195,8,13,10,13,12,13,198,9,13,1,13,1,13,5,13,202,8,13,10,
	13,12,13,205,9,13,1,13,1,13,1,14,1,14,1,14,0,0,15,0,2,4,6,8,10,12,14,16,
	18,20,22,24,26,28,0,1,1,0,19,20,232,0,31,1,0,0,0,2,69,1,0,0,0,4,71,1,0,
	0,0,6,89,1,0,0,0,8,104,1,0,0,0,10,106,1,0,0,0,12,121,1,0,0,0,14,125,1,0,
	0,0,16,144,1,0,0,0,18,154,1,0,0,0,20,182,1,0,0,0,22,184,1,0,0,0,24,186,
	1,0,0,0,26,196,1,0,0,0,28,208,1,0,0,0,30,32,5,23,0,0,31,30,1,0,0,0,31,32,
	1,0,0,0,32,36,1,0,0,0,33,35,5,41,0,0,34,33,1,0,0,0,35,38,1,0,0,0,36,34,
	1,0,0,0,36,37,1,0,0,0,37,42,1,0,0,0,38,36,1,0,0,0,39,41,5,35,0,0,40,39,
	1,0,0,0,41,44,1,0,0,0,42,40,1,0,0,0,42,43,1,0,0,0,43,46,1,0,0,0,44,42,1,
	0,0,0,45,47,3,2,1,0,46,45,1,0,0,0,47,48,1,0,0,0,48,46,1,0,0,0,48,49,1,0,
	0,0,49,53,1,0,0,0,50,52,5,35,0,0,51,50,1,0,0,0,52,55,1,0,0,0,53,51,1,0,
	0,0,53,54,1,0,0,0,54,57,1,0,0,0,55,53,1,0,0,0,56,58,3,4,2,0,57,56,1,0,0,
	0,57,58,1,0,0,0,58,59,1,0,0,0,59,60,5,0,0,1,60,1,1,0,0,0,61,63,5,1,0,0,
	62,61,1,0,0,0,62,63,1,0,0,0,63,64,1,0,0,0,64,70,3,6,3,0,65,67,5,1,0,0,66,
	68,3,2,1,0,67,66,1,0,0,0,67,68,1,0,0,0,68,70,1,0,0,0,69,62,1,0,0,0,69,65,
	1,0,0,0,70,3,1,0,0,0,71,86,5,2,0,0,72,74,5,35,0,0,73,72,1,0,0,0,74,75,1,
	0,0,0,75,73,1,0,0,0,75,76,1,0,0,0,76,87,1,0,0,0,77,79,5,41,0,0,78,77,1,
	0,0,0,78,79,1,0,0,0,79,83,1,0,0,0,80,82,5,35,0,0,81,80,1,0,0,0,82,85,1,
	0,0,0,83,81,1,0,0,0,83,84,1,0,0,0,84,87,1,0,0,0,85,83,1,0,0,0,86,73,1,0,
	0,0,86,78,1,0,0,0,87,5,1,0,0,0,88,90,3,8,4,0,89,88,1,0,0,0,90,91,1,0,0,
	0,91,89,1,0,0,0,91,92,1,0,0,0,92,7,1,0,0,0,93,94,5,24,0,0,94,96,5,8,0,0,
	95,97,3,12,6,0,96,95,1,0,0,0,96,97,1,0,0,0,97,99,1,0,0,0,98,100,5,35,0,
	0,99,98,1,0,0,0,100,101,1,0,0,0,101,99,1,0,0,0,101,102,1,0,0,0,102,105,
	1,0,0,0,103,105,3,10,5,0,104,93,1,0,0,0,104,103,1,0,0,0,105,9,1,0,0,0,106,
	107,5,24,0,0,107,109,5,11,0,0,108,110,3,18,9,0,109,108,1,0,0,0,109,110,
	1,0,0,0,110,112,1,0,0,0,111,113,5,35,0,0,112,111,1,0,0,0,113,114,1,0,0,
	0,114,112,1,0,0,0,114,115,1,0,0,0,115,11,1,0,0,0,116,122,3,16,8,0,117,122,
	3,24,12,0,118,122,3,22,11,0,119,122,3,28,14,0,120,122,5,21,0,0,121,116,
	1,0,0,0,121,117,1,0,0,0,121,118,1,0,0,0,121,119,1,0,0,0,121,120,1,0,0,0,
	122,13,1,0,0,0,123,126,3,18,9,0,124,126,3,16,8,0,125,123,1,0,0,0,125,124,
	1,0,0,0,126,15,1,0,0,0,127,131,5,12,0,0,128,130,5,35,0,0,129,128,1,0,0,
	0,130,133,1,0,0,0,131,129,1,0,0,0,131,132,1,0,0,0,132,134,1,0,0,0,133,131,
	1,0,0,0,134,138,3,18,9,0,135,137,5,35,0,0,136,135,1,0,0,0,137,140,1,0,0,
	0,138,136,1,0,0,0,138,139,1,0,0,0,139,141,1,0,0,0,140,138,1,0,0,0,141,142,
	5,13,0,0,142,145,1,0,0,0,143,145,5,22,0,0,144,127,1,0,0,0,144,143,1,0,0,
	0,145,17,1,0,0,0,146,148,3,20,10,0,147,149,5,10,0,0,148,147,1,0,0,0,148,
	149,1,0,0,0,149,155,1,0,0,0,150,151,3,20,10,0,151,152,5,10,0,0,152,153,
	3,18,9,0,153,155,1,0,0,0,154,146,1,0,0,0,154,150,1,0,0,0,155,19,1,0,0,0,
	156,158,5,35,0,0,157,156,1,0,0,0,158,161,1,0,0,0,159,157,1,0,0,0,159,160,
	1,0,0,0,160,162,1,0,0,0,161,159,1,0,0,0,162,166,3,12,6,0,163,165,5,35,0,
	0,164,163,1,0,0,0,165,168,1,0,0,0,166,164,1,0,0,0,166,167,1,0,0,0,167,183,
	1,0,0,0,168,166,1,0,0,0,169,171,5,35,0,0,170,169,1,0,0,0,171,174,1,0,0,
	0,172,170,1,0,0,0,172,173,1,0,0,0,173,175,1,0,0,0,174,172,1,0,0,0,175,179,
	3,16,8,0,176,178,5,35,0,0,177,176,1,0,0,0,178,181,1,0,0,0,179,177,1,0,0,
	0,179,180,1,0,0,0,180,183,1,0,0,0,181,179,1,0,0,0,182,159,1,0,0,0,182,172,
	1,0,0,0,183,21,1,0,0,0,184,185,5,27,0,0,185,23,1,0,0,0,186,190,5,28,0,0,
	187,189,3,26,13,0,188,187,1,0,0,0,189,192,1,0,0,0,190,188,1,0,0,0,190,191,
	1,0,0,0,191,25,1,0,0,0,192,190,1,0,0,0,193,195,5,35,0,0,194,193,1,0,0,0,
	195,198,1,0,0,0,196,194,1,0,0,0,196,197,1,0,0,0,197,199,1,0,0,0,198,196,
	1,0,0,0,199,203,5,14,0,0,200,202,5,35,0,0,201,200,1,0,0,0,202,205,1,0,0,
	0,203,201,1,0,0,0,203,204,1,0,0,0,204,206,1,0,0,0,205,203,1,0,0,0,206,207,
	5,28,0,0,207,27,1,0,0,0,208,209,7,0,0,0,209,29,1,0,0,0,34,31,36,42,48,53,
	57,62,67,69,75,78,83,86,91,96,101,104,109,114,121,125,131,138,144,148,154,
	159,166,172,179,182,190,196,203];

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
	public SHEBANG(): TerminalNode {
		return this.getToken(YiniParser.SHEBANG, 0);
	}
	public INLINE_COMMENT_list(): TerminalNode[] {
	    	return this.getTokens(YiniParser.INLINE_COMMENT);
	}
	public INLINE_COMMENT(i: number): TerminalNode {
		return this.getToken(YiniParser.INLINE_COMMENT, i);
	}
	public NL_list(): TerminalNode[] {
	    	return this.getTokens(YiniParser.NL);
	}
	public NL(i: number): TerminalNode {
		return this.getToken(YiniParser.NL, i);
	}
	public section_list(): SectionContext[] {
		return this.getTypedRuleContexts(SectionContext) as SectionContext[];
	}
	public section(i: number): SectionContext {
		return this.getTypedRuleContext(SectionContext, i) as SectionContext;
	}
	public terminal_line(): Terminal_lineContext {
		return this.getTypedRuleContext(Terminal_lineContext, 0) as Terminal_lineContext;
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


export class SectionContext extends ParserRuleContext {
	constructor(parser?: YiniParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public section_members(): Section_membersContext {
		return this.getTypedRuleContext(Section_membersContext, 0) as Section_membersContext;
	}
	public SECTION_HEAD(): TerminalNode {
		return this.getToken(YiniParser.SECTION_HEAD, 0);
	}
	public section(): SectionContext {
		return this.getTypedRuleContext(SectionContext, 0) as SectionContext;
	}
    public get ruleIndex(): number {
    	return YiniParser.RULE_section;
	}
	// @Override
	public accept<Result>(visitor: YiniParserVisitor<Result>): Result {
		if (visitor.visitSection) {
			return visitor.visitSection(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Terminal_lineContext extends ParserRuleContext {
	constructor(parser?: YiniParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public TERMINAL_TOKEN(): TerminalNode {
		return this.getToken(YiniParser.TERMINAL_TOKEN, 0);
	}
	public NL_list(): TerminalNode[] {
	    	return this.getTokens(YiniParser.NL);
	}
	public NL(i: number): TerminalNode {
		return this.getToken(YiniParser.NL, i);
	}
	public INLINE_COMMENT(): TerminalNode {
		return this.getToken(YiniParser.INLINE_COMMENT, 0);
	}
    public get ruleIndex(): number {
    	return YiniParser.RULE_terminal_line;
	}
	// @Override
	public accept<Result>(visitor: YiniParserVisitor<Result>): Result {
		if (visitor.visitTerminal_line) {
			return visitor.visitTerminal_line(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Section_membersContext extends ParserRuleContext {
	constructor(parser?: YiniParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public member_list(): MemberContext[] {
		return this.getTypedRuleContexts(MemberContext) as MemberContext[];
	}
	public member(i: number): MemberContext {
		return this.getTypedRuleContext(MemberContext, i) as MemberContext;
	}
    public get ruleIndex(): number {
    	return YiniParser.RULE_section_members;
	}
	// @Override
	public accept<Result>(visitor: YiniParserVisitor<Result>): Result {
		if (visitor.visitSection_members) {
			return visitor.visitSection_members(this);
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
	public NL_list(): TerminalNode[] {
	    	return this.getTokens(YiniParser.NL);
	}
	public NL(i: number): TerminalNode {
		return this.getToken(YiniParser.NL, i);
	}
	public member_colon_list(): Member_colon_listContext {
		return this.getTypedRuleContext(Member_colon_listContext, 0) as Member_colon_listContext;
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


export class Member_colon_listContext extends ParserRuleContext {
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
	public NL_list(): TerminalNode[] {
	    	return this.getTokens(YiniParser.NL);
	}
	public NL(i: number): TerminalNode {
		return this.getToken(YiniParser.NL, i);
	}
    public get ruleIndex(): number {
    	return YiniParser.RULE_member_colon_list;
	}
	// @Override
	public accept<Result>(visitor: YiniParserVisitor<Result>): Result {
		if (visitor.visitMember_colon_list) {
			return visitor.visitMember_colon_list(this);
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
	public list_in_brackets(): List_in_bracketsContext {
		return this.getTypedRuleContext(List_in_bracketsContext, 0) as List_in_bracketsContext;
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
	public NULL(): TerminalNode {
		return this.getToken(YiniParser.NULL, 0);
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


export class ListContext extends ParserRuleContext {
	constructor(parser?: YiniParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public elements(): ElementsContext {
		return this.getTypedRuleContext(ElementsContext, 0) as ElementsContext;
	}
	public list_in_brackets(): List_in_bracketsContext {
		return this.getTypedRuleContext(List_in_bracketsContext, 0) as List_in_bracketsContext;
	}
    public get ruleIndex(): number {
    	return YiniParser.RULE_list;
	}
	// @Override
	public accept<Result>(visitor: YiniParserVisitor<Result>): Result {
		if (visitor.visitList) {
			return visitor.visitList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class List_in_bracketsContext extends ParserRuleContext {
	constructor(parser?: YiniParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public OB(): TerminalNode {
		return this.getToken(YiniParser.OB, 0);
	}
	public elements(): ElementsContext {
		return this.getTypedRuleContext(ElementsContext, 0) as ElementsContext;
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
	public EMPTY_LIST(): TerminalNode {
		return this.getToken(YiniParser.EMPTY_LIST, 0);
	}
    public get ruleIndex(): number {
    	return YiniParser.RULE_list_in_brackets;
	}
	// @Override
	public accept<Result>(visitor: YiniParserVisitor<Result>): Result {
		if (visitor.visitList_in_brackets) {
			return visitor.visitList_in_brackets(this);
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
	public element(): ElementContext {
		return this.getTypedRuleContext(ElementContext, 0) as ElementContext;
	}
	public COMMA(): TerminalNode {
		return this.getToken(YiniParser.COMMA, 0);
	}
	public elements(): ElementsContext {
		return this.getTypedRuleContext(ElementsContext, 0) as ElementsContext;
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


export class ElementContext extends ParserRuleContext {
	constructor(parser?: YiniParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
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
	public list_in_brackets(): List_in_bracketsContext {
		return this.getTypedRuleContext(List_in_bracketsContext, 0) as List_in_bracketsContext;
	}
    public get ruleIndex(): number {
    	return YiniParser.RULE_element;
	}
	// @Override
	public accept<Result>(visitor: YiniParserVisitor<Result>): Result {
		if (visitor.visitElement) {
			return visitor.visitElement(this);
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
	public BOOLEAN_FALSE(): TerminalNode {
		return this.getToken(YiniParser.BOOLEAN_FALSE, 0);
	}
	public BOOLEAN_TRUE(): TerminalNode {
		return this.getToken(YiniParser.BOOLEAN_TRUE, 0);
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
