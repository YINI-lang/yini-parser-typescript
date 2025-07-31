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
    const baseDirGood = path.join(__dirname, dirSyntaxGroup, 'valid')
    const baseDirBad = path.join(__dirname, dirSyntaxGroup, 'invalid')

    test.each(fileListLenient.valid)(
        'Should parse and output correctly: %s',
        (file) => {
            // Arrange.
            const baseFile = path.join(baseDirGood, file)
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
        },
    )

    test.each(fileListLenient.invalid)('Should throw error: %s', (file) => {
        // Arrange.
        const baseFile = path.join(baseDirBad, file)
        const yiniFile = baseFile + '.yini'
        // debugPrint('fileAndPath = ' + fileAndPath)
        console.log('yiniFile = ' + yiniFile)

        // Check if file exists.
        if (!fs.existsSync(yiniFile))
            throw new Error(`Missing YINI file: ${yiniFile}`)

        // Act & Assert.
        expect(() => {
            const result = parseFileUntilError(yiniFile)
            // console.log(result)
        }).toThrow()
    })
})
