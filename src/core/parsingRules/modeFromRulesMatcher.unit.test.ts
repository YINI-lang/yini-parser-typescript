import { debugPrint } from '../../utils/print'
import { TParserMode } from '../internalTypes'
import {
    getDefaultUserOptions,
    TNormalizedUserOptions,
} from '../options/defaultParserOptions'
import { toCoreOptions } from '../options/optionsFunctions'
import { matchModeFromRules } from './modeFromRulesMatcher'

/**
 * splitLines(..) Tests.
 */
describe('Match Mode From Rules Unit Tests:', () => {
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
