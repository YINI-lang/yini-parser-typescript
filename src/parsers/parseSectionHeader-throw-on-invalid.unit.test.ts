// src/parsers/parseSectionHeader-throw-on-invalid.unit.test.ts
import { ErrorDataHandler } from '../core/errorDataHandler'
import parseSectionHeader from './parseSectionHeader'

/**
 * Throw error when parsing invalid section headers.
 */
describe('Throw error when parsing invalid section headers:', () => {
    const makeErrorHandler = (): ErrorDataHandler => {
        return new ErrorDataHandler(
            'None/Ignore',
            undefined,
            '1-Abort-on-Errors',
            false,
            false,
            false,
            true,
        )
    }

    test('1.a. Should throw error if using repeated primary markers for level 10.', () => {
        // Arrange.
        const invalidYini = '^^^^^^^^^^ InvalidHeaderMarker'

        // Act & Assert.
        expect(() => {
            parseSectionHeader(invalidYini, makeErrorHandler(), null)
        }).toThrow()
    })

    test('1.b. Should throw error if using repeated < markers for level 10.', () => {
        // Arrange.
        const invalidYini = '<<<<<<<<<< InvalidHeaderMarker'

        // Act & Assert.
        expect(() => {
            parseSectionHeader(invalidYini, makeErrorHandler(), null)
        }).toThrow()
    })

    test('1.c. Should throw error if using repeated § markers for level 10.', () => {
        // Arrange.
        const invalidYini = '§§§§§§§§§§ InvalidHeaderMarker'

        // Act & Assert.
        expect(() => {
            parseSectionHeader(invalidYini, makeErrorHandler(), null)
        }).toThrow()
    })

    test('1.d. Should throw error if using repeated > markers for level 10.', () => {
        // Arrange.
        const invalidYini = '>>>>>>>>>> InvalidHeaderMarker'

        // Act & Assert.
        expect(() => {
            parseSectionHeader(invalidYini, makeErrorHandler(), null)
        }).toThrow()
    })

    test('2.a. Should throw error for zero-like numeric shorthand with (^).', () => {
        // Arrange.
        const invalidYini = '^0 InvalidHeaderMarker'

        // Act & Assert.
        expect(() => {
            parseSectionHeader(invalidYini, makeErrorHandler(), null)
        }).toThrow()
    })

    test('2.b. Should throw error for zero-like numeric shorthand with (<).', () => {
        // Arrange.
        const invalidYini = '<0 InvalidHeaderMarker'

        // Act & Assert.
        expect(() => {
            parseSectionHeader(invalidYini, makeErrorHandler(), null)
        }).toThrow()
    })

    test('2.c. Should throw error for zero-like numeric shorthand with (§).', () => {
        // Arrange.
        const invalidYini = '§0 InvalidHeaderMarker'

        // Act & Assert.
        expect(() => {
            parseSectionHeader(invalidYini, makeErrorHandler(), null)
        }).toThrow()
    })

    test('2.d. Should throw error for zero-like numeric shorthand with (>).', () => {
        // Arrange.
        const invalidYini = '>0 InvalidHeaderMarker'

        // Act & Assert.
        expect(() => {
            parseSectionHeader(invalidYini, makeErrorHandler(), null)
        }).toThrow()
    })

    test('3.a. Should throw error if numeric shorthand has no whitespace after the number.', () => {
        // Arrange.
        const invalidYini = '^10SectionName'

        // Act & Assert.
        expect(() => {
            parseSectionHeader(invalidYini, makeErrorHandler(), null)
        }).toThrow()
    })

    test('3.b. Should throw error if numeric shorthand with < has no whitespace after the number.', () => {
        // Arrange.
        const invalidYini = '<10SectionName'

        // Act & Assert.
        expect(() => {
            parseSectionHeader(invalidYini, makeErrorHandler(), null)
        }).toThrow()
    })

    test('3.c. Should throw error if numeric shorthand with § has no whitespace after the number.', () => {
        // Arrange.
        const invalidYini = '§10SectionName'

        // Act & Assert.
        expect(() => {
            parseSectionHeader(invalidYini, makeErrorHandler(), null)
        }).toThrow()
    })

    test('3.d. Should throw error if numeric shorthand with > has no whitespace after the number.', () => {
        // Arrange.
        const invalidYini = '>10SectionName'

        // Act & Assert.
        expect(() => {
            parseSectionHeader(invalidYini, makeErrorHandler(), null)
        }).toThrow()
    })

    test('4.a. Should throw error if numeric shorthand is applied after repeated markers.', () => {
        // Arrange.
        const invalidYini = '^^1 InvalidHeaderMarker'

        // Act & Assert.
        expect(() => {
            parseSectionHeader(invalidYini, makeErrorHandler(), null)
        }).toThrow()
    })

    test('4.b. Should throw error if numeric shorthand is applied after repeated < markers.', () => {
        // Arrange.
        const invalidYini = '<<10 InvalidHeaderMarker'

        // Act & Assert.
        expect(() => {
            parseSectionHeader(invalidYini, makeErrorHandler(), null)
        }).toThrow()
    })

    test('4.c. Should throw error if numeric shorthand is applied after repeated § markers.', () => {
        // Arrange.
        const invalidYini = '§§3 InvalidHeaderMarker'

        // Act & Assert.
        expect(() => {
            parseSectionHeader(invalidYini, makeErrorHandler(), null)
        }).toThrow()
    })

    test('4.d. Should throw error if numeric shorthand is applied after repeated > markers.', () => {
        // Arrange.
        const invalidYini = '>>4 InvalidHeaderMarker'

        // Act & Assert.
        expect(() => {
            parseSectionHeader(invalidYini, makeErrorHandler(), null)
        }).toThrow()
    })

    test('5.a. Should throw error if repeated marker sequence starts with separator.', () => {
        // Arrange.
        const invalidYini = '_^^ SectionName'

        // Act & Assert.
        expect(() => {
            parseSectionHeader(invalidYini, makeErrorHandler(), null)
        }).toThrow()
    })

    test('5.b. Should throw error if repeated marker sequence ends with separator.', () => {
        // Arrange.
        const invalidYini = '^^_ SectionName'

        // Act & Assert.
        expect(() => {
            parseSectionHeader(invalidYini, makeErrorHandler(), null)
        }).toThrow()
    })

    test('5.c. Should throw error if repeated marker sequence contains double separator.', () => {
        // Arrange.
        const invalidYini = '^^__^^ SectionName'

        // Act & Assert.
        expect(() => {
            parseSectionHeader(invalidYini, makeErrorHandler(), null)
        }).toThrow()
    })

    test('5.d. Should throw error if repeated marker sequence has separator before end.', () => {
        // Arrange.
        const invalidYini = '^^_^_ SectionName'

        // Act & Assert.
        expect(() => {
            parseSectionHeader(invalidYini, makeErrorHandler(), null)
        }).toThrow()
    })

    test('6.a. Should throw error if repeated marker sequence mixes ^ and <.', () => {
        // Arrange.
        const invalidYini = '^^_<< SectionName'

        // Act & Assert.
        expect(() => {
            parseSectionHeader(invalidYini, makeErrorHandler(), null)
        }).toThrow()
    })

    test('6.b. Should throw error if repeated marker sequence mixes ^ and §.', () => {
        // Arrange.
        const invalidYini = '^^_§§ SectionName'

        // Act & Assert.
        expect(() => {
            parseSectionHeader(invalidYini, makeErrorHandler(), null)
        }).toThrow()
    })

    test('6.c. Should throw error if repeated marker sequence mixes < and >.', () => {
        // Arrange.
        const invalidYini = '<<_>> SectionName'

        // Act & Assert.
        expect(() => {
            parseSectionHeader(invalidYini, makeErrorHandler(), null)
        }).toThrow()
    })

    test('7.a. Should throw error if section name contains a dot.', () => {
        // Arrange.
        const invalidYini = '<< Sub.Title'

        // Act & Assert.
        expect(() => {
            parseSectionHeader(invalidYini, makeErrorHandler(), null)
        }).toThrow()
    })

    test('7.b. Should throw error if section name contains a hyphen.', () => {
        // Arrange.
        const invalidYini = '^ Invalid-Title'

        // Act & Assert.
        expect(() => {
            parseSectionHeader(invalidYini, makeErrorHandler(), null)
        }).toThrow()
    })

    test('7.c. Should throw error if section name starts with a digit.', () => {
        // Arrange.
        const invalidYini = '^ 123Title'

        // Act & Assert.
        expect(() => {
            parseSectionHeader(invalidYini, makeErrorHandler(), null)
        }).toThrow()
    })

    test('8.a. Should throw error for obsolete euro marker.', () => {
        // Arrange.
        const invalidYini = '€ SectionName'

        // Act & Assert.
        expect(() => {
            parseSectionHeader(invalidYini, makeErrorHandler(), null)
        }).toThrow()
    })

    test('8.b. Should throw error for repeated obsolete euro marker.', () => {
        // Arrange.
        const invalidYini = '€€ SectionName'

        // Act & Assert.
        expect(() => {
            parseSectionHeader(invalidYini, makeErrorHandler(), null)
        }).toThrow()
    })

    test('8.c. Should throw error for obsolete euro numeric shorthand.', () => {
        // Arrange.
        const invalidYini = '€2 SectionName'

        // Act & Assert.
        expect(() => {
            parseSectionHeader(invalidYini, makeErrorHandler(), null)
        }).toThrow()
    })
})
