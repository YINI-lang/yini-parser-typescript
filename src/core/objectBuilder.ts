// src/core/objectBuilder.ts
import { isDebug } from '../config/env'
import { debugPrint, printObject, toPrettyJSON } from '../utils/print'
import { ErrorDataHandler } from './errorDataHandler'
import { IYiniAST, IYiniSection, TValueLiteral } from './internalTypes'

/**
 * Construct the final JavaScript Object.
 * Transforms the AST to the plain JS object.
 *
 * - Keys are used exactly as-is.
 * - Order of properties matches the AST traversal order.
 *
 * @note All `tag` fields MUST be ignored.
 */
// export const astToObject = (
//     ast: IYiniAST,
//     errorHandler: ErrorDataHandler,
//     // ): ParsedObject => {
// ): Record<string, unknown> => {
//     debugPrint('-> constructFinalObject(..)')
//     // return sectionChildrenToObject(ast.root)

//     const out: Record<string, unknown> = {}
//     for (const child of ast.root.children) {
//         define(out, child.sectionName, sectionToObject(child))
//     }
//     return out
// }
export const astToObject = (
    ast: IYiniAST,
    errorHandler: ErrorDataHandler,
): Record<string, unknown> => {
    debugPrint('-> constructFinalObject(..)')

    const out: Record<string, unknown> = {}

    // In lenient mode, expose top-level members outside any explicit
    // section under an implicit public section named "base".
    if (!ast.isStrict && ast.root.members.size > 0) {
        const base: Record<string, unknown> = {}

        for (const [key, val] of ast.root.members) {
            define(base, key, literalToJS(val))
        }

        define(out, 'base', base)
    }

    // Explicit top-level sections are always mounted directly on result.
    for (const child of ast.root.children) {
        define(out, child.sectionName, sectionToObject(child))
    }

    return out
}

/**
 * Convert a section (members + nested sections) to a plain
 * object, preserving order.
 */
const sectionToObject = (node: IYiniSection): Record<string, unknown> => {
    const obj: Record<string, unknown> = {}

    // 1) Members (Map preserves insertion order).
    for (const [key, val] of node.members) {
        define(obj, key, literalToJS(val))
    }

    // 2) Nested sections (array order preserved).
    for (const child of node.children) {
        define(obj, child.sectionName, sectionToObject(child))
    }

    return obj
}

/**
 * Convert a literal to plain JS, ignoring both `tag` and `type`.
 * - Scalars: return primitive value
 * - List:    return array (item order preserved)
 * - Object:  return plain object; iterate keys in creation order
 *
 * @note All `tag` fields MUST be ignored.
 */
const literalToJS = (v: TValueLiteral): unknown => {
    const IS_LOCAL_DEBUG: boolean = false
    debugPrint('In literalToJS(..)')
    // if (!v) {
    //     // NOTE: Only in lenient-mode, if parsing a
    //     // member (key = value), but the value is invalid
    //     // key will get undefined
    //     return undefined
    // }

    switch (v.type) {
        case 'String':
        case 'Number':
        case 'Boolean':
        case 'Null':
            return v.value
        case 'Undefined':
            return undefined

        case 'List': {
            if (IS_LOCAL_DEBUG) {
                debugPrint("case 'List':")
                if (isDebug()) {
                    console.log('input:')
                    printObject(v)
                }
            }

            const out = v.elems.map((elem) => {
                const ret = literalToJS(elem)
                if (IS_LOCAL_DEBUG) {
                    if (isDebug()) {
                        console.log(`elem:`)
                        printObject(elem)
                    }
                }
                return ret
            })

            if (IS_LOCAL_DEBUG) {
                if (isDebug()) {
                    console.log('Returning:')
                    printObject(out)
                }
            }
            return out
        }
        case 'Object': {
            const out: Record<string, unknown> = {}
            // for (const key of Object.keys(v.entries)) {
            //     const entry = v.entries[key]
            //     if (isScalar(entry)) {
            //         // Scalar entries in object-literals: value
            //         // out[key] = { type: entry.type, value: entry.value }
            //         out[key] = entry.value
            //     } else if (entry.type === 'List') {
            //         out[key] = entry.elems.map(literalToJS)
            //     } else {
            //         out[key] = literalToJS(entry) // nested object-literal
            //     }
            // }
            // Object.keys preserves property insertion order for plain objects
            for (const k of Object.keys(v.entries)) {
                define(out, k, literalToJS(v.entries[k]))
            }
            return out
        }
    }
}

/**
 * Helper function, defines a property to preserve explicit insertion
 * order and enumerability.
 */
const define = <T extends object, K extends string>(
    obj: T,
    key: K,
    value: unknown,
): void => {
    Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true,
    })
}
