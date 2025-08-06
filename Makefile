

PARSER_FILE=grammar/v1.0.0-rc.2x/YiniParser.g4
LEXER_FILE=grammar/v1.0.0-rc.2x/YiniLexer.g4

ANTLR4=libs/antlr4/antlr-4.13.2-complete.jar

# Output dir for ANTLR.
DIR_OUTPUT=src/grammar

START_RULE="yini"

generate:
	@echo off
	echo Generate sources for the grammar...
	java -jar $(ANTLR4) -o $(DIR_OUTPUT) -Dlanguage=TypeScript $(PARSER_FILE) $(LEXER_FILE) -no-listener -visitor
	echo Done.

# Invoking a Python wrapper for ANTLR (antlr4),  which tries to automatically
# detect or download the latest ANTLR version from the internet via Maven.
# And then generate.
update-generate:
	@echo off
	echo Generate sources for the grammar...
	antlr4 -o $(DIR_OUTPUT) -Dlanguage=TypeScript $(PARSER_FILE) $(LEXER_FILE) -no-listener -visitor
	echo Done.

# to-sources:
#	copy gen-output/* src/grammar

tokens:
# antlr4-parse $PATH_PARSER $PATH_LEXER $START_RULE sample.yini -tokens
	antlr4-parse $(PARSER_FILE) $(LEXER_FILE) $(START_RULE) sample.yini -tokens

cls-gen:
	del "gen-output"