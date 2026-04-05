/**
 * Smoke fixture tests for the large reference examples A, B, and C.
 */

// tests/smoke/ABC-smoke.test.ts
import path from 'path'
import YINI from '../../src'
import { toPrettyJSON } from '../../src/utils/print'
import correctAnswerA from '../fixtures/smoke-fixtures/a-corporate-saas-platform.smoke.json'
import correctAnswerB from '../fixtures/smoke-fixtures/b-high-security-distributed-control-system.smoke.json'
import correctAnswerC from '../fixtures/smoke-fixtures/c-industrial-monitoring-and-automation-platform.smoke.json'

const DIR_OF_FIXTURES = '../fixtures/smoke-fixtures'

type FixtureCase = {
    label: 'A' | 'B' | 'C'
    baseName: string
    expected: unknown
    lineCount: number
    mode: 'lenient' | 'strict'
}

describe('Smoke fixture tests: A, B, and C', () => {
    const baseDir = path.join(__dirname, DIR_OF_FIXTURES)

    const fixtures: FixtureCase[] = [
        {
            label: 'A',
            baseName: 'a-corporate-saas-platform.smoke',
            expected: correctAnswerA,
            lineCount: 128,
            mode: 'lenient',
        },
        {
            label: 'B',
            baseName: 'b-high-security-distributed-control-system.smoke',
            expected: correctAnswerB,
            lineCount: 222,
            mode: 'lenient',
        },
        {
            label: 'C',
            baseName: 'c-industrial-monitoring-and-automation-platform.smoke',
            expected: correctAnswerC,
            lineCount: 267,
            mode: 'strict',
        },
    ]

    test.each(fixtures)(
        '$label. Should parse YINI fixture and match expected JSON.',
        ({ baseName, expected, mode }) => {
            // Arrange.
            const fullPath = path.join(baseDir, `${baseName}.yini`)

            // Act.
            const result = YINI.parseFile(fullPath, {
                strictMode: mode === 'strict',
            })

            // Assert.
            expect(toPrettyJSON(result)).toEqual(toPrettyJSON(expected))
        },
    )

    test.each(fixtures)(
        '$label. Should parse fixture with metadata and return correct result.',
        ({ baseName, expected, lineCount, mode }) => {
            // Arrange.
            const fullPath = path.join(baseDir, `${baseName}.yini`)

            // Act.
            const result = YINI.parseFile(fullPath, {
                strictMode: mode === 'strict',
                includeMetadata: true,
            })

            // Assert.
            expect(toPrettyJSON(result.result)).toEqual(toPrettyJSON(expected))
            expect(result.meta.mode).toEqual(mode)
            expect(result.meta.totalErrors).toEqual(0)
            expect(result.meta.preservesOrder).toEqual(true)
            expect(result.meta.source).not.toEqual(undefined)
            expect(result.meta.structure).not.toEqual(undefined)
            expect(result.meta.metaSchemaVersion).toEqual('1.1.1')
            expect(result.meta.source.lineCount).toEqual(lineCount)
        },
    )
})
