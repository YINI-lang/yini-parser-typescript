/*
 * Lenient-mode Golden Tests.
 */

import path from 'path'
import { fileListLenient as _3_fileListLenient } from './3-basic-and-simple-literals/files-for-lenient'
import { fileListLenient as _6_fileListLenient } from './6-numeric-literals-and-notations/files-for-lenient'
import { testInvalidCases, testValidCases } from './golden-test-helpers'

describe('Golden Tests: 3-Basic and Simple Literals in lenient-mode.', () => {
    const dirSyntaxGroup = '3-basic-and-simple-literals'
    const baseDirGood = path.join(__dirname, dirSyntaxGroup, 'valid')
    const baseDirBad = path.join(__dirname, dirSyntaxGroup, 'invalid')

    // Tests in lenient-mode.
    testValidCases(false, baseDirGood, _3_fileListLenient.valid)
    testInvalidCases(false, baseDirBad, _3_fileListLenient.invalid)
})

describe('Golden Tests: 6-Numeric Literals and Notations in lenient-mode.', () => {
    const dirSyntaxGroup = '6-numeric-literals-and-notations'
    const baseDirGood = path.join(__dirname, dirSyntaxGroup, 'valid')
    const baseDirBad = path.join(__dirname, dirSyntaxGroup, 'invalid')

    // Tests in lenient-mode.
    testValidCases(false, baseDirGood, _6_fileListLenient.valid)
    testInvalidCases(false, baseDirBad, _6_fileListLenient.invalid)
})
