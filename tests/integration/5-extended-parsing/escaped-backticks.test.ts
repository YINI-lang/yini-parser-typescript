import YINI from '../../../src'

describe.each([false, true])('Escaped backticks (strictMode: %s):', (strictMode) => {
    test('Decodes escaped backticks in section and key names.', () => {
        // 1. Assign.
        const input = `^ \`a\\\`b\`\n\`x\\\`y\` = true\n${strictMode ? '/END\n' : ''}`

        // 2. Act.
        const result = YINI.parse(input, { strictMode })

        // 3. Assert.
        expect(result['a`b']['x`y']).toBe(true)
    })

    test('Rejects an unsupported backtick escape.', () => {
        // 1. Assign.
        const input = `^ Values\n\`bad\\q\` = true\n${strictMode ? '/END\n' : ''}`

        // 2. Act.
        const parsed = YINI.parseForTooling(input, { strictMode })

        // 3. Assert.
        expect(parsed.ok).toBe(false)
    })
})
