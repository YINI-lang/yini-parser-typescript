import YINI from '../../../src'

const document = (members: string, strictMode: boolean): string =>
    `^ Numbers\n${members}${strictMode ? '/END\n' : ''}`

describe.each([false, true])('Number range (strictMode: %s):', (strictMode) => {
    test('Preserves signed 64-bit integers exactly.', () => {
        // 1. Assign.
        const input = document(
            'safe = 9007199254740991\naboveSafe = 9007199254740993\nminimum = -9223372036854775808\nmaximum = 9223372036854775807\nhexMaximum = 0x7FFFFFFFFFFFFFFF\nitems = [9007199254740993]\nobject = { large: 9007199254740993 }\n',
            strictMode,
        )

        // 2. Act.
        const result = YINI.parse(input, { strictMode })

        // 3. Assert.
        expect(result.Numbers.safe).toBe(9007199254740991)
        expect(result.Numbers.aboveSafe).toBe(9007199254740993n)
        expect(result.Numbers.minimum).toBe(-9223372036854775808n)
        expect(result.Numbers.maximum).toBe(9223372036854775807n)
        expect(result.Numbers.hexMaximum).toBe(9223372036854775807n)
        expect(result.Numbers.items[0]).toBe(9007199254740993n)
        expect(result.Numbers.object.large).toBe(9007199254740993n)
    })

    test.each([
        '9223372036854775808',
        '-9223372036854775809',
        '0x8000000000000000',
        '1e-400',
    ])('Rejects out-of-range or underflowing literal %s.', (literal) => {
        // 1. Assign.
        const input = document(`value = ${literal}\n`, strictMode)

        // 2. Act.
        const parsed = YINI.parseForTooling(input, { strictMode })

        // 3. Assert.
        expect(parsed.ok).toBe(false)
        expect(parsed.diagnostics).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    severity: 'error',
                    message: expect.stringMatching(/range|underflow/i),
                    line: 2,
                }),
            ]),
        )
    })

    test('Accepts zero and a nonzero binary64 subnormal.', () => {
        // 1. Assign.
        const input = document(
            'zero = 0e-400\nsubnormal = 5e-324\nnegativeZero = -0.0\n',
            strictMode,
        )

        // 2. Act.
        const result = YINI.parse(input, { strictMode })

        // 3. Assert.
        expect(result.Numbers.zero).toBe(0)
        expect(result.Numbers.subnormal).toBe(Number.MIN_VALUE)
        expect(Object.is(result.Numbers.negativeZero, -0)).toBe(true)
    })
})
