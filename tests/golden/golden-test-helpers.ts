// tests/golden/golden-test-helpers.ts
import fs from 'node:fs'
import path from 'path'
import YINI from '../../src'
import { toPrettyJSON } from '../../src/utils/print'

// import { parseFileUntilError } from '../test-helpers'

const STRICT_MODE_TOP_SECTION = '___TopSection'

export interface IFileList {
    valid: string[]
    invalid: string[]
}

/**
 * Reads a fixture file as text and parses it with fail-fast behavior.
 * In strict mode, the content is wrapped in a temporary top-level section.
 */
/*
const parseGoldFixtureFileUntilError = (
    filePath: string,
    isStrictMode = false,
    isIncludeMeta = false,
) => {
    const content: string = fs.readFileSync(filePath, 'utf-8')

    const input = isStrictMode
        ? `^ ${STRICT_MODE_TOP_SECTION}
${content}
/END
`
        : content

    const result = YINI.parse(input, {
        strictMode: isStrictMode,
        failLevel: 'errors',
        includeMetadata: isIncludeMeta,
    })

    return result
}
    */

const wrapFixtureContentForStrictMode = (
    content: string,
    isStrictMode = false,
) => {
    //     const input = isStrictMode
    //         ? `^ ${STRICT_MODE_TOP_SECTION}
    // ${content}
    // /END
    // `
    //         : content
    const input = isStrictMode
        ? `${content}
/END
`
        : content

    return input
}

/**
 * Unwrap the temporary strict-mode top-level section from the parsed result.
 */
const unwrapStrictModeTopSection = (
    result: string,
    isStrictMode = false,
): string => {
    if (!isStrictMode) {
        return result
    }

    // const obj = result as Record<string, unknown>
    // return obj[STRICT_MODE_TOP_SECTION]
    // const trimmed = result.replace(/\n?\/END\s*$/i, '')
    return result
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

        if (!fs.existsSync(yiniFile)) {
            throw new Error(`Missing YINI file: ${yiniFile}`)
        }

        if (!fs.existsSync(jsonFile)) {
            throw new Error(`Missing JSON file: ${jsonFile}`)
        }

        const content = fs.readFileSync(yiniFile, 'utf-8')
        const input = wrapFixtureContentForStrictMode(content, isStrictMode)
        const correct = JSON.parse(fs.readFileSync(jsonFile, 'utf-8'))

        // Act.
        const parsed = YINI.parse(input, {
            strictMode: isStrictMode,
            failLevel: 'errors',
            requireDocTerminator: !isStrictMode ? 'optional' : 'required',
        })
        const result = unwrapStrictModeTopSection(parsed, isStrictMode)

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

        if (!fs.existsSync(yiniFile)) {
            throw new Error(`Missing YINI file: ${yiniFile}`)
        }

        const content = fs.readFileSync(yiniFile, 'utf-8')
        const input = wrapFixtureContentForStrictMode(content, isStrictMode)

        // Act & Assert.
        expect(() => {
            YINI.parse(input, {
                strictMode: isStrictMode,
                failLevel: 'errors',
                requireDocTerminator: !isStrictMode ? 'optional' : 'required',
            })
        }).toThrow()
    })
}
