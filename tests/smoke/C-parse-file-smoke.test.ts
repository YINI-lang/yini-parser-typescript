/**
 * 10 Parse-File Smoke Tests
 *
 * To test a set of real-life (mimiced) configuration files one might have.
 */

import path from 'path'
import YINI from '../../src'
import { debugPrint } from '../../src/utils/system'

const DIR_OF_FIXTURES = './smoke-fixtures'

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
        expect(result.Server.max_connections).toEqual(200)
        //@todo Add tests for the other literal as well.
    })

    test('Parse file "2-user-profile-settings.*".', () => {
        // Arrange.
        const fileName = '2-user-profile-settings.smoke.yini'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const result = YINI.parseFile(fullPath)
        debugPrint(result)

        // Assert.
        expect(result.profile.username).toEqual('robinkoda')
        //@todo Add tests for the other literal as well.
    })

    xtest('Parse file "3-cli-application-options.*".', () => {
        // Arrange.
        const fileName = '3-cli-application-options.smoke.yini'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const result = YINI.parseFile(fullPath)
        debugPrint(result)

        // Assert.
        expect(result.CLI.dry_run).toEqual(false)
        //@todo Add tests for the other literal as well.
    })

    test('Parse file "4-build-project-configuration.*".', () => {
        // Arrange.
        const fileName = '4-build-project-configuration.smoke.yini'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const result = YINI.parseFile(fullPath)
        debugPrint(result)

        // Assert.
        expect(result.Build.target).toEqual('ES2022')
        //@todo Add tests for the other literal as well.
    })

    test('Parse file "5-database-connection.*".', () => {
        // Arrange.
        const fileName = '5-database-connection.smoke.yini'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const result = YINI.parseFile(fullPath)
        debugPrint(result)

        // Assert.
        expect(result.Database.port).toEqual(5432)
        //@todo Add tests for the other literal as well.
    })

    xtest('Parse file "6-feature-flags-example.*".', () => {
        // Arrange.
        const fileName = '6-feature-flags-example.smoke.yini'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const result = YINI.parseFile(fullPath)
        debugPrint(result)

        // Assert.
        expect(result.Features.experimental_ui).toEqual(false)
        //@todo Add tests for the other literal as well.
    })

    xtest('Parse file "7-email-smtp-configuration.*".', () => {
        // Arrange.
        const fileName = '7-email-smtp-configuration.smoke.yini'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const result = YINI.parseFile(fullPath)
        debugPrint(result)

        // Assert.
        expect(result.SMTP.use_tls).toEqual(true)
        //@todo Add tests for the other literal as well.
    })

    xtest('Parse file "8-api-keys-integration.*".', () => {
        // Arrange.
        const fileName = '8-api-keys-integration.smoke.yini'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const result = YINI.parseFile(fullPath)
        debugPrint(result)

        // Assert.
        expect(result.Webhooks.enabled).toEqual(true)
        //@todo Add tests for the other literal as well.
    })

    xtest('Parse file "9-app-preferences.*".', () => {
        // Arrange.
        const fileName = '9-app-preferences.smoke.yini'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const result = YINI.parseFile(fullPath)
        debugPrint(result)

        // Assert.
        expect(result.base.CacheFolder).toEqual(null)
        //@todo Add tests for the other literal as well.
    })

    xtest('Parse file "10-logging-monitoring.*".', () => {
        // Arrange.
        const fileName = '10-logging-monitoring.smoke.yini'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const result = YINI.parseFile(fullPath)
        debugPrint(result)

        // Assert.
        expect(result.base.Alerts.slack_webhook).toEqual(null)
        //@todo Add tests for the other literal as well.
    })
})
