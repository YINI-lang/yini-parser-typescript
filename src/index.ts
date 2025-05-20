/*
	https://pauloe-me.medium.com/typescript-npm-package-publishing-a-beginners-guide-40b95908e69c
	
	Run the code with the following command:
		npx ts-node index
	or
		npm start
	
	/END
*/

import { CharStreams, CommonTokenStream } from 'antlr4';
import  YiniLexer  from './grammar/YiniLexer';
import  YiniParser, { YiniContext }  from './grammar/YiniParser';
import  YINIVisitor from './YINIVisitor';

//import { Solution } from './solution';
console.log('*** Started index.ts of ' + 'e_test'.toUpperCase() + ' ***');

// const s : Solution = new Solution();

// console.log('Result, getBuyDay index:  ', s.getBuyDay());
// console.log('Result, getSellDay index: ', s.getSellDay());
// console.log();


const debugTestObj = {
	name: 'e_test',
	lang: 'TypeScript'
};
console.log('debugTestObj:');
console.log(debugTestObj);
console.log();

const invalidInput = `
# 	Config
age = 30
name = "Alice"
items = ["a", "b", "c"]
/END
`;

const input = `
^ 	Config
varAge = 30
varName = "Alice"
listItems = ["a", "b", "c"]
	^^Extra
	isExtra = true
/END
`;

// const input = `
// # 	Config`;

console.log('input:');
console.log(input);
console.log();

const inputStream = CharStreams.fromString(input);
const lexer = new YiniLexer(inputStream);
const tokenStream = new CommonTokenStream(lexer);
const parser = new YiniParser(tokenStream);

console.log('\n==== Start parsing ==========================');
//const tree = parser.yini;  // Start rule.
const tree : YiniContext = parser.yini();  // Start rule.

const visitor = new YINIVisitor();
const result = visitor.visit(tree as any);
console.log('==== End parsing ==========================\n');

console.log(result);

console.log();
