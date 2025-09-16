import { debugPrint } from '../../utils/print'
import { TParserMode } from '../internalTypes'
import {
    getDefaultUserOptions,
    TNormalizedUserOptions,
} from './defaultParserOptions'
import { matchModeFromRules } from './modeFromRulesMatcher'
import { toCoreOptions } from './optionsFunctions'

/**
 * splitLines(..) Tests.
 */
describe('normalizeOptions Unit Tests:', () => {
    test(`1. Default 'lenient' options should be EQ to matchModeFromRules(..) test.`, () => {
        // Arrange.
        const mode: TParserMode = 'lenient'
        const parserOptions: TNormalizedUserOptions =
            getDefaultUserOptions(mode)
        // Act.
        const resultMode = matchModeFromRules(toCoreOptions(parserOptions))
        debugPrint('result = ' + resultMode)
        debugPrint('parserOptions:')
        debugPrint(parserOptions)
        // Assert.
        expect(resultMode).toEqual(mode)
    })
})
