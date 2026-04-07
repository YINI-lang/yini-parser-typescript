// src/core/options/defaultParserOptions.ts
import { ParseOptions } from '../../types'
import { TParserMode } from '../internalTypes'

export const getDefaultUserOptions = (mode: TParserMode) =>
    mode === 'strict' ? { ...DEFAULT_STRICT_OPTS } : { ...DEFAULT_LENIENT_OPTS }

export type TNormalizedUserOptions = Required<
    Pick<
        ParseOptions,
        | 'strictMode'
        | 'failLevel'
        | 'includeMetadata'
        | 'includeDiagnostics'
        | 'includeTiming'
        | 'preserveUndefinedInMeta'
        | 'onDuplicateKey'
        | 'requireDocTerminator'
        | 'treatEmptyValueAsNull'
        | 'quiet'
        | 'silent'
        | 'throwOnError'
    >
>

// Base (mode-agnostic) defaults.
const BASE_DEFAULTS: TNormalizedUserOptions = {
    strictMode: false,
    failLevel: 'auto',
    includeMetadata: false,
    includeDiagnostics: false,
    includeTiming: false,
    preserveUndefinedInMeta: false,
    onDuplicateKey: 'error',
    requireDocTerminator: 'optional',
    treatEmptyValueAsNull: 'allow-with-warning',
    quiet: false, // Suppress warnings in console (does not affect warnings in meta data).
    silent: false,
    //@todo: Change default throwOnError to false
    throwOnError: true, // Will throw on first parse error encountered.
}

/**
 * @note If editing any of these, the values in src/core/parsingRules/modeFromRulesMatcher.ts
 * must match too.
 */
const DEFAULT_LENIENT_OPTS: TNormalizedUserOptions = {
    ...BASE_DEFAULTS,
    strictMode: false,
    failLevel: 'ignore-errors',
    // Below are options for pure rules:
    onDuplicateKey: 'warn-and-keep-first',
    requireDocTerminator: 'optional',
    treatEmptyValueAsNull: 'allow',
}

/**
 * @note If editing any of these, the values in src/core/parsingRules/modeFromRulesMatcher.ts
 * must match too.
 */
const DEFAULT_STRICT_OPTS: TNormalizedUserOptions = {
    ...BASE_DEFAULTS,
    strictMode: true,
    failLevel: 'errors',
    // Below are options for pure rules:
    onDuplicateKey: 'error',
    requireDocTerminator: 'required',
    treatEmptyValueAsNull: 'disallow',
}
