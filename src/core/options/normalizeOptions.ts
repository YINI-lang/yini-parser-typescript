import { isDebug, isDev } from '../../config/env'
import {
    IAllUserOptions,
    IParseCoreOptions,
    TBailSensitivityLevel,
    TParserMode,
} from '../types'

export const toCoreOptions = (
    bailLevel: TBailSensitivityLevel,
    userOpts: Required<IAllUserOptions>,
): IParseCoreOptions => {
    return {
        isStrict: userOpts.strictMode,
        bailSensitivity: bailLevel,
        isIncludeMeta: userOpts.includeMetaData,
        isWithDiagnostics: isDev() || isDebug() || userOpts.includeDiagnostics,
        isWithTiming: isDev() || isDebug() || userOpts.includeTiming,
        isKeepUndefinedInMeta: isDebug() || userOpts.preserveUndefinedInMeta,
        isAvoidWarningsInConsole: userOpts.suppressWarnings,
        requireDocTerminator: userOpts.requireDocTerminator,
        treatEmptyValueAsNull: userOpts.treatEmptyValueAsNull,
        onDuplicateKey: userOpts.onDuplicateKey,
    }
}

// Type guard: did the caller use the options-object form?
export const isOptionsObjectForm = (v: unknown): v is IAllUserOptions => {
    return (
        v != null &&
        typeof v === 'object' &&
        // Note: If one wants, this can be relax to "typeof v === 'object'"
        // but this keeps accidental booleans/strings out.
        ('strictMode' in (v as any) ||
            'failLevel' in (v as any) ||
            'includeMetaData' in (v as any) ||
            'includeDiagnostics' in (v as any) ||
            'includeTiming' in (v as any) ||
            'preserveUndefinedInMeta' in (v as any) ||
            'suppressWarnings' in (v as any) ||
            'requireDocTerminator' in (v as any) ||
            'treatEmptyValueAsNull' in (v as any) ||
            'onDuplicateKey' in (v as any))
    )
}

// const mode: TParserMode =
// ((arg2 as any)?.strictMode ?? (arg2 as boolean | undefined)) ===

export const inferModeFromArgs = (
    arg2?: boolean | IAllUserOptions,
): TParserMode => {
    if (typeof arg2 === 'boolean') {
        return arg2 ? 'strict' : 'lenient'
    }
    if (arg2 && typeof arg2 === 'object') {
        const sm = (arg2 as IAllUserOptions).strictMode
        if (typeof sm === 'boolean') {
            return sm ? 'strict' : 'lenient'
        }
    }
    return 'lenient'
}
