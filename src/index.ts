// import { isDebug&&console.log } from './utils/general'

/*
	https://pauloe-me.medium.com/typescript-npm-package-publishing-a-beginners-guide-40b95908e69c
	
	Run the code with the following command:
		npx ts-node index
	or
		npm start
	
	/END
*/

import { debugPrint } from './utils/general'
import YINI from './YINI'

export { default } from './YINI'

// const isDebug = !!process.env.IS_DEBUG
// console.log('env.IS_DEBUG:')
// console.log(process.env.IS_DEBUG)
// console.log('isDebug = ' + isDebug)
debugPrint()
debugPrint('QWERTY')
debugPrint('QWERTY')

//import { Solution } from './solution';
debugPrint('*** Started index.ts of ' + 'e_test'.toUpperCase() + ' ***')

// const s : Solution = new Solution();

// debugPrint('Result, getBuyDay index:  ', s.getBuyDay());
// debugPrint('Result, getSellDay index: ', s.getSellDay());
// debugPrint();

const debugTestObj = {
    name: 'e_test',
    lang: 'TypeScript',
}
debugPrint('debugTestObj:')
debugPrint(debugTestObj)
debugPrint()

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

debugPrint('input1:')
debugPrint(input1)
debugPrint()

YINI.parse(input2)
