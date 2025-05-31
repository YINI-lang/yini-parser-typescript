import { doParse } from './parseEntry'
import { debugPrint } from './utils/general'

export default class YINI {
    public static parse = (yiniInput: string) => {
        // const isDebug = !!process.env.IS_DEBUG

        debugPrint()
        debugPrint('ABCDE')
        debugPrint('ABCDE')

        debugPrint
        debugPrint('-> Entered static parse(..) in class YINI\n')

        debugPrint()
        debugPrint('==== Start parsing ==========================')
        //const tree = parser.yini;  // Start rule.
        const result = doParse(yiniInput)
        debugPrint('==== End parsing ==========================\n')

        debugPrint('YINI.parse(..): result:')

        debugPrint(result)
        debugPrint()

        return true
    }
}

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

const isDebug = !!process.env.IS_DEBUG
debugPrint('env.IS_DEBUG:')
debugPrint(process.env.IS_DEBUG)
debugPrint('isDebug = ' + isDebug)
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
