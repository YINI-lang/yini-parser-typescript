import { isDebug, isDev } from '../../config/env'
import { ParseOptions } from '../../types'
import {
    IParseCoreOptions,
    IParseRuleOptions,
    TBailSensitivityLevel,
    TParserMode,
} from '../internalTypes'
import { mapFailLevelToBail } from './failLevel'

export const toCoreOptions = (
    userOpts: Required<ParseOptions>,
    bailLevel?: TBailSensitivityLevel,
): IParseCoreOptions => {
    const level: TBailSensitivityLevel =
        bailLevel ?? mapFailLevelToBail(userOpts.strictMode, userOpts.failLevel)

    return {
        rules: {
            mode: userOpts.strictMode ? 'strict' : 'lenient',
            requireDocTerminator: userOpts.requireDocTerminator,
            treatEmptyValueAsNull: userOpts.treatEmptyValueAsNull,
            onDuplicateKey: userOpts.onDuplicateKey,
        },
        bailSensitivity: level,
        isIncludeMeta: userOpts.includeMetadata,
        isWithDiagnostics: isDev() || isDebug() || userOpts.includeDiagnostics,
        isWithTiming: isDev() || isDebug() || userOpts.includeTiming,
        isKeepUndefinedInMeta: isDebug() || userOpts.preserveUndefinedInMeta,
        isAvoidWarningsInConsole: userOpts.suppressWarnings,
        isQuiet: userOpts.quiet,
        isSilent: userOpts.silent,
    }
}

// Type guard: did the caller use the options-object form?
export const isOptionsObjectForm = (v: unknown): v is ParseOptions => {
    return (
        v != null &&
        typeof v === 'object' &&
        // Note: If one wants, this can be relax to "typeof v === 'object'"
        // but this keeps accidental booleans/strings out.
        ('strictMode' in (v as any) ||
            'failLevel' in (v as any) ||
            'includeMetadata' in (v as any) ||
            'includeDiagnostics' in (v as any) ||
            'includeTiming' in (v as any) ||
            'preserveUndefinedInMeta' in (v as any) ||
            'suppressWarnings' in (v as any) ||
            'requireDocTerminator' in (v as any) ||
            'treatEmptyValueAsNull' in (v as any) ||
            'onDuplicateKey' in (v as any) ||
            'quiet' in (v as any) ||
            'silent' in (v as any))
    )
}

// const mode: TParserMode =
// ((arg2 as any)?.strictMode ?? (arg2 as boolean | undefined)) ===

export const inferModeFromArgs = (
    arg2?: boolean | ParseOptions,
): TParserMode => {
    if (typeof arg2 === 'boolean') {
        return arg2 ? 'strict' : 'lenient'
    }
    if (arg2 && typeof arg2 === 'object') {
        const sm = (arg2 as ParseOptions).strictMode
        if (typeof sm === 'boolean') {
            return sm ? 'strict' : 'lenient'
        }
    }
    return 'lenient'
}

export const inferModeFromRules = (
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
