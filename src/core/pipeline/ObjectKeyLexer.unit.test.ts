import { CharStreams } from 'antlr4'
import YiniLexer from '../../grammar/generated/YiniLexer'
import ObjectKeyLexer from './ObjectKeyLexer'

describe('Object-key lexing:', () => {
    test.each(['10', '10.5', '1e+3', '0xFF'])(
        'Re-lexes a compact value %s ending directly at EOF.',
        (value) => {
            // 1. Assign.
            const lexer = new ObjectKeyLexer(
                CharStreams.fromString(`{hex:${value}`),
            )

            // 2. Act.
            const tokens = lexer.getAllTokens()

            // 3. Assert.
            expect(tokens.map((token) => token.text)).toEqual([
                '{',
                'hex',
                ':',
                value,
            ])
            expect(tokens.map((token) => token.type)).toEqual([
                YiniLexer.OC,
                YiniLexer.KEY,
                YiniLexer.COLON,
                YiniLexer.NUMBER,
            ])
            expect(tokens[3]).toMatchObject({
                line: 1,
                column: 5,
                start: 5,
                stop: 4 + value.length,
            })
        },
    )

    test('Resets object context when tokenization restarts partway through an object.', () => {
        // 1. Assign.
        const lexer = new ObjectKeyLexer(
            CharStreams.fromString('{hex:10},hex:20'),
        )
        lexer.nextToken()

        // 2. Act.
        lexer.reset()
        const tokens = lexer.getAllTokens()

        // 3. Assert.
        expect(tokens.map((token) => token.text)).toEqual([
            '{',
            'hex',
            ':',
            '10',
            '}',
            ',',
            'hex:20',
        ])
        expect(tokens[tokens.length - 1].type).toBe(YiniLexer.NUMBER)
    })
})
