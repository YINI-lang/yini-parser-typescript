/*
 * Strict-mode Golden Tests.
 */

import path from 'path'
import { fileListStrict as _3_fileListStrict } from './3-basic-and-simple-literals/files-for-strict'
import { fileListStrict as _6_fileListStrict } from './6-numeric-literals-and-notations/files-for-strict'
import { testInvalidCases, testValidCases } from './golden-test-helpers'

describe('Golden Tests: 3-Basic and Simple Literals in strict-mode.', () => {
    const dirSyntaxGroup = '3-basic-and-simple-literals'
    const baseDirGood = path.join(__dirname, dirSyntaxGroup, 'valid')
    const baseDirBad = path.join(__dirname, dirSyntaxGroup, 'invalid')

    // Tests in strict-mode.
    testValidCases(true, baseDirGood, _3_fileListStrict.valid)
    testInvalidCases(true, baseDirBad, _3_fileListStrict.invalid)
})

describe('Golden Tests: 6-Numeric Literals and Notations in strict-mode.', () => {
    const dirSyntaxGroup = '6-numeric-literals-and-notations'
    const baseDirGood = path.join(__dirname, dirSyntaxGroup, 'valid')
    const baseDirBad = path.join(__dirname, dirSyntaxGroup, 'invalid')

    // Tests in strict-mode.
    testValidCases(true, baseDirGood, _6_fileListStrict.valid)
    testInvalidCases(true, baseDirBad, _6_fileListStrict.invalid)
})
