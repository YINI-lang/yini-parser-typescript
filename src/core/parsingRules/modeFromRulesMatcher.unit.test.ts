import { ParseOptions } from '../../types'
import { debugPrint } from '../../utils/print'
import { IParseCoreOptions, TParserMode } from '../internalTypes'
import {
    getDefaultUserOptions,
    TNormalizedUserOptions,
} from '../options/defaultParserOptions'
import { toCoreOptions } from '../options/optionsFunctions'
import {
    matchModeFromCoreOptions,
    matchModeFromParseOptions,
} from './modeFromRulesMatcher'

describe('Match Correct Mode From Options Unit Tests:', () => {
    const lenientOpt: TNormalizedUserOptions = getDefaultUserOptions('lenient')
    const strictOpt: TNormalizedUserOptions = getDefaultUserOptions('strict')

    test(`1.a) Should derive 'lenient' user options correctly.`, () => {
        // Arrange.
        const mode: TParserMode = 'lenient'

        // Act.
        const resultMode = matchModeFromParseOptions(lenientOpt as any)

        // Assert.
        expect(resultMode).toEqual(mode)
    })

    test(`1.b) Should derive 'lenient' user (core) options correctly.`, () => {
        // Arrange.
        const mode: TParserMode = 'lenient'
        const coreOptions: IParseCoreOptions = toCoreOptions(lenientOpt)

        // Act.
        const resultMode = matchModeFromCoreOptions(coreOptions)

        // Assert.
        expect(resultMode).toEqual(mode)
    })

    test(`2.a) Should derive 'strict' user options correctly.`, () => {
        // Arrange.
        const mode: TParserMode = 'strict'

        // Act.
        const resultMode = matchModeFromParseOptions(strictOpt as any)

        // Assert.
        expect(resultMode).toEqual(mode)
    })

    test(`2.b) Should derive 'strict' user (core) options correctly.`, () => {
        // Arrange.
        const mode: TParserMode = 'strict'
        const coreOptions: IParseCoreOptions = toCoreOptions(strictOpt)

        // Act.
        const resultMode = matchModeFromCoreOptions(coreOptions)

        // Assert.
        expect(resultMode).toEqual(mode)
    })

    test(`3.a) Should derive 'custom' from tampered lenient user options.`, () => {
        // Arrange.
        const customOpt: ParseOptions = { ...lenientOpt }
        customOpt.requireDocTerminator = 'required'

        // Act.
        const resultMode = matchModeFromParseOptions(customOpt as any)

        // Assert.
        expect(resultMode).toEqual('custom')
    })

    test(`3.b) Should derive 'custom' from tampered lenient user (core) options.`, () => {
        // Arrange.
        const customOptions: IParseCoreOptions = toCoreOptions(lenientOpt)
        customOptions.rules.treatEmptyValueAsNull = 'disallow'

        // Act.
        const resultMode = matchModeFromCoreOptions(customOptions)

        // Assert.
        expect(resultMode).toEqual('custom')
    })

    test(`4.a) Should derive 'custom' from tampered strict user options.`, () => {
        // Arrange.
        const customOpt: ParseOptions = { ...strictOpt }
        customOpt.onDuplicateKey = 'overwrite'

        // Act.
        const resultMode = matchModeFromParseOptions(customOpt as any)

        // Assert.
        expect(resultMode).toEqual('custom')
    })

    test(`4.b) Should derive 'custom' from tampered strict user (core) options.`, () => {
        // Arrange.
        const customOptions: IParseCoreOptions = toCoreOptions(strictOpt)
        customOptions.rules.onDuplicateKey = 'warn-and-overwrite'

        // Act.
        const resultMode = matchModeFromCoreOptions(customOptions)

        // Assert.
        expect(resultMode).toEqual('custom')
    })
})
