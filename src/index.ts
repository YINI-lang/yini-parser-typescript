// import { isDebug&&console.log } from './utils/general'

/*
	https://pauloe-me.medium.com/typescript-npm-package-publishing-a-beginners-guide-40b95908e69c
	
	Run the code with the following command:
		npx ts-node index
	or
		npm start
	
	/END
*/

import { CharStreams, CommonTokenStream } from 'antlr4'
import YiniLexer from './grammar/YiniLexer'
import YiniParser, { YiniContext } from './grammar/YiniParser'
import YINIVisitor from './YINIVisitor'

export default class YINI {
    public static parse = (yiniInput: string) => {
        const isDebug = !!process.env.IS_DEBUG

        isDebug && console.log()
        isDebug && console.log('-> Entered static parse(..) in class YINI\n')

        const inputStream = CharStreams.fromString(yiniInput)
        const lexer = new YiniLexer(inputStream)
        const tokenStream = new CommonTokenStream(lexer)
        const parser = new YiniParser(tokenStream)

        isDebug && console.log()
        console.log('==== Start parsing ==========================')
        //const tree = parser.yini;  // Start rule.
        const tree: YiniContext = parser.yini() // Start rule.

        const visitor = new YINIVisitor()
        const result = visitor.visit(tree as any)
        console.log('==== End parsing ==========================\n')

        console.log('result:')
        console.log(result)
        console.log()

        return true
    }
}

//import { Solution } from './solution';
console.log('*** Started index.ts of ' + 'e_test'.toUpperCase() + ' ***')

// const s : Solution = new Solution();

// console.log('Result, getBuyDay index:  ', s.getBuyDay());
// console.log('Result, getSellDay index: ', s.getSellDay());
// console.log();

const debugTestObj = {
    name: 'e_test',
    lang: 'TypeScript',
}
console.log('debugTestObj:')
console.log(debugTestObj)
console.log()

const isDebug = !!process.env.IS_DEBUG
console.log('env.IS_DEBUG:')
console.log(process.env.IS_DEBUG)
console.log('isDebug = ' + isDebug)
console.log()

const invalidInput = `
# 	Config
age = 30
name = "Alice"
items = ["a", "b", "c"]
/END
`

const input1 = `
^ 	SectionName
varBool = true
varBool2 = off
varInt = 30
varFloat = 12.34
varStr = "Alice"
listItems = ["a", "b", "c"]
varE1 = 1e4
varE2 = 1.23e4
varE3 = 6.5E23
/END
`

const input2 = `
^ 	Config
varAge = 30
varName = "Alice"
listItems = ["a", "b", "c"]
	^^Extra
	isExtra = true
/END
`

// const input = `
// # 	Config`;

console.log('input1:')
console.log(input1)
console.log()

YINI.parse(input2)
