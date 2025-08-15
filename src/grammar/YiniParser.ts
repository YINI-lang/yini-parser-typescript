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
	public static readonly SEMICOLON = 21;
	public static readonly BOOLEAN_FALSE = 22;
	public static readonly BOOLEAN_TRUE = 23;
	public static readonly NULL = 24;
	public static readonly EMPTY_OBJECT = 25;
	public static readonly EMPTY_LIST = 26;
	public static readonly SHEBANG = 27;
	public static readonly NUMBER = 28;
	public static readonly KEY = 29;
	public static readonly IDENT = 30;
	public static readonly IDENT_BACKTICKED = 31;
	public static readonly STRING = 32;
	public static readonly TRIPLE_QUOTED_STRING = 33;
	public static readonly SINGLE_OR_DOUBLE = 34;
	public static readonly R_AND_C_STRING = 35;
	public static readonly HYPER_STRING = 36;
	public static readonly ESC_SEQ = 37;
	public static readonly ESC_SEQ_BASE = 38;
	public static readonly NL = 39;
	public static readonly SINGLE_NL = 40;
	public static readonly WS = 41;
	public static readonly BLOCK_COMMENT = 42;
	public static readonly COMMENT = 43;
	public static readonly LINE_COMMENT = 44;
	public static readonly INLINE_COMMENT = 45;
	public static readonly IDENT_INVALID = 46;
	public static readonly REST = 47;
	public static override readonly EOF = Token.EOF;
	public static readonly RULE_yini = 0;
	public static readonly RULE_section = 1;
	public static readonly RULE_terminal_line = 2;
	public static readonly RULE_section_members = 3;
	public static readonly RULE_member = 4;
	public static readonly RULE_member_colon_list = 5;
	public static readonly RULE_value = 6;
	public static readonly RULE_object_literal = 7;
	public static readonly RULE_objectMemberList = 8;
	public static readonly RULE_objectMember = 9;
	public static readonly RULE_list = 10;
	public static readonly RULE_list_in_brackets = 11;
	public static readonly RULE_elements = 12;
	public static readonly RULE_element = 13;
	public static readonly RULE_number_literal = 14;
	public static readonly RULE_null_literal = 15;
	public static readonly RULE_string_literal = 16;
	public static readonly RULE_string_concat = 17;
	public static readonly RULE_boolean_literal = 18;
	public static readonly RULE_empty_object = 19;
	public static readonly RULE_empty_list = 20;
	public static readonly RULE_bad_member = 21;
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
                                                            "'@'", "';'", 
                                                            null, null, 
                                                            null, "'{}'", 
                                                            "'[]'" ];
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
                                                             "REST" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"yini", "section", "terminal_line", "section_members", "member", "member_colon_list", 
		"value", "object_literal", "objectMemberList", "objectMember", "list", 
		"list_in_brackets", "elements", "element", "number_literal", "null_literal", 
		"string_literal", "string_concat", "boolean_literal", "empty_object", 
		"empty_list", "bad_member",
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
			this.state = 45;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===27) {
				{
				this.state = 44;
				this.match(YiniParser.SHEBANG);
				}
			}

			this.state = 50;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===45) {
				{
				{
				this.state = 47;
				this.match(YiniParser.INLINE_COMMENT);
				}
				}
				this.state = 52;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 56;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===39) {
				{
				{
				this.state = 53;
				this.match(YiniParser.NL);
				}
				}
				this.state = 58;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 60;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 59;
				this.section();
				}
				}
				this.state = 62;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 935371270) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 33281) !== 0));
			this.state = 67;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===39) {
				{
				{
				this.state = 64;
				this.match(YiniParser.NL);
				}
				}
				this.state = 69;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 71;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===3) {
				{
				this.state = 70;
				this.terminal_line();
				}
			}

			this.state = 74;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 6, this._ctx) ) {
			case 1:
				{
				this.state = 73;
				this.match(YiniParser.EOF);
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
	public section(): SectionContext {
		let localctx: SectionContext = new SectionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 2, YiniParser.RULE_section);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 77;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 7, this._ctx) ) {
			case 1:
				{
				this.state = 76;
				this.match(YiniParser.SECTION_HEAD);
				}
				break;
			}
			this.state = 79;
			this.section_members();
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
			this.state = 81;
			this.match(YiniParser.TERMINAL_TOKEN);
			this.state = 96;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 11, this._ctx) ) {
			case 1:
				{
				this.state = 83;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 82;
					this.match(YiniParser.NL);
					}
					}
					this.state = 85;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while (_la===39);
				}
				break;
			case 2:
				{
				this.state = 88;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===45) {
					{
					this.state = 87;
					this.match(YiniParser.INLINE_COMMENT);
					}
				}

				this.state = 93;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===39) {
					{
					{
					this.state = 90;
					this.match(YiniParser.NL);
					}
					}
					this.state = 95;
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
			this.state = 99;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 98;
					this.member();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 101;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 12, this._ctx);
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
			this.state = 126;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 18, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 103;
				this.match(YiniParser.KEY);
				this.state = 105;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===41) {
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
				if (_la===41) {
					{
					this.state = 108;
					this.match(YiniParser.WS);
					}
				}

				this.state = 112;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 13)) & ~0x1F) === 0 && ((1 << (_la - 13)) & 572933) !== 0)) {
					{
					this.state = 111;
					this.value();
					}
				}

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
					_alt = this._interp.adaptivePredict(this._input, 16, this._ctx);
				} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 119;
				this.member_colon_list();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 120;
				this.match(YiniParser.SECTION_HEAD);
				this.state = 122;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 17, this._ctx) ) {
				case 1:
					{
					this.state = 121;
					this.section_members();
					}
					break;
				}
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 124;
				this.match(YiniParser.YINI_MARKER);
				}
				break;
			case 5:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 125;
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
	public member_colon_list(): Member_colon_listContext {
		let localctx: Member_colon_listContext = new Member_colon_listContext(this, this._ctx, this.state);
		this.enterRule(localctx, 10, YiniParser.RULE_member_colon_list);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 128;
			this.match(YiniParser.KEY);
			this.state = 129;
			this.match(YiniParser.COLON);
			this.state = 131;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===41) {
				{
				this.state = 130;
				this.match(YiniParser.WS);
				}
			}

			this.state = 134;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 20, this._ctx) ) {
			case 1:
				{
				this.state = 133;
				this.elements();
				}
				break;
			}
			this.state = 137;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 136;
					this.match(YiniParser.NL);
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 139;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 21, this._ctx);
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
			this.state = 147;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 24:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 141;
				this.null_literal();
				}
				break;
			case 32:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 142;
				this.string_literal();
				}
				break;
			case 28:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 143;
				this.number_literal();
				}
				break;
			case 22:
			case 23:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 144;
				this.boolean_literal();
				}
				break;
			case 13:
			case 26:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 145;
				this.list_in_brackets();
				}
				break;
			case 15:
			case 25:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 146;
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
		this.enterRule(localctx, 14, YiniParser.RULE_object_literal);
		let _la: number;
		try {
			let _alt: number;
			this.state = 177;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 27, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 149;
				this.match(YiniParser.OC);
				this.state = 153;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===39) {
					{
					{
					this.state = 150;
					this.match(YiniParser.NL);
					}
					}
					this.state = 155;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 156;
				this.objectMemberList();
				this.state = 160;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===39) {
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
				_alt = this._interp.adaptivePredict(this._input, 25, this._ctx);
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
					_alt = this._interp.adaptivePredict(this._input, 25, this._ctx);
				}
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 170;
				this.empty_object();
				this.state = 174;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 26, this._ctx);
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
					_alt = this._interp.adaptivePredict(this._input, 26, this._ctx);
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
	public objectMemberList(): ObjectMemberListContext {
		let localctx: ObjectMemberListContext = new ObjectMemberListContext(this, this._ctx, this.state);
		this.enterRule(localctx, 16, YiniParser.RULE_objectMemberList);
		let _la: number;
		try {
			let _alt: number;
			this.state = 203;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 29:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 179;
				this.objectMember();
				this.state = 190;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 29, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 180;
						this.match(YiniParser.COMMA);
						this.state = 184;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						while (_la===39) {
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
						this.objectMember();
						}
						}
					}
					this.state = 192;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 29, this._ctx);
				}
				this.state = 194;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===11) {
					{
					this.state = 193;
					this.match(YiniParser.COMMA);
					}
				}

				}
				break;
			case 15:
			case 25:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 196;
				this.empty_object();
				this.state = 200;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 31, this._ctx);
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
					_alt = this._interp.adaptivePredict(this._input, 31, this._ctx);
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
	public objectMember(): ObjectMemberContext {
		let localctx: ObjectMemberContext = new ObjectMemberContext(this, this._ctx, this.state);
		this.enterRule(localctx, 18, YiniParser.RULE_objectMember);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 205;
			this.match(YiniParser.KEY);
			this.state = 207;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===41) {
				{
				this.state = 206;
				this.match(YiniParser.WS);
				}
			}

			this.state = 209;
			this.match(YiniParser.COLON);
			this.state = 213;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===39) {
				{
				{
				this.state = 210;
				this.match(YiniParser.NL);
				}
				}
				this.state = 215;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 216;
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
	public list(): ListContext {
		let localctx: ListContext = new ListContext(this, this._ctx, this.state);
		this.enterRule(localctx, 20, YiniParser.RULE_list);
		try {
			this.state = 220;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 35, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 218;
				this.elements();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 219;
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
		this.enterRule(localctx, 22, YiniParser.RULE_list_in_brackets);
		let _la: number;
		try {
			let _alt: number;
			this.state = 245;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 39, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 222;
				this.match(YiniParser.OB);
				this.state = 226;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 36, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 223;
						this.match(YiniParser.NL);
						}
						}
					}
					this.state = 228;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 36, this._ctx);
				}
				this.state = 229;
				this.elements();
				this.state = 233;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===39) {
					{
					{
					this.state = 230;
					this.match(YiniParser.NL);
					}
					}
					this.state = 235;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 236;
				this.match(YiniParser.CB);
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 238;
				this.empty_list();
				this.state = 242;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 38, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 239;
						this.match(YiniParser.NL);
						}
						}
					}
					this.state = 244;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 38, this._ctx);
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
	public elements(): ElementsContext {
		let localctx: ElementsContext = new ElementsContext(this, this._ctx, this.state);
		this.enterRule(localctx, 24, YiniParser.RULE_elements);
		let _la: number;
		try {
			this.state = 255;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 41, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 247;
				this.element();
				this.state = 249;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===11) {
					{
					this.state = 248;
					this.match(YiniParser.COMMA);
					}
				}

				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 251;
				this.element();
				this.state = 252;
				this.match(YiniParser.COMMA);
				this.state = 253;
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
		this.enterRule(localctx, 26, YiniParser.RULE_element);
		let _la: number;
		try {
			let _alt: number;
			this.state = 283;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 46, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 260;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===39) {
					{
					{
					this.state = 257;
					this.match(YiniParser.NL);
					}
					}
					this.state = 262;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 263;
				this.value();
				this.state = 267;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 43, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 264;
						this.match(YiniParser.NL);
						}
						}
					}
					this.state = 269;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 43, this._ctx);
				}
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 273;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===39) {
					{
					{
					this.state = 270;
					this.match(YiniParser.NL);
					}
					}
					this.state = 275;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 276;
				this.list_in_brackets();
				this.state = 280;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 45, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 277;
						this.match(YiniParser.NL);
						}
						}
					}
					this.state = 282;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 45, this._ctx);
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
		this.enterRule(localctx, 28, YiniParser.RULE_number_literal);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 285;
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
		this.enterRule(localctx, 30, YiniParser.RULE_null_literal);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 287;
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
		this.enterRule(localctx, 32, YiniParser.RULE_string_literal);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 289;
			this.match(YiniParser.STRING);
			this.state = 293;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 47, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 290;
					this.string_concat();
					}
					}
				}
				this.state = 295;
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
		this.enterRule(localctx, 34, YiniParser.RULE_string_concat);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 299;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===39) {
				{
				{
				this.state = 296;
				this.match(YiniParser.NL);
				}
				}
				this.state = 301;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 302;
			this.match(YiniParser.PLUS);
			this.state = 306;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===39) {
				{
				{
				this.state = 303;
				this.match(YiniParser.NL);
				}
				}
				this.state = 308;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 309;
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
		this.enterRule(localctx, 36, YiniParser.RULE_boolean_literal);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 311;
			_la = this._input.LA(1);
			if(!(_la===22 || _la===23)) {
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
	public empty_object(): Empty_objectContext {
		let localctx: Empty_objectContext = new Empty_objectContext(this, this._ctx, this.state);
		this.enterRule(localctx, 38, YiniParser.RULE_empty_object);
		let _la: number;
		try {
			this.state = 322;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 25:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 313;
				this.match(YiniParser.EMPTY_OBJECT);
				}
				break;
			case 15:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 314;
				this.match(YiniParser.OC);
				this.state = 318;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===39) {
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
				this.match(YiniParser.CC);
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
	public empty_list(): Empty_listContext {
		let localctx: Empty_listContext = new Empty_listContext(this, this._ctx, this.state);
		this.enterRule(localctx, 40, YiniParser.RULE_empty_list);
		let _la: number;
		try {
			this.state = 333;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 26:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 324;
				this.match(YiniParser.EMPTY_LIST);
				}
				break;
			case 13:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 325;
				this.match(YiniParser.OB);
				this.state = 329;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===39) {
					{
					{
					this.state = 326;
					this.match(YiniParser.NL);
					}
					}
					this.state = 331;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 332;
				this.match(YiniParser.CB);
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
	public bad_member(): Bad_memberContext {
		let localctx: Bad_memberContext = new Bad_memberContext(this, this._ctx, this.state);
		this.enterRule(localctx, 42, YiniParser.RULE_bad_member);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 336;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 54, this._ctx) ) {
			case 1:
				{
				this.state = 335;
				this.match(YiniParser.WS);
				}
				break;
			}
			this.state = 340;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 47:
				{
				this.state = 338;
				this.match(YiniParser.REST);
				}
				break;
			case 13:
			case 15:
			case 22:
			case 23:
			case 24:
			case 25:
			case 26:
			case 28:
			case 32:
				{
				this.state = 339;
				this.value();
				}
				break;
			case 9:
			case 41:
				break;
			default:
				break;
			}
			this.state = 343;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===41) {
				{
				this.state = 342;
				this.match(YiniParser.WS);
				}
			}

			this.state = 345;
			this.match(YiniParser.EQ);
			this.state = 348;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 13:
			case 15:
			case 22:
			case 23:
			case 24:
			case 25:
			case 26:
			case 28:
			case 32:
				{
				this.state = 346;
				this.value();
				}
				break;
			case 47:
				{
				this.state = 347;
				this.match(YiniParser.REST);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 351;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 58, this._ctx) ) {
			case 1:
				{
				this.state = 350;
				this.match(YiniParser.NL);
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

	public static readonly _serializedATN: number[] = [4,1,47,354,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,
	10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,
	7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,1,0,3,0,46,8,0,1,0,5,0,49,
	8,0,10,0,12,0,52,9,0,1,0,5,0,55,8,0,10,0,12,0,58,9,0,1,0,4,0,61,8,0,11,
	0,12,0,62,1,0,5,0,66,8,0,10,0,12,0,69,9,0,1,0,3,0,72,8,0,1,0,3,0,75,8,0,
	1,1,3,1,78,8,1,1,1,1,1,1,2,1,2,4,2,84,8,2,11,2,12,2,85,1,2,3,2,89,8,2,1,
	2,5,2,92,8,2,10,2,12,2,95,9,2,3,2,97,8,2,1,3,4,3,100,8,3,11,3,12,3,101,
	1,4,1,4,3,4,106,8,4,1,4,1,4,3,4,110,8,4,1,4,3,4,113,8,4,1,4,4,4,116,8,4,
	11,4,12,4,117,1,4,1,4,1,4,3,4,123,8,4,1,4,1,4,3,4,127,8,4,1,5,1,5,1,5,3,
	5,132,8,5,1,5,3,5,135,8,5,1,5,4,5,138,8,5,11,5,12,5,139,1,6,1,6,1,6,1,6,
	1,6,1,6,3,6,148,8,6,1,7,1,7,5,7,152,8,7,10,7,12,7,155,9,7,1,7,1,7,5,7,159,
	8,7,10,7,12,7,162,9,7,1,7,1,7,5,7,166,8,7,10,7,12,7,169,9,7,1,7,1,7,5,7,
	173,8,7,10,7,12,7,176,9,7,3,7,178,8,7,1,8,1,8,1,8,5,8,183,8,8,10,8,12,8,
	186,9,8,1,8,5,8,189,8,8,10,8,12,8,192,9,8,1,8,3,8,195,8,8,1,8,1,8,5,8,199,
	8,8,10,8,12,8,202,9,8,3,8,204,8,8,1,9,1,9,3,9,208,8,9,1,9,1,9,5,9,212,8,
	9,10,9,12,9,215,9,9,1,9,1,9,1,10,1,10,3,10,221,8,10,1,11,1,11,5,11,225,
	8,11,10,11,12,11,228,9,11,1,11,1,11,5,11,232,8,11,10,11,12,11,235,9,11,
	1,11,1,11,1,11,1,11,5,11,241,8,11,10,11,12,11,244,9,11,3,11,246,8,11,1,
	12,1,12,3,12,250,8,12,1,12,1,12,1,12,1,12,3,12,256,8,12,1,13,5,13,259,8,
	13,10,13,12,13,262,9,13,1,13,1,13,5,13,266,8,13,10,13,12,13,269,9,13,1,
	13,5,13,272,8,13,10,13,12,13,275,9,13,1,13,1,13,5,13,279,8,13,10,13,12,
	13,282,9,13,3,13,284,8,13,1,14,1,14,1,15,1,15,1,16,1,16,5,16,292,8,16,10,
	16,12,16,295,9,16,1,17,5,17,298,8,17,10,17,12,17,301,9,17,1,17,1,17,5,17,
	305,8,17,10,17,12,17,308,9,17,1,17,1,17,1,18,1,18,1,19,1,19,1,19,5,19,317,
	8,19,10,19,12,19,320,9,19,1,19,3,19,323,8,19,1,20,1,20,1,20,5,20,328,8,
	20,10,20,12,20,331,9,20,1,20,3,20,334,8,20,1,21,3,21,337,8,21,1,21,1,21,
	3,21,341,8,21,1,21,3,21,344,8,21,1,21,1,21,1,21,3,21,349,8,21,1,21,3,21,
	352,8,21,1,21,0,0,22,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,
	38,40,42,0,1,1,0,22,23,398,0,45,1,0,0,0,2,77,1,0,0,0,4,81,1,0,0,0,6,99,
	1,0,0,0,8,126,1,0,0,0,10,128,1,0,0,0,12,147,1,0,0,0,14,177,1,0,0,0,16,203,
	1,0,0,0,18,205,1,0,0,0,20,220,1,0,0,0,22,245,1,0,0,0,24,255,1,0,0,0,26,
	283,1,0,0,0,28,285,1,0,0,0,30,287,1,0,0,0,32,289,1,0,0,0,34,299,1,0,0,0,
	36,311,1,0,0,0,38,322,1,0,0,0,40,333,1,0,0,0,42,336,1,0,0,0,44,46,5,27,
	0,0,45,44,1,0,0,0,45,46,1,0,0,0,46,50,1,0,0,0,47,49,5,45,0,0,48,47,1,0,
	0,0,49,52,1,0,0,0,50,48,1,0,0,0,50,51,1,0,0,0,51,56,1,0,0,0,52,50,1,0,0,
	0,53,55,5,39,0,0,54,53,1,0,0,0,55,58,1,0,0,0,56,54,1,0,0,0,56,57,1,0,0,
	0,57,60,1,0,0,0,58,56,1,0,0,0,59,61,3,2,1,0,60,59,1,0,0,0,61,62,1,0,0,0,
	62,60,1,0,0,0,62,63,1,0,0,0,63,67,1,0,0,0,64,66,5,39,0,0,65,64,1,0,0,0,
	66,69,1,0,0,0,67,65,1,0,0,0,67,68,1,0,0,0,68,71,1,0,0,0,69,67,1,0,0,0,70,
	72,3,4,2,0,71,70,1,0,0,0,71,72,1,0,0,0,72,74,1,0,0,0,73,75,5,0,0,1,74,73,
	1,0,0,0,74,75,1,0,0,0,75,1,1,0,0,0,76,78,5,2,0,0,77,76,1,0,0,0,77,78,1,
	0,0,0,78,79,1,0,0,0,79,80,3,6,3,0,80,3,1,0,0,0,81,96,5,3,0,0,82,84,5,39,
	0,0,83,82,1,0,0,0,84,85,1,0,0,0,85,83,1,0,0,0,85,86,1,0,0,0,86,97,1,0,0,
	0,87,89,5,45,0,0,88,87,1,0,0,0,88,89,1,0,0,0,89,93,1,0,0,0,90,92,5,39,0,
	0,91,90,1,0,0,0,92,95,1,0,0,0,93,91,1,0,0,0,93,94,1,0,0,0,94,97,1,0,0,0,
	95,93,1,0,0,0,96,83,1,0,0,0,96,88,1,0,0,0,97,5,1,0,0,0,98,100,3,8,4,0,99,
	98,1,0,0,0,100,101,1,0,0,0,101,99,1,0,0,0,101,102,1,0,0,0,102,7,1,0,0,0,
	103,105,5,29,0,0,104,106,5,41,0,0,105,104,1,0,0,0,105,106,1,0,0,0,106,107,
	1,0,0,0,107,109,5,9,0,0,108,110,5,41,0,0,109,108,1,0,0,0,109,110,1,0,0,
	0,110,112,1,0,0,0,111,113,3,12,6,0,112,111,1,0,0,0,112,113,1,0,0,0,113,
	115,1,0,0,0,114,116,5,39,0,0,115,114,1,0,0,0,116,117,1,0,0,0,117,115,1,
	0,0,0,117,118,1,0,0,0,118,127,1,0,0,0,119,127,3,10,5,0,120,122,5,2,0,0,
	121,123,3,6,3,0,122,121,1,0,0,0,122,123,1,0,0,0,123,127,1,0,0,0,124,127,
	5,1,0,0,125,127,3,42,21,0,126,103,1,0,0,0,126,119,1,0,0,0,126,120,1,0,0,
	0,126,124,1,0,0,0,126,125,1,0,0,0,127,9,1,0,0,0,128,129,5,29,0,0,129,131,
	5,12,0,0,130,132,5,41,0,0,131,130,1,0,0,0,131,132,1,0,0,0,132,134,1,0,0,
	0,133,135,3,24,12,0,134,133,1,0,0,0,134,135,1,0,0,0,135,137,1,0,0,0,136,
	138,5,39,0,0,137,136,1,0,0,0,138,139,1,0,0,0,139,137,1,0,0,0,139,140,1,
	0,0,0,140,11,1,0,0,0,141,148,3,30,15,0,142,148,3,32,16,0,143,148,3,28,14,
	0,144,148,3,36,18,0,145,148,3,22,11,0,146,148,3,14,7,0,147,141,1,0,0,0,
	147,142,1,0,0,0,147,143,1,0,0,0,147,144,1,0,0,0,147,145,1,0,0,0,147,146,
	1,0,0,0,148,13,1,0,0,0,149,153,5,15,0,0,150,152,5,39,0,0,151,150,1,0,0,
	0,152,155,1,0,0,0,153,151,1,0,0,0,153,154,1,0,0,0,154,156,1,0,0,0,155,153,
	1,0,0,0,156,160,3,16,8,0,157,159,5,39,0,0,158,157,1,0,0,0,159,162,1,0,0,
	0,160,158,1,0,0,0,160,161,1,0,0,0,161,163,1,0,0,0,162,160,1,0,0,0,163,167,
	5,16,0,0,164,166,5,39,0,0,165,164,1,0,0,0,166,169,1,0,0,0,167,165,1,0,0,
	0,167,168,1,0,0,0,168,178,1,0,0,0,169,167,1,0,0,0,170,174,3,38,19,0,171,
	173,5,39,0,0,172,171,1,0,0,0,173,176,1,0,0,0,174,172,1,0,0,0,174,175,1,
	0,0,0,175,178,1,0,0,0,176,174,1,0,0,0,177,149,1,0,0,0,177,170,1,0,0,0,178,
	15,1,0,0,0,179,190,3,18,9,0,180,184,5,11,0,0,181,183,5,39,0,0,182,181,1,
	0,0,0,183,186,1,0,0,0,184,182,1,0,0,0,184,185,1,0,0,0,185,187,1,0,0,0,186,
	184,1,0,0,0,187,189,3,18,9,0,188,180,1,0,0,0,189,192,1,0,0,0,190,188,1,
	0,0,0,190,191,1,0,0,0,191,194,1,0,0,0,192,190,1,0,0,0,193,195,5,11,0,0,
	194,193,1,0,0,0,194,195,1,0,0,0,195,204,1,0,0,0,196,200,3,38,19,0,197,199,
	5,39,0,0,198,197,1,0,0,0,199,202,1,0,0,0,200,198,1,0,0,0,200,201,1,0,0,
	0,201,204,1,0,0,0,202,200,1,0,0,0,203,179,1,0,0,0,203,196,1,0,0,0,204,17,
	1,0,0,0,205,207,5,29,0,0,206,208,5,41,0,0,207,206,1,0,0,0,207,208,1,0,0,
	0,208,209,1,0,0,0,209,213,5,12,0,0,210,212,5,39,0,0,211,210,1,0,0,0,212,
	215,1,0,0,0,213,211,1,0,0,0,213,214,1,0,0,0,214,216,1,0,0,0,215,213,1,0,
	0,0,216,217,3,12,6,0,217,19,1,0,0,0,218,221,3,24,12,0,219,221,3,22,11,0,
	220,218,1,0,0,0,220,219,1,0,0,0,221,21,1,0,0,0,222,226,5,13,0,0,223,225,
	5,39,0,0,224,223,1,0,0,0,225,228,1,0,0,0,226,224,1,0,0,0,226,227,1,0,0,
	0,227,229,1,0,0,0,228,226,1,0,0,0,229,233,3,24,12,0,230,232,5,39,0,0,231,
	230,1,0,0,0,232,235,1,0,0,0,233,231,1,0,0,0,233,234,1,0,0,0,234,236,1,0,
	0,0,235,233,1,0,0,0,236,237,5,14,0,0,237,246,1,0,0,0,238,242,3,40,20,0,
	239,241,5,39,0,0,240,239,1,0,0,0,241,244,1,0,0,0,242,240,1,0,0,0,242,243,
	1,0,0,0,243,246,1,0,0,0,244,242,1,0,0,0,245,222,1,0,0,0,245,238,1,0,0,0,
	246,23,1,0,0,0,247,249,3,26,13,0,248,250,5,11,0,0,249,248,1,0,0,0,249,250,
	1,0,0,0,250,256,1,0,0,0,251,252,3,26,13,0,252,253,5,11,0,0,253,254,3,24,
	12,0,254,256,1,0,0,0,255,247,1,0,0,0,255,251,1,0,0,0,256,25,1,0,0,0,257,
	259,5,39,0,0,258,257,1,0,0,0,259,262,1,0,0,0,260,258,1,0,0,0,260,261,1,
	0,0,0,261,263,1,0,0,0,262,260,1,0,0,0,263,267,3,12,6,0,264,266,5,39,0,0,
	265,264,1,0,0,0,266,269,1,0,0,0,267,265,1,0,0,0,267,268,1,0,0,0,268,284,
	1,0,0,0,269,267,1,0,0,0,270,272,5,39,0,0,271,270,1,0,0,0,272,275,1,0,0,
	0,273,271,1,0,0,0,273,274,1,0,0,0,274,276,1,0,0,0,275,273,1,0,0,0,276,280,
	3,22,11,0,277,279,5,39,0,0,278,277,1,0,0,0,279,282,1,0,0,0,280,278,1,0,
	0,0,280,281,1,0,0,0,281,284,1,0,0,0,282,280,1,0,0,0,283,260,1,0,0,0,283,
	273,1,0,0,0,284,27,1,0,0,0,285,286,5,28,0,0,286,29,1,0,0,0,287,288,5,24,
	0,0,288,31,1,0,0,0,289,293,5,32,0,0,290,292,3,34,17,0,291,290,1,0,0,0,292,
	295,1,0,0,0,293,291,1,0,0,0,293,294,1,0,0,0,294,33,1,0,0,0,295,293,1,0,
	0,0,296,298,5,39,0,0,297,296,1,0,0,0,298,301,1,0,0,0,299,297,1,0,0,0,299,
	300,1,0,0,0,300,302,1,0,0,0,301,299,1,0,0,0,302,306,5,17,0,0,303,305,5,
	39,0,0,304,303,1,0,0,0,305,308,1,0,0,0,306,304,1,0,0,0,306,307,1,0,0,0,
	307,309,1,0,0,0,308,306,1,0,0,0,309,310,5,32,0,0,310,35,1,0,0,0,311,312,
	7,0,0,0,312,37,1,0,0,0,313,323,5,25,0,0,314,318,5,15,0,0,315,317,5,39,0,
	0,316,315,1,0,0,0,317,320,1,0,0,0,318,316,1,0,0,0,318,319,1,0,0,0,319,321,
	1,0,0,0,320,318,1,0,0,0,321,323,5,16,0,0,322,313,1,0,0,0,322,314,1,0,0,
	0,323,39,1,0,0,0,324,334,5,26,0,0,325,329,5,13,0,0,326,328,5,39,0,0,327,
	326,1,0,0,0,328,331,1,0,0,0,329,327,1,0,0,0,329,330,1,0,0,0,330,332,1,0,
	0,0,331,329,1,0,0,0,332,334,5,14,0,0,333,324,1,0,0,0,333,325,1,0,0,0,334,
	41,1,0,0,0,335,337,5,41,0,0,336,335,1,0,0,0,336,337,1,0,0,0,337,340,1,0,
	0,0,338,341,5,47,0,0,339,341,3,12,6,0,340,338,1,0,0,0,340,339,1,0,0,0,340,
	341,1,0,0,0,341,343,1,0,0,0,342,344,5,41,0,0,343,342,1,0,0,0,343,344,1,
	0,0,0,344,345,1,0,0,0,345,348,5,9,0,0,346,349,3,12,6,0,347,349,5,47,0,0,
	348,346,1,0,0,0,348,347,1,0,0,0,349,351,1,0,0,0,350,352,5,39,0,0,351,350,
	1,0,0,0,351,352,1,0,0,0,352,43,1,0,0,0,59,45,50,56,62,67,71,74,77,85,88,
	93,96,101,105,109,112,117,122,126,131,134,139,147,153,160,167,174,177,184,
	190,194,200,203,207,213,220,226,233,242,245,249,255,260,267,273,280,283,
	293,299,306,318,322,329,333,336,340,343,348,351];

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
	public EOF(): TerminalNode {
		return this.getToken(YiniParser.EOF, 0);
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
	public WS_list(): TerminalNode[] {
	    	return this.getTokens(YiniParser.WS);
	}
	public WS(i: number): TerminalNode {
		return this.getToken(YiniParser.WS, i);
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
	public SECTION_HEAD(): TerminalNode {
		return this.getToken(YiniParser.SECTION_HEAD, 0);
	}
	public section_members(): Section_membersContext {
		return this.getTypedRuleContext(Section_membersContext, 0) as Section_membersContext;
	}
	public YINI_MARKER(): TerminalNode {
		return this.getToken(YiniParser.YINI_MARKER, 0);
	}
	public bad_member(): Bad_memberContext {
		return this.getTypedRuleContext(Bad_memberContext, 0) as Bad_memberContext;
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
	public WS(): TerminalNode {
		return this.getToken(YiniParser.WS, 0);
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
	public list_in_brackets(): List_in_bracketsContext {
		return this.getTypedRuleContext(List_in_bracketsContext, 0) as List_in_bracketsContext;
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
	public objectMemberList(): ObjectMemberListContext {
		return this.getTypedRuleContext(ObjectMemberListContext, 0) as ObjectMemberListContext;
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
	public empty_object(): Empty_objectContext {
		return this.getTypedRuleContext(Empty_objectContext, 0) as Empty_objectContext;
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


export class ObjectMemberListContext extends ParserRuleContext {
	constructor(parser?: YiniParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public objectMember_list(): ObjectMemberContext[] {
		return this.getTypedRuleContexts(ObjectMemberContext) as ObjectMemberContext[];
	}
	public objectMember(i: number): ObjectMemberContext {
		return this.getTypedRuleContext(ObjectMemberContext, i) as ObjectMemberContext;
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
	public empty_object(): Empty_objectContext {
		return this.getTypedRuleContext(Empty_objectContext, 0) as Empty_objectContext;
	}
    public get ruleIndex(): number {
    	return YiniParser.RULE_objectMemberList;
	}
	// @Override
	public accept<Result>(visitor: YiniParserVisitor<Result>): Result {
		if (visitor.visitObjectMemberList) {
			return visitor.visitObjectMemberList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ObjectMemberContext extends ParserRuleContext {
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
    	return YiniParser.RULE_objectMember;
	}
	// @Override
	public accept<Result>(visitor: YiniParserVisitor<Result>): Result {
		if (visitor.visitObjectMember) {
			return visitor.visitObjectMember(this);
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
	public empty_list(): Empty_listContext {
		return this.getTypedRuleContext(Empty_listContext, 0) as Empty_listContext;
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


export class Empty_objectContext extends ParserRuleContext {
	constructor(parser?: YiniParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public EMPTY_OBJECT(): TerminalNode {
		return this.getToken(YiniParser.EMPTY_OBJECT, 0);
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
    public get ruleIndex(): number {
    	return YiniParser.RULE_empty_object;
	}
	// @Override
	public accept<Result>(visitor: YiniParserVisitor<Result>): Result {
		if (visitor.visitEmpty_object) {
			return visitor.visitEmpty_object(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Empty_listContext extends ParserRuleContext {
	constructor(parser?: YiniParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public EMPTY_LIST(): TerminalNode {
		return this.getToken(YiniParser.EMPTY_LIST, 0);
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
    public get ruleIndex(): number {
    	return YiniParser.RULE_empty_list;
	}
	// @Override
	public accept<Result>(visitor: YiniParserVisitor<Result>): Result {
		if (visitor.visitEmpty_list) {
			return visitor.visitEmpty_list(this);
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
	public NL(): TerminalNode {
		return this.getToken(YiniParser.NL, 0);
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
