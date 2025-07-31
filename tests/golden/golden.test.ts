import * as fs from 'fs'
import path from 'path'
import { debugPrint, printObject, toPrettyJSON } from '../../src/utils/print'
import { parseFileUntilError } from '../test-helpers'
import { fileListLenient } from './3-basic-and-simple-literals/files-for-lenient'

//todo: golden file tests, automatic from input file matched agains output file

export interface IFileList {
    valid: string[]
    invalid: string[]
}

describe('Golden Tests:', () => {
    // const DIR_OF_FIXTURES = '../fixtures/smoke-fixtures/strings-with-paths'
    // const baseDir = path.join(__dirname, DIR_OF_FIXTURES)

    const dirSyntaxGroup = '3-basic-and-simple-literals'

    test('3. Golden tests for Basic and Simple literals.', () => {
        const baseDir = path.join(__dirname, dirSyntaxGroup, 'valid')

        // const result = a + b
        fileListLenient.valid.forEach((file) => {
            // Arrange.
            const fileAndPath = path.join(baseDir, file)
            const yiniFile = fileAndPath + '.yini'
            const jsonFile = fileAndPath + '.json'
            debugPrint('fileAndPath = ' + fileAndPath)
            console.log('fileAndPath = ' + fileAndPath)

            // Act.
            const result = parseFileUntilError(yiniFile)
            const correct = JSON.parse(fs.readFileSync(jsonFile, 'utf8'))
            console.log(result)
            console.log(correct)

            // Assert.
            expect(toPrettyJSON(result)).toEqual(toPrettyJSON(correct))
        })
    })
})
