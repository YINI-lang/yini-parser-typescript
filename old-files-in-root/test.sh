#!/bin/bash

#thelib = "antlr-4.13.2-complete.jar"

#cd Libs/ANTLR4

#java -jar "antlr-4.13.2-complete.jar"
#java -jar $thelib

#cd Grammar-ANTLR4/

#antlr4-parse yini.g4 Samples/Good/Advanced.yini yini -tree
#antlr4-parse yini.g4 yini -tree

# java -jar libs/antlr4/antlr-4.13.2-complete.jar  specs/v1.0.0-beta.3/YiniParser.g4 -tree

# antlr4-parse specs/v1.0.0-beta.3/YiniParser.g4 specs/v1.0.0-beta.3/YiniLexer.g4 sample.yini -tree

# antlr4-parse specs/v1.0.0-beta.3/YiniParser.g4 specs/v1.0.0-beta.3/YiniLexer.g4 yini sample.yini -tokens

echo Runnish this script in Bash...

VER_STR="v1.0.0-beta.3"

SPECS_BASE="specs"

PARSER_FILE="YiniParser.g4"
LEXER_FILE="YiniLexer.g4"

PATH_PARSER=$SPECS_BASE/$VER_STR/$PARSER_FILE
PATH_LEXER=$SPECS_BASE/$VER_STR/$LEXER_FILE

START_RULE="yini"

echo Parser file including path: $PATH_PARSER
echo Parser file including path: $PATH_LEXER

antlr4-parse $PATH_PARSER $PATH_LEXER $START_RULE sample.yini -tokens



