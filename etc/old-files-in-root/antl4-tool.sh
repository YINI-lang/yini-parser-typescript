# Type in bash shell:
# 	bash antl3-tool.sh

#java -jar libs/antlr4/antlr-4.13.2-complete.jar


PARSER_FILE=specs/v1.0.0-beta.3/YiniParser.g4
LEXER_FILE=specs/v1.0.0-beta.3/YiniLexer.g4

#antlr4 -o gen-output Dlanguage=TypeScript -lib specs/v1.0.0-beta.3/ YiniParser.g4 YiniLexer.g4

antlr4 -o gen-output -Dlanguage=TypeScript specs/v1.0.0-beta.3/YiniParser.g4 specs/v1.0.0-beta.3/YiniLexer.g4 -no-listener -visitor


