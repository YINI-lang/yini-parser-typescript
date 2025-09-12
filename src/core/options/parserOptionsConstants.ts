import { AllUserOptions } from '../../types'
import { TParserMode } from '../internalTypes'

export const getDefaultOptions = (mode: TParserMode) =>
    mode === 'strict' ? DEFAULT_STRICT_OPTS : DEFAULT_LENIENT_OPTS

export type NormalizedOptions = Required<
    Pick<
        AllUserOptions,
        | 'strictMode'
        | 'failLevel'
        | 'includeMetadata'
        | 'includeDiagnostics'
        | 'includeTiming'
        | 'preserveUndefinedInMeta'
        | 'suppressWarnings'
        | 'requireDocTerminator'
        | 'treatEmptyValueAsNull'
        | 'onDuplicateKey'
    >
>

// Base (mode-agnostic) defaults
export const BASE_DEFAULTS: NormalizedOptions = {
    strictMode: false,
    failLevel: 'auto',
    includeMetadata: false,
    includeDiagnostics: false,
    includeTiming: false,
    preserveUndefinedInMeta: false,
    suppressWarnings: false, // Suppress warnings in console (does not affect warnings in meta data).
    requireDocTerminator: 'optional',
    treatEmptyValueAsNull: 'allow-with-warning',
    onDuplicateKey: 'error',
}

export const DEFAULT_LENIENT_OPTS: NormalizedOptions = {
    ...BASE_DEFAULTS,
    strictMode: false,
    failLevel: 'ignore-errors',
    suppressWarnings: false, // Suppress warnings in console (does not affect warnings in meta data).
    requireDocTerminator: 'optional',
    treatEmptyValueAsNull: 'allow-with-warning',
    onDuplicateKey: 'warn-and-keep-first',
}

export const DEFAULT_STRICT_OPTS: NormalizedOptions = {
    ...BASE_DEFAULTS,
    strictMode: true,
    failLevel: 'errors',
    suppressWarnings: false, // Suppress warnings in console (does not affect warnings in meta data).
    requireDocTerminator: 'optional',
    treatEmptyValueAsNull: 'disallow',
    onDuplicateKey: 'error',
}
