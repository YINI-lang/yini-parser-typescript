/*
 YINI grammar in ANTLR 4.
 
 Apache License, Version 2.0, January 2004,
 http://www.apache.org/licenses/
 Copyright 2024-2025 Gothenburg, Marko K. S. (Sweden via
 Finland).
 */

/* 
 This grammar aims to follow, as closely as possible,
 the YINI format specification version:
 v1.0.0 Beta 6 + Updates
 
 Feedback, bug reports and improvements are welcomed here
 https://github.com/YINI-lang/YINI-spec
 
 http://yini-lang.org
 */

lexer grammar YiniLexer;

/*
 DISABLE_LINE:
 Skip lines starting with `--`.
 NOTE: Must at very top of lexer rules.
 */
DISABLE_LINE: ('--' ~[\r\n]*) -> skip;

fragment EBD: ('0' | '1') ('0' | '1') ('0' | '1');

// COMMENT: BLOCK_COMMENT | LINE_COMMENT;

//SECTION_HEAD: HASH+ [ \t]+ WS* IDENT NL+;
SECTION_HEAD: [ \t]* SECTION_MARKER [ \t]* WS* IDENT NL+;

// Section markers: '^', '~', '§', '€'.
// – Up to six repeated markers are allowed (the parser must enforce the ≤ 6 rule).
// – For levels beyond 6, use the numeric shorthand form (e.g. ^7, ~12, §100, €42).
fragment SECTION_MARKER
    : SECTION_MARKER_BASIC_REPEAT
    | SECTION_MARKER_SHORTHAND
    ;

// Match one or more of the same marker.  Parser must check "count ≤ 6.",
// this check is deferred to the parser, which
// gives more control and enables better user feedback
fragment SECTION_MARKER_BASIC_REPEAT
    : CARET+   // up to 6 carets (parser will reject more than 6)
    | TILDE+   // up to 6 tildes
    | SS+      // up to 6 '§' characters
    | EUR+     // up to 6 '€' characters
    ;

// Shorthand: a single marker followed by a positive integer (1 or larger).
// Examples: ^7, ~12, §100, €42
fragment SECTION_MARKER_SHORTHAND
    : (CARET | TILDE | SS | EUR) [1-9] DIGIT*
    ;

TERMINAL_TOKEN options {
	caseInsensitive = true;
}: '/END';

SS: '\u00A7'; // Section sign §.
EUR: '\u20AC'; // Euro sign €.
CARET: '^';
TILDE: '~';
GT: '>'; // Greater Than.

EQ: '=';
HASH: '#';
COMMA: ',';
COLON: ':';
OB: '['; // Opening Bracket.
CB: ']'; // Closing Bracket.
OC: '{'; // Opening Curly Brace.
CC: '}'; // Closing Curly Brace.
PLUS: '+';
DOLLAR: '$';
// ASTERIX: '*';
PC: '%'; // PerCent sign.
AT: '@';
SEMICOLON: ';';

BOOLEAN_FALSE options {
	caseInsensitive = true;
}: 'false' | 'off' | 'no';

BOOLEAN_TRUE options {
	caseInsensitive = true;
}: 'true' | 'on' | 'yes';

NULL options {
	caseInsensitive = true;
}: 'null';

EMPTY_OBJECT: '{' '}';
EMPTY_LIST: '[' ']';

SHEBANG: '#!' ~[\n\r\b\f\t]* NL;

KEY: IDENT;

IDENT: ('a' ..'z' | 'A' ..'Z' | '_') (
		'a' ..'z'
		| 'A' ..'Z'
		| '0' ..'9'
		| '_'
	)*
	| IDENT_BACKTICKED;

