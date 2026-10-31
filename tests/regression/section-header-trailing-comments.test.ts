import YINI from '../../src'

const commentCases = [
    { name: 'Without a comment', comment: '' },
    { name: 'With a // comment', comment: ' // note' },
    { name: 'With a # comment', comment: ' # note' },
    { name: 'With a /* */ comment', comment: ' /* note */' },
]

const headerCases = [
    {
        name: 'Plain header (^)',
        headerLines: '^ Section',
        expectedResult: { Section: { value: 1 } },
    },
    {
        name: 'Repeated marker header (^^)',
        headerLines: '^ Root\n^^ Section',
        expectedResult: { Root: { Section: { value: 1 } } },
    },
    {
        name: 'Numbered level 1 header (^1)',
        headerLines: '^1 Section',
        expectedResult: { Section: { value: 1 } },
    },
    {
        name: 'Numbered level 2 header (^2)',
        headerLines: '^ Root\n^2 Section',
        expectedResult: { Root: { Section: { value: 1 } } },
    },
]

describe.each(headerCases)('$name', ({ headerLines, expectedResult }) => {
    test.each(commentCases)('$name in lenient mode', ({ comment }) => {
        // 1. Assign.
        const source = `${headerLines}${comment}\nvalue = 1\n`

        // 2. Act.
        const result = YINI.parse(source, {
            failLevel: 'errors',
            logDiagnostics: false,
        })

        // 3. Assert.
        expect(result).toEqual(expectedResult)
    })

    test.each(commentCases)('$name in strict mode', ({ comment }) => {
        // 1. Assign.
        const source = `${headerLines}${comment}\nvalue = 1\n/END\n`

        // 2. Act.
        const result = YINI.parse(source, {
            strictMode: true,
            failLevel: 'errors',
            logDiagnostics: false,
        })

        // 3. Assert.
        expect(result).toEqual(expectedResult)
    })
})

describe.each([
    {
        name: 'Before the section name',
        header: '^ /* note */ Section',
        sectionName: 'Section',
    },
    {
        name: 'Inside a backticked section name',
        header: '^ `Section /* literal */`',
        sectionName: 'Section /* literal */',
    },
])('$name', ({ header, sectionName }) => {
    test.each([
        { mode: 'lenient', strictMode: false },
        { mode: 'strict', strictMode: true },
    ])('Parses in $mode mode', ({ strictMode }) => {
        // 1. Assign.
        const source = `${header}\nvalue = 1\n${strictMode ? '/END\n' : ''}`

        // 2. Act.
        const result = YINI.parse(source, {
            strictMode,
            failLevel: 'errors',
            logDiagnostics: false,
        })

        // 3. Assert.
        expect(result).toEqual({ [sectionName]: { value: 1 } })
    })
})
