/**
 * 10 Traverse-File Smoke Tests
 *
 * Dry run parsing, just analyzes/validates/traverses a set of real-life
 * (mimiced) configuration files one might have.
 *
 * Dry-run parsing — performs only enough work to validate the input and
 * return success.
 */

import path from 'path'
import YINI from '../../src'
import { debugPrint } from '../../src/utils/print'

const DIR_OF_FIXTURES = '../fixtures/smoke-fixtures'

/**
 * Parse File Smoke Tests.
 */
describe('Parse-File Smoke Tests:', () => {
    // Dir with smoke fixtures.
    const baseDir = path.join(__dirname, DIR_OF_FIXTURES)

    beforeAll(() => {})

    test('Parse file "1-web-server-configuration.*".', () => {
        // Arrange.
        const fileName = '1-web-server-configuration.smoke.yini'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const result = YINI.parseFile(fullPath)
        debugPrint('fullPath = ' + fullPath)
        debugPrint(result)

        // Assert.
        // NOTE: Dry run parsing - enough that something is successfully returned.
        expect(!!result).toEqual(true)
    })

    test('Parse file "2-user-profile-settings.*".', () => {
        // Arrange.
        const fileName = '2-user-profile-settings.smoke.yini'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const result = YINI.parseFile(fullPath)
        debugPrint(result)

        // Assert.
        // NOTE: Dry run parsing - enough that something is successfully returned.
        expect(!!result).toEqual(true)
    })

    //@todo Enable test (after can parse list (colon based)).
    test('Parse file "3-cli-application-options.*".', () => {
        // Arrange.
        const fileName = '3-cli-application-options.smoke.yini'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const result = YINI.parseFile(fullPath)
        debugPrint(result)

        // Assert.
        // NOTE: Dry run parsing - enough that something is successfully returned.
        expect(!!result).toEqual(true)
    })

    test('Parse file "4-build-project-configuration.*".', () => {
        // Arrange.
        const fileName = '4-build-project-configuration.smoke.yini'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const result = YINI.parseFile(fullPath)
        debugPrint(result)

        // Assert.
        // NOTE: Dry run parsing - enough that something is successfully returned.
        expect(!!result).toEqual(true)
    })

    test('Parse file "5-database-connection.*".', () => {
        // Arrange.
        const fileName = '5-database-connection.smoke.yini'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const result = YINI.parseFile(fullPath)
        debugPrint(result)

        // Assert.
        // NOTE: Dry run parsing - enough that something is successfully returned.
        expect(!!result).toEqual(true)
    })

    test('Parse file "6-feature-flags-example.*".', () => {
        // Arrange.
        const fileName = '6-feature-flags-example.smoke.yini'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const result = YINI.parseFile(fullPath)
        debugPrint(result)

        // Assert.
        // NOTE: Dry run parsing - enough that something is successfully returned.
        expect(!!result).toEqual(true)
    })

    test('Parse file "7-email-smtp-configuration.*".', () => {
        // Arrange.
        const fileName = '7-email-smtp-configuration.smoke.yini'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const result = YINI.parseFile(fullPath)
        debugPrint(result)

        // Assert.
        // NOTE: Dry run parsing - enough that something is successfully returned.
        expect(!!result).toEqual(true)
    })

    //@todo Enable test (after can parse colon based lists).
    xtest('Parse file "8-api-keys-integration.*".', () => {
        // Arrange.
        const fileName = '8-api-keys-integration.smoke.yini'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const result = YINI.parseFile(fullPath)
        debugPrint(result)

        // Assert.
        // NOTE: Dry run parsing - enough that something is successfully returned.
        expect(!!result).toEqual(true)
    })

    //@todo Enable test (after can parse with no section defined, implicit base object).
    xtest('Parse file "9-app-preferences.*".', () => {
        // Arrange.
        const fileName = '9-app-preferences.smoke.yini'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const result = YINI.parseFile(fullPath)
        debugPrint(result)

        // Assert.
        // NOTE: Dry run parsing - enough that something is successfully returned.
        expect(!!result).toEqual(true)
    })

    //@todo Enable test (after can parse lists)
    xtest('Parse file "10-logging-monitoring.*".', () => {
        // Arrange.
        const fileName = '10-logging-monitoring.smoke.yini'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const result = YINI.parseFile(fullPath)
        debugPrint(result)

        // Assert.
        // NOTE: Dry run parsing - enough that something is successfully returned.
        expect(!!result).toEqual(true)
    })
})
