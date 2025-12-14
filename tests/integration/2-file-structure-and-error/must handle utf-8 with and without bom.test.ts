import { join } from 'node:path'
import path from 'path'
import YINI from '../../../src'
import { debugPrint, toPrettyJSON } from '../../../src/utils/print'
import { generateBOMFiles } from './gen-bom-fixtures/generate-bom-fixtures'

const baseDirBOMFixtures = join(
    __dirname,
    'gen-bom-fixtures',
    'generated-bom-fixtures',
)

/* ====================================================================
 *  A — parse(..) must handle UTF-8 with and without BOM
 * ==================================================================== */
describe('A-Must handle parse(..) UTF-8 with or without BOM:', () => {
    const expected = {
        App: {
            name: 'Demo',
        },
    }

    test('A-1. Test, this should parse equal.', () => {
        // Arrange.
        const input = `^ Foo
        bar = "AAA"`

        // Act.
        const result = YINI.parse(input)

        // Assert.
        expect(toPrettyJSON(result)).not.toEqual(toPrettyJSON(expected))
    })

    test('A-2.a) Parses UTF-8 without BOM.', () => {
        // Arrange.
        const input = `^ App
name = "Demo"`

        // Act.
        const result = YINI.parse(input)

        // Assert.
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(expected))
    })

    test('A-2.b) Parses UTF-8 without BOM.', () => {
        // Arrange.
        const input = `
            ^ App
            name = "Demo"
        `

        // Act.
        const result = YINI.parse(input)

        // Assert.
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(expected))
    })

    test('A-3.a) Parses UTF-8 WITH BOM.', () => {
        // Arrange.
        const input = `\uFEFF^ App
name = "Demo"`

        // Act.
        const result = YINI.parse(input)

        // Assert.
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(expected))
    })

    test('A-4.a) Parses UTF-8 with BOM followed by newline before content.', () => {
        // Arrange.
        const input = `\uFEFF\n^ App
name = "Demo"`

        // Act.
        const result = YINI.parse(input)

        // Assert.
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(expected))
    })

    test('A-4.b) Parses UTF-8 with BOM followed by newline before content.', () => {
        // Arrange.
        const input = `\uFEFF
        ^ App
            name = "Demo"
        `

        // Act.
        const result = YINI.parse(input)

        // Assert.
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(expected))
    })

    test('A-5. Does NOT treat mid-file U+FEFF as BOM.', () => {
        // Arrange.
        const input = `^ App
            name = "A\uFEFFB"`

        // Act.
        const result = YINI.parse(input)

        // Assert.
        expect(result.App.name).toBe('A\uFEFFB')
        expect(result.App.name.length).toBe(3) // A + FEFF + B
    })
})

/* ====================================================================
 *  B — parseFile(..) must handle UTF-8 with and without BOM
 * ==================================================================== */
describe('B-Must handle parseFile(..) UTF-8 with or without BOM:', () => {
    const expected = {
        App: {
            name: 'BOM Demo',
        },
    }

    beforeAll(() => {
        generateBOMFiles(baseDirBOMFixtures)
    })

    test('B-2.a) Parses UTF-8 without BOM.', () => {
        // Arrange.
        const fileName = 'utf8-no-bom.yini'
        const fullPath = path.join(baseDirBOMFixtures, fileName)

        // Act.
        const result = YINI.parseFile(fullPath)

        // Assert.
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(expected))
    })

    test('B-2.b) Parses UTF-8 without BOM.', () => {
        // Arrange.
        const fileName = 'utf8-no-bom.yini'
        const fullPath = path.join(baseDirBOMFixtures, fileName)

        // Act.
        const result = YINI.parseFile(fullPath)

        // Assert.
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(expected))
    })

    test('B-3.a) Parses UTF-8 WITH BOM.', () => {
        // Arrange.
        const fileName = 'utf8-with-bom.yini'
        const fullPath = path.join(baseDirBOMFixtures, fileName)

        // Act.
        const result = YINI.parseFile(fullPath)

        // Assert.
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(expected))
    })

    test('B-4. Parses UTF-8 with BOM followed by newline before content.', () => {
        // Arrange.
        const fileName = 'utf8-with-bom-newline.yini'
        const fullPath = path.join(baseDirBOMFixtures, fileName)

        // Act.
        const result = YINI.parseFile(fullPath)

        // Assert.
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(expected))
    })

    test('B-5. Does NOT treat mid-file U+FEFF as BOM.', () => {
        // Arrange.
        const fileName = 'utf8-mid-file-feff.yini'
        const fullPath = path.join(baseDirBOMFixtures, fileName)

        // Act.
        const result = YINI.parseFile(fullPath)

        // Assert.
        expect(result.App.name).toBe('A\uFEFFB')
        expect(result.App.name.length).toBe(3) // A + FEFF + B
    })
})
