
PARSER_FILE=specs/v1.0.0-beta.3/YiniParser.g4
LEXER_FILE=specs/v1.0.0-beta.3/YiniLexer.g4

# Output dir for ANTL.
DIR_OUTPUT=src/grammar

generate:
	@echo off
	echo Generate sources for the grammar...
	antlr4 -o $(DIR_OUTPUT) -Dlanguage=TypeScript specs/v1.0.0-beta.4/YiniParser.g4 specs/v1.0.0-beta.4/YiniLexer.g4 -no-listener -visitor

# to-sources:
#	copy gen-output/* src/grammar

cls-gen:
	del "gen-output"