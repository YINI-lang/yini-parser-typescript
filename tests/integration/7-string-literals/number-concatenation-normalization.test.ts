import YINI from '../../../src'

describe('Number conversion in concatenation:', () => {
    test('Normalizes numeric source spelling in lenient mode.', () => {
        // 1. Assign.
        const input = '^ Concat\nfraction = "n: " + 1.50\nexponent = "n: " + 3E+04\nnegativeZero = "n: " + -0\nbase = "n: " + 0xFF\nlarge = "n: " + 9007199254740993\n'

        // 2. Act.
        const result = YINI.parse(input, { strictMode: false })

        // 3. Assert.
        expect(result.Concat).toEqual({
            fraction: 'n: 1.50',
            exponent: 'n: 3e04',
            negativeZero: 'n: -0',
            base: 'n: 255',
            large: 'n: 9007199254740993',
        })
    })

    test('Rejects numeric concatenation operands in strict mode.', () => {
        // 1. Assign.
        const input = '^ Concat\nvalue = "n: " + 1.50\n/END\n'

        // 2. Act.
        const parsed = YINI.parseForTooling(input, { strictMode: true })

        // 3. Assert.
        expect(parsed.ok).toBe(false)
    })
})
