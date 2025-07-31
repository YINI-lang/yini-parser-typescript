import path from 'path'
import { fileListLenient } from './3-basic-and-simple-literals/files-for-lenient'
import { testInvalidCases, testValidCases } from './golden-test-helpers'

describe('Golden Tests: 3-Basic and Simple literals in lenient-mode.', () => {
    const dirSyntaxGroup = '3-basic-and-simple-literals'
    const baseDirGood = path.join(__dirname, dirSyntaxGroup, 'valid')
    const baseDirBad = path.join(__dirname, dirSyntaxGroup, 'invalid')

    // Tests in lenient-mode.
    testValidCases(false, baseDirGood, fileListLenient.valid)
    testInvalidCases(false, baseDirBad, fileListLenient.invalid)
})
