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
                                                             "IDENT_INVALID" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"yini", "section", "terminal_line", "section_members", "member", "member_colon_list", 
		"value", "object_literal", "objectMemberList", "objectMember", "list", 
		"list_in_brackets", "elements", "element", "number_literal", "null_literal", 
		"string_literal", "string_concat", "boolean_literal", "empty_object", 
		"empty_list",
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
			this.state = 43;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===27) {
				{
				this.state = 42;
				this.match(YiniParser.SHEBANG);
				}
			}

			this.state = 48;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 1, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 45;
					this.match(YiniParser.INLINE_COMMENT);
					}
					}
				}
				this.state = 50;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 1, this._ctx);
			}
			this.state = 54;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 2, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 51;
					this.match(YiniParser.NL);
					}
					}
				}
				this.state = 56;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 2, this._ctx);
			}
			this.state = 58;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===1) {
				{
				this.state = 57;
				this.match(YiniParser.YINI_MARKER);
				}
			}

			this.state = 63;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===45) {
				{
				{
				this.state = 60;
				this.match(YiniParser.INLINE_COMMENT);
				}
				}
				this.state = 65;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 69;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===39) {
				{
				{
				this.state = 66;
				this.match(YiniParser.NL);
				}
				}
				this.state = 71;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 73;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 72;
				this.section();
				}
				}
				this.state = 75;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la===2 || _la===29);
			this.state = 80;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===39) {
				{
				{
				this.state = 77;
				this.match(YiniParser.NL);
				}
				}
				this.state = 82;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 84;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===3) {
				{
				this.state = 83;
				this.terminal_line();
				}
			}

			this.state = 87;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 9, this._ctx) ) {
			case 1:
				{
				this.state = 86;
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
			this.state = 90;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 10, this._ctx) ) {
			case 1:
				{
				this.state = 89;
				this.match(YiniParser.SECTION_HEAD);
				}
				break;
			}
			this.state = 92;
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
			this.state = 94;
			this.match(YiniParser.TERMINAL_TOKEN);
			this.state = 109;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 14, this._ctx) ) {
			case 1:
				{
				this.state = 96;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 95;
					this.match(YiniParser.NL);
					}
					}
					this.state = 98;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while (_la===39);
				}
				break;
			case 2:
				{
				this.state = 101;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===45) {
					{
					this.state = 100;
					this.match(YiniParser.INLINE_COMMENT);
					}
				}

				this.state = 106;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===39) {
					{
					{
					this.state = 103;
					this.match(YiniParser.NL);
					}
					}
					this.state = 108;
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
			this.state = 112;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 111;
					this.member();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 114;
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
			this.state = 137;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 21, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 116;
				this.match(YiniParser.KEY);
				this.state = 118;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===41) {
					{
					this.state = 117;
					this.match(YiniParser.WS);
					}
				}

				this.state = 120;
				this.match(YiniParser.EQ);
				this.state = 122;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===41) {
					{
					this.state = 121;
					this.match(YiniParser.WS);
					}
				}

				this.state = 125;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 13)) & ~0x1F) === 0 && ((1 << (_la - 13)) & 572933) !== 0)) {
					{
					this.state = 124;
					this.value();
					}
				}

				this.state = 128;
				this._errHandler.sync(this);
				_alt = 1;
				do {
					switch (_alt) {
					case 1:
						{
						{
						this.state = 127;
						this.match(YiniParser.NL);
						}
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					this.state = 130;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 19, this._ctx);
				} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 132;
				this.member_colon_list();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 133;
				this.match(YiniParser.SECTION_HEAD);
				this.state = 135;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 20, this._ctx) ) {
				case 1:
					{
					this.state = 134;
					this.section_members();
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
	public member_colon_list(): Member_colon_listContext {
		let localctx: Member_colon_listContext = new Member_colon_listContext(this, this._ctx, this.state);
		this.enterRule(localctx, 10, YiniParser.RULE_member_colon_list);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 139;
			this.match(YiniParser.KEY);
			this.state = 140;
			this.match(YiniParser.COLON);
			this.state = 142;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===41) {
				{
				this.state = 141;
				this.match(YiniParser.WS);
				}
			}

			this.state = 145;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 23, this._ctx) ) {
			case 1:
				{
				this.state = 144;
				this.elements();
				}
				break;
			}
			this.state = 148;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 147;
					this.match(YiniParser.NL);
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 150;
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
			this.state = 158;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 24:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 152;
				this.null_literal();
				}
				break;
			case 32:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 153;
				this.string_literal();
				}
				break;
			case 28:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 154;
				this.number_literal();
				}
				break;
			case 22:
			case 23:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 155;
				this.boolean_literal();
				}
				break;
			case 13:
			case 26:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 156;
				this.list_in_brackets();
				}
				break;
			case 15:
			case 25:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 157;
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
			this.state = 188;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 30, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 160;
				this.match(YiniParser.OC);
				this.state = 164;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===39) {
					{
					{
					this.state = 161;
					this.match(YiniParser.NL);
					}
					}
					this.state = 166;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 167;
				this.objectMemberList();
				this.state = 171;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===39) {
					{
					{
					this.state = 168;
					this.match(YiniParser.NL);
					}
					}
					this.state = 173;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 174;
				this.match(YiniParser.CC);
				this.state = 178;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 28, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 175;
						this.match(YiniParser.NL);
						}
						}
					}
					this.state = 180;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 28, this._ctx);
				}
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 181;
				this.empty_object();
				this.state = 185;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 29, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 182;
						this.match(YiniParser.NL);
						}
						}
					}
					this.state = 187;
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
			this.state = 214;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 29:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 190;
				this.objectMember();
				this.state = 201;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 32, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 191;
						this.match(YiniParser.COMMA);
						this.state = 195;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						while (_la===39) {
							{
							{
							this.state = 192;
							this.match(YiniParser.NL);
							}
							}
							this.state = 197;
							this._errHandler.sync(this);
							_la = this._input.LA(1);
						}
						this.state = 198;
						this.objectMember();
						}
						}
					}
					this.state = 203;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 32, this._ctx);
				}
				this.state = 205;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===11) {
					{
					this.state = 204;
					this.match(YiniParser.COMMA);
					}
				}

				}
				break;
			case 15:
			case 25:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 207;
				this.empty_object();
				this.state = 211;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 34, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 208;
						this.match(YiniParser.NL);
						}
						}
					}
					this.state = 213;
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
			this.state = 216;
			this.match(YiniParser.KEY);
			this.state = 218;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===41) {
				{
				this.state = 217;
				this.match(YiniParser.WS);
				}
			}

			this.state = 220;
			this.match(YiniParser.EQ);
			this.state = 224;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===39) {
				{
				{
				this.state = 221;
				this.match(YiniParser.NL);
				}
				}
				this.state = 226;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 227;
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
			this.state = 231;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 38, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 229;
				this.elements();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 230;
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
			this.state = 256;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 42, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 233;
				this.match(YiniParser.OB);
				this.state = 237;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 39, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 234;
						this.match(YiniParser.NL);
						}
						}
					}
					this.state = 239;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 39, this._ctx);
				}
				this.state = 240;
				this.elements();
				this.state = 244;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===39) {
					{
					{
					this.state = 241;
					this.match(YiniParser.NL);
					}
					}
					this.state = 246;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 247;
				this.match(YiniParser.CB);
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 249;
				this.empty_list();
				this.state = 253;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 41, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 250;
						this.match(YiniParser.NL);
						}
						}
					}
					this.state = 255;
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
			this.state = 266;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 44, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 258;
				this.element();
				this.state = 260;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===11) {
					{
					this.state = 259;
					this.match(YiniParser.COMMA);
					}
				}

				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 262;
				this.element();
				this.state = 263;
				this.match(YiniParser.COMMA);
				this.state = 264;
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
			this.state = 294;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 49, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 271;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===39) {
					{
					{
					this.state = 268;
					this.match(YiniParser.NL);
					}
					}
					this.state = 273;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 274;
				this.value();
				this.state = 278;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 46, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 275;
						this.match(YiniParser.NL);
						}
						}
					}
					this.state = 280;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 46, this._ctx);
				}
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 284;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===39) {
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
				this.list_in_brackets();
				this.state = 291;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 48, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 288;
						this.match(YiniParser.NL);
						}
						}
					}
					this.state = 293;
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
			this.state = 296;
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
			this.state = 298;
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
			this.state = 300;
			this.match(YiniParser.STRING);
			this.state = 304;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 50, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 301;
					this.string_concat();
					}
					}
				}
				this.state = 306;
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
			this.state = 310;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===39) {
				{
				{
				this.state = 307;
				this.match(YiniParser.NL);
				}
				}
				this.state = 312;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 313;
			this.match(YiniParser.PLUS);
			this.state = 317;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===39) {
				{
				{
				this.state = 314;
				this.match(YiniParser.NL);
				}
				}
				this.state = 319;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 320;
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
			this.state = 322;
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
			this.state = 333;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 25:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 324;
				this.match(YiniParser.EMPTY_OBJECT);
				}
				break;
			case 15:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 325;
				this.match(YiniParser.OC);
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
			this.state = 344;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 26:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 335;
				this.match(YiniParser.EMPTY_LIST);
				}
				break;
			case 13:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 336;
				this.match(YiniParser.OB);
				this.state = 340;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===39) {
					{
					{
					this.state = 337;
					this.match(YiniParser.NL);
					}
					}
					this.state = 342;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 343;
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

	public static readonly _serializedATN: number[] = [4,1,46,347,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,
	10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,
	7,17,2,18,7,18,2,19,7,19,2,20,7,20,1,0,3,0,44,8,0,1,0,5,0,47,8,0,10,0,12,
	0,50,9,0,1,0,5,0,53,8,0,10,0,12,0,56,9,0,1,0,3,0,59,8,0,1,0,5,0,62,8,0,
	10,0,12,0,65,9,0,1,0,5,0,68,8,0,10,0,12,0,71,9,0,1,0,4,0,74,8,0,11,0,12,
	0,75,1,0,5,0,79,8,0,10,0,12,0,82,9,0,1,0,3,0,85,8,0,1,0,3,0,88,8,0,1,1,
	3,1,91,8,1,1,1,1,1,1,2,1,2,4,2,97,8,2,11,2,12,2,98,1,2,3,2,102,8,2,1,2,
	5,2,105,8,2,10,2,12,2,108,9,2,3,2,110,8,2,1,3,4,3,113,8,3,11,3,12,3,114,
	1,4,1,4,3,4,119,8,4,1,4,1,4,3,4,123,8,4,1,4,3,4,126,8,4,1,4,4,4,129,8,4,
	11,4,12,4,130,1,4,1,4,1,4,3,4,136,8,4,3,4,138,8,4,1,5,1,5,1,5,3,5,143,8,
	5,1,5,3,5,146,8,5,1,5,4,5,149,8,5,11,5,12,5,150,1,6,1,6,1,6,1,6,1,6,1,6,
	3,6,159,8,6,1,7,1,7,5,7,163,8,7,10,7,12,7,166,9,7,1,7,1,7,5,7,170,8,7,10,
	7,12,7,173,9,7,1,7,1,7,5,7,177,8,7,10,7,12,7,180,9,7,1,7,1,7,5,7,184,8,
	7,10,7,12,7,187,9,7,3,7,189,8,7,1,8,1,8,1,8,5,8,194,8,8,10,8,12,8,197,9,
	8,1,8,5,8,200,8,8,10,8,12,8,203,9,8,1,8,3,8,206,8,8,1,8,1,8,5,8,210,8,8,
	10,8,12,8,213,9,8,3,8,215,8,8,1,9,1,9,3,9,219,8,9,1,9,1,9,5,9,223,8,9,10,
	9,12,9,226,9,9,1,9,1,9,1,10,1,10,3,10,232,8,10,1,11,1,11,5,11,236,8,11,
	10,11,12,11,239,9,11,1,11,1,11,5,11,243,8,11,10,11,12,11,246,9,11,1,11,
	1,11,1,11,1,11,5,11,252,8,11,10,11,12,11,255,9,11,3,11,257,8,11,1,12,1,
	12,3,12,261,8,12,1,12,1,12,1,12,1,12,3,12,267,8,12,1,13,5,13,270,8,13,10,
	13,12,13,273,9,13,1,13,1,13,5,13,277,8,13,10,13,12,13,280,9,13,1,13,5,13,
	283,8,13,10,13,12,13,286,9,13,1,13,1,13,5,13,290,8,13,10,13,12,13,293,9,
	13,3,13,295,8,13,1,14,1,14,1,15,1,15,1,16,1,16,5,16,303,8,16,10,16,12,16,
	306,9,16,1,17,5,17,309,8,17,10,17,12,17,312,9,17,1,17,1,17,5,17,316,8,17,
	10,17,12,17,319,9,17,1,17,1,17,1,18,1,18,1,19,1,19,1,19,5,19,328,8,19,10,
	19,12,19,331,9,19,1,19,3,19,334,8,19,1,20,1,20,1,20,5,20,339,8,20,10,20,
	12,20,342,9,20,1,20,3,20,345,8,20,1,20,0,0,21,0,2,4,6,8,10,12,14,16,18,
	20,22,24,26,28,30,32,34,36,38,40,0,1,1,0,22,23,387,0,43,1,0,0,0,2,90,1,
	0,0,0,4,94,1,0,0,0,6,112,1,0,0,0,8,137,1,0,0,0,10,139,1,0,0,0,12,158,1,
	0,0,0,14,188,1,0,0,0,16,214,1,0,0,0,18,216,1,0,0,0,20,231,1,0,0,0,22,256,
	1,0,0,0,24,266,1,0,0,0,26,294,1,0,0,0,28,296,1,0,0,0,30,298,1,0,0,0,32,
	300,1,0,0,0,34,310,1,0,0,0,36,322,1,0,0,0,38,333,1,0,0,0,40,344,1,0,0,0,
	42,44,5,27,0,0,43,42,1,0,0,0,43,44,1,0,0,0,44,48,1,0,0,0,45,47,5,45,0,0,
	46,45,1,0,0,0,47,50,1,0,0,0,48,46,1,0,0,0,48,49,1,0,0,0,49,54,1,0,0,0,50,
	48,1,0,0,0,51,53,5,39,0,0,52,51,1,0,0,0,53,56,1,0,0,0,54,52,1,0,0,0,54,
	55,1,0,0,0,55,58,1,0,0,0,56,54,1,0,0,0,57,59,5,1,0,0,58,57,1,0,0,0,58,59,
	1,0,0,0,59,63,1,0,0,0,60,62,5,45,0,0,61,60,1,0,0,0,62,65,1,0,0,0,63,61,
	1,0,0,0,63,64,1,0,0,0,64,69,1,0,0,0,65,63,1,0,0,0,66,68,5,39,0,0,67,66,
	1,0,0,0,68,71,1,0,0,0,69,67,1,0,0,0,69,70,1,0,0,0,70,73,1,0,0,0,71,69,1,
	0,0,0,72,74,3,2,1,0,73,72,1,0,0,0,74,75,1,0,0,0,75,73,1,0,0,0,75,76,1,0,
	0,0,76,80,1,0,0,0,77,79,5,39,0,0,78,77,1,0,0,0,79,82,1,0,0,0,80,78,1,0,
	0,0,80,81,1,0,0,0,81,84,1,0,0,0,82,80,1,0,0,0,83,85,3,4,2,0,84,83,1,0,0,
	0,84,85,1,0,0,0,85,87,1,0,0,0,86,88,5,0,0,1,87,86,1,0,0,0,87,88,1,0,0,0,
	88,1,1,0,0,0,89,91,5,2,0,0,90,89,1,0,0,0,90,91,1,0,0,0,91,92,1,0,0,0,92,
	93,3,6,3,0,93,3,1,0,0,0,94,109,5,3,0,0,95,97,5,39,0,0,96,95,1,0,0,0,97,
	98,1,0,0,0,98,96,1,0,0,0,98,99,1,0,0,0,99,110,1,0,0,0,100,102,5,45,0,0,
	101,100,1,0,0,0,101,102,1,0,0,0,102,106,1,0,0,0,103,105,5,39,0,0,104,103,
	1,0,0,0,105,108,1,0,0,0,106,104,1,0,0,0,106,107,1,0,0,0,107,110,1,0,0,0,
	108,106,1,0,0,0,109,96,1,0,0,0,109,101,1,0,0,0,110,5,1,0,0,0,111,113,3,
	8,4,0,112,111,1,0,0,0,113,114,1,0,0,0,114,112,1,0,0,0,114,115,1,0,0,0,115,
	7,1,0,0,0,116,118,5,29,0,0,117,119,5,41,0,0,118,117,1,0,0,0,118,119,1,0,
	0,0,119,120,1,0,0,0,120,122,5,9,0,0,121,123,5,41,0,0,122,121,1,0,0,0,122,
	123,1,0,0,0,123,125,1,0,0,0,124,126,3,12,6,0,125,124,1,0,0,0,125,126,1,
	0,0,0,126,128,1,0,0,0,127,129,5,39,0,0,128,127,1,0,0,0,129,130,1,0,0,0,
	130,128,1,0,0,0,130,131,1,0,0,0,131,138,1,0,0,0,132,138,3,10,5,0,133,135,
	5,2,0,0,134,136,3,6,3,0,135,134,1,0,0,0,135,136,1,0,0,0,136,138,1,0,0,0,
	137,116,1,0,0,0,137,132,1,0,0,0,137,133,1,0,0,0,138,9,1,0,0,0,139,140,5,
	29,0,0,140,142,5,12,0,0,141,143,5,41,0,0,142,141,1,0,0,0,142,143,1,0,0,
	0,143,145,1,0,0,0,144,146,3,24,12,0,145,144,1,0,0,0,145,146,1,0,0,0,146,
	148,1,0,0,0,147,149,5,39,0,0,148,147,1,0,0,0,149,150,1,0,0,0,150,148,1,
	0,0,0,150,151,1,0,0,0,151,11,1,0,0,0,152,159,3,30,15,0,153,159,3,32,16,
	0,154,159,3,28,14,0,155,159,3,36,18,0,156,159,3,22,11,0,157,159,3,14,7,
	0,158,152,1,0,0,0,158,153,1,0,0,0,158,154,1,0,0,0,158,155,1,0,0,0,158,156,
	1,0,0,0,158,157,1,0,0,0,159,13,1,0,0,0,160,164,5,15,0,0,161,163,5,39,0,
	0,162,161,1,0,0,0,163,166,1,0,0,0,164,162,1,0,0,0,164,165,1,0,0,0,165,167,
	1,0,0,0,166,164,1,0,0,0,167,171,3,16,8,0,168,170,5,39,0,0,169,168,1,0,0,
	0,170,173,1,0,0,0,171,169,1,0,0,0,171,172,1,0,0,0,172,174,1,0,0,0,173,171,
	1,0,0,0,174,178,5,16,0,0,175,177,5,39,0,0,176,175,1,0,0,0,177,180,1,0,0,
	0,178,176,1,0,0,0,178,179,1,0,0,0,179,189,1,0,0,0,180,178,1,0,0,0,181,185,
	3,38,19,0,182,184,5,39,0,0,183,182,1,0,0,0,184,187,1,0,0,0,185,183,1,0,
	0,0,185,186,1,0,0,0,186,189,1,0,0,0,187,185,1,0,0,0,188,160,1,0,0,0,188,
	181,1,0,0,0,189,15,1,0,0,0,190,201,3,18,9,0,191,195,5,11,0,0,192,194,5,
	39,0,0,193,192,1,0,0,0,194,197,1,0,0,0,195,193,1,0,0,0,195,196,1,0,0,0,
	196,198,1,0,0,0,197,195,1,0,0,0,198,200,3,18,9,0,199,191,1,0,0,0,200,203,
	1,0,0,0,201,199,1,0,0,0,201,202,1,0,0,0,202,205,1,0,0,0,203,201,1,0,0,0,
	204,206,5,11,0,0,205,204,1,0,0,0,205,206,1,0,0,0,206,215,1,0,0,0,207,211,
	3,38,19,0,208,210,5,39,0,0,209,208,1,0,0,0,210,213,1,0,0,0,211,209,1,0,
	0,0,211,212,1,0,0,0,212,215,1,0,0,0,213,211,1,0,0,0,214,190,1,0,0,0,214,
	207,1,0,0,0,215,17,1,0,0,0,216,218,5,29,0,0,217,219,5,41,0,0,218,217,1,
	0,0,0,218,219,1,0,0,0,219,220,1,0,0,0,220,224,5,9,0,0,221,223,5,39,0,0,
	222,221,1,0,0,0,223,226,1,0,0,0,224,222,1,0,0,0,224,225,1,0,0,0,225,227,
	1,0,0,0,226,224,1,0,0,0,227,228,3,12,6,0,228,19,1,0,0,0,229,232,3,24,12,
	0,230,232,3,22,11,0,231,229,1,0,0,0,231,230,1,0,0,0,232,21,1,0,0,0,233,
	237,5,13,0,0,234,236,5,39,0,0,235,234,1,0,0,0,236,239,1,0,0,0,237,235,1,
	0,0,0,237,238,1,0,0,0,238,240,1,0,0,0,239,237,1,0,0,0,240,244,3,24,12,0,
	241,243,5,39,0,0,242,241,1,0,0,0,243,246,1,0,0,0,244,242,1,0,0,0,244,245,
	1,0,0,0,245,247,1,0,0,0,246,244,1,0,0,0,247,248,5,14,0,0,248,257,1,0,0,
	0,249,253,3,40,20,0,250,252,5,39,0,0,251,250,1,0,0,0,252,255,1,0,0,0,253,
	251,1,0,0,0,253,254,1,0,0,0,254,257,1,0,0,0,255,253,1,0,0,0,256,233,1,0,
	0,0,256,249,1,0,0,0,257,23,1,0,0,0,258,260,3,26,13,0,259,261,5,11,0,0,260,
	259,1,0,0,0,260,261,1,0,0,0,261,267,1,0,0,0,262,263,3,26,13,0,263,264,5,
	11,0,0,264,265,3,24,12,0,265,267,1,0,0,0,266,258,1,0,0,0,266,262,1,0,0,
	0,267,25,1,0,0,0,268,270,5,39,0,0,269,268,1,0,0,0,270,273,1,0,0,0,271,269,
	1,0,0,0,271,272,1,0,0,0,272,274,1,0,0,0,273,271,1,0,0,0,274,278,3,12,6,
	0,275,277,5,39,0,0,276,275,1,0,0,0,277,280,1,0,0,0,278,276,1,0,0,0,278,
	279,1,0,0,0,279,295,1,0,0,0,280,278,1,0,0,0,281,283,5,39,0,0,282,281,1,
	0,0,0,283,286,1,0,0,0,284,282,1,0,0,0,284,285,1,0,0,0,285,287,1,0,0,0,286,
	284,1,0,0,0,287,291,3,22,11,0,288,290,5,39,0,0,289,288,1,0,0,0,290,293,
	1,0,0,0,291,289,1,0,0,0,291,292,1,0,0,0,292,295,1,0,0,0,293,291,1,0,0,0,
	294,271,1,0,0,0,294,284,1,0,0,0,295,27,1,0,0,0,296,297,5,28,0,0,297,29,
	1,0,0,0,298,299,5,24,0,0,299,31,1,0,0,0,300,304,5,32,0,0,301,303,3,34,17,
	0,302,301,1,0,0,0,303,306,1,0,0,0,304,302,1,0,0,0,304,305,1,0,0,0,305,33,
	1,0,0,0,306,304,1,0,0,0,307,309,5,39,0,0,308,307,1,0,0,0,309,312,1,0,0,
	0,310,308,1,0,0,0,310,311,1,0,0,0,311,313,1,0,0,0,312,310,1,0,0,0,313,317,
	5,17,0,0,314,316,5,39,0,0,315,314,1,0,0,0,316,319,1,0,0,0,317,315,1,0,0,
	0,317,318,1,0,0,0,318,320,1,0,0,0,319,317,1,0,0,0,320,321,5,32,0,0,321,
	35,1,0,0,0,322,323,7,0,0,0,323,37,1,0,0,0,324,334,5,25,0,0,325,329,5,15,
	0,0,326,328,5,39,0,0,327,326,1,0,0,0,328,331,1,0,0,0,329,327,1,0,0,0,329,
	330,1,0,0,0,330,332,1,0,0,0,331,329,1,0,0,0,332,334,5,16,0,0,333,324,1,
	0,0,0,333,325,1,0,0,0,334,39,1,0,0,0,335,345,5,26,0,0,336,340,5,13,0,0,
	337,339,5,39,0,0,338,337,1,0,0,0,339,342,1,0,0,0,340,338,1,0,0,0,340,341,
	1,0,0,0,341,343,1,0,0,0,342,340,1,0,0,0,343,345,5,14,0,0,344,335,1,0,0,
	0,344,336,1,0,0,0,345,41,1,0,0,0,57,43,48,54,58,63,69,75,80,84,87,90,98,
	101,106,109,114,118,122,125,130,135,137,142,145,150,158,164,171,178,185,
	188,195,201,205,211,214,218,224,231,237,244,253,256,260,266,271,278,284,
	291,294,304,310,317,329,333,340,344];

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
