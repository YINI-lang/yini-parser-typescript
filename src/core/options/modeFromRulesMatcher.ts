import { IParseCoreOptions, IParseRuleOptions } from '../internalTypes'

/**
 * Infer parse mode from option rules.
 */
export const matchModeFromRules = (
    coreOptions: IParseCoreOptions,
): 'custom' | 'strict' | 'lenient' => {
    const rules: IParseRuleOptions = coreOptions.rules

    if (rules.onDuplicateKey === 'error') {
        if (rules.treatEmptyValueAsNull == 'disallow') {
            return 'strict'
        }

        return 'lenient'
    }
    return 'custom'
}
