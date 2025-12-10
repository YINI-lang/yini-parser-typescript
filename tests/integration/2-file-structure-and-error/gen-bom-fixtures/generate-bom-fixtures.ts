import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

// const baseDir = join('tests', 'fixtures', 'bom')
// const baseDir = join(__dirname, 'generated-bom-fixtures')

/**
 * Because BOMs and U+FEFF are invisible and annoying, this function
 * generates the four files with exact bytes.
 */
export const generateBOMFiles = (baseDir: string) => {
    mkdirSync(baseDir, { recursive: true })

    // 1) UTF-8 without BOM
    writeFileSync(
        join(baseDir, 'utf8-no-bom.yini'),
        '^ App\nname = "BOM Demo"\n',
        {
            encoding: 'utf8',
        },
    )

    // 2) UTF-8 with BOM
    {
        const bom = Buffer.from([0xef, 0xbb, 0xbf]) // UTF-8 BOM
        const body = Buffer.from('^ App\nname = "BOM Demo"\n', 'utf8')
        writeFileSync(
            join(baseDir, 'utf8-with-bom.yini'),
            Buffer.concat([bom, body]),
        )
    }

    // 3) UTF-8 with BOM + leading newline
    {
        const bom = Buffer.from([0xef, 0xbb, 0xbf])
        const body = Buffer.from('\n^ App\nname = "BOM Demo"\n', 'utf8')
        writeFileSync(
            join(baseDir, 'utf8-with-bom-newline.yini'),
            Buffer.concat([bom, body]),
        )
    }

    // 4) UTF-8 mid-file U+FEFF in value
    {
        const body = '^ App\nname = "A\uFEFFB"\n'
        writeFileSync(join(baseDir, 'utf8-mid-file-feff.yini'), body, {
            encoding: 'utf8',
        })
    }

    console.log(`Generated BOM fixtures was written to:\n"${baseDir}"`)
}
