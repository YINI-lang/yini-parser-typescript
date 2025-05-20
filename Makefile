
PARSER_FILE=specs/v1.0.0-beta.6/YiniParser.g4
LEXER_FILE=specs/v1.0.0-beta.6/YiniLexer.g4

# Output dir for ANTL.
DIR_OUTPUT=src/grammar

START_RULE="yini"

generate:
	@echo off
	echo Generate sources for the grammar...
	antlr4 -o $(DIR_OUTPUT) -Dlanguage=TypeScript $(PARSER_FILE) $(LEXER_FILE) -no-listener -visitor

# to-sources:
#	copy gen-output/* src/grammar

tokens:
# antlr4-parse $PATH_PARSER $PATH_LEXER $START_RULE sample.yini -tokens
	antlr4-parse $(PARSER_FILE) $(LEXER_FILE) $(START_RULE) sample.yini -tokens

cls-gen:
	del "gen-output"