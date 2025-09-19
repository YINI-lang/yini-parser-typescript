

PARSER_FILE=./grammar/v1.0.0-rc.3/YiniParser.g4
LEXER_FILE=./grammar/v1.0.0-rc.3/YiniLexer.g4

ANTLR_JAR=./libs/antlr4/antlr-4.13.2-complete.jar

# Output dir for ANTLR.
DIR_OUTPUT=./src/grammar/generated

START_RULE="yini"

# NOTE: Below does not seem to work!!
antlr-help:
	java -jar $(ANTLR_JAR) -help

generate:
	@echo off
	echo Generate sources for the grammar...
	java -jar $(ANTLR_JAR) \
		-Dlanguage=TypeScript \
		-no-listener -visitor \
		-o $(DIR_OUTPUT) \
		$(LEXER_FILE) \
		$(PARSER_FILE)

	echo Done.

ci-generate: ci-gen-lexer ci-gen-parser
	@echo "Generation done."
# 	echo Generate sources for the grammar...
# 	java -Xmx1g -jar $(ANTLR_JAR) \
# 		-Dlanguage=TypeScript \
# 		-no-listener -visitor \
# 		-o $(DIR_OUTPUT) \
# 		-lib $(DIR_OUTPUT) \
# 		-Xlog \
# 		$(LEXER_FILE) \
# 		$(PARSER_FILE)
		
# 	echo Done.

# Two-phase generation (lexer first, then parser with -lib),
# due to CI issue with not seeing tokens in the parser.
# ci-generate:
# 	echo Generates lexer...
# 	java -jar $(ANTLR_JAR) \
# 		-Dlanguage=TypeScript \
# 		-no-listener -visitor \
# 		-o $(DIR_OUTPUT) \
# 		$(LEXER_FILE)

# 	echo "Generates parser (with tokenVocab from generated dir)..."
# 	java -jar $(ANTLR_JAR) \
# 		-Dlanguage=TypeScript \
# 		-no-listener -visitor \
# 		-o $(DIR_OUTPUT) \
# 		-lib $(DIR_OUTPUT) \
# 		$(PARSER_FILE)
# 	echo Done.

## Note: -Xexact-output-dir after output dir
ci-gen-lexer:
	@echo "Generates lexer (forces tokens into $(OUT_DIR))..."
	java -Xmx1g -jar $(ANTLR_JAR) \
		-Dlanguage=TypeScript \
		-no-listener -visitor \
		-o $(DIR_OUTPUT) -Xexact-output-dir \
		$(LEXER_FILE)

	@echo "Contents of $(OUT_DIR):"
	@ls -la $(OUT_DIR)
	@test -f "$(OUT_DIR)/YiniLexer.tokens" || \
		( echo "::error::Missing $(OUT_DIR)/YiniLexer.tokens after lexer generation"; exit 2 )

ci-gen-parser:
	@echo "Generates parser (using tokenVocab from $(OUT_DIR))..."
	java -Xmx1g -jar $(ANTLR_JAR) \
		-Dlanguage=TypeScript \
		-no-listener -visitor \
		-o $(DIR_OUTPUT) \
		-lib $(DIR_OUTPUT) \
		$(PARSER_FILE)

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