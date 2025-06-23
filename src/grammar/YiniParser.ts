// Generated from grammar/v1.0.0-beta.7x/YiniParser.g4 by ANTLR 4.13.2
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
	public static readonly TILDE = 7;
	public static readonly GT = 8;
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
	public static readonly KEY = 28;
	public static readonly IDENT = 29;
	public static readonly IDENT_BACKTICKED = 30;
	public static readonly NUMBER = 31;
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
	public static readonly literalNames: (string | null)[] = [ null, null, 
                                                            null, null, 
                                                            "'\\u00A7'", 
                                                            "'\\u20AC'", 
                                                            "'^'", "'~'", 
                                                            "'>'", "'='", 
                                                            "'#'", "','", 
                                                            "':'", "'['", 
                                                            "']'", "'{'", 
                                                            "'}'", "'+'", 
                                                            "'$'", "'%'", 
                                                            "'@'", "';'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, "YINI_MARKER", 
                                                             "SECTION_HEAD", 
                                                             "TERMINAL_TOKEN", 
                                                             "SS", "EUR", 
                                                             "CARET", "TILDE", 
                                                             "GT", "EQ", 
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
                                                             "KEY", "IDENT", 
                                                             "IDENT_BACKTICKED", 
                                                             "NUMBER", "STRING", 
                                                             "TRIPLE_QUOTED_STRING", 
                                                             "SINGLE_OR_DOUBLE", 
                                                             "R_AND_C_STRING", 
                                                             "HYPER_STRING", 
                                                             "ESC_SEQ", 
                                                             "ESC_SEQ_BASE", 
                                                             "NL", "SINGLE_NL", 
                                                             "WS", "BLOCK_COMMENT", 
                                                             "COMMENT", 
                                                             "LINE_COMMENT", 
                                                             "INLINE_COMMENT" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"yini", "section", "terminal_line", "section_members", "member", "member_colon_list", 
		"value", "object_literal", "objectMemberList", "objectMember", "list", 
		"list_in_brackets", "elements", "element", "number_literal", "null_literal", 
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
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 39;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===27) {
				{
				this.state = 38;
				this.match(YiniParser.SHEBANG);
				}
			}

			this.state = 44;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 1, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 41;
					this.match(YiniParser.INLINE_COMMENT);
					}
					}
				}
				this.state = 46;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 1, this._ctx);
			}
			this.state = 50;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 2, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 47;
					this.match(YiniParser.NL);
					}
					}
				}
				this.state = 52;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 2, this._ctx);
			}
			this.state = 54;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===1) {
				{
				this.state = 53;
				this.match(YiniParser.YINI_MARKER);
				}
			}

			this.state = 59;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===45) {
				{
				{
				this.state = 56;
				this.match(YiniParser.INLINE_COMMENT);
				}
				}
				this.state = 61;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 65;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===39) {
				{
				{
				this.state = 62;
				this.match(YiniParser.NL);
				}
				}
				this.state = 67;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 69;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 68;
				this.section();
				}
				}
				this.state = 71;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la===2 || _la===28);
			this.state = 76;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===39) {
				{
				{
				this.state = 73;
				this.match(YiniParser.NL);
				}
				}
				this.state = 78;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 80;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===3) {
				{
				this.state = 79;
				this.terminal_line();
				}
			}

			this.state = 83;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 9, this._ctx) ) {
			case 1:
				{
				this.state = 82;
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
		let _la: number;
		try {
			this.state = 93;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 12, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 86;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===2) {
					{
					this.state = 85;
					this.match(YiniParser.SECTION_HEAD);
					}
				}

				this.state = 88;
				this.section_members();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 89;
				this.match(YiniParser.SECTION_HEAD);
				this.state = 91;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 11, this._ctx) ) {
				case 1:
					{
					this.state = 90;
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
			this.state = 95;
			this.match(YiniParser.TERMINAL_TOKEN);
			this.state = 110;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 16, this._ctx) ) {
			case 1:
				{
				this.state = 97;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 96;
					this.match(YiniParser.NL);
					}
					}
					this.state = 99;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while (_la===39);
				}
				break;
			case 2:
				{
				this.state = 102;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===45) {
					{
					this.state = 101;
					this.match(YiniParser.INLINE_COMMENT);
					}
				}

				this.state = 107;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===39) {
					{
					{
					this.state = 104;
					this.match(YiniParser.NL);
					}
					}
					this.state = 109;
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
			this.state = 113;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 112;
					this.member();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 115;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 17, this._ctx);
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
			this.state = 134;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 22, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 117;
				this.match(YiniParser.KEY);
				this.state = 119;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===41) {
					{
					this.state = 118;
					this.match(YiniParser.WS);
					}
				}

				this.state = 121;
				this.match(YiniParser.EQ);
				this.state = 123;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===41) {
					{
					this.state = 122;
					this.match(YiniParser.WS);
					}
				}

				this.state = 126;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 13)) & ~0x1F) === 0 && ((1 << (_la - 13)) & 802309) !== 0)) {
					{
					this.state = 125;
					this.value();
					}
				}

				this.state = 129;
				this._errHandler.sync(this);
				_alt = 1;
				do {
					switch (_alt) {
					case 1:
						{
						{
						this.state = 128;
						this.match(YiniParser.NL);
						}
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					this.state = 131;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 21, this._ctx);
				} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 133;
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
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 136;
			this.match(YiniParser.KEY);
			this.state = 137;
			this.match(YiniParser.COLON);
			this.state = 139;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===41) {
				{
				this.state = 138;
				this.match(YiniParser.WS);
				}
			}

			this.state = 142;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 24, this._ctx) ) {
			case 1:
				{
				this.state = 141;
				this.elements();
				}
				break;
			}
			this.state = 145;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 144;
					this.match(YiniParser.NL);
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 147;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 25, this._ctx);
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
			this.state = 155;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 24:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 149;
				this.null_literal();
				}
				break;
			case 32:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 150;
				this.string_literal();
				}
				break;
			case 31:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 151;
				this.number_literal();
				}
				break;
			case 22:
			case 23:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 152;
				this.boolean_literal();
				}
				break;
			case 13:
			case 26:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 153;
				this.list_in_brackets();
				}
				break;
			case 15:
			case 25:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 154;
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
			this.state = 179;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 15:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 157;
				this.match(YiniParser.OC);
				this.state = 161;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===39) {
					{
					{
					this.state = 158;
					this.match(YiniParser.NL);
					}
					}
					this.state = 163;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 164;
				this.objectMemberList();
				this.state = 168;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===39) {
					{
					{
					this.state = 165;
					this.match(YiniParser.NL);
					}
					}
					this.state = 170;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 171;
				this.match(YiniParser.CC);
				this.state = 175;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 29, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 172;
						this.match(YiniParser.NL);
						}
						}
					}
					this.state = 177;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 29, this._ctx);
				}
				}
				break;
			case 25:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 178;
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
	public objectMemberList(): ObjectMemberListContext {
		let localctx: ObjectMemberListContext = new ObjectMemberListContext(this, this._ctx, this.state);
		this.enterRule(localctx, 16, YiniParser.RULE_objectMemberList);
		let _la: number;
		try {
			let _alt: number;
			this.state = 199;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 28:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 181;
				this.objectMember();
				this.state = 192;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 32, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 182;
						this.match(YiniParser.COMMA);
						this.state = 186;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						while (_la===39) {
							{
							{
							this.state = 183;
							this.match(YiniParser.NL);
							}
							}
							this.state = 188;
							this._errHandler.sync(this);
							_la = this._input.LA(1);
						}
						this.state = 189;
						this.objectMember();
						}
						}
					}
					this.state = 194;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 32, this._ctx);
				}
				this.state = 196;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===11) {
					{
					this.state = 195;
					this.match(YiniParser.COMMA);
					}
				}

				}
				break;
			case 25:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 198;
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
	public objectMember(): ObjectMemberContext {
		let localctx: ObjectMemberContext = new ObjectMemberContext(this, this._ctx, this.state);
		this.enterRule(localctx, 18, YiniParser.RULE_objectMember);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 201;
			this.match(YiniParser.KEY);
			this.state = 203;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===41) {
				{
				this.state = 202;
				this.match(YiniParser.WS);
				}
			}

			this.state = 205;
			this.match(YiniParser.EQ);
			this.state = 209;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===39) {
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
	public list(): ListContext {
		let localctx: ListContext = new ListContext(this, this._ctx, this.state);
		this.enterRule(localctx, 20, YiniParser.RULE_list);
		try {
			this.state = 216;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 37, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 214;
				this.elements();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 215;
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
			this.state = 235;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 13:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 218;
				this.match(YiniParser.OB);
				this.state = 222;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 38, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 219;
						this.match(YiniParser.NL);
						}
						}
					}
					this.state = 224;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 38, this._ctx);
				}
				this.state = 225;
				this.elements();
				this.state = 229;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===39) {
					{
					{
					this.state = 226;
					this.match(YiniParser.NL);
					}
					}
					this.state = 231;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 232;
				this.match(YiniParser.CB);
				}
				break;
			case 26:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 234;
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
		this.enterRule(localctx, 24, YiniParser.RULE_elements);
		let _la: number;
		try {
			this.state = 245;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 42, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 237;
				this.element();
				this.state = 239;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===11) {
					{
					this.state = 238;
					this.match(YiniParser.COMMA);
					}
				}

				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 241;
				this.element();
				this.state = 242;
				this.match(YiniParser.COMMA);
				this.state = 243;
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
			this.state = 273;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 47, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 250;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===39) {
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
				this.value();
				this.state = 257;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 44, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 254;
						this.match(YiniParser.NL);
						}
						}
					}
					this.state = 259;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 44, this._ctx);
				}
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 263;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===39) {
					{
					{
					this.state = 260;
					this.match(YiniParser.NL);
					}
					}
					this.state = 265;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 266;
				this.list_in_brackets();
				this.state = 270;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 46, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 267;
						this.match(YiniParser.NL);
						}
						}
					}
					this.state = 272;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 46, this._ctx);
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
			this.state = 275;
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
			this.state = 277;
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
			this.state = 279;
			this.match(YiniParser.STRING);
			this.state = 283;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 48, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 280;
					this.string_concat();
					}
					}
				}
				this.state = 285;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 48, this._ctx);
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
			this.state = 289;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===39) {
				{
				{
				this.state = 286;
				this.match(YiniParser.NL);
				}
				}
				this.state = 291;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 292;
			this.match(YiniParser.PLUS);
			this.state = 296;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===39) {
				{
				{
				this.state = 293;
				this.match(YiniParser.NL);
				}
				}
				this.state = 298;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 299;
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
			this.state = 301;
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

	public static readonly _serializedATN: number[] = [4,1,45,304,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,
	10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,
	7,17,2,18,7,18,1,0,3,0,40,8,0,1,0,5,0,43,8,0,10,0,12,0,46,9,0,1,0,5,0,49,
	8,0,10,0,12,0,52,9,0,1,0,3,0,55,8,0,1,0,5,0,58,8,0,10,0,12,0,61,9,0,1,0,
	5,0,64,8,0,10,0,12,0,67,9,0,1,0,4,0,70,8,0,11,0,12,0,71,1,0,5,0,75,8,0,
	10,0,12,0,78,9,0,1,0,3,0,81,8,0,1,0,3,0,84,8,0,1,1,3,1,87,8,1,1,1,1,1,1,
	1,3,1,92,8,1,3,1,94,8,1,1,2,1,2,4,2,98,8,2,11,2,12,2,99,1,2,3,2,103,8,2,
	1,2,5,2,106,8,2,10,2,12,2,109,9,2,3,2,111,8,2,1,3,4,3,114,8,3,11,3,12,3,
	115,1,4,1,4,3,4,120,8,4,1,4,1,4,3,4,124,8,4,1,4,3,4,127,8,4,1,4,4,4,130,
	8,4,11,4,12,4,131,1,4,3,4,135,8,4,1,5,1,5,1,5,3,5,140,8,5,1,5,3,5,143,8,
	5,1,5,4,5,146,8,5,11,5,12,5,147,1,6,1,6,1,6,1,6,1,6,1,6,3,6,156,8,6,1,7,
	1,7,5,7,160,8,7,10,7,12,7,163,9,7,1,7,1,7,5,7,167,8,7,10,7,12,7,170,9,7,
	1,7,1,7,5,7,174,8,7,10,7,12,7,177,9,7,1,7,3,7,180,8,7,1,8,1,8,1,8,5,8,185,
	8,8,10,8,12,8,188,9,8,1,8,5,8,191,8,8,10,8,12,8,194,9,8,1,8,3,8,197,8,8,
	1,8,3,8,200,8,8,1,9,1,9,3,9,204,8,9,1,9,1,9,5,9,208,8,9,10,9,12,9,211,9,
	9,1,9,1,9,1,10,1,10,3,10,217,8,10,1,11,1,11,5,11,221,8,11,10,11,12,11,224,
	9,11,1,11,1,11,5,11,228,8,11,10,11,12,11,231,9,11,1,11,1,11,1,11,3,11,236,
	8,11,1,12,1,12,3,12,240,8,12,1,12,1,12,1,12,1,12,3,12,246,8,12,1,13,5,13,
	249,8,13,10,13,12,13,252,9,13,1,13,1,13,5,13,256,8,13,10,13,12,13,259,9,
	13,1,13,5,13,262,8,13,10,13,12,13,265,9,13,1,13,1,13,5,13,269,8,13,10,13,
	12,13,272,9,13,3,13,274,8,13,1,14,1,14,1,15,1,15,1,16,1,16,5,16,282,8,16,
	10,16,12,16,285,9,16,1,17,5,17,288,8,17,10,17,12,17,291,9,17,1,17,1,17,
	5,17,295,8,17,10,17,12,17,298,9,17,1,17,1,17,1,18,1,18,1,18,0,0,19,0,2,
	4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,0,1,1,0,22,23,339,0,39,
	1,0,0,0,2,93,1,0,0,0,4,95,1,0,0,0,6,113,1,0,0,0,8,134,1,0,0,0,10,136,1,
	0,0,0,12,155,1,0,0,0,14,179,1,0,0,0,16,199,1,0,0,0,18,201,1,0,0,0,20,216,
	1,0,0,0,22,235,1,0,0,0,24,245,1,0,0,0,26,273,1,0,0,0,28,275,1,0,0,0,30,
	277,1,0,0,0,32,279,1,0,0,0,34,289,1,0,0,0,36,301,1,0,0,0,38,40,5,27,0,0,
	39,38,1,0,0,0,39,40,1,0,0,0,40,44,1,0,0,0,41,43,5,45,0,0,42,41,1,0,0,0,
	43,46,1,0,0,0,44,42,1,0,0,0,44,45,1,0,0,0,45,50,1,0,0,0,46,44,1,0,0,0,47,
	49,5,39,0,0,48,47,1,0,0,0,49,52,1,0,0,0,50,48,1,0,0,0,50,51,1,0,0,0,51,
	54,1,0,0,0,52,50,1,0,0,0,53,55,5,1,0,0,54,53,1,0,0,0,54,55,1,0,0,0,55,59,
	1,0,0,0,56,58,5,45,0,0,57,56,1,0,0,0,58,61,1,0,0,0,59,57,1,0,0,0,59,60,
	1,0,0,0,60,65,1,0,0,0,61,59,1,0,0,0,62,64,5,39,0,0,63,62,1,0,0,0,64,67,
	1,0,0,0,65,63,1,0,0,0,65,66,1,0,0,0,66,69,1,0,0,0,67,65,1,0,0,0,68,70,3,
	2,1,0,69,68,1,0,0,0,70,71,1,0,0,0,71,69,1,0,0,0,71,72,1,0,0,0,72,76,1,0,
	0,0,73,75,5,39,0,0,74,73,1,0,0,0,75,78,1,0,0,0,76,74,1,0,0,0,76,77,1,0,
	0,0,77,80,1,0,0,0,78,76,1,0,0,0,79,81,3,4,2,0,80,79,1,0,0,0,80,81,1,0,0,
	0,81,83,1,0,0,0,82,84,5,0,0,1,83,82,1,0,0,0,83,84,1,0,0,0,84,1,1,0,0,0,
	85,87,5,2,0,0,86,85,1,0,0,0,86,87,1,0,0,0,87,88,1,0,0,0,88,94,3,6,3,0,89,
	91,5,2,0,0,90,92,3,2,1,0,91,90,1,0,0,0,91,92,1,0,0,0,92,94,1,0,0,0,93,86,
	1,0,0,0,93,89,1,0,0,0,94,3,1,0,0,0,95,110,5,3,0,0,96,98,5,39,0,0,97,96,
	1,0,0,0,98,99,1,0,0,0,99,97,1,0,0,0,99,100,1,0,0,0,100,111,1,0,0,0,101,
	103,5,45,0,0,102,101,1,0,0,0,102,103,1,0,0,0,103,107,1,0,0,0,104,106,5,
	39,0,0,105,104,1,0,0,0,106,109,1,0,0,0,107,105,1,0,0,0,107,108,1,0,0,0,
	108,111,1,0,0,0,109,107,1,0,0,0,110,97,1,0,0,0,110,102,1,0,0,0,111,5,1,
	0,0,0,112,114,3,8,4,0,113,112,1,0,0,0,114,115,1,0,0,0,115,113,1,0,0,0,115,
	116,1,0,0,0,116,7,1,0,0,0,117,119,5,28,0,0,118,120,5,41,0,0,119,118,1,0,
	0,0,119,120,1,0,0,0,120,121,1,0,0,0,121,123,5,9,0,0,122,124,5,41,0,0,123,
	122,1,0,0,0,123,124,1,0,0,0,124,126,1,0,0,0,125,127,3,12,6,0,126,125,1,
	0,0,0,126,127,1,0,0,0,127,129,1,0,0,0,128,130,5,39,0,0,129,128,1,0,0,0,
	130,131,1,0,0,0,131,129,1,0,0,0,131,132,1,0,0,0,132,135,1,0,0,0,133,135,
	3,10,5,0,134,117,1,0,0,0,134,133,1,0,0,0,135,9,1,0,0,0,136,137,5,28,0,0,
	137,139,5,12,0,0,138,140,5,41,0,0,139,138,1,0,0,0,139,140,1,0,0,0,140,142,
	1,0,0,0,141,143,3,24,12,0,142,141,1,0,0,0,142,143,1,0,0,0,143,145,1,0,0,
	0,144,146,5,39,0,0,145,144,1,0,0,0,146,147,1,0,0,0,147,145,1,0,0,0,147,
	148,1,0,0,0,148,11,1,0,0,0,149,156,3,30,15,0,150,156,3,32,16,0,151,156,
	3,28,14,0,152,156,3,36,18,0,153,156,3,22,11,0,154,156,3,14,7,0,155,149,
	1,0,0,0,155,150,1,0,0,0,155,151,1,0,0,0,155,152,1,0,0,0,155,153,1,0,0,0,
	155,154,1,0,0,0,156,13,1,0,0,0,157,161,5,15,0,0,158,160,5,39,0,0,159,158,
	1,0,0,0,160,163,1,0,0,0,161,159,1,0,0,0,161,162,1,0,0,0,162,164,1,0,0,0,
	163,161,1,0,0,0,164,168,3,16,8,0,165,167,5,39,0,0,166,165,1,0,0,0,167,170,
	1,0,0,0,168,166,1,0,0,0,168,169,1,0,0,0,169,171,1,0,0,0,170,168,1,0,0,0,
	171,175,5,16,0,0,172,174,5,39,0,0,173,172,1,0,0,0,174,177,1,0,0,0,175,173,
	1,0,0,0,175,176,1,0,0,0,176,180,1,0,0,0,177,175,1,0,0,0,178,180,5,25,0,
	0,179,157,1,0,0,0,179,178,1,0,0,0,180,15,1,0,0,0,181,192,3,18,9,0,182,186,
	5,11,0,0,183,185,5,39,0,0,184,183,1,0,0,0,185,188,1,0,0,0,186,184,1,0,0,
	0,186,187,1,0,0,0,187,189,1,0,0,0,188,186,1,0,0,0,189,191,3,18,9,0,190,
	182,1,0,0,0,191,194,1,0,0,0,192,190,1,0,0,0,192,193,1,0,0,0,193,196,1,0,
	0,0,194,192,1,0,0,0,195,197,5,11,0,0,196,195,1,0,0,0,196,197,1,0,0,0,197,
	200,1,0,0,0,198,200,5,25,0,0,199,181,1,0,0,0,199,198,1,0,0,0,200,17,1,0,
	0,0,201,203,5,28,0,0,202,204,5,41,0,0,203,202,1,0,0,0,203,204,1,0,0,0,204,
	205,1,0,0,0,205,209,5,9,0,0,206,208,5,39,0,0,207,206,1,0,0,0,208,211,1,
	0,0,0,209,207,1,0,0,0,209,210,1,0,0,0,210,212,1,0,0,0,211,209,1,0,0,0,212,
	213,3,12,6,0,213,19,1,0,0,0,214,217,3,24,12,0,215,217,3,22,11,0,216,214,
	1,0,0,0,216,215,1,0,0,0,217,21,1,0,0,0,218,222,5,13,0,0,219,221,5,39,0,
	0,220,219,1,0,0,0,221,224,1,0,0,0,222,220,1,0,0,0,222,223,1,0,0,0,223,225,
	1,0,0,0,224,222,1,0,0,0,225,229,3,24,12,0,226,228,5,39,0,0,227,226,1,0,
	0,0,228,231,1,0,0,0,229,227,1,0,0,0,229,230,1,0,0,0,230,232,1,0,0,0,231,
	229,1,0,0,0,232,233,5,14,0,0,233,236,1,0,0,0,234,236,5,26,0,0,235,218,1,
	0,0,0,235,234,1,0,0,0,236,23,1,0,0,0,237,239,3,26,13,0,238,240,5,11,0,0,
	239,238,1,0,0,0,239,240,1,0,0,0,240,246,1,0,0,0,241,242,3,26,13,0,242,243,
	5,11,0,0,243,244,3,24,12,0,244,246,1,0,0,0,245,237,1,0,0,0,245,241,1,0,
	0,0,246,25,1,0,0,0,247,249,5,39,0,0,248,247,1,0,0,0,249,252,1,0,0,0,250,
	248,1,0,0,0,250,251,1,0,0,0,251,253,1,0,0,0,252,250,1,0,0,0,253,257,3,12,
	6,0,254,256,5,39,0,0,255,254,1,0,0,0,256,259,1,0,0,0,257,255,1,0,0,0,257,
	258,1,0,0,0,258,274,1,0,0,0,259,257,1,0,0,0,260,262,5,39,0,0,261,260,1,
	0,0,0,262,265,1,0,0,0,263,261,1,0,0,0,263,264,1,0,0,0,264,266,1,0,0,0,265,
	263,1,0,0,0,266,270,3,22,11,0,267,269,5,39,0,0,268,267,1,0,0,0,269,272,
	1,0,0,0,270,268,1,0,0,0,270,271,1,0,0,0,271,274,1,0,0,0,272,270,1,0,0,0,
	273,250,1,0,0,0,273,263,1,0,0,0,274,27,1,0,0,0,275,276,5,31,0,0,276,29,
	1,0,0,0,277,278,5,24,0,0,278,31,1,0,0,0,279,283,5,32,0,0,280,282,3,34,17,
	0,281,280,1,0,0,0,282,285,1,0,0,0,283,281,1,0,0,0,283,284,1,0,0,0,284,33,
	1,0,0,0,285,283,1,0,0,0,286,288,5,39,0,0,287,286,1,0,0,0,288,291,1,0,0,
	0,289,287,1,0,0,0,289,290,1,0,0,0,290,292,1,0,0,0,291,289,1,0,0,0,292,296,
	5,17,0,0,293,295,5,39,0,0,294,293,1,0,0,0,295,298,1,0,0,0,296,294,1,0,0,
	0,296,297,1,0,0,0,297,299,1,0,0,0,298,296,1,0,0,0,299,300,5,32,0,0,300,
	35,1,0,0,0,301,302,7,0,0,0,302,37,1,0,0,0,51,39,44,50,54,59,65,71,76,80,
	83,86,91,93,99,102,107,110,115,119,123,126,131,134,139,142,147,155,161,
	168,175,179,186,192,196,199,203,209,216,222,229,235,239,245,250,257,263,
	270,273,283,289,296];

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
	public YINI_MARKER(): TerminalNode {
		return this.getToken(YiniParser.YINI_MARKER, 0);
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
	public EMPTY_OBJECT(): TerminalNode {
		return this.getToken(YiniParser.EMPTY_OBJECT, 0);
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
	public EQ(): TerminalNode {
		return this.getToken(YiniParser.EQ, 0);
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
