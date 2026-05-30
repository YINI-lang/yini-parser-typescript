/**
 * Around 10 Parse-Inline (incl. literals) Smoke Tests.
 *
 * To quickly test the main features and syntax of YINI.
 * @note These samples/fixtures are different than the tests for parseFile(..).
 */

// tests/smoke/C-parse-inline-smoke.test.ts
import { debugPrint } from '../../src/utils/print'
import { parseUntilError } from '../test-helpers'

const fixture10Yini = `
@yini lenient

^ AppConfig
name = "YINI Tester"
version = 1.0

^^ Settings
enable_feature = true
paths = ["/home/user", "/tmp"]
options = ["opt1", "opt2", "opt3"]

^^^ Advanced
raw1 = "C:\\temp\\new"
raw2 = R"C:\\temp\\new"
raw3 = r"C:\\temp\\new"
triple = """multi
line
string"""
classic = C"Hello\\tWorld\\n"
classicLower = c"Line1\\nLine2"

^^ Metadata
author = 'Smoke Test'
created = null

/END
`

/**
 * Parse-Inline Smoke Tests.
 */
describe('Parse-Inline Smoke Tests:', () => {
    test('1.a. Shortest valid code: a single member.', () => {
        // Arrange.
        const validYini = 'number = 42'

        // Act.
        const result = parseUntilError(validYini)
        debugPrint(result)

        // Assert.
        expect(result).toBeTruthy()
        expect(result.number).toEqual(42)
    })

    test('1.b. Shortest valid code: a single section title.', () => {
        // Arrange.
        const validYini = '^ Title'

        // Act.
        const result = parseUntilError(validYini)
        debugPrint(result)

        // Assert.
        expect(result).toBeTruthy()
        expect(result.Title).toBeDefined()
    })

    test('1.c. Shortest valid code: section with a single member.', () => {
        // Arrange.
        const validYini = `
            ^ title
            another = 64
        `

        // Act.
        const result = parseUntilError(validYini)
        debugPrint(result)

        // Assert.
        expect(result).toBeTruthy()
        expect(result.title.another).toEqual(64)
    })

    test('2. Short valid code: tabbed section with a negative number.', () => {
        // Arrange.
        const validYini = `
            \t^ Section
            \tnumber = -1
        `

        // Act.
        const result = parseUntilError(validYini)
        debugPrint(result)

        // Assert.
        expect(result).toBeTruthy()
        expect(result.Section.number).toEqual(-1)
    })

    test('3. Minimal valid code: section with a couple of members.', () => {
        // Arrange.
        const validYini = `
            ^ Main
            name = 'YINI Smoke Test'
            version = 3
        `

        // Act.
        const result = parseUntilError(validYini)
        debugPrint(result)

        // Assert.
        expect(result).toBeTruthy()
        expect(result.Main.name).toEqual('YINI Smoke Test')
        expect(result.Main.version).toEqual(3)
    })

    test('4. Nested sections, tabbed nesting, and backticked names.', () => {
        // Arrange.
        const validYini = `
            @yini lenient

            ^ user
            username = "tester"
            \`Is Admin\` = True

                ^^ prefs
                theme = 'dark'
                notifications = false

                    ^^^ \`Complex Section\`
                    setting = 99
        `

        // Act.
        const result = parseUntilError(validYini)
        debugPrint(result)

        // Assert.
        expect(result).toBeTruthy()

        expect(result.user.username).toEqual('tester')
        expect(result.user['Is Admin']).toEqual(true)

        expect(result.user.prefs.theme).toEqual('dark')
        expect(result.user.prefs.notifications).toEqual(false)

        expect(result.user.prefs['Complex Section'].setting).toEqual(99)
    })

    test('5. All simple key/value types.', () => {
        // Arrange.
        const validYini = `
            ^ TypesDemo
            string1 = "Hello"
            string2 = 'World'
            raw1 = R"C:\\temp\\new"
            raw2 = r"C:\\temp\\new"
            classic1 = C"Hello\\nWorld"
            classic2 = c"Hello\\tWorld"
            number1 = 123
            number2 = -5.7
            hexval1 = 0xFFEE
            hexval2 = hex:FFEE
            binval = %10001
            bool_true = yes
            \`bool false\` = OFF
            nullval = null
            empty_val = # Null in lenient mode.
        `

        // Act.
        const result = parseUntilError(validYini)
        debugPrint(result)

        // Assert.
        expect(result).toBeTruthy()

        expect(result.TypesDemo.string1).toEqual('Hello')
        expect(result.TypesDemo.string2).toEqual('World')
        expect(result.TypesDemo.raw1).toEqual('C:\\temp\\new')
        expect(result.TypesDemo.raw2).toEqual('C:\\temp\\new')
        expect(result.TypesDemo.classic1).toEqual('Hello\nWorld')
        expect(result.TypesDemo.classic2).toEqual('Hello\tWorld')

        expect(result.TypesDemo.number1).toEqual(123)
        expect(result.TypesDemo.number2).toEqual(-5.7)
        expect(result.TypesDemo.hexval1).toEqual(65518)
        expect(result.TypesDemo.hexval2).toEqual(65518)
        expect(result.TypesDemo.binval).toEqual(17)

        expect(result.TypesDemo.bool_true).toEqual(true)
        expect(result.TypesDemo['bool false']).toEqual(false)
        expect(result.TypesDemo.nullval).toEqual(null)
        expect(result.TypesDemo.empty_val).toEqual(null)
    })

    test('6.a. A simple list.', () => {
        // Arrange.
        const validYini = `
            ^ List
            simple = [10, 20, 30]
        `

        // Act.
        const result = parseUntilError(validYini)
        debugPrint(result)

        // Assert.
        expect(result).toBeTruthy()
        expect(result.List.simple).toEqual([10, 20, 30])
    })

    test('6.b. Different JSON-style list types.', () => {
        // Arrange.
        const validYini = `
            ^ Lists
            simple = [1, 2, 3]
            mixed = ["A", 10, true, null]
            empty = []
            nested = [[1, 2], [3, 4]]
            trailing = [5, 6, 7, ] // Trailing comma allowed in lenient mode.
        `

        // Act.
        const result = parseUntilError(validYini)
        debugPrint(result)

        // Assert.
        expect(result).toBeTruthy()
        expect(result.Lists.simple).toEqual([1, 2, 3])
        expect(result.Lists.mixed).toEqual(['A', 10, true, null])
        expect(result.Lists.empty).toEqual([])
        expect(result.Lists.nested).toEqual([
            [1, 2],
            [3, 4],
        ])
        expect(result.Lists.trailing).toEqual([5, 6, 7])
    })

    test('6.c. JSON-style lists only; colon-list syntax is removed.', () => {
        // Arrange.
        const validYini = `
            @yini lenient

            ^ Lists
            simple = [1, 2, 3]
            mixed = ["A", 10, true, null]
            nested = [[1, 2], [3, 4]]
            trailing = [5, 6, 7, ]
            strings = ["a", "b", "c"]
        `

        // Act.
        const result = parseUntilError(validYini)
        debugPrint(result)

        // Assert.
        expect(result).toBeTruthy()
        expect(result.Lists.simple).toEqual([1, 2, 3])
        expect(result.Lists.mixed).toEqual(['A', 10, true, null])
        expect(result.Lists.nested).toEqual([
            [1, 2],
            [3, 4],
        ])
        expect(result.Lists.trailing).toEqual([5, 6, 7])
        expect(result.Lists.strings).toEqual(['a', 'b', 'c'])
    })

    test('7. Object types.', () => {
        // Arrange.
        const validYini = `
            ^ Objects
            person = { name: "Alice", age: 30, active: true }
            lenientPerson = { name = "Bob", age = 40, active = false }
            nested = { inner: { foo: "bar" }, number: 2 }
            empty1 = {}
            empty2 = { }
        `

        // Act.
        const result = parseUntilError(validYini)
        debugPrint(result)

        // Assert.
        expect(result).toBeTruthy()

        expect(result.Objects.person).toEqual({
            name: 'Alice',
            age: 30,
            active: true,
        })

        expect(result.Objects.lenientPerson).toEqual({
            name: 'Bob',
            age: 40,
            active: false,
        })

        expect(result.Objects.nested.inner.foo).toEqual('bar')
        expect(result.Objects.nested.number).toEqual(2)
        expect(result.Objects.empty1).toEqual({})
        expect(result.Objects.empty2).toEqual({})
    })

    test('8. Comments, block comments, and disabled lines.', () => {
        // Arrange.
        const validYini = `
            @yini lenient

            // Line comment.
            # Another line comment.

            ^ CommentsDemo
            val1 = 123 // Inline comment.
            val2 = 456 # Another comment.
            val3 = 789 //Inline comment.
            val4 = 321 #Another comment.
            val5 = "C:\\#not-a-comment"
            val6 = "https://example.com//not-a-comment"

            ; Full-line comment.

            /*
            Block comment
            over multiple lines
            */

            --val13 = "This is disabled and ignored"
            val14 = 'Some text.'
        `

        // Act.
        const result = parseUntilError(validYini)
        debugPrint(result)

        // Assert.
        expect(result).toBeTruthy()

        expect(result.CommentsDemo.val1).toEqual(123)
        expect(result.CommentsDemo.val2).toEqual(456)
        expect(result.CommentsDemo.val3).toEqual(789)
        expect(result.CommentsDemo.val4).toEqual(321)
        expect(result.CommentsDemo.val5).toEqual('C:\\#not-a-comment')
        expect(result.CommentsDemo.val6).toEqual(
            'https://example.com//not-a-comment',
        )
        expect(result.CommentsDemo.val13).toEqual(undefined)
        expect(result.CommentsDemo.val14).toEqual('Some text.')
    })

    test('9. Shorthand, alternative section notations, and marker separators.', () => {
        // Arrange.
        const validYini = `
            < user
            username = 'tester two'
            isSysOp = YES

            << prefs
            theme = "light"
            notifications = OFF

            ^1 user2
            ^2 prefs
            ^3 deepSection
            ^4 deeperSection
            key = "Level 4 section"

            ^5 yetDeeperSection
            key = "Level 5 section"

            ^6 level6
            key = "Level 6 section"

            ^^^_^^^_^ level7
            key = "Level 7 section"

            ^^^_^^^_^^ level8
            key = "Level 8 section"

            ^^^_^^^_^^^ level9
            key = "Level 9 section"

            <1 user3
            username = 'tester three'
            isSysOp = NO

            <2 prefs
            theme = "special-dark"
            notifications = ON

            §1 user4
            username = "tester four"

            §2 prefs
            theme = "section-sign"
        `

        // Act.
        const result = parseUntilError(validYini)
        debugPrint(result)

        // Assert.
        expect(result).toBeTruthy()

        expect(result.user.username).toEqual('tester two')
        expect(result.user.isSysOp).toEqual(true)
        expect(result.user.prefs.theme).toEqual('light')
        expect(result.user.prefs.notifications).toEqual(false)

        const deeperSection = result.user2.prefs.deepSection.deeperSection
        expect(deeperSection.key).toEqual('Level 4 section')
        expect(deeperSection.yetDeeperSection.key).toEqual('Level 5 section')
        expect(deeperSection.yetDeeperSection.level6.key).toEqual(
            'Level 6 section',
        )
        expect(deeperSection.yetDeeperSection.level6.level7.key).toEqual(
            'Level 7 section',
        )
        expect(deeperSection.yetDeeperSection.level6.level7.level8.key).toEqual(
            'Level 8 section',
        )
        expect(
            deeperSection.yetDeeperSection.level6.level7.level8.level9.key,
        ).toEqual('Level 9 section')

        expect(result.user3.username).toEqual('tester three')
        expect(result.user3.isSysOp).toEqual(false)
        expect(result.user3.prefs.theme).toEqual('special-dark')
        expect(result.user3.prefs.notifications).toEqual(true)

        expect(result.user4.username).toEqual('tester four')
        expect(result.user4.prefs.theme).toEqual('section-sign')
    })

    test('10. Parse inline AppConfig with mixed literals and nested sections.', () => {
        // Arrange.

        // Act.
        const result = parseUntilError(fixture10Yini)
        debugPrint(result)

        // Assert.
        expect(result).toBeTruthy()

        expect(result.AppConfig.name).toBe('YINI Tester')
        expect(result.AppConfig.version).toBe(1.0)

        expect(result.AppConfig.Settings.enable_feature).toBe(true)
        expect(result.AppConfig.Settings.paths).toEqual(['/home/user', '/tmp'])
        expect(result.AppConfig.Settings.options).toEqual([
            'opt1',
            'opt2',
            'opt3',
        ])

        expect(result.AppConfig.Settings.Advanced.raw1).toBe('C:\\temp\\new')
        expect(result.AppConfig.Settings.Advanced.raw2).toBe('C:\\temp\\new')
        expect(result.AppConfig.Settings.Advanced.raw3).toBe('C:\\temp\\new')

        expect(result.AppConfig.Settings.Advanced.triple).toBe(
            'multi\nline\nstring',
        )
        expect(result.AppConfig.Settings.Advanced.classic).toBe(
            'Hello\tWorld\n',
        )
        expect(result.AppConfig.Settings.Advanced.classicLower).toBe(
            'Line1\nLine2',
        )

        expect(result.AppConfig.Metadata.author).toBe('Smoke Test')
        expect(result.AppConfig.Metadata.created).toBe(null)
    })
})
