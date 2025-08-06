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
			let _alt: number;
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
			_alt = this._interp.adaptivePredict(this._input, 1, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 47;
					this.match(YiniParser.INLINE_COMMENT);
					}
					}
				}
				this.state = 52;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 1, this._ctx);
			}
			this.state = 56;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 2, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 53;
					this.match(YiniParser.NL);
					}
					}
				}
				this.state = 58;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 2, this._ctx);
			}
			this.state = 60;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===1) {
				{
				this.state = 59;
				this.match(YiniParser.YINI_MARKER);
				}
			}

			this.state = 65;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===45) {
				{
				{
				this.state = 62;
				this.match(YiniParser.INLINE_COMMENT);
				}
				}
				this.state = 67;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 71;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===39) {
				{
				{
				this.state = 68;
				this.match(YiniParser.NL);
				}
				}
				this.state = 73;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 75;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 74;
				this.section();
				}
				}
				this.state = 77;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 935371268) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 33281) !== 0));
			this.state = 82;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===39) {
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
			this.state = 86;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===3) {
				{
				this.state = 85;
				this.terminal_line();
				}
			}

			this.state = 89;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 9, this._ctx) ) {
			case 1:
				{
				this.state = 88;
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
			this.state = 92;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 10, this._ctx) ) {
			case 1:
				{
				this.state = 91;
				this.match(YiniParser.SECTION_HEAD);
				}
				break;
			}
			this.state = 94;
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
			this.state = 96;
			this.match(YiniParser.TERMINAL_TOKEN);
			this.state = 111;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 14, this._ctx) ) {
			case 1:
				{
				this.state = 98;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 97;
					this.match(YiniParser.NL);
					}
					}
					this.state = 100;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while (_la===39);
				}
				break;
			case 2:
				{
				this.state = 103;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===45) {
					{
					this.state = 102;
					this.match(YiniParser.INLINE_COMMENT);
					}
				}

				this.state = 108;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===39) {
					{
					{
					this.state = 105;
					this.match(YiniParser.NL);
					}
					}
					this.state = 110;
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
			this.state = 114;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 113;
					this.member();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 116;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 15, this._ctx);
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
			this.state = 140;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 21, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 118;
				this.match(YiniParser.KEY);
				this.state = 120;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===41) {
					{
					this.state = 119;
					this.match(YiniParser.WS);
					}
				}

				this.state = 122;
				this.match(YiniParser.EQ);
				this.state = 124;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===41) {
					{
					this.state = 123;
					this.match(YiniParser.WS);
					}
				}

				this.state = 127;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 13)) & ~0x1F) === 0 && ((1 << (_la - 13)) & 572933) !== 0)) {
					{
					this.state = 126;
					this.value();
					}
				}

				this.state = 130;
				this._errHandler.sync(this);
				_alt = 1;
				do {
					switch (_alt) {
					case 1:
						{
						{
						this.state = 129;
						this.match(YiniParser.NL);
						}
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					this.state = 132;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 19, this._ctx);
				} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 134;
				this.member_colon_list();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 135;
				this.match(YiniParser.SECTION_HEAD);
				this.state = 137;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 20, this._ctx) ) {
				case 1:
					{
					this.state = 136;
					this.section_members();
					}
					break;
				}
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 139;
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
			this.state = 142;
			this.match(YiniParser.KEY);
			this.state = 143;
			this.match(YiniParser.COLON);
			this.state = 145;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===41) {
				{
				this.state = 144;
				this.match(YiniParser.WS);
				}
			}

			this.state = 148;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 23, this._ctx) ) {
			case 1:
				{
				this.state = 147;
				this.elements();
				}
				break;
			}
			this.state = 151;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 150;
					this.match(YiniParser.NL);
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 153;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 24, this._ctx);
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
			this.state = 161;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 24:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 155;
				this.null_literal();
				}
				break;
			case 32:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 156;
				this.string_literal();
				}
				break;
			case 28:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 157;
				this.number_literal();
				}
				break;
			case 22:
			case 23:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 158;
				this.boolean_literal();
				}
				break;
			case 13:
			case 26:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 159;
				this.list_in_brackets();
				}
				break;
			case 15:
			case 25:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 160;
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
			this.state = 191;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 30, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 163;
				this.match(YiniParser.OC);
				this.state = 167;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===39) {
					{
					{
					this.state = 164;
					this.match(YiniParser.NL);
					}
					}
					this.state = 169;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 170;
				this.objectMemberList();
				this.state = 174;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===39) {
					{
					{
					this.state = 171;
					this.match(YiniParser.NL);
					}
					}
					this.state = 176;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 177;
				this.match(YiniParser.CC);
				this.state = 181;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 28, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 178;
						this.match(YiniParser.NL);
						}
						}
					}
					this.state = 183;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 28, this._ctx);
				}
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 184;
				this.empty_object();
				this.state = 188;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 29, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 185;
						this.match(YiniParser.NL);
						}
						}
					}
					this.state = 190;
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
	public objectMemberList(): ObjectMemberListContext {
		let localctx: ObjectMemberListContext = new ObjectMemberListContext(this, this._ctx, this.state);
		this.enterRule(localctx, 16, YiniParser.RULE_objectMemberList);
		let _la: number;
		try {
			let _alt: number;
			this.state = 217;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 29:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 193;
				this.objectMember();
				this.state = 204;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 32, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 194;
						this.match(YiniParser.COMMA);
						this.state = 198;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						while (_la===39) {
							{
							{
							this.state = 195;
							this.match(YiniParser.NL);
							}
							}
							this.state = 200;
							this._errHandler.sync(this);
							_la = this._input.LA(1);
						}
						this.state = 201;
						this.objectMember();
						}
						}
					}
					this.state = 206;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 32, this._ctx);
				}
				this.state = 208;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===11) {
					{
					this.state = 207;
					this.match(YiniParser.COMMA);
					}
				}

				}
				break;
			case 15:
			case 25:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 210;
				this.empty_object();
				this.state = 214;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 34, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 211;
						this.match(YiniParser.NL);
						}
						}
					}
					this.state = 216;
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
	public objectMember(): ObjectMemberContext {
		let localctx: ObjectMemberContext = new ObjectMemberContext(this, this._ctx, this.state);
		this.enterRule(localctx, 18, YiniParser.RULE_objectMember);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 219;
			this.match(YiniParser.KEY);
			this.state = 221;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===41) {
				{
				this.state = 220;
				this.match(YiniParser.WS);
				}
			}

			this.state = 223;
			this.match(YiniParser.COLON);
			this.state = 227;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===39) {
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
			this.state = 234;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 38, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 232;
				this.elements();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 233;
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
			this.state = 259;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 42, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 236;
				this.match(YiniParser.OB);
				this.state = 240;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 39, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 237;
						this.match(YiniParser.NL);
						}
						}
					}
					this.state = 242;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 39, this._ctx);
				}
				this.state = 243;
				this.elements();
				this.state = 247;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===39) {
					{
					{
					this.state = 244;
					this.match(YiniParser.NL);
					}
					}
					this.state = 249;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 250;
				this.match(YiniParser.CB);
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 252;
				this.empty_list();
				this.state = 256;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 41, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 253;
						this.match(YiniParser.NL);
						}
						}
					}
					this.state = 258;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 41, this._ctx);
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
			this.state = 269;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 44, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 261;
				this.element();
				this.state = 263;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===11) {
					{
					this.state = 262;
					this.match(YiniParser.COMMA);
					}
				}

				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 265;
				this.element();
				this.state = 266;
				this.match(YiniParser.COMMA);
				this.state = 267;
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
			this.state = 297;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 49, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 274;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===39) {
					{
					{
					this.state = 271;
					this.match(YiniParser.NL);
					}
					}
					this.state = 276;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 277;
				this.value();
				this.state = 281;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 46, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 278;
						this.match(YiniParser.NL);
						}
						}
					}
					this.state = 283;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 46, this._ctx);
				}
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 287;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===39) {
					{
					{
					this.state = 284;
					this.match(YiniParser.NL);
					}
					}
					this.state = 289;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 290;
				this.list_in_brackets();
				this.state = 294;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 48, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 291;
						this.match(YiniParser.NL);
						}
						}
					}
					this.state = 296;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 48, this._ctx);
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
			this.state = 299;
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
			this.state = 301;
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
			this.state = 303;
			this.match(YiniParser.STRING);
			this.state = 307;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 50, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 304;
					this.string_concat();
					}
					}
				}
				this.state = 309;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 50, this._ctx);
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
			this.state = 313;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===39) {
				{
				{
				this.state = 310;
				this.match(YiniParser.NL);
				}
				}
				this.state = 315;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 316;
			this.match(YiniParser.PLUS);
			this.state = 320;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===39) {
				{
				{
				this.state = 317;
				this.match(YiniParser.NL);
				}
				}
				this.state = 322;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 323;
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
			this.state = 325;
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
			this.state = 336;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 25:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 327;
				this.match(YiniParser.EMPTY_OBJECT);
				}
				break;
			case 15:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 328;
				this.match(YiniParser.OC);
				this.state = 332;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===39) {
					{
					{
					this.state = 329;
					this.match(YiniParser.NL);
					}
					}
					this.state = 334;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 335;
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
			this.state = 347;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 26:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 338;
				this.match(YiniParser.EMPTY_LIST);
				}
				break;
			case 13:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 339;
				this.match(YiniParser.OB);
				this.state = 343;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===39) {
					{
					{
					this.state = 340;
					this.match(YiniParser.NL);
					}
					}
					this.state = 345;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 346;
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
			this.state = 350;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 57, this._ctx) ) {
			case 1:
				{
				this.state = 349;
				this.match(YiniParser.WS);
				}
				break;
			}
			this.state = 354;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 47:
				{
				this.state = 352;
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
				this.state = 353;
				this.value();
				}
				break;
			case 9:
			case 41:
				break;
			default:
				break;
			}
			this.state = 357;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===41) {
				{
				this.state = 356;
				this.match(YiniParser.WS);
				}
			}

			this.state = 359;
			this.match(YiniParser.EQ);
			this.state = 362;
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
				this.state = 360;
				this.value();
				}
				break;
			case 47:
				{
				this.state = 361;
				this.match(YiniParser.REST);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 365;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 61, this._ctx) ) {
			case 1:
				{
				this.state = 364;
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

	public static readonly _serializedATN: number[] = [4,1,47,368,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,
	10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,
	7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,1,0,3,0,46,8,0,1,0,5,0,49,
	8,0,10,0,12,0,52,9,0,1,0,5,0,55,8,0,10,0,12,0,58,9,0,1,0,3,0,61,8,0,1,0,
	5,0,64,8,0,10,0,12,0,67,9,0,1,0,5,0,70,8,0,10,0,12,0,73,9,0,1,0,4,0,76,
	8,0,11,0,12,0,77,1,0,5,0,81,8,0,10,0,12,0,84,9,0,1,0,3,0,87,8,0,1,0,3,0,
	90,8,0,1,1,3,1,93,8,1,1,1,1,1,1,2,1,2,4,2,99,8,2,11,2,12,2,100,1,2,3,2,
	104,8,2,1,2,5,2,107,8,2,10,2,12,2,110,9,2,3,2,112,8,2,1,3,4,3,115,8,3,11,
	3,12,3,116,1,4,1,4,3,4,121,8,4,1,4,1,4,3,4,125,8,4,1,4,3,4,128,8,4,1,4,
	4,4,131,8,4,11,4,12,4,132,1,4,1,4,1,4,3,4,138,8,4,1,4,3,4,141,8,4,1,5,1,
	5,1,5,3,5,146,8,5,1,5,3,5,149,8,5,1,5,4,5,152,8,5,11,5,12,5,153,1,6,1,6,
	1,6,1,6,1,6,1,6,3,6,162,8,6,1,7,1,7,5,7,166,8,7,10,7,12,7,169,9,7,1,7,1,
	7,5,7,173,8,7,10,7,12,7,176,9,7,1,7,1,7,5,7,180,8,7,10,7,12,7,183,9,7,1,
	7,1,7,5,7,187,8,7,10,7,12,7,190,9,7,3,7,192,8,7,1,8,1,8,1,8,5,8,197,8,8,
	10,8,12,8,200,9,8,1,8,5,8,203,8,8,10,8,12,8,206,9,8,1,8,3,8,209,8,8,1,8,
	1,8,5,8,213,8,8,10,8,12,8,216,9,8,3,8,218,8,8,1,9,1,9,3,9,222,8,9,1,9,1,
	9,5,9,226,8,9,10,9,12,9,229,9,9,1,9,1,9,1,10,1,10,3,10,235,8,10,1,11,1,
	11,5,11,239,8,11,10,11,12,11,242,9,11,1,11,1,11,5,11,246,8,11,10,11,12,
	11,249,9,11,1,11,1,11,1,11,1,11,5,11,255,8,11,10,11,12,11,258,9,11,3,11,
	260,8,11,1,12,1,12,3,12,264,8,12,1,12,1,12,1,12,1,12,3,12,270,8,12,1,13,
	5,13,273,8,13,10,13,12,13,276,9,13,1,13,1,13,5,13,280,8,13,10,13,12,13,
	283,9,13,1,13,5,13,286,8,13,10,13,12,13,289,9,13,1,13,1,13,5,13,293,8,13,
	10,13,12,13,296,9,13,3,13,298,8,13,1,14,1,14,1,15,1,15,1,16,1,16,5,16,306,
	8,16,10,16,12,16,309,9,16,1,17,5,17,312,8,17,10,17,12,17,315,9,17,1,17,
	1,17,5,17,319,8,17,10,17,12,17,322,9,17,1,17,1,17,1,18,1,18,1,19,1,19,1,
	19,5,19,331,8,19,10,19,12,19,334,9,19,1,19,3,19,337,8,19,1,20,1,20,1,20,
	5,20,342,8,20,10,20,12,20,345,9,20,1,20,3,20,348,8,20,1,21,3,21,351,8,21,
	1,21,1,21,3,21,355,8,21,1,21,3,21,358,8,21,1,21,1,21,1,21,3,21,363,8,21,
	1,21,3,21,366,8,21,1,21,0,0,22,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,
	30,32,34,36,38,40,42,0,1,1,0,22,23,414,0,45,1,0,0,0,2,92,1,0,0,0,4,96,1,
	0,0,0,6,114,1,0,0,0,8,140,1,0,0,0,10,142,1,0,0,0,12,161,1,0,0,0,14,191,
	1,0,0,0,16,217,1,0,0,0,18,219,1,0,0,0,20,234,1,0,0,0,22,259,1,0,0,0,24,
	269,1,0,0,0,26,297,1,0,0,0,28,299,1,0,0,0,30,301,1,0,0,0,32,303,1,0,0,0,
	34,313,1,0,0,0,36,325,1,0,0,0,38,336,1,0,0,0,40,347,1,0,0,0,42,350,1,0,
	0,0,44,46,5,27,0,0,45,44,1,0,0,0,45,46,1,0,0,0,46,50,1,0,0,0,47,49,5,45,
	0,0,48,47,1,0,0,0,49,52,1,0,0,0,50,48,1,0,0,0,50,51,1,0,0,0,51,56,1,0,0,
	0,52,50,1,0,0,0,53,55,5,39,0,0,54,53,1,0,0,0,55,58,1,0,0,0,56,54,1,0,0,
	0,56,57,1,0,0,0,57,60,1,0,0,0,58,56,1,0,0,0,59,61,5,1,0,0,60,59,1,0,0,0,
	60,61,1,0,0,0,61,65,1,0,0,0,62,64,5,45,0,0,63,62,1,0,0,0,64,67,1,0,0,0,
	65,63,1,0,0,0,65,66,1,0,0,0,66,71,1,0,0,0,67,65,1,0,0,0,68,70,5,39,0,0,
	69,68,1,0,0,0,70,73,1,0,0,0,71,69,1,0,0,0,71,72,1,0,0,0,72,75,1,0,0,0,73,
	71,1,0,0,0,74,76,3,2,1,0,75,74,1,0,0,0,76,77,1,0,0,0,77,75,1,0,0,0,77,78,
	1,0,0,0,78,82,1,0,0,0,79,81,5,39,0,0,80,79,1,0,0,0,81,84,1,0,0,0,82,80,
	1,0,0,0,82,83,1,0,0,0,83,86,1,0,0,0,84,82,1,0,0,0,85,87,3,4,2,0,86,85,1,
	0,0,0,86,87,1,0,0,0,87,89,1,0,0,0,88,90,5,0,0,1,89,88,1,0,0,0,89,90,1,0,
	0,0,90,1,1,0,0,0,91,93,5,2,0,0,92,91,1,0,0,0,92,93,1,0,0,0,93,94,1,0,0,
	0,94,95,3,6,3,0,95,3,1,0,0,0,96,111,5,3,0,0,97,99,5,39,0,0,98,97,1,0,0,
	0,99,100,1,0,0,0,100,98,1,0,0,0,100,101,1,0,0,0,101,112,1,0,0,0,102,104,
	5,45,0,0,103,102,1,0,0,0,103,104,1,0,0,0,104,108,1,0,0,0,105,107,5,39,0,
	0,106,105,1,0,0,0,107,110,1,0,0,0,108,106,1,0,0,0,108,109,1,0,0,0,109,112,
	1,0,0,0,110,108,1,0,0,0,111,98,1,0,0,0,111,103,1,0,0,0,112,5,1,0,0,0,113,
	115,3,8,4,0,114,113,1,0,0,0,115,116,1,0,0,0,116,114,1,0,0,0,116,117,1,0,
	0,0,117,7,1,0,0,0,118,120,5,29,0,0,119,121,5,41,0,0,120,119,1,0,0,0,120,
	121,1,0,0,0,121,122,1,0,0,0,122,124,5,9,0,0,123,125,5,41,0,0,124,123,1,
	0,0,0,124,125,1,0,0,0,125,127,1,0,0,0,126,128,3,12,6,0,127,126,1,0,0,0,
	127,128,1,0,0,0,128,130,1,0,0,0,129,131,5,39,0,0,130,129,1,0,0,0,131,132,
	1,0,0,0,132,130,1,0,0,0,132,133,1,0,0,0,133,141,1,0,0,0,134,141,3,10,5,
	0,135,137,5,2,0,0,136,138,3,6,3,0,137,136,1,0,0,0,137,138,1,0,0,0,138,141,
	1,0,0,0,139,141,3,42,21,0,140,118,1,0,0,0,140,134,1,0,0,0,140,135,1,0,0,
	0,140,139,1,0,0,0,141,9,1,0,0,0,142,143,5,29,0,0,143,145,5,12,0,0,144,146,
	5,41,0,0,145,144,1,0,0,0,145,146,1,0,0,0,146,148,1,0,0,0,147,149,3,24,12,
	0,148,147,1,0,0,0,148,149,1,0,0,0,149,151,1,0,0,0,150,152,5,39,0,0,151,
	150,1,0,0,0,152,153,1,0,0,0,153,151,1,0,0,0,153,154,1,0,0,0,154,11,1,0,
	0,0,155,162,3,30,15,0,156,162,3,32,16,0,157,162,3,28,14,0,158,162,3,36,
	18,0,159,162,3,22,11,0,160,162,3,14,7,0,161,155,1,0,0,0,161,156,1,0,0,0,
	161,157,1,0,0,0,161,158,1,0,0,0,161,159,1,0,0,0,161,160,1,0,0,0,162,13,
	1,0,0,0,163,167,5,15,0,0,164,166,5,39,0,0,165,164,1,0,0,0,166,169,1,0,0,
	0,167,165,1,0,0,0,167,168,1,0,0,0,168,170,1,0,0,0,169,167,1,0,0,0,170,174,
	3,16,8,0,171,173,5,39,0,0,172,171,1,0,0,0,173,176,1,0,0,0,174,172,1,0,0,
	0,174,175,1,0,0,0,175,177,1,0,0,0,176,174,1,0,0,0,177,181,5,16,0,0,178,
	180,5,39,0,0,179,178,1,0,0,0,180,183,1,0,0,0,181,179,1,0,0,0,181,182,1,
	0,0,0,182,192,1,0,0,0,183,181,1,0,0,0,184,188,3,38,19,0,185,187,5,39,0,
	0,186,185,1,0,0,0,187,190,1,0,0,0,188,186,1,0,0,0,188,189,1,0,0,0,189,192,
	1,0,0,0,190,188,1,0,0,0,191,163,1,0,0,0,191,184,1,0,0,0,192,15,1,0,0,0,
	193,204,3,18,9,0,194,198,5,11,0,0,195,197,5,39,0,0,196,195,1,0,0,0,197,
	200,1,0,0,0,198,196,1,0,0,0,198,199,1,0,0,0,199,201,1,0,0,0,200,198,1,0,
	0,0,201,203,3,18,9,0,202,194,1,0,0,0,203,206,1,0,0,0,204,202,1,0,0,0,204,
	205,1,0,0,0,205,208,1,0,0,0,206,204,1,0,0,0,207,209,5,11,0,0,208,207,1,
	0,0,0,208,209,1,0,0,0,209,218,1,0,0,0,210,214,3,38,19,0,211,213,5,39,0,
	0,212,211,1,0,0,0,213,216,1,0,0,0,214,212,1,0,0,0,214,215,1,0,0,0,215,218,
	1,0,0,0,216,214,1,0,0,0,217,193,1,0,0,0,217,210,1,0,0,0,218,17,1,0,0,0,
	219,221,5,29,0,0,220,222,5,41,0,0,221,220,1,0,0,0,221,222,1,0,0,0,222,223,
	1,0,0,0,223,227,5,12,0,0,224,226,5,39,0,0,225,224,1,0,0,0,226,229,1,0,0,
	0,227,225,1,0,0,0,227,228,1,0,0,0,228,230,1,0,0,0,229,227,1,0,0,0,230,231,
	3,12,6,0,231,19,1,0,0,0,232,235,3,24,12,0,233,235,3,22,11,0,234,232,1,0,
	0,0,234,233,1,0,0,0,235,21,1,0,0,0,236,240,5,13,0,0,237,239,5,39,0,0,238,
	237,1,0,0,0,239,242,1,0,0,0,240,238,1,0,0,0,240,241,1,0,0,0,241,243,1,0,
	0,0,242,240,1,0,0,0,243,247,3,24,12,0,244,246,5,39,0,0,245,244,1,0,0,0,
	246,249,1,0,0,0,247,245,1,0,0,0,247,248,1,0,0,0,248,250,1,0,0,0,249,247,
	1,0,0,0,250,251,5,14,0,0,251,260,1,0,0,0,252,256,3,40,20,0,253,255,5,39,
	0,0,254,253,1,0,0,0,255,258,1,0,0,0,256,254,1,0,0,0,256,257,1,0,0,0,257,
	260,1,0,0,0,258,256,1,0,0,0,259,236,1,0,0,0,259,252,1,0,0,0,260,23,1,0,
	0,0,261,263,3,26,13,0,262,264,5,11,0,0,263,262,1,0,0,0,263,264,1,0,0,0,
	264,270,1,0,0,0,265,266,3,26,13,0,266,267,5,11,0,0,267,268,3,24,12,0,268,
	270,1,0,0,0,269,261,1,0,0,0,269,265,1,0,0,0,270,25,1,0,0,0,271,273,5,39,
	0,0,272,271,1,0,0,0,273,276,1,0,0,0,274,272,1,0,0,0,274,275,1,0,0,0,275,
	277,1,0,0,0,276,274,1,0,0,0,277,281,3,12,6,0,278,280,5,39,0,0,279,278,1,
	0,0,0,280,283,1,0,0,0,281,279,1,0,0,0,281,282,1,0,0,0,282,298,1,0,0,0,283,
	281,1,0,0,0,284,286,5,39,0,0,285,284,1,0,0,0,286,289,1,0,0,0,287,285,1,
	0,0,0,287,288,1,0,0,0,288,290,1,0,0,0,289,287,1,0,0,0,290,294,3,22,11,0,
	291,293,5,39,0,0,292,291,1,0,0,0,293,296,1,0,0,0,294,292,1,0,0,0,294,295,
	1,0,0,0,295,298,1,0,0,0,296,294,1,0,0,0,297,274,1,0,0,0,297,287,1,0,0,0,
	298,27,1,0,0,0,299,300,5,28,0,0,300,29,1,0,0,0,301,302,5,24,0,0,302,31,
	1,0,0,0,303,307,5,32,0,0,304,306,3,34,17,0,305,304,1,0,0,0,306,309,1,0,
	0,0,307,305,1,0,0,0,307,308,1,0,0,0,308,33,1,0,0,0,309,307,1,0,0,0,310,
	312,5,39,0,0,311,310,1,0,0,0,312,315,1,0,0,0,313,311,1,0,0,0,313,314,1,
	0,0,0,314,316,1,0,0,0,315,313,1,0,0,0,316,320,5,17,0,0,317,319,5,39,0,0,
	318,317,1,0,0,0,319,322,1,0,0,0,320,318,1,0,0,0,320,321,1,0,0,0,321,323,
	1,0,0,0,322,320,1,0,0,0,323,324,5,32,0,0,324,35,1,0,0,0,325,326,7,0,0,0,
	326,37,1,0,0,0,327,337,5,25,0,0,328,332,5,15,0,0,329,331,5,39,0,0,330,329,
	1,0,0,0,331,334,1,0,0,0,332,330,1,0,0,0,332,333,1,0,0,0,333,335,1,0,0,0,
	334,332,1,0,0,0,335,337,5,16,0,0,336,327,1,0,0,0,336,328,1,0,0,0,337,39,
	1,0,0,0,338,348,5,26,0,0,339,343,5,13,0,0,340,342,5,39,0,0,341,340,1,0,
	0,0,342,345,1,0,0,0,343,341,1,0,0,0,343,344,1,0,0,0,344,346,1,0,0,0,345,
	343,1,0,0,0,346,348,5,14,0,0,347,338,1,0,0,0,347,339,1,0,0,0,348,41,1,0,
	0,0,349,351,5,41,0,0,350,349,1,0,0,0,350,351,1,0,0,0,351,354,1,0,0,0,352,
	355,5,47,0,0,353,355,3,12,6,0,354,352,1,0,0,0,354,353,1,0,0,0,354,355,1,
	0,0,0,355,357,1,0,0,0,356,358,5,41,0,0,357,356,1,0,0,0,357,358,1,0,0,0,
	358,359,1,0,0,0,359,362,5,9,0,0,360,363,3,12,6,0,361,363,5,47,0,0,362,360,
	1,0,0,0,362,361,1,0,0,0,363,365,1,0,0,0,364,366,5,39,0,0,365,364,1,0,0,
	0,365,366,1,0,0,0,366,43,1,0,0,0,62,45,50,56,60,65,71,77,82,86,89,92,100,
	103,108,111,116,120,124,127,132,137,140,145,148,153,161,167,174,181,188,
	191,198,204,208,214,217,221,227,234,240,247,256,259,263,269,274,281,287,
	294,297,307,313,320,332,336,343,347,350,354,357,362,365];

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
