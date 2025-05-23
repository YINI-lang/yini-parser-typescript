// Generated from specs/v1.0.0-beta.6/YiniLexer.g4 by ANTLR 4.13.2
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols
import {
	ATN,
	ATNDeserializer,
	CharStream,
	DecisionState, DFA,
	Lexer,
	LexerATNSimulator,
	RuleContext,
	PredictionContextCache,
	Token
} from "antlr4";
export default class YiniLexer extends Lexer {
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
	public static readonly EOF = Token.EOF;

	public static readonly channelNames: string[] = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];
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
	public static readonly modeNames: string[] = [ "DEFAULT_MODE", ];

	public static readonly ruleNames: string[] = [
		"EBD", "SECTION_HEAD", "SECTION_MARKER", "TERMINAL_TOKEN", "SS", "EUR", 
		"CARET", "TILDE", "GT", "EQ", "HASH", "COMMA", "COLON", "OB", "CB", "PLUS", 
		"DOLLAR", "PC", "AT", "SEMICOLON", "BOOLEAN_FALSE", "BOOLEAN_TRUE", "NULL", 
		"EMPTY_LIST", "SHEBANG", "KEY", "IDENT", "PHRASE", "NUMBER", "STRING", 
		"RAW_STRING", "HYPER_STRING", "CLASSIC_STRING", "TRIPLE_QUOTED_STRING", 
		"ESC_SEQ", "ESC_SEQ_BASE", "UNICODE16", "UNICODE32", "INTEGER", "DECIMAL_INTEGER", 
		"BIN_INTEGER", "OCT_INTEGER", "DUO_INTEGER", "HEX_INTEGER", "DIGIT", "BIN_DIGIT", 
		"OCT_DIGIT", "DUO_DIGIT", "HEX_DIGIT", "FRACTION", "EXPONENT", "SIGN", 
		"NL", "SINGLE_NL", "WS", "DISABLE_LINE", "COMMENT", "LINE_COMMENT", "INLINE_COMMENT", 
		"BLOCK_COMMENT",
	];


	constructor(input: CharStream) {
		super(input);
		this._interp = new LexerATNSimulator(this, YiniLexer._ATN, YiniLexer.DecisionsToDFA, new PredictionContextCache());
	}

	public get grammarFileName(): string { return "YiniLexer.g4"; }

	public get literalNames(): (string | null)[] { return YiniLexer.literalNames; }
	public get symbolicNames(): (string | null)[] { return YiniLexer.symbolicNames; }
	public get ruleNames(): string[] { return YiniLexer.ruleNames; }

	public get serializedATN(): number[] { return YiniLexer._serializedATN; }

	public get channelNames(): string[] { return YiniLexer.channelNames; }

	public get modeNames(): string[] { return YiniLexer.modeNames; }

	public static readonly _serializedATN: number[] = [4,0,42,598,6,-1,2,0,
	7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,
	7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,
	16,2,17,7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,
	2,24,7,24,2,25,7,25,2,26,7,26,2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,
	31,7,31,2,32,7,32,2,33,7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,
	7,38,2,39,7,39,2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,
	45,2,46,7,46,2,47,7,47,2,48,7,48,2,49,7,49,2,50,7,50,2,51,7,51,2,52,7,52,
	2,53,7,53,2,54,7,54,2,55,7,55,2,56,7,56,2,57,7,57,2,58,7,58,2,59,7,59,1,
	0,1,0,1,0,1,0,1,1,1,1,5,1,128,8,1,10,1,12,1,131,9,1,1,1,5,1,134,8,1,10,
	1,12,1,137,9,1,1,1,1,1,4,1,141,8,1,11,1,12,1,142,1,2,4,2,146,8,2,11,2,12,
	2,147,1,2,4,2,151,8,2,11,2,12,2,152,1,2,4,2,156,8,2,11,2,12,2,157,1,2,4,
	2,161,8,2,11,2,12,2,162,3,2,165,8,2,1,3,1,3,1,3,1,3,1,3,1,4,1,4,1,5,1,5,
	1,6,1,6,1,7,1,7,1,8,1,8,1,9,1,9,1,10,1,10,1,11,1,11,1,12,1,12,1,13,1,13,
	1,14,1,14,1,15,1,15,1,16,1,16,1,17,1,17,1,18,1,18,1,19,1,19,1,20,1,20,1,
	20,1,20,1,20,1,20,1,20,1,20,1,20,1,20,3,20,214,8,20,1,21,1,21,1,21,1,21,
	1,21,1,21,1,21,1,21,1,21,3,21,225,8,21,1,22,1,22,1,22,1,22,1,22,1,23,1,
	23,1,23,1,24,1,24,1,24,1,24,5,24,239,8,24,10,24,12,24,242,9,24,1,24,1,24,
	1,25,1,25,1,26,1,26,5,26,250,8,26,10,26,12,26,253,9,26,1,26,3,26,256,8,
	26,1,27,1,27,5,27,260,8,27,10,27,12,27,263,9,27,1,27,1,27,1,28,1,28,1,28,
	3,28,270,8,28,3,28,272,8,28,1,28,3,28,275,8,28,1,28,3,28,278,8,28,1,28,
	1,28,4,28,282,8,28,11,28,12,28,283,1,28,3,28,287,8,28,1,28,3,28,290,8,28,
	1,28,1,28,1,28,1,28,3,28,296,8,28,3,28,298,8,28,1,29,1,29,1,29,1,29,3,29,
	304,8,29,1,30,3,30,307,8,30,1,30,1,30,5,30,311,8,30,10,30,12,30,314,9,30,
	1,30,1,30,3,30,318,8,30,1,30,1,30,5,30,322,8,30,10,30,12,30,325,9,30,1,
	30,3,30,328,8,30,1,31,1,31,1,31,5,31,333,8,31,10,31,12,31,336,9,31,1,31,
	1,31,1,31,1,31,5,31,342,8,31,10,31,12,31,345,9,31,1,31,3,31,348,8,31,1,
	32,1,32,1,32,1,32,5,32,354,8,32,10,32,12,32,357,9,32,1,32,1,32,1,32,1,32,
	1,32,5,32,364,8,32,10,32,12,32,367,9,32,1,32,3,32,370,8,32,1,33,1,33,1,
	33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,5,33,383,8,33,10,33,12,33,386,
	9,33,1,33,1,33,1,33,1,33,1,34,1,34,1,34,3,34,395,8,34,1,35,1,35,1,35,1,
	35,3,35,401,8,35,1,36,1,36,1,36,1,36,1,36,1,36,1,37,1,37,1,37,1,37,1,37,
	1,37,1,37,1,37,1,37,1,37,1,38,1,38,1,39,1,39,3,39,423,8,39,1,39,1,39,5,
	39,427,8,39,10,39,12,39,430,9,39,3,39,432,8,39,1,40,1,40,1,40,4,40,437,
	8,40,11,40,12,40,438,1,40,1,40,4,40,443,8,40,11,40,12,40,444,3,40,447,8,
	40,1,41,1,41,1,41,4,41,452,8,41,11,41,12,41,453,1,42,1,42,1,42,4,42,459,
	8,42,11,42,12,42,460,1,43,1,43,1,43,4,43,466,8,43,11,43,12,43,467,1,43,
	1,43,4,43,472,8,43,11,43,12,43,473,3,43,476,8,43,1,44,1,44,1,45,1,45,1,
	46,1,46,1,47,1,47,3,47,486,8,47,1,48,1,48,3,48,490,8,48,1,49,1,49,4,49,
	494,8,49,11,49,12,49,495,1,50,1,50,3,50,500,8,50,1,50,4,50,503,8,50,11,
	50,12,50,504,1,51,1,51,1,52,5,52,510,8,52,10,52,12,52,513,9,52,1,52,5,52,
	516,8,52,10,52,12,52,519,9,52,1,52,1,52,5,52,523,8,52,10,52,12,52,526,9,
	52,1,53,1,53,3,53,530,8,53,1,53,3,53,533,8,53,1,54,4,54,536,8,54,11,54,
	12,54,537,1,54,1,54,1,55,1,55,1,55,1,55,5,55,546,8,55,10,55,12,55,549,9,
	55,1,55,1,55,1,56,1,56,1,56,3,56,556,8,56,1,57,1,57,5,57,560,8,57,10,57,
	12,57,563,9,57,1,57,1,57,1,58,1,58,1,58,1,58,4,58,571,8,58,11,58,12,58,
	572,3,58,575,8,58,1,58,5,58,578,8,58,10,58,12,58,581,9,58,1,58,1,58,1,59,
	1,59,1,59,1,59,5,59,589,8,59,10,59,12,59,592,9,59,1,59,1,59,1,59,1,59,1,
	59,1,590,0,60,1,0,3,1,5,0,7,2,9,3,11,4,13,5,15,6,17,7,19,8,21,9,23,10,25,
	11,27,12,29,13,31,14,33,15,35,16,37,17,39,18,41,19,43,20,45,21,47,22,49,
	23,51,24,53,25,55,26,57,27,59,28,61,29,63,30,65,31,67,32,69,33,71,34,73,
	0,75,0,77,0,79,0,81,0,83,0,85,0,87,0,89,0,91,0,93,0,95,0,97,0,99,0,101,
	0,103,0,105,35,107,36,109,37,111,38,113,39,115,40,117,41,119,42,1,0,34,
	2,0,9,9,32,32,2,0,69,69,101,101,2,0,78,78,110,110,2,0,68,68,100,100,2,0,
	70,70,102,102,2,0,65,65,97,97,2,0,76,76,108,108,2,0,83,83,115,115,2,0,79,
	79,111,111,2,0,84,84,116,116,2,0,82,82,114,114,2,0,85,85,117,117,2,0,89,
	89,121,121,2,0,8,10,12,13,3,0,65,90,95,95,97,122,4,0,48,57,65,90,95,95,
	97,122,2,0,10,10,13,13,3,0,10,10,13,13,39,39,3,0,10,10,13,13,34,34,2,0,
	72,72,104,104,1,0,39,39,1,0,34,34,2,0,67,67,99,99,2,0,34,34,39,39,9,0,48,
	48,63,63,92,92,97,98,102,102,110,110,114,114,116,116,118,118,1,0,49,57,
	2,0,66,66,98,98,2,0,90,90,122,122,2,0,88,88,120,120,1,0,48,57,1,0,48,55,
	4,0,69,69,88,88,101,101,120,120,2,0,65,70,97,102,2,0,43,43,45,45,661,0,
	3,1,0,0,0,0,7,1,0,0,0,0,9,1,0,0,0,0,11,1,0,0,0,0,13,1,0,0,0,0,15,1,0,0,
	0,0,17,1,0,0,0,0,19,1,0,0,0,0,21,1,0,0,0,0,23,1,0,0,0,0,25,1,0,0,0,0,27,
	1,0,0,0,0,29,1,0,0,0,0,31,1,0,0,0,0,33,1,0,0,0,0,35,1,0,0,0,0,37,1,0,0,
	0,0,39,1,0,0,0,0,41,1,0,0,0,0,43,1,0,0,0,0,45,1,0,0,0,0,47,1,0,0,0,0,49,
	1,0,0,0,0,51,1,0,0,0,0,53,1,0,0,0,0,55,1,0,0,0,0,57,1,0,0,0,0,59,1,0,0,
	0,0,61,1,0,0,0,0,63,1,0,0,0,0,65,1,0,0,0,0,67,1,0,0,0,0,69,1,0,0,0,0,71,
	1,0,0,0,0,105,1,0,0,0,0,107,1,0,0,0,0,109,1,0,0,0,0,111,1,0,0,0,0,113,1,
	0,0,0,0,115,1,0,0,0,0,117,1,0,0,0,0,119,1,0,0,0,1,121,1,0,0,0,3,125,1,0,
	0,0,5,164,1,0,0,0,7,166,1,0,0,0,9,171,1,0,0,0,11,173,1,0,0,0,13,175,1,0,
	0,0,15,177,1,0,0,0,17,179,1,0,0,0,19,181,1,0,0,0,21,183,1,0,0,0,23,185,
	1,0,0,0,25,187,1,0,0,0,27,189,1,0,0,0,29,191,1,0,0,0,31,193,1,0,0,0,33,
	195,1,0,0,0,35,197,1,0,0,0,37,199,1,0,0,0,39,201,1,0,0,0,41,213,1,0,0,0,
	43,224,1,0,0,0,45,226,1,0,0,0,47,231,1,0,0,0,49,234,1,0,0,0,51,245,1,0,
	0,0,53,255,1,0,0,0,55,257,1,0,0,0,57,297,1,0,0,0,59,303,1,0,0,0,61,327,
	1,0,0,0,63,347,1,0,0,0,65,369,1,0,0,0,67,371,1,0,0,0,69,394,1,0,0,0,71,
	396,1,0,0,0,73,402,1,0,0,0,75,408,1,0,0,0,77,418,1,0,0,0,79,431,1,0,0,0,
	81,446,1,0,0,0,83,448,1,0,0,0,85,455,1,0,0,0,87,475,1,0,0,0,89,477,1,0,
	0,0,91,479,1,0,0,0,93,481,1,0,0,0,95,485,1,0,0,0,97,489,1,0,0,0,99,491,
	1,0,0,0,101,497,1,0,0,0,103,506,1,0,0,0,105,511,1,0,0,0,107,532,1,0,0,0,
	109,535,1,0,0,0,111,541,1,0,0,0,113,555,1,0,0,0,115,557,1,0,0,0,117,574,
	1,0,0,0,119,584,1,0,0,0,121,122,2,48,49,0,122,123,2,48,49,0,123,124,2,48,
	49,0,124,2,1,0,0,0,125,129,3,5,2,0,126,128,7,0,0,0,127,126,1,0,0,0,128,
	131,1,0,0,0,129,127,1,0,0,0,129,130,1,0,0,0,130,135,1,0,0,0,131,129,1,0,
	0,0,132,134,3,109,54,0,133,132,1,0,0,0,134,137,1,0,0,0,135,133,1,0,0,0,
	135,136,1,0,0,0,136,138,1,0,0,0,137,135,1,0,0,0,138,140,3,53,26,0,139,141,
	3,105,52,0,140,139,1,0,0,0,141,142,1,0,0,0,142,140,1,0,0,0,142,143,1,0,
	0,0,143,4,1,0,0,0,144,146,3,13,6,0,145,144,1,0,0,0,146,147,1,0,0,0,147,
	145,1,0,0,0,147,148,1,0,0,0,148,165,1,0,0,0,149,151,3,15,7,0,150,149,1,
	0,0,0,151,152,1,0,0,0,152,150,1,0,0,0,152,153,1,0,0,0,153,165,1,0,0,0,154,
	156,3,9,4,0,155,154,1,0,0,0,156,157,1,0,0,0,157,155,1,0,0,0,157,158,1,0,
	0,0,158,165,1,0,0,0,159,161,3,11,5,0,160,159,1,0,0,0,161,162,1,0,0,0,162,
	160,1,0,0,0,162,163,1,0,0,0,163,165,1,0,0,0,164,145,1,0,0,0,164,150,1,0,
	0,0,164,155,1,0,0,0,164,160,1,0,0,0,165,6,1,0,0,0,166,167,5,47,0,0,167,
	168,7,1,0,0,168,169,7,2,0,0,169,170,7,3,0,0,170,8,1,0,0,0,171,172,5,167,
	0,0,172,10,1,0,0,0,173,174,5,8364,0,0,174,12,1,0,0,0,175,176,5,94,0,0,176,
	14,1,0,0,0,177,178,5,126,0,0,178,16,1,0,0,0,179,180,5,62,0,0,180,18,1,0,
	0,0,181,182,5,61,0,0,182,20,1,0,0,0,183,184,5,35,0,0,184,22,1,0,0,0,185,
	186,5,44,0,0,186,24,1,0,0,0,187,188,5,58,0,0,188,26,1,0,0,0,189,190,5,91,
	0,0,190,28,1,0,0,0,191,192,5,93,0,0,192,30,1,0,0,0,193,194,5,43,0,0,194,
	32,1,0,0,0,195,196,5,36,0,0,196,34,1,0,0,0,197,198,5,37,0,0,198,36,1,0,
	0,0,199,200,5,64,0,0,200,38,1,0,0,0,201,202,5,59,0,0,202,40,1,0,0,0,203,
	204,7,4,0,0,204,205,7,5,0,0,205,206,7,6,0,0,206,207,7,7,0,0,207,214,7,1,
	0,0,208,209,7,8,0,0,209,210,7,4,0,0,210,214,7,4,0,0,211,212,7,2,0,0,212,
	214,7,8,0,0,213,203,1,0,0,0,213,208,1,0,0,0,213,211,1,0,0,0,214,42,1,0,
	0,0,215,216,7,9,0,0,216,217,7,10,0,0,217,218,7,11,0,0,218,225,7,1,0,0,219,
	220,7,8,0,0,220,225,7,2,0,0,221,222,7,12,0,0,222,223,7,1,0,0,223,225,7,
	7,0,0,224,215,1,0,0,0,224,219,1,0,0,0,224,221,1,0,0,0,225,44,1,0,0,0,226,
	227,7,2,0,0,227,228,7,11,0,0,228,229,7,6,0,0,229,230,7,6,0,0,230,46,1,0,
	0,0,231,232,5,91,0,0,232,233,5,93,0,0,233,48,1,0,0,0,234,235,5,35,0,0,235,
	236,5,33,0,0,236,240,1,0,0,0,237,239,8,13,0,0,238,237,1,0,0,0,239,242,1,
	0,0,0,240,238,1,0,0,0,240,241,1,0,0,0,241,243,1,0,0,0,242,240,1,0,0,0,243,
	244,3,105,52,0,244,50,1,0,0,0,245,246,3,53,26,0,246,52,1,0,0,0,247,251,
	7,14,0,0,248,250,7,15,0,0,249,248,1,0,0,0,250,253,1,0,0,0,251,249,1,0,0,
	0,251,252,1,0,0,0,252,256,1,0,0,0,253,251,1,0,0,0,254,256,3,55,27,0,255,
	247,1,0,0,0,255,254,1,0,0,0,256,54,1,0,0,0,257,261,5,96,0,0,258,260,8,16,
	0,0,259,258,1,0,0,0,260,263,1,0,0,0,261,259,1,0,0,0,261,262,1,0,0,0,262,
	264,1,0,0,0,263,261,1,0,0,0,264,265,5,96,0,0,265,56,1,0,0,0,266,271,3,77,
	38,0,267,269,5,46,0,0,268,270,3,77,38,0,269,268,1,0,0,0,269,270,1,0,0,0,
	270,272,1,0,0,0,271,267,1,0,0,0,271,272,1,0,0,0,272,274,1,0,0,0,273,275,
	3,101,50,0,274,273,1,0,0,0,274,275,1,0,0,0,275,298,1,0,0,0,276,278,3,103,
	51,0,277,276,1,0,0,0,277,278,1,0,0,0,278,279,1,0,0,0,279,281,5,46,0,0,280,
	282,3,89,44,0,281,280,1,0,0,0,282,283,1,0,0,0,283,281,1,0,0,0,283,284,1,
	0,0,0,284,286,1,0,0,0,285,287,3,101,50,0,286,285,1,0,0,0,286,287,1,0,0,
	0,287,298,1,0,0,0,288,290,3,103,51,0,289,288,1,0,0,0,289,290,1,0,0,0,290,
	295,1,0,0,0,291,296,3,81,40,0,292,296,3,83,41,0,293,296,3,85,42,0,294,296,
	3,87,43,0,295,291,1,0,0,0,295,292,1,0,0,0,295,293,1,0,0,0,295,294,1,0,0,
	0,296,298,1,0,0,0,297,266,1,0,0,0,297,277,1,0,0,0,297,289,1,0,0,0,298,58,
	1,0,0,0,299,304,3,61,30,0,300,304,3,63,31,0,301,304,3,65,32,0,302,304,3,
	67,33,0,303,299,1,0,0,0,303,300,1,0,0,0,303,301,1,0,0,0,303,302,1,0,0,0,
	304,60,1,0,0,0,305,307,7,10,0,0,306,305,1,0,0,0,306,307,1,0,0,0,307,308,
	1,0,0,0,308,312,5,39,0,0,309,311,8,17,0,0,310,309,1,0,0,0,311,314,1,0,0,
	0,312,310,1,0,0,0,312,313,1,0,0,0,313,315,1,0,0,0,314,312,1,0,0,0,315,328,
	5,39,0,0,316,318,7,10,0,0,317,316,1,0,0,0,317,318,1,0,0,0,318,319,1,0,0,
	0,319,323,5,34,0,0,320,322,8,18,0,0,321,320,1,0,0,0,322,325,1,0,0,0,323,
	321,1,0,0,0,323,324,1,0,0,0,324,326,1,0,0,0,325,323,1,0,0,0,326,328,5,34,
	0,0,327,306,1,0,0,0,327,317,1,0,0,0,328,62,1,0,0,0,329,330,7,19,0,0,330,
	334,5,39,0,0,331,333,8,20,0,0,332,331,1,0,0,0,333,336,1,0,0,0,334,332,1,
	0,0,0,334,335,1,0,0,0,335,337,1,0,0,0,336,334,1,0,0,0,337,348,5,39,0,0,
	338,339,7,19,0,0,339,343,5,34,0,0,340,342,8,21,0,0,341,340,1,0,0,0,342,
	345,1,0,0,0,343,341,1,0,0,0,343,344,1,0,0,0,344,346,1,0,0,0,345,343,1,0,
	0,0,346,348,5,34,0,0,347,329,1,0,0,0,347,338,1,0,0,0,348,64,1,0,0,0,349,
	350,7,22,0,0,350,355,5,39,0,0,351,354,3,69,34,0,352,354,8,20,0,0,353,351,
	1,0,0,0,353,352,1,0,0,0,354,357,1,0,0,0,355,353,1,0,0,0,355,356,1,0,0,0,
	356,358,1,0,0,0,357,355,1,0,0,0,358,370,5,39,0,0,359,360,7,22,0,0,360,365,
	5,34,0,0,361,364,3,69,34,0,362,364,8,21,0,0,363,361,1,0,0,0,363,362,1,0,
	0,0,364,367,1,0,0,0,365,363,1,0,0,0,365,366,1,0,0,0,366,368,1,0,0,0,367,
	365,1,0,0,0,368,370,5,34,0,0,369,349,1,0,0,0,369,359,1,0,0,0,370,66,1,0,
	0,0,371,372,5,34,0,0,372,373,5,34,0,0,373,374,5,34,0,0,374,384,1,0,0,0,
	375,383,8,21,0,0,376,377,5,34,0,0,377,383,8,21,0,0,378,379,5,34,0,0,379,
	380,5,34,0,0,380,381,1,0,0,0,381,383,8,21,0,0,382,375,1,0,0,0,382,376,1,
	0,0,0,382,378,1,0,0,0,383,386,1,0,0,0,384,382,1,0,0,0,384,385,1,0,0,0,385,
	387,1,0,0,0,386,384,1,0,0,0,387,388,5,34,0,0,388,389,5,34,0,0,389,390,5,
	34,0,0,390,68,1,0,0,0,391,392,5,92,0,0,392,395,7,23,0,0,393,395,3,71,35,
	0,394,391,1,0,0,0,394,393,1,0,0,0,395,70,1,0,0,0,396,400,5,92,0,0,397,401,
	7,24,0,0,398,401,3,73,36,0,399,401,3,75,37,0,400,397,1,0,0,0,400,398,1,
	0,0,0,400,399,1,0,0,0,401,72,1,0,0,0,402,403,5,117,0,0,403,404,3,97,48,
	0,404,405,3,97,48,0,405,406,3,97,48,0,406,407,3,97,48,0,407,74,1,0,0,0,
	408,409,5,85,0,0,409,410,3,97,48,0,410,411,3,97,48,0,411,412,3,97,48,0,
	412,413,3,97,48,0,413,414,3,97,48,0,414,415,3,97,48,0,415,416,3,97,48,0,
	416,417,3,97,48,0,417,76,1,0,0,0,418,419,3,79,39,0,419,78,1,0,0,0,420,432,
	5,48,0,0,421,423,3,103,51,0,422,421,1,0,0,0,422,423,1,0,0,0,423,424,1,0,
	0,0,424,428,7,25,0,0,425,427,3,89,44,0,426,425,1,0,0,0,427,430,1,0,0,0,
	428,426,1,0,0,0,428,429,1,0,0,0,429,432,1,0,0,0,430,428,1,0,0,0,431,420,
	1,0,0,0,431,422,1,0,0,0,432,80,1,0,0,0,433,434,5,48,0,0,434,436,7,26,0,
	0,435,437,3,91,45,0,436,435,1,0,0,0,437,438,1,0,0,0,438,436,1,0,0,0,438,
	439,1,0,0,0,439,447,1,0,0,0,440,442,5,37,0,0,441,443,3,91,45,0,442,441,
	1,0,0,0,443,444,1,0,0,0,444,442,1,0,0,0,444,445,1,0,0,0,445,447,1,0,0,0,
	446,433,1,0,0,0,446,440,1,0,0,0,447,82,1,0,0,0,448,449,5,48,0,0,449,451,
	7,8,0,0,450,452,3,93,46,0,451,450,1,0,0,0,452,453,1,0,0,0,453,451,1,0,0,
	0,453,454,1,0,0,0,454,84,1,0,0,0,455,456,5,48,0,0,456,458,7,27,0,0,457,
	459,3,95,47,0,458,457,1,0,0,0,459,460,1,0,0,0,460,458,1,0,0,0,460,461,1,
	0,0,0,461,86,1,0,0,0,462,463,5,48,0,0,463,465,7,28,0,0,464,466,3,97,48,
	0,465,464,1,0,0,0,466,467,1,0,0,0,467,465,1,0,0,0,467,468,1,0,0,0,468,476,
	1,0,0,0,469,471,5,35,0,0,470,472,3,97,48,0,471,470,1,0,0,0,472,473,1,0,
	0,0,473,471,1,0,0,0,473,474,1,0,0,0,474,476,1,0,0,0,475,462,1,0,0,0,475,
	469,1,0,0,0,476,88,1,0,0,0,477,478,7,29,0,0,478,90,1,0,0,0,479,480,2,48,
	49,0,480,92,1,0,0,0,481,482,7,30,0,0,482,94,1,0,0,0,483,486,3,89,44,0,484,
	486,7,31,0,0,485,483,1,0,0,0,485,484,1,0,0,0,486,96,1,0,0,0,487,490,3,89,
	44,0,488,490,7,32,0,0,489,487,1,0,0,0,489,488,1,0,0,0,490,98,1,0,0,0,491,
	493,5,46,0,0,492,494,3,89,44,0,493,492,1,0,0,0,494,495,1,0,0,0,495,493,
	1,0,0,0,495,496,1,0,0,0,496,100,1,0,0,0,497,499,7,1,0,0,498,500,3,103,51,
	0,499,498,1,0,0,0,499,500,1,0,0,0,500,502,1,0,0,0,501,503,3,89,44,0,502,
	501,1,0,0,0,503,504,1,0,0,0,504,502,1,0,0,0,504,505,1,0,0,0,505,102,1,0,
	0,0,506,507,7,33,0,0,507,104,1,0,0,0,508,510,3,109,54,0,509,508,1,0,0,0,
	510,513,1,0,0,0,511,509,1,0,0,0,511,512,1,0,0,0,512,517,1,0,0,0,513,511,
	1,0,0,0,514,516,3,113,56,0,515,514,1,0,0,0,516,519,1,0,0,0,517,515,1,0,
	0,0,517,518,1,0,0,0,518,520,1,0,0,0,519,517,1,0,0,0,520,524,3,107,53,0,
	521,523,3,113,56,0,522,521,1,0,0,0,523,526,1,0,0,0,524,522,1,0,0,0,524,
	525,1,0,0,0,525,106,1,0,0,0,526,524,1,0,0,0,527,529,5,13,0,0,528,530,5,
	10,0,0,529,528,1,0,0,0,529,530,1,0,0,0,530,533,1,0,0,0,531,533,5,10,0,0,
	532,527,1,0,0,0,532,531,1,0,0,0,533,108,1,0,0,0,534,536,7,0,0,0,535,534,
	1,0,0,0,536,537,1,0,0,0,537,535,1,0,0,0,537,538,1,0,0,0,538,539,1,0,0,0,
	539,540,6,54,0,0,540,110,1,0,0,0,541,542,5,45,0,0,542,543,5,45,0,0,543,
	547,1,0,0,0,544,546,8,16,0,0,545,544,1,0,0,0,546,549,1,0,0,0,547,545,1,
	0,0,0,547,548,1,0,0,0,548,550,1,0,0,0,549,547,1,0,0,0,550,551,6,55,0,0,
	551,112,1,0,0,0,552,556,3,115,57,0,553,556,3,117,58,0,554,556,3,119,59,
	0,555,552,1,0,0,0,555,553,1,0,0,0,555,554,1,0,0,0,556,114,1,0,0,0,557,561,
	5,59,0,0,558,560,8,16,0,0,559,558,1,0,0,0,560,563,1,0,0,0,561,559,1,0,0,
	0,561,562,1,0,0,0,562,564,1,0,0,0,563,561,1,0,0,0,564,565,6,57,1,0,565,
	116,1,0,0,0,566,567,5,47,0,0,567,575,5,47,0,0,568,570,5,35,0,0,569,571,
	7,0,0,0,570,569,1,0,0,0,571,572,1,0,0,0,572,570,1,0,0,0,572,573,1,0,0,0,
	573,575,1,0,0,0,574,566,1,0,0,0,574,568,1,0,0,0,575,579,1,0,0,0,576,578,
	8,16,0,0,577,576,1,0,0,0,578,581,1,0,0,0,579,577,1,0,0,0,579,580,1,0,0,
	0,580,582,1,0,0,0,581,579,1,0,0,0,582,583,6,58,1,0,583,118,1,0,0,0,584,
	585,5,47,0,0,585,586,5,42,0,0,586,590,1,0,0,0,587,589,9,0,0,0,588,587,1,
	0,0,0,589,592,1,0,0,0,590,591,1,0,0,0,590,588,1,0,0,0,591,593,1,0,0,0,592,
	590,1,0,0,0,593,594,5,42,0,0,594,595,5,47,0,0,595,596,1,0,0,0,596,597,6,
	59,1,0,597,120,1,0,0,0,71,0,129,135,142,147,152,157,162,164,213,224,240,
	251,255,261,269,271,274,277,283,286,289,295,297,303,306,312,317,323,327,
	334,343,347,353,355,363,365,369,382,384,394,400,422,428,431,438,444,446,
	453,460,467,473,475,485,489,495,499,504,511,517,524,529,532,537,547,555,
	561,572,574,579,590,2,6,0,0,0,1,0];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!YiniLexer.__ATN) {
			YiniLexer.__ATN = new ATNDeserializer().deserialize(YiniLexer._serializedATN);
		}

		return YiniLexer.__ATN;
	}


	static DecisionsToDFA = YiniLexer._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );
}