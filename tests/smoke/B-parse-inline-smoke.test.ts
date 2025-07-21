/**
 * Around 10 Parse-Inline (incl. literals) Smoke Tests
 *
 * To "quickly" test the main features and syntax of YINI.
 * @note These samples/fixtures are different than the tests for parseFile(..).
 */

import YINI from '../../src'
import { debugPrint } from '../../src/utils/system'

const fixture10Yini = `
^ AppConfig
name = "YINI Tester"
version = 1.0

    ^^ Settings
    enable_feature = true
    paths = ["/home/user", "/tmp"]
    options: "opt1", "opt2", "opt3"

        ^^^ Advanced
        triple = """multi
        line
        string"""

        classic = C"Hello\tWorld\n"
        hyper = H"  foo   
            bar baz   "

^ Metadata
author = 'Smoke Test'
created = null
/END
`

/**
 * Parse-Inline Smoke Tests.
 */
describe('Parse-Inline Smoke Tests:', () => {
    beforeAll(() => {})

    //@todo Need to fix so a single member is attached or returned with the implicit base object.
    xtest('1.a. Shortest Valid Code (a single member).', () => {
        // Arrange.
        const validYini = 'number=42'
        // Act.
        const result = YINI.parse(validYini)
        debugPrint(result)
        // Assert.
        expect(result.number).toEqual(42)
    })

    //@todo Fix so this get parse correctly, seems to be issue that {} is being transformed to undefined at some point!
    xtest('1.b. Shortest Valid Code (a single section title).', () => {
        // Arrange.
        const validYini = '^Title'
        // Act.
        const result = YINI.parse(validYini)
        debugPrint(result)
        // Assert.
        expect(result.Title).toBeDefined()
    })

    test('1.c. Shortest Valid Code (section with a single member).', () => {
        // Arrange.
        const validYini = `^title
another=64`
        // Act.
        const result = YINI.parse(validYini)
        debugPrint(result)
        // Assert.
        expect(result.title.another).toEqual(64)
    })

    test('2. Short Valid Code (tabbed section with a negative number).', () => {
        // Arrange.
        const validYini = `
    \t^ Section
    \tnumber = -1`
        // Act.
        const result = YINI.parse(validYini)
        debugPrint(result)
        // Assert.
        expect(result.Section.number).toEqual(-1)
    })

    test('3. Minimal Valid Code (section with couple of members).', () => {
        // Arrange.
        const validYini = `^ Main
name = 'YINI Smoke Test'
version = 3`
        // Act.
        const result = YINI.parse(validYini)
        debugPrint(result)
        // Assert.
        expect(result.Main.name).toEqual('YINI Smoke Test')
        expect(result.Main.version).toEqual(3)
    })

    //@todo Needs implementing of section with sections for this pass.
    xtest('4. Nested Sections, Tabbed Nesting, Backticked Names.', () => {
        // Arrange.
        const validYini = `@yini
^ user
username = "tester"
\`Is Admin\` = True

    ^^ prefs
    theme = 'dark'
    notifications = false

        ^^^ \`Complex Section\`
        setting = 99`

        // Act.
        const result = YINI.parse(validYini)
        debugPrint(result)

        // Assert.
        expect(result.user.username).toEqual('tester')
        expect(result.user.is_admin).toEqual(true)

        expect(result.user.prefs.theme).toEqual('dark')
        expect(result.user.prefs.notifications).toEqual(false)

        expect(result.user.prefs.theme['Complex Section'].setting).toEqual(99)
    })

    test('5. All Key/Value (simple) Types.', () => {
        // Arrange.
        const validYini = `
    ^ TypesDemo
    string1 = "Hello"
    string2 = 'World'
    number1 = 123
    number2 = -5.7    
    hexval = 0xFFEE

    binval = %10001
    bool_true = yes
    \`bool false\` = OFF
    nullval = null
    empty_val =          # ← Null (lenient mode)`

        // Act.
        const result = YINI.parse(validYini)
        debugPrint(result)

        // Assert.
        expect(result.TypesDemo.string1).toEqual('Hello')
        expect(result.TypesDemo.string2).toEqual('World')
        expect(result.TypesDemo.number1).toEqual(123)
        expect(result.TypesDemo.number2).toEqual(-5.7)
        expect(result.TypesDemo.hexval).toEqual(65518)

        expect(result.TypesDemo.binval).toEqual(17)
        expect(result.TypesDemo.bool_true).toEqual(true)
        expect(result.TypesDemo['bool false']).toEqual(false)
        expect(result.TypesDemo.nullval).toEqual(null)
        expect(result.TypesDemo.empty_val).toEqual(null)

        //@todo Add the rest of the members too
    })

    xtest('6. List Types.', () => {
        // Arrange.
        const validYini = `
@YINI
^ Lists
simple = [1, 2, 3]
mixed = ["A", 10, true, null]
nested = [[1, 2], [3, 4]]
trailing = [5, 6, 7, ]        // Trailing comma allowed in lenient mode

colonlist:
  "a",
  "b",
  "c",`

        // Act.
        const result = YINI.parse(validYini)
        debugPrint(result)

        // Assert.
        //expect(result.TypesDemo.string2).toEqual('World')
        //@todo Add the rest of the members too
    })

    xtest('7. Object Types.', () => {
        // Arrange.
        const validYini = `
^ Objects
person = { name = "Alice", age = 30, active = true }
nested = { inner = { foo = "bar" }, number = 2 }
empty = { }`

        // Act.
        const result = YINI.parse(validYini)
        debugPrint(result)

        // Assert.
        //expect(result.TypesDemo.string2).toEqual('World')
        //@todo Add the rest of the members too
    })

    test('8. Comments, Block Comments, and Disabled Lines.', () => {
        // Arrange.
        const validYini = `
    @yini    
    // Top comment
    ^ CommentsDemo
    val1 = 123  # Inline comment
    val2 = 456  // Another comment
    ; Full-line comment

    /*
    Block comment
    over multiple lines
    */

    --val3 = "This is disabled and ignored"
    val4 = 'Some text.'
`

        // Act.
        const result = YINI.parse(validYini)
        debugPrint(result)

        // Assert.
        expect(result.CommentsDemo.val1).toEqual(123)
        expect(result.CommentsDemo.val2).toEqual(456)
        expect(result.CommentsDemo.val3).toEqual(undefined)
        expect(result.CommentsDemo.val4).toEqual('Some text.')
    })

    test('9. Short-Hand and Alternative Section Notations', () => {
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
item = 77

<1 user3
username = 'tester three'
isSysOp = NO

    <2 prefs
    theme = "special-dark"
    notifications = ON

`

        // Act.
        const result = YINI.parse(validYini)
        debugPrint(result)

        // Assert.
        expect(result.user.username).toEqual('tester two')
        expect(result.user.isSysOp).toEqual(true)
        expect(result.user.prefs.theme).toEqual('light')
        expect(result.user.prefs.notifications).toEqual(false)

        const deeperSection = {
            ...result.user2.prefs.deepSection.deeperSection,
        }
        expect(deeperSection.key).toEqual('Level 4 section')
        expect(deeperSection.yetDeeperSection.key).toEqual('Level 5 section')
        expect(deeperSection.yetDeeperSection.item).toEqual(77)

        expect(result.user3.username).toEqual('tester three')
        expect(result.user3.isSysOp).toEqual(false)

        //@todo (EDIT: This is fixed now??) Fix issue so this missing subsection gets included, not sure yet what exactly causes the issue...
        expect(result.user3.prefs.theme).toEqual('special-dark')
        expect(result.user3.prefs.notifications).toEqual(true)
    })

    //@todo Enable when can parse lists...
    xtest('10. Parse inline AppConfig (Mixed).', () => {
        // Arrange.
        // Act.
        const result = YINI.parse(fixture10Yini)
        debugPrint(result)
        // Assert.
        expect(!!result).toEqual(true)
        //@todo Add proper tests
    })
})
