import { ParseOptions } from 'querystring'
import { debugPrint } from '../../utils/print'
import { inferModeFromRules, toCoreOptions } from './normalizeOptions'
import {
    getDefaultUserOptions,
    TNormalizedUserOptions,
} from './parserDefaultOptions'

/**
 * splitLines(..) Tests.
 */
describe('normalizeOptions Unit Tests:', () => {
    test('1. splitLines(..) test.', () => {
        // Arrange.
        const parserOptions: TNormalizedUserOptions =
            getDefaultUserOptions('lenient')
        // Act.
        const result = inferModeFromRules(toCoreOptions(parserOptions))
        debugPrint('parserOptions:')
        debugPrint(parserOptions)
        // Assert.
        expect(result).toEqual('lenient')
    })
})
