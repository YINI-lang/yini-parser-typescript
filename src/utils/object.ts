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
export const removeUndefinedDeep = <T,>(obj: T): T => {
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
