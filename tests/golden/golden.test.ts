import * as fs from 'fs'
import path from 'path'
import { debugPrint, printObject, toPrettyJSON } from '../../src/utils/print'
import { parseFileUntilError } from '../test-helpers'
import { fileListLenient } from './3-basic-and-simple-literals/files-for-lenient'

export interface IFileList {
    valid: string[]
    invalid: string[]
}

describe('Golden Tests: 3-Golden tests for Basic and Simple literals.', () => {
    const dirSyntaxGroup = '3-basic-and-simple-literals'
    const baseDir = path.join(__dirname, dirSyntaxGroup, 'valid')

    test.each(fileListLenient.valid)('Parses correctly: %s', (file) => {
        // Arrange.
        const baseFile = path.join(baseDir, file)
        const yiniFile = baseFile + '.yini'
        const jsonFile = baseFile + '.json'
        // debugPrint('fileAndPath = ' + fileAndPath)
        // console.log('fileAndPath = ' + fileAndPath)

        // Check if files exists.
        if (!fs.existsSync(yiniFile))
            throw new Error(`Missing YINI file: ${yiniFile}`)
        if (!fs.existsSync(jsonFile))
            throw new Error(`Missing JSON file: ${jsonFile}`)

        // Act.
        const result = parseFileUntilError(yiniFile)
        const correct = JSON.parse(fs.readFileSync(jsonFile, 'utf8'))
        // console.log(result)
        // console.log(correct)

        // Assert.
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(correct))
    })
})
