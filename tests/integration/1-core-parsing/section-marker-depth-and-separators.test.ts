// tests/integration/1-core-parsing/section-marker-depth-and-separators.test.ts
import YINI from '../../../src'

/**
 * Section marker depth and separator tests.
 *
 * Covers:
 * - Repeated marker depth 1 through 9.
 * - Section marker separators with '_'.
 * - Numeric shorthand for level 10 and deeper.
 * - Invalid repeated marker depth above 9.
 * - Invalid separator placement.
 * - Supported marker characters.
 */
describe('Section marker depth and separators:', () => {
    describe('Repeated marker depth:', () => {
        test('1. Should parse repeated section markers up to depth 9.', () => {
            // Arrange.
            const validYini = `
                ^ L1
                value = 1

                ^^ L2
                value = 2

                ^^^ L3
                value = 3

                ^^^^ L4
                value = 4

                ^^^^^ L5
                value = 5

                ^^^^^^ L6
                value = 6

                ^^^^^^^ L7
                value = 7

                ^^^^^^^^ L8
                value = 8

                ^^^^^^^^^ L9
                value = 9
            `

            // Act.
            const result = YINI.parse(validYini)

            // Assert.
            expect(result.L1.value).toEqual(1)
            expect(result.L1.L2.value).toEqual(2)
            expect(result.L1.L2.L3.value).toEqual(3)
            expect(result.L1.L2.L3.L4.value).toEqual(4)
            expect(result.L1.L2.L3.L4.L5.value).toEqual(5)
            expect(result.L1.L2.L3.L4.L5.L6.value).toEqual(6)
            expect(result.L1.L2.L3.L4.L5.L6.L7.value).toEqual(7)
            expect(result.L1.L2.L3.L4.L5.L6.L7.L8.value).toEqual(8)
            expect(result.L1.L2.L3.L4.L5.L6.L7.L8.L9.value).toEqual(9)
        })

        test('2. Should throw when repeated section marker depth is 10 or higher.', () => {
            // Arrange.
            const invalidYini = `
                ^ L1
                ^^ L2
                ^^^ L3
                ^^^^ L4
                ^^^^^ L5
                ^^^^^^ L6
                ^^^^^^^ L7
                ^^^^^^^^ L8
                ^^^^^^^^^ L9
                ^^^^^^^^^^ L10
                value = 10
            `

            // Act & Assert.
            expect(() => {
                YINI.parse(invalidYini, {
                    failLevel: 'errors',
                })
            }).toThrow()
        })
    })

    describe('Section marker separators:', () => {
        test('1. Should parse section marker separators for depth 5, 6, and 9.', () => {
            // Arrange.
            const validYini = `
                ^ L1
                ^^ L2
                ^^^ L3
                ^^^^ L4

                ^^_^^_^ L5
                value = 5

                ^^^_^^^ L6
                value = 6

                ^^^_^^^_^^^ L9
                value = 9
            `

            // Act.
            const result = YINI.parse(validYini)

            // Assert.
            expect(result.L1.L2.L3.L4.L5.value).toEqual(5)
            expect(result.L1.L2.L3.L4.L5.L6.value).toEqual(6)
            expect(result.L1.L2.L3.L4.L5.L6.L9.value).toEqual(9)
        })

        test('2. Should throw when section marker separator appears at the start.', () => {
            // Arrange.
            const invalidYini = `
                ^ Root
                _^^ Child
                value = 1
            `

            // Act & Assert.
            expect(() => {
                YINI.parse(invalidYini, {
                    failLevel: 'errors',
                })
            }).toThrow()
        })

        test('3. Should throw when section marker separator appears at the end.', () => {
            // Arrange.
            const invalidYini = `
                ^ Root
                ^^_ Child
                value = 1
            `

            // Act & Assert.
            expect(() => {
                YINI.parse(invalidYini, {
                    failLevel: 'errors',
                })
            }).toThrow()
        })

        test('4. Should throw when section marker separators are adjacent.', () => {
            // Arrange.
            const invalidYini = `
                ^ Root
                ^^__^^ Child
                value = 1
            `

            // Act & Assert.
            expect(() => {
                YINI.parse(invalidYini, {
                    failLevel: 'errors',
                })
            }).toThrow()
        })

        test('5. Should throw when separator form exceeds depth 9.', () => {
            // Arrange.
            const invalidYini = `
                ^ Root
                ^^^_^^^_^^^^ TooDeep
                value = 10
            `

            // Act & Assert.
            expect(() => {
                YINI.parse(invalidYini, {
                    failLevel: 'errors',
                })
            }).toThrow()
        })
    })

    describe('Numeric shorthand:', () => {
        test('1. Should parse numeric shorthand for level 10 after level 9.', () => {
            // Arrange.
            const validYini = `
                ^ L1
                ^^ L2
                ^^^ L3
                ^^^^ L4
                ^^^^^ L5
                ^^^^^^ L6
                ^^^^^^^ L7
                ^^^^^^^^ L8
                ^^^^^^^^^ L9
                ^10 L10
                value = 10
            `

            // Act.
            const result = YINI.parse(validYini)

            // Assert.
            expect(result.L1.L2.L3.L4.L5.L6.L7.L8.L9.L10.value).toEqual(10)
        })

        test('2. Should parse numeric shorthand for levels deeper than 10.', () => {
            // Arrange.
            const validYini = `
                ^ L1
                ^^ L2
                ^^^ L3
                ^^^^ L4
                ^^^^^ L5
                ^^^^^^ L6
                ^^^^^^^ L7
                ^^^^^^^^ L8
                ^^^^^^^^^ L9
                ^10 L10
                ^11 L11
                ^12 L12
                value = 12
            `

            // Act.
            const result = YINI.parse(validYini)

            // Assert.
            expect(result.L1.L2.L3.L4.L5.L6.L7.L8.L9.L10.L11.L12.value).toEqual(
                12,
            )
        })

        test('3. Should throw when numeric shorthand skips section levels.', () => {
            // Arrange.
            const invalidYini = `
                ^ Root
                ^10 TooDeep
                value = 10
            `

            // Act & Assert.
            expect(() => {
                YINI.parse(invalidYini, {
                    failLevel: 'errors',
                })
            }).toThrow()
        })

        test('4. Should throw when numeric shorthand has no space before the section name.', () => {
            // Arrange.
            const invalidYini = `
                ^ Root
                ^10Child
                value = 10
            `

            // Act & Assert.
            expect(() => {
                YINI.parse(invalidYini, {
                    failLevel: 'errors',
                })
            }).toThrow()
        })

        test('5. Should throw when numeric shorthand uses level 0.', () => {
            // Arrange.
            const invalidYini = `
                ^0 Root
                value = 1
            `

            // Act & Assert.
            expect(() => {
                YINI.parse(invalidYini, {
                    failLevel: 'errors',
                })
            }).toThrow()
        })
    })

    describe('Supported marker characters:', () => {
        test("1. Should parse '^' as the primary section marker.", () => {
            // Arrange.
            const validYini = `
                ^ Root
                ^^ Child
                value = 1
            `

            // Act.
            const result = YINI.parse(validYini)

            // Assert.
            expect(result.Root.Child.value).toEqual(1)
        })

        test("2. Should parse '<' as an alternative section marker.", () => {
            // Arrange.
            const validYini = `
                < Root
                << Child
                value = 1
            `

            // Act.
            const result = YINI.parse(validYini)

            // Assert.
            expect(result.Root.Child.value).toEqual(1)
        })

        test("3. Should parse '§' as an alternative section marker.", () => {
            // Arrange.
            const validYini = `
                § Root
                §§ Child
                value = 1
            `

            // Act.
            const result = YINI.parse(validYini)

            // Assert.
            expect(result.Root.Child.value).toEqual(1)
        })

        test("4. Should parse '>' as a supported fallback section marker.", () => {
            // Arrange.
            const validYini = `
                > Root
                >> Child
                value = 1
            `

            // Act.
            const result = YINI.parse(validYini)

            // Assert.
            expect(result.Root.Child.value).toEqual(1)
        })

        test('5. Should throw when marker characters are mixed in the same marker sequence.', () => {
            // Arrange.
            const invalidYini = `
                ^ Root
                ^< Child
                value = 1
            `

            // Act & Assert.
            expect(() => {
                YINI.parse(invalidYini, {
                    failLevel: 'errors',
                })
            }).toThrow()
        })
    })

    describe('Strict mode:', () => {
        test('1. Should parse repeated marker depth 9 in strict mode.', () => {
            // Arrange.
            const validYini = `
                @yini strict

                ^ L1
                ^^ L2
                ^^^ L3
                ^^^^ L4
                ^^^^^ L5
                ^^^^^^ L6
                ^^^^^^^ L7
                ^^^^^^^^ L8
                ^^^^^^^^^ L9
                value = 9

                /END
            `

            // Act.
            const result = YINI.parse(validYini, {
                strictMode: true,
                requireDocTerminator: 'required',
            })

            // Assert.
            expect(result.L1.L2.L3.L4.L5.L6.L7.L8.L9.value).toEqual(9)
        })

        test('2. Should parse numeric shorthand level 10 in strict mode.', () => {
            // Arrange.
            const validYini = `
                @yini strict

                ^ L1
                ^^ L2
                ^^^ L3
                ^^^^ L4
                ^^^^^ L5
                ^^^^^^ L6
                ^^^^^^^ L7
                ^^^^^^^^ L8
                ^^^^^^^^^ L9
                ^10 L10
                value = 10

                /END
            `

            // Act.
            const result = YINI.parse(validYini, {
                strictMode: true,
                requireDocTerminator: 'required',
            })

            // Assert.
            expect(result.L1.L2.L3.L4.L5.L6.L7.L8.L9.L10.value).toEqual(10)
        })

        test('3. Should throw on repeated marker depth 10 in strict mode.', () => {
            // Arrange.
            const invalidYini = `
                @yini strict

                ^ L1
                ^^ L2
                ^^^ L3
                ^^^^ L4
                ^^^^^ L5
                ^^^^^^ L6
                ^^^^^^^ L7
                ^^^^^^^^ L8
                ^^^^^^^^^ L9
                ^^^^^^^^^^ L10
                value = 10

                /END
            `

            // Act & Assert.
            expect(() => {
                YINI.parse(invalidYini, {
                    strictMode: true,
                    requireDocTerminator: 'required',
                    failLevel: 'errors',
                })
            }).toThrow()
        })
    })
})
