

PARSER_FILE=grammar/v1.0.0-rc.3/YiniParser.g4
LEXER_FILE=grammar/v1.0.0-rc.3/YiniLexer.g4

ANTLR4=libs/antlr4/antlr-4.13.2-complete.jar

# Output dir for ANTLR.
DIR_OUTPUT=src/grammar/generated

START_RULE="yini"

generate:
	@echo off
	echo Generate sources for the grammar...
	java -jar $(ANTLR4) \
		-Dlanguage=TypeScript \
		-no-listener -visitor \
		-o $(DIR_OUTPUT) \
		$(LEXER_FILE) \
		$(PARSER_FILE)

	echo Done.

ci-generate:
	echo Generate sources for the grammar...
	java -jar $(ANTLR4) \
		-Dlanguage=TypeScript \
		-no-listener -visitor \
		-o $(DIR_OUTPUT) \
		$(LEXER_FILE) \
		$(PARSER_FILE)
		
	echo Done.

# Two-phase generation (lexer first, then parser with -lib),
# due to CI issue with not seeing tokens in the parser.
# ci-generate:
# 	echo Generates lexer...
# 	java -jar $(ANTLR4) \
# 		-Dlanguage=TypeScript \
# 		-no-listener -visitor \
# 		-o $(DIR_OUTPUT) \
# 		$(LEXER_FILE)

# 	echo "Generates parser (with tokenVocab from generated dir)..."
# 	java -jar $(ANTLR4) \
# 		-Dlanguage=TypeScript \
# 		-no-listener -visitor \
# 		-o $(DIR_OUTPUT) \
# 		-lib $(DIR_OUTPUT) \
# 		$(PARSER_FILE)
# 	echo Done.

# ci-gen-lexer:
# 	echo Generates lexer...
# 	java -jar $(ANTLR4) \
# 		-Dlanguage=TypeScript \
# 		-no-listener -visitor \
# 		-o $(DIR_OUTPUT) \
# 		$(LEXER_FILE)

# ci-gen-parser:
# 	echo "Generates parser (with tokenVocab from generated dir)..."
# 	java -jar $(ANTLR4) \
# 		-Dlanguage=TypeScript \
# 		-no-listener -visitor \
# 		-o $(DIR_OUTPUT) \
# 		-lib $(DIR_OUTPUT) \
# 		$(PARSER_FILE)

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