import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import YINI from '../../../src'

describe.each([false, true])('UTF-8 files (strictMode: %s):', (strictMode) => {
    let directory: string
    let filePath: string

    beforeEach(() => {
        directory = fs.mkdtempSync(path.join(os.tmpdir(), 'yini-utf8-'))
        filePath = path.join(directory, 'input.yini')
    })

    afterEach(() => {
        fs.unlinkSync(filePath)
        fs.rmdirSync(directory)
    })

    test('Rejects invalid byte sequences before lossy decoding.', () => {
        // 1. Assign.
        const bytes = Buffer.concat([
            Buffer.from('^ Encoding\nvalue = "caf'),
            Buffer.from([0xe9]),
            Buffer.from('"\n/END\n'),
        ])
        fs.writeFileSync(filePath, bytes)

        // 2. Act.
        const parse = () =>
            YINI.parseFile(filePath, {
                strictMode,
                failLevel: 'errors',
                logDiagnostics: false,
            })

        // 3. Assert.
        expect(parse).toThrow(/invalid UTF-8/i)
    })

    test('Accepts valid Unicode, including a literal replacement character.', () => {
        // 1. Assign.
        fs.writeFileSync(
            filePath,
            '^ Encoding\nvalue = "café \uFFFD 😀"\n/END\n',
            'utf8',
        )

        // 2. Act.
        const parsed = YINI.parseFile(filePath, {
            strictMode,
            logDiagnostics: false,
        })

        // 3. Assert.
        expect(parsed).toEqual({ Encoding: { value: 'café \uFFFD 😀' } })
    })
})
