type PlainObject = Record<string, unknown>

interface SortOptions {
    /** Sort nested objects too (default: false) */
    deep?: boolean
    /** Custom key comparator (default: a.localeCompare(b)) */
    comparator?: (a: string, b: string) => number
}

const isPlainObject = (value: unknown): value is PlainObject => {
    return (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value) &&
        Object.prototype.toString.call(value) === '[object Object]'
    )
}

/**
 * Returns a new object with keys sorted alphabetically.
 * Arrays and non-plain objects are preserved as-is (unless deep + they contain plain objects).
 */
export const sortObjectKeys = <T>(obj: T, options: SortOptions = {}): T => {
    const { deep = false, comparator } = options

    if (!isPlainObject(obj)) {
        // If it's not a plain object (array, Date, null, primitive), return as-is.
        return obj
    }

    const keys = Object.keys(obj).sort(
        comparator ?? ((a, b) => a.localeCompare(b)),
    )

    const sortedEntries = keys.map((k) => {
        const value = (obj as PlainObject)[k]
        if (deep) {
            if (isPlainObject(value)) {
                return [k, sortObjectKeys(value, options)]
            }
            if (Array.isArray(value)) {
                // Deep-sort any plain objects inside arrays, leave others as-is.
                return [
                    k,
                    value.map((item) =>
                        isPlainObject(item)
                            ? sortObjectKeys(item, options)
                            : item,
                    ),
                ]
            }
        }
        return [k, value]
    })

    // Preserve the original type T structurally.
    return Object.fromEntries(sortedEntries) as T
}

/**
 * Removes top-level properties with value `undefined`.
 * Does not recurse into nested objects or arrays.
 *
 * @param obj Any JS object
 * @returns A shallow copy with undefined properties removed,
 *          except in nested objects or arrays.
 *
 * @example
 * Input:
 * const input = {
 *     a: 1,
 *     b: undefined,
 *     c: { d: undefined, e: 2 },
 *     f: [1, undefined, 2]
 * };
 *
 * Output:
 *   {
 *     a: 1,
 *     c: { d: undefined, e: 2 },
 *     f: [1, undefined, 2]
 *   }
 */
export const removeUndefinedShallow = <T extends object>(
    obj: T,
): Partial<T> => {
    const cleaned: any = {}
    for (const [key, value] of Object.entries(obj)) {
        if (value !== undefined) {
            cleaned[key] = value
        }
    }
    return cleaned
}

/**
 * Recursively removes properties with value `undefined` from objects
 * and arrays.
 *
 * @param obj Any JS value (object, array, primitive)
 * @returns A deep-cloned copy with all `undefined` removed, including in
 *          nested objects and arrays.
 *
 * @example
 * Input:
 *   const input = {
 *       a: 1,
 *       b: undefined,
 *       c: {
 *           d: undefined,
 *           e: 2,
 *           f: [1, undefined, { g: undefined, h: 42 }]
 *       }
 *   };
 *
 * Output:
 *   {
 *     a: 1,
 *     c: {
 *         e: 2,
 *         f: [1, { h: 42 }]
 *     }
 *   }
 */
export const removeUndefinedDeep = <T>(obj: T): T => {
    if (obj === null || typeof obj !== 'object') {
        return obj // primitive value
    }

    if (Array.isArray(obj)) {
        // Clean each element, and filter out undefined entries
        return obj
            .map((item) => removeUndefinedDeep(item))
            .filter((item) => item !== undefined) as any
    }

    const cleaned: any = {}
    for (const [key, value] of Object.entries(obj)) {
        if (value !== undefined) {
            cleaned[key] = removeUndefinedDeep(value as any)
        }
    }
    return cleaned
}
