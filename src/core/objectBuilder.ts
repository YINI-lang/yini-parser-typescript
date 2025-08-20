import { isDebug } from '../config/env'
import { TValueLiteral } from '../core/types'
import { debugPrint, printObject, toPrettyJSON } from '../utils/print'
import { ErrorDataHandler } from './ErrorDataHandler'
import { YiniDocument, YiniSection } from './YiniAstBuilder'

/**
 * Construct the final JavaScript Object.
 * Transforms the AST to the plain JS object.
 *
 * - Keys are used exactly as-is.
 * - Order of properties matches the AST traversal order.
 *
 * @note All `tag` fields MUST be ignored.
 */
export const astToObject = (
    ast: YiniDocument,
    errorHandler: ErrorDataHandler,
    // ): TJSObject => {
): Record<string, unknown> => {
    debugPrint('-> constructFinalObject(..)')
    // return sectionChildrenToObject(ast.root)

    const out: Record<string, unknown> = {}
    for (const child of ast.root.children) {
        define(out, child.sectionName, sectionToObject(child))
    }
    return out
}

/** Convert only the children of a section into an object keyed by sectionName. */
// function sectionChildrenToObject(
//     section: YiniSection,
// ): Record<string, unknown> {
//     const out: Record<string, unknown> = {}
//     for (const child of section.children) {
//         out[child.sectionName] = sectionToObject(child)
//     }
//     return out
// }

/** Convert a section (its members + nested sections) to a plain object. */
// function sectionToObject(node: YiniSection): Record<string, unknown> {
//     const obj: Record<string, unknown> = {}

//     // Members → properties
//     for (const [key, val] of node.members.entries()) {
//         obj[key] = literalToJS(val)
//     }

//     // Nested sections → nested objects keyed by sectionName
//     for (const child of node.children) {
//         obj[child.sectionName] = sectionToObject(child)
//     }

//     return obj
// }
/**
 * Convert a section (members + nested sections) to a plain
 * object, preserving order.
 */
const sectionToObject = (node: YiniSection): Record<string, unknown> => {
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
    switch (v.type) {
        case 'String':
        case 'Number':
        case 'Boolean':
        case 'Null':
            return v.value

        case 'List':
            return v.elems.map(literalToJS)

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
