// Generated from d:/Sources/YINI-lang-WORK/yini-parser-typescript/grammar/v1.0.0-rc.1x/YiniParser.g4 by ANTLR 4.13.1
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.misc.*;
import org.antlr.v4.runtime.tree.*;
import java.util.List;
import java.util.Iterator;
import java.util.ArrayList;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast", "CheckReturnValue"})
public class YiniParser extends Parser {
	static { RuntimeMetaData.checkVersion("4.13.1", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		YINI_MARKER=1, SECTION_HEAD=2, TERMINAL_TOKEN=3, SS=4, EUR=5, CARET=6, 
		GT=7, LT=8, EQ=9, HASH=10, COMMA=11, COLON=12, OB=13, CB=14, OC=15, CC=16, 
		PLUS=17, DOLLAR=18, PC=19, AT=20, SEMICOLON=21, BOOLEAN_FALSE=22, BOOLEAN_TRUE=23, 
		NULL=24, EMPTY_OBJECT=25, EMPTY_LIST=26, SHEBANG=27, NUMBER=28, KEY=29, 
		IDENT=30, IDENT_BACKTICKED=31, STRING=32, TRIPLE_QUOTED_STRING=33, SINGLE_OR_DOUBLE=34, 
		R_AND_C_STRING=35, HYPER_STRING=36, ESC_SEQ=37, ESC_SEQ_BASE=38, NL=39, 
		SINGLE_NL=40, WS=41, BLOCK_COMMENT=42, COMMENT=43, LINE_COMMENT=44, INLINE_COMMENT=45, 
		IDENT_INVALID=46, REST=47;
	public static final int
		RULE_yini = 0, RULE_section = 1, RULE_terminal_line = 2, RULE_section_members = 3, 
		RULE_member = 4, RULE_member_colon_list = 5, RULE_value = 6, RULE_object_literal = 7, 
		RULE_objectMemberList = 8, RULE_objectMember = 9, RULE_list = 10, RULE_list_in_brackets = 11, 
		RULE_elements = 12, RULE_element = 13, RULE_number_literal = 14, RULE_null_literal = 15, 
		RULE_string_literal = 16, RULE_string_concat = 17, RULE_boolean_literal = 18, 
		RULE_empty_object = 19, RULE_empty_list = 20, RULE_bad_member = 21;
	private static String[] makeRuleNames() {
		return new String[] {
			"yini", "section", "terminal_line", "section_members", "member", "member_colon_list", 
			"value", "object_literal", "objectMemberList", "objectMember", "list", 
			"list_in_brackets", "elements", "element", "number_literal", "null_literal", 
			"string_literal", "string_concat", "boolean_literal", "empty_object", 
			"empty_list", "bad_member"
		};
	}
	public static final String[] ruleNames = makeRuleNames();

	private static String[] makeLiteralNames() {
		return new String[] {
			null, null, null, null, "'\\u00A7'", "'\\u20AC'", "'^'", "'>'", "'<'", 
			"'='", "'#'", "','", "':'", "'['", "']'", "'{'", "'}'", "'+'", "'$'", 
			"'%'", "'@'", "';'", null, null, null, "'{}'", "'[]'"
		};
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, "YINI_MARKER", "SECTION_HEAD", "TERMINAL_TOKEN", "SS", "EUR", "CARET", 
			"GT", "LT", "EQ", "HASH", "COMMA", "COLON", "OB", "CB", "OC", "CC", "PLUS", 
			"DOLLAR", "PC", "AT", "SEMICOLON", "BOOLEAN_FALSE", "BOOLEAN_TRUE", "NULL", 
			"EMPTY_OBJECT", "EMPTY_LIST", "SHEBANG", "NUMBER", "KEY", "IDENT", "IDENT_BACKTICKED", 
			"STRING", "TRIPLE_QUOTED_STRING", "SINGLE_OR_DOUBLE", "R_AND_C_STRING", 
			"HYPER_STRING", "ESC_SEQ", "ESC_SEQ_BASE", "NL", "SINGLE_NL", "WS", "BLOCK_COMMENT", 
			"COMMENT", "LINE_COMMENT", "INLINE_COMMENT", "IDENT_INVALID", "REST"
		};
	}
	private static final String[] _SYMBOLIC_NAMES = makeSymbolicNames();
	public static final Vocabulary VOCABULARY = new VocabularyImpl(_LITERAL_NAMES, _SYMBOLIC_NAMES);

	/**
	 * @deprecated Use {@link #VOCABULARY} instead.
	 */
	@Deprecated
	public static final String[] tokenNames;
	static {
		tokenNames = new String[_SYMBOLIC_NAMES.length];
		for (int i = 0; i < tokenNames.length; i++) {
			tokenNames[i] = VOCABULARY.getLiteralName(i);
			if (tokenNames[i] == null) {
				tokenNames[i] = VOCABULARY.getSymbolicName(i);
			}

			if (tokenNames[i] == null) {
				tokenNames[i] = "<INVALID>";
			}
		}
	}

	@Override
	@Deprecated
	public String[] getTokenNames() {
		return tokenNames;
	}

	@Override

	public Vocabulary getVocabulary() {
		return VOCABULARY;
	}

	@Override
	public String getGrammarFileName() { return "YiniParser.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public ATN getATN() { return _ATN; }

	public YiniParser(TokenStream input) {
		super(input);
		_interp = new ParserATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	@SuppressWarnings("CheckReturnValue")
	public static class YiniContext extends ParserRuleContext {
		public TerminalNode SHEBANG() { return getToken(YiniParser.SHEBANG, 0); }
		public List<TerminalNode> INLINE_COMMENT() { return getTokens(YiniParser.INLINE_COMMENT); }
		public TerminalNode INLINE_COMMENT(int i) {
			return getToken(YiniParser.INLINE_COMMENT, i);
		}
		public List<TerminalNode> NL() { return getTokens(YiniParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(YiniParser.NL, i);
		}
		public TerminalNode YINI_MARKER() { return getToken(YiniParser.YINI_MARKER, 0); }
		public List<SectionContext> section() {
			return getRuleContexts(SectionContext.class);
		}
		public SectionContext section(int i) {
			return getRuleContext(SectionContext.class,i);
		}
		public Terminal_lineContext terminal_line() {
			return getRuleContext(Terminal_lineContext.class,0);
		}
		public TerminalNode EOF() { return getToken(YiniParser.EOF, 0); }
		public YiniContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_yini; }
	}

	public final YiniContext yini() throws RecognitionException {
		YiniContext _localctx = new YiniContext(_ctx, getState());
		enterRule(_localctx, 0, RULE_yini);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(45);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==SHEBANG) {
				{
				setState(44);
				match(SHEBANG);
				}
			}

			setState(50);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,1,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(47);
					match(INLINE_COMMENT);
					}
					} 
				}
				setState(52);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,1,_ctx);
			}
			setState(56);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,2,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(53);
					match(NL);
					}
					} 
				}
				setState(58);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,2,_ctx);
			}
			setState(60);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==YINI_MARKER) {
				{
				setState(59);
				match(YINI_MARKER);
				}
			}

			setState(65);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==INLINE_COMMENT) {
				{
				{
				setState(62);
				match(INLINE_COMMENT);
				}
				}
				setState(67);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(71);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==NL) {
				{
				{
				setState(68);
				match(NL);
				}
				}
				setState(73);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(75); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(74);
				section();
				}
				}
				setState(77); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & 142937048482308L) != 0) );
			setState(82);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==NL) {
				{
				{
				setState(79);
				match(NL);
				}
				}
				setState(84);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(86);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==TERMINAL_TOKEN) {
				{
				setState(85);
				terminal_line();
				}
			}

			setState(89);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,9,_ctx) ) {
			case 1:
				{
				setState(88);
				match(EOF);
				}
				break;
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class SectionContext extends ParserRuleContext {
		public Section_membersContext section_members() {
			return getRuleContext(Section_membersContext.class,0);
		}
		public TerminalNode SECTION_HEAD() { return getToken(YiniParser.SECTION_HEAD, 0); }
		public SectionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_section; }
	}

	public final SectionContext section() throws RecognitionException {
		SectionContext _localctx = new SectionContext(_ctx, getState());
		enterRule(_localctx, 2, RULE_section);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(92);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,10,_ctx) ) {
			case 1:
				{
				setState(91);
				match(SECTION_HEAD);
				}
				break;
			}
			setState(94);
			section_members();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Terminal_lineContext extends ParserRuleContext {
		public TerminalNode TERMINAL_TOKEN() { return getToken(YiniParser.TERMINAL_TOKEN, 0); }
		public List<TerminalNode> NL() { return getTokens(YiniParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(YiniParser.NL, i);
		}
		public TerminalNode INLINE_COMMENT() { return getToken(YiniParser.INLINE_COMMENT, 0); }
		public Terminal_lineContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_terminal_line; }
	}

	public final Terminal_lineContext terminal_line() throws RecognitionException {
		Terminal_lineContext _localctx = new Terminal_lineContext(_ctx, getState());
		enterRule(_localctx, 4, RULE_terminal_line);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(96);
			match(TERMINAL_TOKEN);
			setState(111);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,14,_ctx) ) {
			case 1:
				{
				setState(98); 
				_errHandler.sync(this);
				_la = _input.LA(1);
				do {
					{
					{
					setState(97);
					match(NL);
					}
					}
					setState(100); 
					_errHandler.sync(this);
					_la = _input.LA(1);
				} while ( _la==NL );
				}
				break;
			case 2:
				{
				setState(103);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==INLINE_COMMENT) {
					{
					setState(102);
					match(INLINE_COMMENT);
					}
				}

				setState(108);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==NL) {
					{
					{
					setState(105);
					match(NL);
					}
					}
					setState(110);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				}
				break;
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Section_membersContext extends ParserRuleContext {
		public List<MemberContext> member() {
			return getRuleContexts(MemberContext.class);
		}
		public MemberContext member(int i) {
			return getRuleContext(MemberContext.class,i);
		}
		public Section_membersContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_section_members; }
	}

	public final Section_membersContext section_members() throws RecognitionException {
		Section_membersContext _localctx = new Section_membersContext(_ctx, getState());
		enterRule(_localctx, 6, RULE_section_members);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(114); 
			_errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					setState(113);
					member();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(116); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,15,_ctx);
			} while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class MemberContext extends ParserRuleContext {
		public TerminalNode KEY() { return getToken(YiniParser.KEY, 0); }
		public TerminalNode EQ() { return getToken(YiniParser.EQ, 0); }
		public List<TerminalNode> WS() { return getTokens(YiniParser.WS); }
		public TerminalNode WS(int i) {
			return getToken(YiniParser.WS, i);
		}
		public ValueContext value() {
			return getRuleContext(ValueContext.class,0);
		}
		public List<TerminalNode> NL() { return getTokens(YiniParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(YiniParser.NL, i);
		}
		public Member_colon_listContext member_colon_list() {
			return getRuleContext(Member_colon_listContext.class,0);
		}
		public TerminalNode SECTION_HEAD() { return getToken(YiniParser.SECTION_HEAD, 0); }
		public Section_membersContext section_members() {
			return getRuleContext(Section_membersContext.class,0);
		}
		public Bad_memberContext bad_member() {
			return getRuleContext(Bad_memberContext.class,0);
		}
		public MemberContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_member; }
	}

	public final MemberContext member() throws RecognitionException {
		MemberContext _localctx = new MemberContext(_ctx, getState());
		enterRule(_localctx, 8, RULE_member);
		int _la;
		try {
			int _alt;
			setState(140);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,21,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(118);
				match(KEY);
				setState(120);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS) {
					{
					setState(119);
					match(WS);
					}
				}

				setState(122);
				match(EQ);
				setState(124);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS) {
					{
					setState(123);
					match(WS);
					}
				}

				setState(127);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 4693467136L) != 0)) {
					{
					setState(126);
					value();
					}
				}

				setState(130); 
				_errHandler.sync(this);
				_alt = 1;
				do {
					switch (_alt) {
					case 1:
						{
						{
						setState(129);
						match(NL);
						}
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					setState(132); 
					_errHandler.sync(this);
					_alt = getInterpreter().adaptivePredict(_input,19,_ctx);
				} while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER );
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(134);
				member_colon_list();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(135);
				match(SECTION_HEAD);
				setState(137);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,20,_ctx) ) {
				case 1:
					{
					setState(136);
					section_members();
					}
					break;
				}
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(139);
				bad_member();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Member_colon_listContext extends ParserRuleContext {
		public TerminalNode KEY() { return getToken(YiniParser.KEY, 0); }
		public TerminalNode COLON() { return getToken(YiniParser.COLON, 0); }
		public TerminalNode WS() { return getToken(YiniParser.WS, 0); }
		public ElementsContext elements() {
			return getRuleContext(ElementsContext.class,0);
		}
		public List<TerminalNode> NL() { return getTokens(YiniParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(YiniParser.NL, i);
		}
		public Member_colon_listContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_member_colon_list; }
	}

	public final Member_colon_listContext member_colon_list() throws RecognitionException {
		Member_colon_listContext _localctx = new Member_colon_listContext(_ctx, getState());
		enterRule(_localctx, 10, RULE_member_colon_list);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(142);
			match(KEY);
			setState(143);
			match(COLON);
			setState(145);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS) {
				{
				setState(144);
				match(WS);
				}
			}

			setState(148);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,23,_ctx) ) {
			case 1:
				{
				setState(147);
				elements();
				}
				break;
			}
			setState(151); 
			_errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					setState(150);
					match(NL);
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(153); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,24,_ctx);
			} while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ValueContext extends ParserRuleContext {
		public Null_literalContext null_literal() {
			return getRuleContext(Null_literalContext.class,0);
		}
		public String_literalContext string_literal() {
			return getRuleContext(String_literalContext.class,0);
		}
		public Number_literalContext number_literal() {
			return getRuleContext(Number_literalContext.class,0);
		}
		public Boolean_literalContext boolean_literal() {
			return getRuleContext(Boolean_literalContext.class,0);
		}
		public List_in_bracketsContext list_in_brackets() {
			return getRuleContext(List_in_bracketsContext.class,0);
		}
		public Object_literalContext object_literal() {
			return getRuleContext(Object_literalContext.class,0);
		}
		public ValueContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_value; }
	}

	public final ValueContext value() throws RecognitionException {
		ValueContext _localctx = new ValueContext(_ctx, getState());
		enterRule(_localctx, 12, RULE_value);
		try {
			setState(161);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case NULL:
				enterOuterAlt(_localctx, 1);
				{
				setState(155);
				null_literal();
				}
				break;
			case STRING:
				enterOuterAlt(_localctx, 2);
				{
				setState(156);
				string_literal();
				}
				break;
			case NUMBER:
				enterOuterAlt(_localctx, 3);
				{
				setState(157);
				number_literal();
				}
				break;
			case BOOLEAN_FALSE:
			case BOOLEAN_TRUE:
				enterOuterAlt(_localctx, 4);
				{
				setState(158);
				boolean_literal();
				}
				break;
			case OB:
			case EMPTY_LIST:
				enterOuterAlt(_localctx, 5);
				{
				setState(159);
				list_in_brackets();
				}
				break;
			case OC:
			case EMPTY_OBJECT:
				enterOuterAlt(_localctx, 6);
				{
				setState(160);
				object_literal();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Object_literalContext extends ParserRuleContext {
		public TerminalNode OC() { return getToken(YiniParser.OC, 0); }
		public ObjectMemberListContext objectMemberList() {
			return getRuleContext(ObjectMemberListContext.class,0);
		}
		public TerminalNode CC() { return getToken(YiniParser.CC, 0); }
		public List<TerminalNode> NL() { return getTokens(YiniParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(YiniParser.NL, i);
		}
		public Empty_objectContext empty_object() {
			return getRuleContext(Empty_objectContext.class,0);
		}
		public Object_literalContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_object_literal; }
	}

	public final Object_literalContext object_literal() throws RecognitionException {
		Object_literalContext _localctx = new Object_literalContext(_ctx, getState());
		enterRule(_localctx, 14, RULE_object_literal);
		int _la;
		try {
			int _alt;
			setState(191);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,30,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(163);
				match(OC);
				setState(167);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==NL) {
					{
					{
					setState(164);
					match(NL);
					}
					}
					setState(169);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				setState(170);
				objectMemberList();
				setState(174);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==NL) {
					{
					{
					setState(171);
					match(NL);
					}
					}
					setState(176);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				setState(177);
				match(CC);
				setState(181);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,28,_ctx);
				while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
					if ( _alt==1 ) {
						{
						{
						setState(178);
						match(NL);
						}
						} 
					}
					setState(183);
					_errHandler.sync(this);
					_alt = getInterpreter().adaptivePredict(_input,28,_ctx);
				}
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(184);
				empty_object();
				setState(188);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,29,_ctx);
				while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
					if ( _alt==1 ) {
						{
						{
						setState(185);
						match(NL);
						}
						} 
					}
					setState(190);
					_errHandler.sync(this);
					_alt = getInterpreter().adaptivePredict(_input,29,_ctx);
				}
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ObjectMemberListContext extends ParserRuleContext {
		public List<ObjectMemberContext> objectMember() {
			return getRuleContexts(ObjectMemberContext.class);
		}
		public ObjectMemberContext objectMember(int i) {
			return getRuleContext(ObjectMemberContext.class,i);
		}
		public List<TerminalNode> COMMA() { return getTokens(YiniParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(YiniParser.COMMA, i);
		}
		public List<TerminalNode> NL() { return getTokens(YiniParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(YiniParser.NL, i);
		}
		public Empty_objectContext empty_object() {
			return getRuleContext(Empty_objectContext.class,0);
		}
		public ObjectMemberListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_objectMemberList; }
	}

	public final ObjectMemberListContext objectMemberList() throws RecognitionException {
		ObjectMemberListContext _localctx = new ObjectMemberListContext(_ctx, getState());
		enterRule(_localctx, 16, RULE_objectMemberList);
		int _la;
		try {
			int _alt;
			setState(217);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case KEY:
				enterOuterAlt(_localctx, 1);
				{
				setState(193);
				objectMember();
				setState(204);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,32,_ctx);
				while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
					if ( _alt==1 ) {
						{
						{
						setState(194);
						match(COMMA);
						setState(198);
						_errHandler.sync(this);
						_la = _input.LA(1);
						while (_la==NL) {
							{
							{
							setState(195);
							match(NL);
							}
							}
							setState(200);
							_errHandler.sync(this);
							_la = _input.LA(1);
						}
						setState(201);
						objectMember();
						}
						} 
					}
					setState(206);
					_errHandler.sync(this);
					_alt = getInterpreter().adaptivePredict(_input,32,_ctx);
				}
				setState(208);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==COMMA) {
					{
					setState(207);
					match(COMMA);
					}
				}

				}
				break;
			case OC:
			case EMPTY_OBJECT:
				enterOuterAlt(_localctx, 2);
				{
				setState(210);
				empty_object();
				setState(214);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,34,_ctx);
				while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
					if ( _alt==1 ) {
						{
						{
						setState(211);
						match(NL);
						}
						} 
					}
					setState(216);
					_errHandler.sync(this);
					_alt = getInterpreter().adaptivePredict(_input,34,_ctx);
				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ObjectMemberContext extends ParserRuleContext {
		public TerminalNode KEY() { return getToken(YiniParser.KEY, 0); }
		public TerminalNode COLON() { return getToken(YiniParser.COLON, 0); }
		public ValueContext value() {
			return getRuleContext(ValueContext.class,0);
		}
		public TerminalNode WS() { return getToken(YiniParser.WS, 0); }
		public List<TerminalNode> NL() { return getTokens(YiniParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(YiniParser.NL, i);
		}
		public ObjectMemberContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_objectMember; }
	}

	public final ObjectMemberContext objectMember() throws RecognitionException {
		ObjectMemberContext _localctx = new ObjectMemberContext(_ctx, getState());
		enterRule(_localctx, 18, RULE_objectMember);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(219);
			match(KEY);
			setState(221);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS) {
				{
				setState(220);
				match(WS);
				}
			}

			setState(223);
			match(COLON);
			setState(227);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==NL) {
				{
				{
				setState(224);
				match(NL);
				}
				}
				setState(229);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(230);
			value();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ListContext extends ParserRuleContext {
		public ElementsContext elements() {
			return getRuleContext(ElementsContext.class,0);
		}
		public List_in_bracketsContext list_in_brackets() {
			return getRuleContext(List_in_bracketsContext.class,0);
		}
		public ListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_list; }
	}

	public final ListContext list() throws RecognitionException {
		ListContext _localctx = new ListContext(_ctx, getState());
		enterRule(_localctx, 20, RULE_list);
		try {
			setState(234);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,38,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(232);
				elements();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(233);
				list_in_brackets();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class List_in_bracketsContext extends ParserRuleContext {
		public TerminalNode OB() { return getToken(YiniParser.OB, 0); }
		public ElementsContext elements() {
			return getRuleContext(ElementsContext.class,0);
		}
		public TerminalNode CB() { return getToken(YiniParser.CB, 0); }
		public List<TerminalNode> NL() { return getTokens(YiniParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(YiniParser.NL, i);
		}
		public Empty_listContext empty_list() {
			return getRuleContext(Empty_listContext.class,0);
		}
		public List_in_bracketsContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_list_in_brackets; }
	}

	public final List_in_bracketsContext list_in_brackets() throws RecognitionException {
		List_in_bracketsContext _localctx = new List_in_bracketsContext(_ctx, getState());
		enterRule(_localctx, 22, RULE_list_in_brackets);
		int _la;
		try {
			int _alt;
			setState(259);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,42,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(236);
				match(OB);
				setState(240);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,39,_ctx);
				while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
					if ( _alt==1 ) {
						{
						{
						setState(237);
						match(NL);
						}
						} 
					}
					setState(242);
					_errHandler.sync(this);
					_alt = getInterpreter().adaptivePredict(_input,39,_ctx);
				}
				setState(243);
				elements();
				setState(247);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==NL) {
					{
					{
					setState(244);
					match(NL);
					}
					}
					setState(249);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				setState(250);
				match(CB);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(252);
				empty_list();
				setState(256);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,41,_ctx);
				while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
					if ( _alt==1 ) {
						{
						{
						setState(253);
						match(NL);
						}
						} 
					}
					setState(258);
					_errHandler.sync(this);
					_alt = getInterpreter().adaptivePredict(_input,41,_ctx);
				}
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ElementsContext extends ParserRuleContext {
		public ElementContext element() {
			return getRuleContext(ElementContext.class,0);
		}
		public TerminalNode COMMA() { return getToken(YiniParser.COMMA, 0); }
		public ElementsContext elements() {
			return getRuleContext(ElementsContext.class,0);
		}
		public ElementsContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_elements; }
	}

	public final ElementsContext elements() throws RecognitionException {
		ElementsContext _localctx = new ElementsContext(_ctx, getState());
		enterRule(_localctx, 24, RULE_elements);
		int _la;
		try {
			setState(269);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,44,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(261);
				element();
				setState(263);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==COMMA) {
					{
					setState(262);
					match(COMMA);
					}
				}

				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(265);
				element();
				setState(266);
				match(COMMA);
				setState(267);
				elements();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ElementContext extends ParserRuleContext {
		public ValueContext value() {
			return getRuleContext(ValueContext.class,0);
		}
		public List<TerminalNode> NL() { return getTokens(YiniParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(YiniParser.NL, i);
		}
		public List_in_bracketsContext list_in_brackets() {
			return getRuleContext(List_in_bracketsContext.class,0);
		}
		public ElementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_element; }
	}

	public final ElementContext element() throws RecognitionException {
		ElementContext _localctx = new ElementContext(_ctx, getState());
		enterRule(_localctx, 26, RULE_element);
		int _la;
		try {
			int _alt;
			setState(297);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,49,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(274);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==NL) {
					{
					{
					setState(271);
					match(NL);
					}
					}
					setState(276);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				setState(277);
				value();
				setState(281);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,46,_ctx);
				while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
					if ( _alt==1 ) {
						{
						{
						setState(278);
						match(NL);
						}
						} 
					}
					setState(283);
					_errHandler.sync(this);
					_alt = getInterpreter().adaptivePredict(_input,46,_ctx);
				}
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(287);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==NL) {
					{
					{
					setState(284);
					match(NL);
					}
					}
					setState(289);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				setState(290);
				list_in_brackets();
				setState(294);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,48,_ctx);
				while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
					if ( _alt==1 ) {
						{
						{
						setState(291);
						match(NL);
						}
						} 
					}
					setState(296);
					_errHandler.sync(this);
					_alt = getInterpreter().adaptivePredict(_input,48,_ctx);
				}
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Number_literalContext extends ParserRuleContext {
		public TerminalNode NUMBER() { return getToken(YiniParser.NUMBER, 0); }
		public Number_literalContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_number_literal; }
	}

	public final Number_literalContext number_literal() throws RecognitionException {
		Number_literalContext _localctx = new Number_literalContext(_ctx, getState());
		enterRule(_localctx, 28, RULE_number_literal);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(299);
			match(NUMBER);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Null_literalContext extends ParserRuleContext {
		public TerminalNode NULL() { return getToken(YiniParser.NULL, 0); }
		public Null_literalContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_null_literal; }
	}

	public final Null_literalContext null_literal() throws RecognitionException {
		Null_literalContext _localctx = new Null_literalContext(_ctx, getState());
		enterRule(_localctx, 30, RULE_null_literal);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(301);
			match(NULL);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class String_literalContext extends ParserRuleContext {
		public TerminalNode STRING() { return getToken(YiniParser.STRING, 0); }
		public List<String_concatContext> string_concat() {
			return getRuleContexts(String_concatContext.class);
		}
		public String_concatContext string_concat(int i) {
			return getRuleContext(String_concatContext.class,i);
		}
		public String_literalContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_string_literal; }
	}

	public final String_literalContext string_literal() throws RecognitionException {
		String_literalContext _localctx = new String_literalContext(_ctx, getState());
		enterRule(_localctx, 32, RULE_string_literal);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(303);
			match(STRING);
			setState(307);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,50,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(304);
					string_concat();
					}
					} 
				}
				setState(309);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,50,_ctx);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class String_concatContext extends ParserRuleContext {
		public TerminalNode PLUS() { return getToken(YiniParser.PLUS, 0); }
		public TerminalNode STRING() { return getToken(YiniParser.STRING, 0); }
		public List<TerminalNode> NL() { return getTokens(YiniParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(YiniParser.NL, i);
		}
		public String_concatContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_string_concat; }
	}

	public final String_concatContext string_concat() throws RecognitionException {
		String_concatContext _localctx = new String_concatContext(_ctx, getState());
		enterRule(_localctx, 34, RULE_string_concat);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(313);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==NL) {
				{
				{
				setState(310);
				match(NL);
				}
				}
				setState(315);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(316);
			match(PLUS);
			setState(320);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==NL) {
				{
				{
				setState(317);
				match(NL);
				}
				}
				setState(322);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(323);
			match(STRING);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Boolean_literalContext extends ParserRuleContext {
		public TerminalNode BOOLEAN_FALSE() { return getToken(YiniParser.BOOLEAN_FALSE, 0); }
		public TerminalNode BOOLEAN_TRUE() { return getToken(YiniParser.BOOLEAN_TRUE, 0); }
		public Boolean_literalContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_boolean_literal; }
	}

	public final Boolean_literalContext boolean_literal() throws RecognitionException {
		Boolean_literalContext _localctx = new Boolean_literalContext(_ctx, getState());
		enterRule(_localctx, 36, RULE_boolean_literal);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(325);
			_la = _input.LA(1);
			if ( !(_la==BOOLEAN_FALSE || _la==BOOLEAN_TRUE) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Empty_objectContext extends ParserRuleContext {
		public TerminalNode EMPTY_OBJECT() { return getToken(YiniParser.EMPTY_OBJECT, 0); }
		public TerminalNode OC() { return getToken(YiniParser.OC, 0); }
		public TerminalNode CC() { return getToken(YiniParser.CC, 0); }
		public List<TerminalNode> NL() { return getTokens(YiniParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(YiniParser.NL, i);
		}
		public Empty_objectContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_empty_object; }
	}

	public final Empty_objectContext empty_object() throws RecognitionException {
		Empty_objectContext _localctx = new Empty_objectContext(_ctx, getState());
		enterRule(_localctx, 38, RULE_empty_object);
		int _la;
		try {
			setState(336);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case EMPTY_OBJECT:
				enterOuterAlt(_localctx, 1);
				{
				setState(327);
				match(EMPTY_OBJECT);
				}
				break;
			case OC:
				enterOuterAlt(_localctx, 2);
				{
				setState(328);
				match(OC);
				setState(332);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==NL) {
					{
					{
					setState(329);
					match(NL);
					}
					}
					setState(334);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				setState(335);
				match(CC);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Empty_listContext extends ParserRuleContext {
		public TerminalNode EMPTY_LIST() { return getToken(YiniParser.EMPTY_LIST, 0); }
		public TerminalNode OB() { return getToken(YiniParser.OB, 0); }
		public TerminalNode CB() { return getToken(YiniParser.CB, 0); }
		public List<TerminalNode> NL() { return getTokens(YiniParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(YiniParser.NL, i);
		}
		public Empty_listContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_empty_list; }
	}

	public final Empty_listContext empty_list() throws RecognitionException {
		Empty_listContext _localctx = new Empty_listContext(_ctx, getState());
		enterRule(_localctx, 40, RULE_empty_list);
		int _la;
		try {
			setState(347);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case EMPTY_LIST:
				enterOuterAlt(_localctx, 1);
				{
				setState(338);
				match(EMPTY_LIST);
				}
				break;
			case OB:
				enterOuterAlt(_localctx, 2);
				{
				setState(339);
				match(OB);
				setState(343);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==NL) {
					{
					{
					setState(340);
					match(NL);
					}
					}
					setState(345);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				setState(346);
				match(CB);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Bad_memberContext extends ParserRuleContext {
		public TerminalNode EQ() { return getToken(YiniParser.EQ, 0); }
		public ValueContext value() {
			return getRuleContext(ValueContext.class,0);
		}
		public List<TerminalNode> REST() { return getTokens(YiniParser.REST); }
		public TerminalNode REST(int i) {
			return getToken(YiniParser.REST, i);
		}
		public List<TerminalNode> WS() { return getTokens(YiniParser.WS); }
		public TerminalNode WS(int i) {
			return getToken(YiniParser.WS, i);
		}
		public TerminalNode NL() { return getToken(YiniParser.NL, 0); }
		public Bad_memberContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_bad_member; }
	}

	public final Bad_memberContext bad_member() throws RecognitionException {
		Bad_memberContext _localctx = new Bad_memberContext(_ctx, getState());
		enterRule(_localctx, 42, RULE_bad_member);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(350);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==REST) {
				{
				setState(349);
				match(REST);
				}
			}

			setState(353);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS) {
				{
				setState(352);
				match(WS);
				}
			}

			setState(355);
			match(EQ);
			setState(357);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS) {
				{
				setState(356);
				match(WS);
				}
			}

			setState(361);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case OB:
			case OC:
			case BOOLEAN_FALSE:
			case BOOLEAN_TRUE:
			case NULL:
			case EMPTY_OBJECT:
			case EMPTY_LIST:
			case NUMBER:
			case STRING:
				{
				setState(359);
				value();
				}
				break;
			case REST:
				{
				setState(360);
				match(REST);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			setState(364);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,61,_ctx) ) {
			case 1:
				{
				setState(363);
				match(NL);
				}
				break;
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static final String _serializedATN =
		"\u0004\u0001/\u016f\u0002\u0000\u0007\u0000\u0002\u0001\u0007\u0001\u0002"+
		"\u0002\u0007\u0002\u0002\u0003\u0007\u0003\u0002\u0004\u0007\u0004\u0002"+
		"\u0005\u0007\u0005\u0002\u0006\u0007\u0006\u0002\u0007\u0007\u0007\u0002"+
		"\b\u0007\b\u0002\t\u0007\t\u0002\n\u0007\n\u0002\u000b\u0007\u000b\u0002"+
		"\f\u0007\f\u0002\r\u0007\r\u0002\u000e\u0007\u000e\u0002\u000f\u0007\u000f"+
		"\u0002\u0010\u0007\u0010\u0002\u0011\u0007\u0011\u0002\u0012\u0007\u0012"+
		"\u0002\u0013\u0007\u0013\u0002\u0014\u0007\u0014\u0002\u0015\u0007\u0015"+
		"\u0001\u0000\u0003\u0000.\b\u0000\u0001\u0000\u0005\u00001\b\u0000\n\u0000"+
		"\f\u00004\t\u0000\u0001\u0000\u0005\u00007\b\u0000\n\u0000\f\u0000:\t"+
		"\u0000\u0001\u0000\u0003\u0000=\b\u0000\u0001\u0000\u0005\u0000@\b\u0000"+
		"\n\u0000\f\u0000C\t\u0000\u0001\u0000\u0005\u0000F\b\u0000\n\u0000\f\u0000"+
		"I\t\u0000\u0001\u0000\u0004\u0000L\b\u0000\u000b\u0000\f\u0000M\u0001"+
		"\u0000\u0005\u0000Q\b\u0000\n\u0000\f\u0000T\t\u0000\u0001\u0000\u0003"+
		"\u0000W\b\u0000\u0001\u0000\u0003\u0000Z\b\u0000\u0001\u0001\u0003\u0001"+
		"]\b\u0001\u0001\u0001\u0001\u0001\u0001\u0002\u0001\u0002\u0004\u0002"+
		"c\b\u0002\u000b\u0002\f\u0002d\u0001\u0002\u0003\u0002h\b\u0002\u0001"+
		"\u0002\u0005\u0002k\b\u0002\n\u0002\f\u0002n\t\u0002\u0003\u0002p\b\u0002"+
		"\u0001\u0003\u0004\u0003s\b\u0003\u000b\u0003\f\u0003t\u0001\u0004\u0001"+
		"\u0004\u0003\u0004y\b\u0004\u0001\u0004\u0001\u0004\u0003\u0004}\b\u0004"+
		"\u0001\u0004\u0003\u0004\u0080\b\u0004\u0001\u0004\u0004\u0004\u0083\b"+
		"\u0004\u000b\u0004\f\u0004\u0084\u0001\u0004\u0001\u0004\u0001\u0004\u0003"+
		"\u0004\u008a\b\u0004\u0001\u0004\u0003\u0004\u008d\b\u0004\u0001\u0005"+
		"\u0001\u0005\u0001\u0005\u0003\u0005\u0092\b\u0005\u0001\u0005\u0003\u0005"+
		"\u0095\b\u0005\u0001\u0005\u0004\u0005\u0098\b\u0005\u000b\u0005\f\u0005"+
		"\u0099\u0001\u0006\u0001\u0006\u0001\u0006\u0001\u0006\u0001\u0006\u0001"+
		"\u0006\u0003\u0006\u00a2\b\u0006\u0001\u0007\u0001\u0007\u0005\u0007\u00a6"+
		"\b\u0007\n\u0007\f\u0007\u00a9\t\u0007\u0001\u0007\u0001\u0007\u0005\u0007"+
		"\u00ad\b\u0007\n\u0007\f\u0007\u00b0\t\u0007\u0001\u0007\u0001\u0007\u0005"+
		"\u0007\u00b4\b\u0007\n\u0007\f\u0007\u00b7\t\u0007\u0001\u0007\u0001\u0007"+
		"\u0005\u0007\u00bb\b\u0007\n\u0007\f\u0007\u00be\t\u0007\u0003\u0007\u00c0"+
		"\b\u0007\u0001\b\u0001\b\u0001\b\u0005\b\u00c5\b\b\n\b\f\b\u00c8\t\b\u0001"+
		"\b\u0005\b\u00cb\b\b\n\b\f\b\u00ce\t\b\u0001\b\u0003\b\u00d1\b\b\u0001"+
		"\b\u0001\b\u0005\b\u00d5\b\b\n\b\f\b\u00d8\t\b\u0003\b\u00da\b\b\u0001"+
		"\t\u0001\t\u0003\t\u00de\b\t\u0001\t\u0001\t\u0005\t\u00e2\b\t\n\t\f\t"+
		"\u00e5\t\t\u0001\t\u0001\t\u0001\n\u0001\n\u0003\n\u00eb\b\n\u0001\u000b"+
		"\u0001\u000b\u0005\u000b\u00ef\b\u000b\n\u000b\f\u000b\u00f2\t\u000b\u0001"+
		"\u000b\u0001\u000b\u0005\u000b\u00f6\b\u000b\n\u000b\f\u000b\u00f9\t\u000b"+
		"\u0001\u000b\u0001\u000b\u0001\u000b\u0001\u000b\u0005\u000b\u00ff\b\u000b"+
		"\n\u000b\f\u000b\u0102\t\u000b\u0003\u000b\u0104\b\u000b\u0001\f\u0001"+
		"\f\u0003\f\u0108\b\f\u0001\f\u0001\f\u0001\f\u0001\f\u0003\f\u010e\b\f"+
		"\u0001\r\u0005\r\u0111\b\r\n\r\f\r\u0114\t\r\u0001\r\u0001\r\u0005\r\u0118"+
		"\b\r\n\r\f\r\u011b\t\r\u0001\r\u0005\r\u011e\b\r\n\r\f\r\u0121\t\r\u0001"+
		"\r\u0001\r\u0005\r\u0125\b\r\n\r\f\r\u0128\t\r\u0003\r\u012a\b\r\u0001"+
		"\u000e\u0001\u000e\u0001\u000f\u0001\u000f\u0001\u0010\u0001\u0010\u0005"+
		"\u0010\u0132\b\u0010\n\u0010\f\u0010\u0135\t\u0010\u0001\u0011\u0005\u0011"+
		"\u0138\b\u0011\n\u0011\f\u0011\u013b\t\u0011\u0001\u0011\u0001\u0011\u0005"+
		"\u0011\u013f\b\u0011\n\u0011\f\u0011\u0142\t\u0011\u0001\u0011\u0001\u0011"+
		"\u0001\u0012\u0001\u0012\u0001\u0013\u0001\u0013\u0001\u0013\u0005\u0013"+
		"\u014b\b\u0013\n\u0013\f\u0013\u014e\t\u0013\u0001\u0013\u0003\u0013\u0151"+
		"\b\u0013\u0001\u0014\u0001\u0014\u0001\u0014\u0005\u0014\u0156\b\u0014"+
		"\n\u0014\f\u0014\u0159\t\u0014\u0001\u0014\u0003\u0014\u015c\b\u0014\u0001"+
		"\u0015\u0003\u0015\u015f\b\u0015\u0001\u0015\u0003\u0015\u0162\b\u0015"+
		"\u0001\u0015\u0001\u0015\u0003\u0015\u0166\b\u0015\u0001\u0015\u0001\u0015"+
		"\u0003\u0015\u016a\b\u0015\u0001\u0015\u0003\u0015\u016d\b\u0015\u0001"+
		"\u0015\u0000\u0000\u0016\u0000\u0002\u0004\u0006\b\n\f\u000e\u0010\u0012"+
		"\u0014\u0016\u0018\u001a\u001c\u001e \"$&(*\u0000\u0001\u0001\u0000\u0016"+
		"\u0017\u019c\u0000-\u0001\u0000\u0000\u0000\u0002\\\u0001\u0000\u0000"+
		"\u0000\u0004`\u0001\u0000\u0000\u0000\u0006r\u0001\u0000\u0000\u0000\b"+
		"\u008c\u0001\u0000\u0000\u0000\n\u008e\u0001\u0000\u0000\u0000\f\u00a1"+
		"\u0001\u0000\u0000\u0000\u000e\u00bf\u0001\u0000\u0000\u0000\u0010\u00d9"+
		"\u0001\u0000\u0000\u0000\u0012\u00db\u0001\u0000\u0000\u0000\u0014\u00ea"+
		"\u0001\u0000\u0000\u0000\u0016\u0103\u0001\u0000\u0000\u0000\u0018\u010d"+
		"\u0001\u0000\u0000\u0000\u001a\u0129\u0001\u0000\u0000\u0000\u001c\u012b"+
		"\u0001\u0000\u0000\u0000\u001e\u012d\u0001\u0000\u0000\u0000 \u012f\u0001"+
		"\u0000\u0000\u0000\"\u0139\u0001\u0000\u0000\u0000$\u0145\u0001\u0000"+
		"\u0000\u0000&\u0150\u0001\u0000\u0000\u0000(\u015b\u0001\u0000\u0000\u0000"+
		"*\u015e\u0001\u0000\u0000\u0000,.\u0005\u001b\u0000\u0000-,\u0001\u0000"+
		"\u0000\u0000-.\u0001\u0000\u0000\u0000.2\u0001\u0000\u0000\u0000/1\u0005"+
		"-\u0000\u00000/\u0001\u0000\u0000\u000014\u0001\u0000\u0000\u000020\u0001"+
		"\u0000\u0000\u000023\u0001\u0000\u0000\u000038\u0001\u0000\u0000\u0000"+
		"42\u0001\u0000\u0000\u000057\u0005\'\u0000\u000065\u0001\u0000\u0000\u0000"+
		"7:\u0001\u0000\u0000\u000086\u0001\u0000\u0000\u000089\u0001\u0000\u0000"+
		"\u00009<\u0001\u0000\u0000\u0000:8\u0001\u0000\u0000\u0000;=\u0005\u0001"+
		"\u0000\u0000<;\u0001\u0000\u0000\u0000<=\u0001\u0000\u0000\u0000=A\u0001"+
		"\u0000\u0000\u0000>@\u0005-\u0000\u0000?>\u0001\u0000\u0000\u0000@C\u0001"+
		"\u0000\u0000\u0000A?\u0001\u0000\u0000\u0000AB\u0001\u0000\u0000\u0000"+
		"BG\u0001\u0000\u0000\u0000CA\u0001\u0000\u0000\u0000DF\u0005\'\u0000\u0000"+
		"ED\u0001\u0000\u0000\u0000FI\u0001\u0000\u0000\u0000GE\u0001\u0000\u0000"+
		"\u0000GH\u0001\u0000\u0000\u0000HK\u0001\u0000\u0000\u0000IG\u0001\u0000"+
		"\u0000\u0000JL\u0003\u0002\u0001\u0000KJ\u0001\u0000\u0000\u0000LM\u0001"+
		"\u0000\u0000\u0000MK\u0001\u0000\u0000\u0000MN\u0001\u0000\u0000\u0000"+
		"NR\u0001\u0000\u0000\u0000OQ\u0005\'\u0000\u0000PO\u0001\u0000\u0000\u0000"+
		"QT\u0001\u0000\u0000\u0000RP\u0001\u0000\u0000\u0000RS\u0001\u0000\u0000"+
		"\u0000SV\u0001\u0000\u0000\u0000TR\u0001\u0000\u0000\u0000UW\u0003\u0004"+
		"\u0002\u0000VU\u0001\u0000\u0000\u0000VW\u0001\u0000\u0000\u0000WY\u0001"+
		"\u0000\u0000\u0000XZ\u0005\u0000\u0000\u0001YX\u0001\u0000\u0000\u0000"+
		"YZ\u0001\u0000\u0000\u0000Z\u0001\u0001\u0000\u0000\u0000[]\u0005\u0002"+
		"\u0000\u0000\\[\u0001\u0000\u0000\u0000\\]\u0001\u0000\u0000\u0000]^\u0001"+
		"\u0000\u0000\u0000^_\u0003\u0006\u0003\u0000_\u0003\u0001\u0000\u0000"+
		"\u0000`o\u0005\u0003\u0000\u0000ac\u0005\'\u0000\u0000ba\u0001\u0000\u0000"+
		"\u0000cd\u0001\u0000\u0000\u0000db\u0001\u0000\u0000\u0000de\u0001\u0000"+
		"\u0000\u0000ep\u0001\u0000\u0000\u0000fh\u0005-\u0000\u0000gf\u0001\u0000"+
		"\u0000\u0000gh\u0001\u0000\u0000\u0000hl\u0001\u0000\u0000\u0000ik\u0005"+
		"\'\u0000\u0000ji\u0001\u0000\u0000\u0000kn\u0001\u0000\u0000\u0000lj\u0001"+
		"\u0000\u0000\u0000lm\u0001\u0000\u0000\u0000mp\u0001\u0000\u0000\u0000"+
		"nl\u0001\u0000\u0000\u0000ob\u0001\u0000\u0000\u0000og\u0001\u0000\u0000"+
		"\u0000p\u0005\u0001\u0000\u0000\u0000qs\u0003\b\u0004\u0000rq\u0001\u0000"+
		"\u0000\u0000st\u0001\u0000\u0000\u0000tr\u0001\u0000\u0000\u0000tu\u0001"+
		"\u0000\u0000\u0000u\u0007\u0001\u0000\u0000\u0000vx\u0005\u001d\u0000"+
		"\u0000wy\u0005)\u0000\u0000xw\u0001\u0000\u0000\u0000xy\u0001\u0000\u0000"+
		"\u0000yz\u0001\u0000\u0000\u0000z|\u0005\t\u0000\u0000{}\u0005)\u0000"+
		"\u0000|{\u0001\u0000\u0000\u0000|}\u0001\u0000\u0000\u0000}\u007f\u0001"+
		"\u0000\u0000\u0000~\u0080\u0003\f\u0006\u0000\u007f~\u0001\u0000\u0000"+
		"\u0000\u007f\u0080\u0001\u0000\u0000\u0000\u0080\u0082\u0001\u0000\u0000"+
		"\u0000\u0081\u0083\u0005\'\u0000\u0000\u0082\u0081\u0001\u0000\u0000\u0000"+
		"\u0083\u0084\u0001\u0000\u0000\u0000\u0084\u0082\u0001\u0000\u0000\u0000"+
		"\u0084\u0085\u0001\u0000\u0000\u0000\u0085\u008d\u0001\u0000\u0000\u0000"+
		"\u0086\u008d\u0003\n\u0005\u0000\u0087\u0089\u0005\u0002\u0000\u0000\u0088"+
		"\u008a\u0003\u0006\u0003\u0000\u0089\u0088\u0001\u0000\u0000\u0000\u0089"+
		"\u008a\u0001\u0000\u0000\u0000\u008a\u008d\u0001\u0000\u0000\u0000\u008b"+
		"\u008d\u0003*\u0015\u0000\u008cv\u0001\u0000\u0000\u0000\u008c\u0086\u0001"+
		"\u0000\u0000\u0000\u008c\u0087\u0001\u0000\u0000\u0000\u008c\u008b\u0001"+
		"\u0000\u0000\u0000\u008d\t\u0001\u0000\u0000\u0000\u008e\u008f\u0005\u001d"+
		"\u0000\u0000\u008f\u0091\u0005\f\u0000\u0000\u0090\u0092\u0005)\u0000"+
		"\u0000\u0091\u0090\u0001\u0000\u0000\u0000\u0091\u0092\u0001\u0000\u0000"+
		"\u0000\u0092\u0094\u0001\u0000\u0000\u0000\u0093\u0095\u0003\u0018\f\u0000"+
		"\u0094\u0093\u0001\u0000\u0000\u0000\u0094\u0095\u0001\u0000\u0000\u0000"+
		"\u0095\u0097\u0001\u0000\u0000\u0000\u0096\u0098\u0005\'\u0000\u0000\u0097"+
		"\u0096\u0001\u0000\u0000\u0000\u0098\u0099\u0001\u0000\u0000\u0000\u0099"+
		"\u0097\u0001\u0000\u0000\u0000\u0099\u009a\u0001\u0000\u0000\u0000\u009a"+
		"\u000b\u0001\u0000\u0000\u0000\u009b\u00a2\u0003\u001e\u000f\u0000\u009c"+
		"\u00a2\u0003 \u0010\u0000\u009d\u00a2\u0003\u001c\u000e\u0000\u009e\u00a2"+
		"\u0003$\u0012\u0000\u009f\u00a2\u0003\u0016\u000b\u0000\u00a0\u00a2\u0003"+
		"\u000e\u0007\u0000\u00a1\u009b\u0001\u0000\u0000\u0000\u00a1\u009c\u0001"+
		"\u0000\u0000\u0000\u00a1\u009d\u0001\u0000\u0000\u0000\u00a1\u009e\u0001"+
		"\u0000\u0000\u0000\u00a1\u009f\u0001\u0000\u0000\u0000\u00a1\u00a0\u0001"+
		"\u0000\u0000\u0000\u00a2\r\u0001\u0000\u0000\u0000\u00a3\u00a7\u0005\u000f"+
		"\u0000\u0000\u00a4\u00a6\u0005\'\u0000\u0000\u00a5\u00a4\u0001\u0000\u0000"+
		"\u0000\u00a6\u00a9\u0001\u0000\u0000\u0000\u00a7\u00a5\u0001\u0000\u0000"+
		"\u0000\u00a7\u00a8\u0001\u0000\u0000\u0000\u00a8\u00aa\u0001\u0000\u0000"+
		"\u0000\u00a9\u00a7\u0001\u0000\u0000\u0000\u00aa\u00ae\u0003\u0010\b\u0000"+
		"\u00ab\u00ad\u0005\'\u0000\u0000\u00ac\u00ab\u0001\u0000\u0000\u0000\u00ad"+
		"\u00b0\u0001\u0000\u0000\u0000\u00ae\u00ac\u0001\u0000\u0000\u0000\u00ae"+
		"\u00af\u0001\u0000\u0000\u0000\u00af\u00b1\u0001\u0000\u0000\u0000\u00b0"+
		"\u00ae\u0001\u0000\u0000\u0000\u00b1\u00b5\u0005\u0010\u0000\u0000\u00b2"+
		"\u00b4\u0005\'\u0000\u0000\u00b3\u00b2\u0001\u0000\u0000\u0000\u00b4\u00b7"+
		"\u0001\u0000\u0000\u0000\u00b5\u00b3\u0001\u0000\u0000\u0000\u00b5\u00b6"+
		"\u0001\u0000\u0000\u0000\u00b6\u00c0\u0001\u0000\u0000\u0000\u00b7\u00b5"+
		"\u0001\u0000\u0000\u0000\u00b8\u00bc\u0003&\u0013\u0000\u00b9\u00bb\u0005"+
		"\'\u0000\u0000\u00ba\u00b9\u0001\u0000\u0000\u0000\u00bb\u00be\u0001\u0000"+
		"\u0000\u0000\u00bc\u00ba\u0001\u0000\u0000\u0000\u00bc\u00bd\u0001\u0000"+
		"\u0000\u0000\u00bd\u00c0\u0001\u0000\u0000\u0000\u00be\u00bc\u0001\u0000"+
		"\u0000\u0000\u00bf\u00a3\u0001\u0000\u0000\u0000\u00bf\u00b8\u0001\u0000"+
		"\u0000\u0000\u00c0\u000f\u0001\u0000\u0000\u0000\u00c1\u00cc\u0003\u0012"+
		"\t\u0000\u00c2\u00c6\u0005\u000b\u0000\u0000\u00c3\u00c5\u0005\'\u0000"+
		"\u0000\u00c4\u00c3\u0001\u0000\u0000\u0000\u00c5\u00c8\u0001\u0000\u0000"+
		"\u0000\u00c6\u00c4\u0001\u0000\u0000\u0000\u00c6\u00c7\u0001\u0000\u0000"+
		"\u0000\u00c7\u00c9\u0001\u0000\u0000\u0000\u00c8\u00c6\u0001\u0000\u0000"+
		"\u0000\u00c9\u00cb\u0003\u0012\t\u0000\u00ca\u00c2\u0001\u0000\u0000\u0000"+
		"\u00cb\u00ce\u0001\u0000\u0000\u0000\u00cc\u00ca\u0001\u0000\u0000\u0000"+
		"\u00cc\u00cd\u0001\u0000\u0000\u0000\u00cd\u00d0\u0001\u0000\u0000\u0000"+
		"\u00ce\u00cc\u0001\u0000\u0000\u0000\u00cf\u00d1\u0005\u000b\u0000\u0000"+
		"\u00d0\u00cf\u0001\u0000\u0000\u0000\u00d0\u00d1\u0001\u0000\u0000\u0000"+
		"\u00d1\u00da\u0001\u0000\u0000\u0000\u00d2\u00d6\u0003&\u0013\u0000\u00d3"+
		"\u00d5\u0005\'\u0000\u0000\u00d4\u00d3\u0001\u0000\u0000\u0000\u00d5\u00d8"+
		"\u0001\u0000\u0000\u0000\u00d6\u00d4\u0001\u0000\u0000\u0000\u00d6\u00d7"+
		"\u0001\u0000\u0000\u0000\u00d7\u00da\u0001\u0000\u0000\u0000\u00d8\u00d6"+
		"\u0001\u0000\u0000\u0000\u00d9\u00c1\u0001\u0000\u0000\u0000\u00d9\u00d2"+
		"\u0001\u0000\u0000\u0000\u00da\u0011\u0001\u0000\u0000\u0000\u00db\u00dd"+
		"\u0005\u001d\u0000\u0000\u00dc\u00de\u0005)\u0000\u0000\u00dd\u00dc\u0001"+
		"\u0000\u0000\u0000\u00dd\u00de\u0001\u0000\u0000\u0000\u00de\u00df\u0001"+
		"\u0000\u0000\u0000\u00df\u00e3\u0005\f\u0000\u0000\u00e0\u00e2\u0005\'"+
		"\u0000\u0000\u00e1\u00e0\u0001\u0000\u0000\u0000\u00e2\u00e5\u0001\u0000"+
		"\u0000\u0000\u00e3\u00e1\u0001\u0000\u0000\u0000\u00e3\u00e4\u0001\u0000"+
		"\u0000\u0000\u00e4\u00e6\u0001\u0000\u0000\u0000\u00e5\u00e3\u0001\u0000"+
		"\u0000\u0000\u00e6\u00e7\u0003\f\u0006\u0000\u00e7\u0013\u0001\u0000\u0000"+
		"\u0000\u00e8\u00eb\u0003\u0018\f\u0000\u00e9\u00eb\u0003\u0016\u000b\u0000"+
		"\u00ea\u00e8\u0001\u0000\u0000\u0000\u00ea\u00e9\u0001\u0000\u0000\u0000"+
		"\u00eb\u0015\u0001\u0000\u0000\u0000\u00ec\u00f0\u0005\r\u0000\u0000\u00ed"+
		"\u00ef\u0005\'\u0000\u0000\u00ee\u00ed\u0001\u0000\u0000\u0000\u00ef\u00f2"+
		"\u0001\u0000\u0000\u0000\u00f0\u00ee\u0001\u0000\u0000\u0000\u00f0\u00f1"+
		"\u0001\u0000\u0000\u0000\u00f1\u00f3\u0001\u0000\u0000\u0000\u00f2\u00f0"+
		"\u0001\u0000\u0000\u0000\u00f3\u00f7\u0003\u0018\f\u0000\u00f4\u00f6\u0005"+
		"\'\u0000\u0000\u00f5\u00f4\u0001\u0000\u0000\u0000\u00f6\u00f9\u0001\u0000"+
		"\u0000\u0000\u00f7\u00f5\u0001\u0000\u0000\u0000\u00f7\u00f8\u0001\u0000"+
		"\u0000\u0000\u00f8\u00fa\u0001\u0000\u0000\u0000\u00f9\u00f7\u0001\u0000"+
		"\u0000\u0000\u00fa\u00fb\u0005\u000e\u0000\u0000\u00fb\u0104\u0001\u0000"+
		"\u0000\u0000\u00fc\u0100\u0003(\u0014\u0000\u00fd\u00ff\u0005\'\u0000"+
		"\u0000\u00fe\u00fd\u0001\u0000\u0000\u0000\u00ff\u0102\u0001\u0000\u0000"+
		"\u0000\u0100\u00fe\u0001\u0000\u0000\u0000\u0100\u0101\u0001\u0000\u0000"+
		"\u0000\u0101\u0104\u0001\u0000\u0000\u0000\u0102\u0100\u0001\u0000\u0000"+
		"\u0000\u0103\u00ec\u0001\u0000\u0000\u0000\u0103\u00fc\u0001\u0000\u0000"+
		"\u0000\u0104\u0017\u0001\u0000\u0000\u0000\u0105\u0107\u0003\u001a\r\u0000"+
		"\u0106\u0108\u0005\u000b\u0000\u0000\u0107\u0106\u0001\u0000\u0000\u0000"+
		"\u0107\u0108\u0001\u0000\u0000\u0000\u0108\u010e\u0001\u0000\u0000\u0000"+
		"\u0109\u010a\u0003\u001a\r\u0000\u010a\u010b\u0005\u000b\u0000\u0000\u010b"+
		"\u010c\u0003\u0018\f\u0000\u010c\u010e\u0001\u0000\u0000\u0000\u010d\u0105"+
		"\u0001\u0000\u0000\u0000\u010d\u0109\u0001\u0000\u0000\u0000\u010e\u0019"+
		"\u0001\u0000\u0000\u0000\u010f\u0111\u0005\'\u0000\u0000\u0110\u010f\u0001"+
		"\u0000\u0000\u0000\u0111\u0114\u0001\u0000\u0000\u0000\u0112\u0110\u0001"+
		"\u0000\u0000\u0000\u0112\u0113\u0001\u0000\u0000\u0000\u0113\u0115\u0001"+
		"\u0000\u0000\u0000\u0114\u0112\u0001\u0000\u0000\u0000\u0115\u0119\u0003"+
		"\f\u0006\u0000\u0116\u0118\u0005\'\u0000\u0000\u0117\u0116\u0001\u0000"+
		"\u0000\u0000\u0118\u011b\u0001\u0000\u0000\u0000\u0119\u0117\u0001\u0000"+
		"\u0000\u0000\u0119\u011a\u0001\u0000\u0000\u0000\u011a\u012a\u0001\u0000"+
		"\u0000\u0000\u011b\u0119\u0001\u0000\u0000\u0000\u011c\u011e\u0005\'\u0000"+
		"\u0000\u011d\u011c\u0001\u0000\u0000\u0000\u011e\u0121\u0001\u0000\u0000"+
		"\u0000\u011f\u011d\u0001\u0000\u0000\u0000\u011f\u0120\u0001\u0000\u0000"+
		"\u0000\u0120\u0122\u0001\u0000\u0000\u0000\u0121\u011f\u0001\u0000\u0000"+
		"\u0000\u0122\u0126\u0003\u0016\u000b\u0000\u0123\u0125\u0005\'\u0000\u0000"+
		"\u0124\u0123\u0001\u0000\u0000\u0000\u0125\u0128\u0001\u0000\u0000\u0000"+
		"\u0126\u0124\u0001\u0000\u0000\u0000\u0126\u0127\u0001\u0000\u0000\u0000"+
		"\u0127\u012a\u0001\u0000\u0000\u0000\u0128\u0126\u0001\u0000\u0000\u0000"+
		"\u0129\u0112\u0001\u0000\u0000\u0000\u0129\u011f\u0001\u0000\u0000\u0000"+
		"\u012a\u001b\u0001\u0000\u0000\u0000\u012b\u012c\u0005\u001c\u0000\u0000"+
		"\u012c\u001d\u0001\u0000\u0000\u0000\u012d\u012e\u0005\u0018\u0000\u0000"+
		"\u012e\u001f\u0001\u0000\u0000\u0000\u012f\u0133\u0005 \u0000\u0000\u0130"+
		"\u0132\u0003\"\u0011\u0000\u0131\u0130\u0001\u0000\u0000\u0000\u0132\u0135"+
		"\u0001\u0000\u0000\u0000\u0133\u0131\u0001\u0000\u0000\u0000\u0133\u0134"+
		"\u0001\u0000\u0000\u0000\u0134!\u0001\u0000\u0000\u0000\u0135\u0133\u0001"+
		"\u0000\u0000\u0000\u0136\u0138\u0005\'\u0000\u0000\u0137\u0136\u0001\u0000"+
		"\u0000\u0000\u0138\u013b\u0001\u0000\u0000\u0000\u0139\u0137\u0001\u0000"+
		"\u0000\u0000\u0139\u013a\u0001\u0000\u0000\u0000\u013a\u013c\u0001\u0000"+
		"\u0000\u0000\u013b\u0139\u0001\u0000\u0000\u0000\u013c\u0140\u0005\u0011"+
		"\u0000\u0000\u013d\u013f\u0005\'\u0000\u0000\u013e\u013d\u0001\u0000\u0000"+
		"\u0000\u013f\u0142\u0001\u0000\u0000\u0000\u0140\u013e\u0001\u0000\u0000"+
		"\u0000\u0140\u0141\u0001\u0000\u0000\u0000\u0141\u0143\u0001\u0000\u0000"+
		"\u0000\u0142\u0140\u0001\u0000\u0000\u0000\u0143\u0144\u0005 \u0000\u0000"+
		"\u0144#\u0001\u0000\u0000\u0000\u0145\u0146\u0007\u0000\u0000\u0000\u0146"+
		"%\u0001\u0000\u0000\u0000\u0147\u0151\u0005\u0019\u0000\u0000\u0148\u014c"+
		"\u0005\u000f\u0000\u0000\u0149\u014b\u0005\'\u0000\u0000\u014a\u0149\u0001"+
		"\u0000\u0000\u0000\u014b\u014e\u0001\u0000\u0000\u0000\u014c\u014a\u0001"+
		"\u0000\u0000\u0000\u014c\u014d\u0001\u0000\u0000\u0000\u014d\u014f\u0001"+
		"\u0000\u0000\u0000\u014e\u014c\u0001\u0000\u0000\u0000\u014f\u0151\u0005"+
		"\u0010\u0000\u0000\u0150\u0147\u0001\u0000\u0000\u0000\u0150\u0148\u0001"+
		"\u0000\u0000\u0000\u0151\'\u0001\u0000\u0000\u0000\u0152\u015c\u0005\u001a"+
		"\u0000\u0000\u0153\u0157\u0005\r\u0000\u0000\u0154\u0156\u0005\'\u0000"+
		"\u0000\u0155\u0154\u0001\u0000\u0000\u0000\u0156\u0159\u0001\u0000\u0000"+
		"\u0000\u0157\u0155\u0001\u0000\u0000\u0000\u0157\u0158\u0001\u0000\u0000"+
		"\u0000\u0158\u015a\u0001\u0000\u0000\u0000\u0159\u0157\u0001\u0000\u0000"+
		"\u0000\u015a\u015c\u0005\u000e\u0000\u0000\u015b\u0152\u0001\u0000\u0000"+
		"\u0000\u015b\u0153\u0001\u0000\u0000\u0000\u015c)\u0001\u0000\u0000\u0000"+
		"\u015d\u015f\u0005/\u0000\u0000\u015e\u015d\u0001\u0000\u0000\u0000\u015e"+
		"\u015f\u0001\u0000\u0000\u0000\u015f\u0161\u0001\u0000\u0000\u0000\u0160"+
		"\u0162\u0005)\u0000\u0000\u0161\u0160\u0001\u0000\u0000\u0000\u0161\u0162"+
		"\u0001\u0000\u0000\u0000\u0162\u0163\u0001\u0000\u0000\u0000\u0163\u0165"+
		"\u0005\t\u0000\u0000\u0164\u0166\u0005)\u0000\u0000\u0165\u0164\u0001"+
		"\u0000\u0000\u0000\u0165\u0166\u0001\u0000\u0000\u0000\u0166\u0169\u0001"+
		"\u0000\u0000\u0000\u0167\u016a\u0003\f\u0006\u0000\u0168\u016a\u0005/"+
		"\u0000\u0000\u0169\u0167\u0001\u0000\u0000\u0000\u0169\u0168\u0001\u0000"+
		"\u0000\u0000\u016a\u016c\u0001\u0000\u0000\u0000\u016b\u016d\u0005\'\u0000"+
		"\u0000\u016c\u016b\u0001\u0000\u0000\u0000\u016c\u016d\u0001\u0000\u0000"+
		"\u0000\u016d+\u0001\u0000\u0000\u0000>-28<AGMRVY\\dglotx|\u007f\u0084"+
		"\u0089\u008c\u0091\u0094\u0099\u00a1\u00a7\u00ae\u00b5\u00bc\u00bf\u00c6"+
		"\u00cc\u00d0\u00d6\u00d9\u00dd\u00e3\u00ea\u00f0\u00f7\u0100\u0103\u0107"+
		"\u010d\u0112\u0119\u011f\u0126\u0129\u0133\u0139\u0140\u014c\u0150\u0157"+
		"\u015b\u015e\u0161\u0165\u0169\u016c";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}