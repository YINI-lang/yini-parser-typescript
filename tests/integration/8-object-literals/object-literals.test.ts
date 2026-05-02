// tests/integration/8-object-literals/object-literals.test.ts
import YINI from '../../../src'

/**
 * Object literal tests.
 */
describe('Object literal tests:', () => {
    describe('Lenient mode:', () => {
        test("1. Should parse object literal with canonical colon ':' separators.", () => {
            // Arrange.
            const validYini = `
                ^ Database
                pool = { max: 10, min: 2 }
            `

            // Act.
            const result = YINI.parse(validYini)

            // Assert.
            expect(result).toBeTruthy()
            expect(result.Database.pool.max).toEqual(10)
            expect(result.Database.pool.min).toEqual(2)
        })

        test("2. Should parse object literal with equals '=' separators.", () => {
            // Arrange.
            const validYini = `
                ^ Database
                pool = { max = 10, min = 2 }
            `

            // Act.
            const result = YINI.parse(validYini)

            // Assert.
            expect(result).toBeTruthy()
            expect(result.Database.pool.max).toEqual(10)
            expect(result.Database.pool.min).toEqual(2)
        })

        test('3. Should parse object literal with mixed colon and equals separators.', () => {
            // Arrange.
            const validYini = `
                ^ Database
                pool = { max: 10, min = 2 }
            `

            // Act.
            const result = YINI.parse(validYini)

            // Assert.
            expect(result).toBeTruthy()
            expect(result.Database.pool.max).toEqual(10)
            expect(result.Database.pool.min).toEqual(2)
        })

        test("4. Should parse nested object literals with equals '=' separators.", () => {
            // Arrange.
            const validYini = `
                ^ App
                config = { database = { host = "localhost", port = 5432 }, enabled = true }
            `

            // Act.
            const result = YINI.parse(validYini)

            // Assert.
            expect(result).toBeTruthy()
            expect(result.App.config.database.host).toEqual('localhost')
            expect(result.App.config.database.port).toEqual(5432)
            expect(result.App.config.enabled).toEqual(true)
        })
    })

    describe('Strict mode:', () => {
        test("5. Should parse object literal with canonical colon ':' separators.", () => {
            // Arrange.
            const validYini = `
                ^ Database
                pool = { max: 10, min: 2 }
                /END
            `

            // Act.
            const result = YINI.parse(validYini, {
                strictMode: true,
            })

            // Assert.
            expect(result).toBeTruthy()
            expect(result.Database.pool.max).toEqual(10)
            expect(result.Database.pool.min).toEqual(2)
        })

        test("6. Should throw when object literal uses equals '=' separators in strict mode.", () => {
            // Arrange.
            const invalidYini = `
                ^ Database
                pool = { max = 10, min = 2 }
                /END
            `

            // Act & Assert.
            expect(() => {
                YINI.parse(invalidYini, {
                    strictMode: true,
                })
            }).toThrow()
        })

        test('7. Should throw when object literal mixes colon and equals separators in strict mode.', () => {
            // Arrange.
            const invalidYini = `
                ^ Database
                pool = { max: 10, min = 2 }
                /END
            `

            // Act & Assert.
            expect(() => {
                YINI.parse(invalidYini, {
                    strictMode: true,
                })
            }).toThrow()
        })

        test("8. Should throw when nested object literal uses equals '=' separators in strict mode.", () => {
            // Arrange.
            const invalidYini = `
                ^ App
                config = { database: { host = "localhost", port: 5432 }, enabled: true }
                /END
            `

            // Act & Assert.
            expect(() => {
                YINI.parse(invalidYini, {
                    strictMode: true,
                })
            }).toThrow()
        })
    })
})