IDENT_BACKTICKED: '`' ~[\u0000-\u001F`]* '`'; // No newlines, tabs, or C0 controls.

NUMBER:
	INTEGER ('.' INTEGER?)? EXPONENT?
	| SIGN? '.' DIGIT+ EXPONENT?
	| SIGN? (
		BIN_INTEGER
		| OCT_INTEGER // Make sure to not clash with boolean ON | OFF.
		| DUO_INTEGER
		| HEX_INTEGER
	);

// Illegal prefix characters and characters inside strings are deferred to the
// parser, which gives more control and enables better user feedback (e.g.,
// pinpointing the exact location of invalid characters, etc).

// STRING:
// 	RAW_STRING
// 	| HYPER_STRING
// 	| CLASSIC_STRING
// 	| TRIPLE_QUOTED_STRING
// 	| C_TRIPLE_QUOTED_STRING;
STRING
    : TRIPLE_QUOTED_STRING
    | SINGLE_OR_DOUBLE
    ;

TRIPLE_QUOTED_STRING:
	//'"""' (~["] | '"' ~["] | '""' ~["])* '"""';
	[RrCc]? '"""' .*? '"""'
	; // Greedy-safe because of .*? (non-greedy).

SINGLE_OR_DOUBLE:
	R_AND_C_STRING
	| HYPER_STRING
	;

// C_TRIPLE_QUOTED_STRING: [Cc] '"""' (ESC_SEQ | ~["])* '"""';

// Raw string literal, treats the backslash character (\) as a literal.
// RAW_STRING:
// 	//('r' | 'R')? '\'' ~(['\n\r\b\f\t])* '\'' | ('r' | 'R')? '"' ~(["\n\r\b\f\t])* '"';
// 	[Rr]? '\'' ~['\r\n]* '\''
// 	| [Rr]? '"'
// 		 ~["\r\n]* '"';

// Classic string literal.
// CLASSIC_STRING:
// 	[Cc] '\'' (ESC_SEQ | ~[\u0000-\u001F '])* '\''
//   	| [Cc] '"'
//     	(ESC_SEQ | ~[\u0000-\u001F "])* '"';

/**
 * Common rule for RAW and CLASSIC string literals.
 * Illegal characters are deferred to the parser, which gives more control
 * and enables better user feedback (e.g., pinpointing the exact location of
 * invalid characters). Additionally, this simplifies the lexer rule.
 *
 * Rather than having the lexer reject on any "illegal" character, lets the
 * parser catch it so you can give a more precise error message. 
 *
 * @note If refactoring rule(s), make sure C-strings can include \' and \" as well.
 */
R_AND_C_STRING:
	[RrCc]? '\'' 	('\\\'' | ~['\r\n])* '\''
	| [RrCc]? '"'	('\\"' | ~["\r\n])* '"';


// Hyper string literal.
HYPER_STRING: [Hh] '\'' (~['])* '\''
	| [Hh] '"' ( ~["])* '"';

// Note: Like 8.2 in specification.
ESC_SEQ: '\\' (["']) | ESC_SEQ_BASE;

// Note: Except does'n not include quotes `"`, `'`.
ESC_SEQ_BASE: '\\' ([\\0?abfnrtv] | UNICODE16 | UNICODE32);
// TODO: Add support for \oOOO (up to 3 digits, valid range \o0 – \o377)

fragment UNICODE16: 'u' HEX_DIGIT HEX_DIGIT HEX_DIGIT HEX_DIGIT;
fragment UNICODE32:
	'U' HEX_DIGIT HEX_DIGIT HEX_DIGIT HEX_DIGIT HEX_DIGIT HEX_DIGIT HEX_DIGIT HEX_DIGIT;

fragment INTEGER: DECIMAL_INTEGER;

// Note: 0 or higher than 1, no leading 0s allowed (for ex: `01`)
fragment DECIMAL_INTEGER: '0' | SIGN? [1-9] DIGIT*;

fragment BIN_INTEGER: ('0' ('b' | 'B') BIN_DIGIT+)
	| ('%' BIN_DIGIT+);
fragment OCT_INTEGER:
	'0' ('o' | 'O') OCT_DIGIT+; // Make sure to not clash with boolean ON | OFF.
fragment DUO_INTEGER: '0' ('z' | 'Z') DUO_DIGIT+;
fragment HEX_INTEGER: ('0' ('x' | 'X') HEX_DIGIT+)
	| ('#' HEX_DIGIT+);

fragment DIGIT: [0-9];

fragment BIN_DIGIT: '0' | '1';
fragment OCT_DIGIT: [0-7];
fragment DUO_DIGIT: DIGIT | [xe] | [XE]; // x = 10, e = 11.
fragment HEX_DIGIT: DIGIT | [a-f] | [A-F];

fragment FRACTION: '.' DIGIT+;

fragment EXPONENT: ('e' | 'E') SIGN? DIGIT+;

fragment SIGN: ('+' | '-');

NL: ( WS* COMMENT* SINGLE_NL COMMENT*);

SINGLE_NL: ('\r' '\n'? | '\n');

WS: [ \t]+ -> skip;

/*
 BLOCK_COMMENT:
 Can appear anywhere, spanning multiple lines.
 Remains in input, but hidden
 (doesn't interfere with parsing).
 */
BLOCK_COMMENT:
	'/*' .*? '*/' -> channel(HIDDEN); // Block AKA Multi-line comment.
	
COMMENT: LINE_COMMENT | INLINE_COMMENT | BLOCK_COMMENT;
/*
 FULL_LINE_COMMENT:
 Remains in input, but hidden
 (doesn't interfere with parsing).
 */
LINE_COMMENT: (';' ~[\r\n]*) -> channel(HIDDEN);

/*
 INLINE_COMMENT: 
 Remains in input, but hidden (doesn't interfere with parsing).
 */
INLINE_COMMENT: ('//' | '#' [ \t]+) ~[\r\n]* -> channel(HIDDEN);
