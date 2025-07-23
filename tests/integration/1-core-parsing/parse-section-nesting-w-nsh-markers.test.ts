import path from 'path'
import YINI from '../../../src'
import { isDebug } from '../../../src/config/env'
import {
    debugPrint,
    printObject,
    toPrettyJSON,
} from '../../../src/utils/system'

const DIR_OF_FIXTURES = '../../fixtures/valid/section-nesting-w-nsh-markers'

/**
 * Parse section nesting with NUMERIC SHORTHAND section head markers test.
 */
describe('Parse section nesting w NUMERIC SHORTHAND markers:', () => {
    const baseDir = path.join(__dirname, DIR_OF_FIXTURES)

    test('1. Parse section nesting w NUMERIC SHORTHAND markers.', () => {
        // Arrange.
        const fileName = 'nsh-section-nesting-1.yini'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const result = YINI.parseFile(fullPath)
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(result.Section1).not.toBe('this should fail')
        expect(toPrettyJSON(result)).toEqual(
            toPrettyJSON({
                Main: {
                    Sub1: { SubSub1: { valueSS1: 'Something.' } },
                    Sub2: { SubSub2: { valueSS2: false } },
                },
            }),
        )
    })

    test('2. Parse section nesting w NUMERIC SHORTHAND markers.', () => {
        // Arrange.
        const fileName = 'nsh-section-nesting-2.yini'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const result = YINI.parseFile(fullPath)
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(result.Section1).not.toBe('this should fail')
        expect(toPrettyJSON(result)).toEqual(
            toPrettyJSON({
                Main: {
                    Sub1: { SubSub1: { valueSS1: true } },
                    Sub2: { SubSub2: { valueSS2: 322 } },
                },
            }),
        )
    })

    test('3. Parse section nesting w NUMERIC SHORTHAND markers.', () => {
        // Arrange.
        const fileName = 'nsh-section-nesting-3.yini'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const result = YINI.parseFile(fullPath)
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(result.Section1).not.toBe('this should fail')
        expect(toPrettyJSON(result)).toEqual(
            toPrettyJSON({
                Root: {
                    Level2: {
                        Level3: {
                            Level4: {
                                Level5: {
                                    Level6: {
                                        Level7: {
                                            Level8: {
                                                valueAt: 'Level 8 in Root.',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                SectionReset: { valueAt: 'In SectionReset.' },
            }),
        )
    })
})
