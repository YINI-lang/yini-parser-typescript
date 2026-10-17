import YINI from '../../src'

describe('Backslash escapes in backticked identifiers', () => {
    test.each([false, true])(
        'decodes escaped backslashes in a member key (strictMode: %s)',
        (strictMode) => {
            const source = strictMode
                ? '^ Root\n`path\\\\name` = 1\n/END\n'
                : '`path\\\\name` = 1\n'

            const result = YINI.parse(source, {
                strictMode,
                failLevel: 'errors',
            })

            expect(result).toEqual(
                strictMode
                    ? { Root: { 'path\\name': 1 } }
                    : { 'path\\name': 1 },
            )
        },
    )

    test('decodes escaped backslashes in a section name', () => {
        const source = '^ `Path\\\\Group`\nvalue = 1\n/END\n'

        expect(YINI.parse(source, true)).toEqual({
            'Path\\Group': { value: 1 },
        })
    })

    test('decodes escaped backslashes in an inline object key', () => {
        const source = 'object = {`path\\\\name`: 1}\n'

        expect(YINI.parse(source)).toEqual({
            object: { 'path\\name': 1 },
        })
    })

    test.each([false, true])(
        'rejects an unsupported identifier escape (strictMode: %s)',
        (strictMode) => {
            const source = strictMode
                ? '^ Root\n`path\\q` = 1\n/END\n'
                : '`path\\q` = 1\n'

            expect(() =>
                YINI.parse(source, {
                    strictMode,
                    failLevel: 'errors',
                }),
            ).toThrow()
        },
    )
})
