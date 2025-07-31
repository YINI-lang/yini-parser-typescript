import * as fs from 'fs'
import path from 'path'
import { toPrettyJSON } from '../../src/utils/print'
import { parseFileUntilError } from '../test-helpers'

export interface IFileList {
    valid: string[]
    invalid: string[]
}

// Test all valid files in a directory against their .json output.
export function testValidCases(
    isStrictMode: boolean,
    dir: string,
    files: string[],
    getExpectedPath: (base: string) => string = (base) => base + '.json',
) {
    test.each(files)('Should parse and output correctly: %s', (file) => {
        // Arrange.
        const baseFile = path.join(dir, file)
        const yiniFile = baseFile + '.yini'
        const jsonFile = getExpectedPath(baseFile)

        // Check if files exists.
        if (!fs.existsSync(yiniFile))
            throw new Error(`Missing YINI file: ${yiniFile}`)
        if (!fs.existsSync(jsonFile))
            throw new Error(`Missing JSON file: ${jsonFile}`)

        // Act.
        const result = parseFileUntilError(yiniFile, isStrictMode)
        const correct = JSON.parse(fs.readFileSync(jsonFile, 'utf8'))

        // Assert.
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(correct))
    })
}

// Test all invalid files in a directory for throwing an error.
export function testInvalidCases(
    isStrictMode: boolean,
    dir: string,
    files: string[],
) {
    test.each(files)('Should throw error: %s', (file) => {
        // Arrange.
        const yiniFile = path.join(dir, file) + '.yini'

        // Check if file exists.
        if (!fs.existsSync(yiniFile))
            throw new Error(`Missing YINI file: ${yiniFile}`)

        // Act & Assert.
        expect(() => {
            parseFileUntilError(yiniFile, isStrictMode)
        }).toThrow()
    })
}
