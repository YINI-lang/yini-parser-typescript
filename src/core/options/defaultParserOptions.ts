import { ParseOptions } from '../../types'
import { TParserMode } from '../internalTypes'

// export const getDefaultUserOptions = (mode: TParserMode): ParseOptions =>
// export const getDefaultUserOptions = (mode: TParserMode) =>
//     mode === 'strict' ? DEFAULT_STRICT_OPTS : DEFAULT_LENIENT_OPTS

export const getDefaultUserOptions = (mode: TParserMode) =>
    mode === 'strict' ? { ...DEFAULT_STRICT_OPTS } : { ...DEFAULT_LENIENT_OPTS }

export type TNormalizedUserOptions = Required<
    // type TNormalizedUserOptions = Required<
    Pick<
        ParseOptions,
        | 'strictMode'
        | 'failLevel'
        | 'includeMetadata'
        | 'includeDiagnostics'
        | 'includeTiming'
        | 'preserveUndefinedInMeta'
        | 'suppressWarnings'
        | 'onDuplicateKey'
        | 'requireDocTerminator'
        | 'treatEmptyValueAsNull'
        | 'quiet'
        | 'silent'
    >
>

// Base (mode-agnostic) defaults
const BASE_DEFAULTS: TNormalizedUserOptions = {
    strictMode: false,
    failLevel: 'auto',
    includeMetadata: false,
    includeDiagnostics: false,
    includeTiming: false,
    preserveUndefinedInMeta: false,
    suppressWarnings: false, // Suppress warnings in console (does not affect warnings in meta data).
    onDuplicateKey: 'error',
    requireDocTerminator: 'optional',
    treatEmptyValueAsNull: 'allow-with-warning',
    quiet: false,
    silent: false,
}

const DEFAULT_LENIENT_OPTS: TNormalizedUserOptions = {
    ...BASE_DEFAULTS,
    strictMode: false,
    failLevel: 'ignore-errors',
    // suppressWarnings: false, // Suppress warnings in console (does not affect warnings in meta data).
    // Below are options for pure rules:
    onDuplicateKey: 'warn-and-keep-first',
    requireDocTerminator: 'optional',
    treatEmptyValueAsNull: 'allow-with-warning',
}

const DEFAULT_STRICT_OPTS: TNormalizedUserOptions = {
    ...BASE_DEFAULTS,
    strictMode: true,
    failLevel: 'errors',
    // suppressWarnings: false, // Suppress warnings in console (does not affect warnings in meta data).
    // Below are options for pure rules:
    onDuplicateKey: 'error',
    requireDocTerminator: 'optional',
    treatEmptyValueAsNull: 'disallow',
}
