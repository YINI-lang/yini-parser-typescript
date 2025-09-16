// --- Parsing Rule Values -------------------------------------------------

import {
    DocumentTerminatorRule,
    DuplicateKeyPolicy,
    EmptyValueRule,
} from '../../types'

/*
    NOTE: These rule values are re-exported as **types** (derived from these consants) in types/index.ts.
    NOTE: These constant gives runtime access as they are also used in error messages.
*/

export const DuplicateKeyPolicies = [
    'error',
    'warn-and-keep-first', // Keep first with a warning.
    'warn-and-overwrite', // 'warn-and-overwrite' = 'warn-and-keep-last'
    'keep-first', // Silent, first wins.
    'overwrite', // Silent, last wins.
] as const

export const DocumentTerminatorRules = [
    'optional',
    'warn-if-missing',
    'required',
] as const

export const EmptyValueRules = [
    'allow',
    'allow-with-warning',
    'disallow',
] as const

// --- Runtime Guards ------------------------------------------------------

export const isDuplicateKeyPolicy = (v: unknown): v is DuplicateKeyPolicy =>
    typeof v === 'string' &&
    (DuplicateKeyPolicies as readonly string[]).includes(v)

export const isDocumentTerminatorRule = (
    v: unknown,
): v is DocumentTerminatorRule =>
    typeof v === 'string' &&
    (DocumentTerminatorRules as readonly string[]).includes(v)

export const isEmptyValueRule = (v: unknown): v is EmptyValueRule =>
    typeof v === 'string' && (EmptyValueRules as readonly string[]).includes(v)
