import { isDebug } from '../../config/env'
import {
    DocumentTerminatorRule,
    DuplicateKeyPolicy,
    EmptyValueRule,
    OnDuplicateKey,
} from '../../types'
import { debugPrint, printObject } from '../../utils/print'
import { ErrorDataHandler } from '../errorDataHandler'
import {
    IParseCoreOptions,
    IParseRuleOptions,
    TExactMode,
    TParserMode,
} from '../internalTypes'

const MODE_PROFILES: Record<TParserMode, TVec3> = {
    lenient: [0, 0, 0],
    //   moderate: [1, 0, 1],
    strict: [2, 0, 2],
    //'pedantic'
    //'paranoid'
}

type TVec3 = readonly [number, number, number]

/**
 * **Per-rule** strictness scale (0 = loose, 1 = medium, 2 = hard)
 * Or with other terms, 0 = lenient, 1 = medium, 2 = strict.
 */
type TRuleScale = 0 | 1 | 2

/**
 * Determines the effective parse mode from the current options (option rules).
 * @returns 'custom' if no exact match exists, otherwise the matched mode.
 */
export const matchModeFromRules = (
    coreOptions: IParseCoreOptions,
    // ): 'custom' | 'strict' | 'lenient' => {
): TExactMode => {
    debugPrint('-> matchModeFromRules(..):')

    if (!coreOptions?.rules) {
        // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
        new ErrorDataHandler('None/Ignore').pushOrBail(
            null,
            'Fatal-Error',
            `The passed input object is missing rules object.`,
            'Option might be of wrong type, it must be core options.',
        )
    }

    debugPrint(
        'coreOptions.rules.?onDuplicateKey        = ' +
            coreOptions.rules?.onDuplicateKey,
    )
    debugPrint(
        'coreOptions.rules.?requireDocTerminator  = ' +
            coreOptions.rules?.requireDocTerminator,
    )
    debugPrint(
        'coreOptions.rules.?treatEmptyValueAsNull = ' +
            coreOptions.rules?.treatEmptyValueAsNull,
    )

    const rules: IParseRuleOptions = { ...coreOptions.rules }

    // if (rules.onDuplicateKey === 'error') {
    //     if (rules.treatEmptyValueAsNull == 'disallow') {
    //         return 'strict'
    //     }

    //     return 'lenient'
    // }
    // return 'custom'
    const res = inferTParserModeExact(rules)
    debugPrint('          mode = ' + res.mode)
    debugPrint('        vector = ' + res.vector)
    debugPrint('matchedProfile = ' + res.matchedProfile)

    return res.mode
}

/**
 * Infer mode by **exact vector match** to a canonical profile (option rules).
 * If no exact match exists, returns 'custom'.
 */
const inferTParserModeExact = (
    rules: IParseRuleOptions,
): {
    mode: TExactMode
    vector: TVec3
    matchedProfile?: TParserMode // Present only when mode !== 'custom'
} => {
    debugPrint('-> inferTParserModeExact(..):')
    debugPrint('rules.onDuplicateKey        = ' + rules.onDuplicateKey)
    debugPrint('rules.requireDocTerminator  = ' + rules.requireDocTerminator)
    debugPrint('rules.treatEmptyValueAsNull = ' + rules.treatEmptyValueAsNull)
    // Note, **each rule** is scored on a strictness scale (0 = lenient, 1 = medium, 2 = strict).
    const vector: TVec3 = [
        scoreDupl(rules.onDuplicateKey),
        scoreTerm(rules.requireDocTerminator),
        scoreEmpty(rules.treatEmptyValueAsNull),
    ]
    debugPrint('** vector:')
    // isDebug() && printObject(vector)
    isDebug() && console.log(vector)

    for (const mode of Object.keys(MODE_PROFILES) as TParserMode[]) {
        if (vecEquals(vector, MODE_PROFILES[mode])) {
            return { mode, vector, matchedProfile: mode }
        }
    }

    return { mode: 'custom', vector }
}

const scoreDupl = (v: DuplicateKeyPolicy | OnDuplicateKey): TRuleScale => {
    switch (v) {
        case 'keep-first':
        case 'warn-and-keep-first':
            return 0 // Rule in lenient mode.
        case 'overwrite':
        case 'warn-and-overwrite':
            return 1
        case 'error':
            return 2 // Rule in strict mode.
    }
}
const scoreTerm = (v: DocumentTerminatorRule): TRuleScale => {
    switch (v) {
        case 'optional':
            return 0 // Rule in lenient and strict mode.
        case 'warn-if-missing':
            return 1
        case 'required':
            return 2
    }
}
const scoreEmpty = (v: EmptyValueRule): TRuleScale => {
    switch (v) {
        case 'allow':
            return 0 // Rule in lenient mode.
        case 'allow-with-warning':
            return 1
        case 'disallow':
            return 2 // Rule in strict mode.
    }
}

const vecEquals = (a: TVec3, b: TVec3): boolean => {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2]
}
