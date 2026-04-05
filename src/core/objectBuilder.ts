// src/core/objectBuilder.ts
import { isDebug } from '../config/env'
import { debugPrint, printObject } from '../utils/print'
import { ErrorDataHandler, toErrorLocation } from './errorDataHandler'
import { IYiniAST, IYiniSection, TValueLiteral } from './internalTypes'

/**
 * Construct the final JavaScript object.
 * Transforms the AST into a plain JS object.
 *
 * Behavior:
 * - Explicit top-level sections are mounted directly on the result.
 * - In lenient mode, orphan top-level members are also mounted directly
 *   on the result.
 * - Any collision between an orphan member name and a top-level section
 *   name results in an error.
 *
 * @note All `tag` fields MUST be ignored.
 */
export const astToObject = (
    ast: IYiniAST,
    errorHandler: ErrorDataHandler,
): Record<string, unknown> => {
    debugPrint('-> constructFinalObject(..)')

    const out: Record<string, unknown> = {}

    // 1) In lenient mode, mount orphan root members directly onto result.
    if (!ast.isStrict) {
        for (const [key, val] of ast.root.members) {
            define(out, key, literalToJS(val))
        }
    }

    // 2) Mount explicit top-level sections directly onto result.
    for (const child of ast.root.children) {
        // Collision: a lenient orphan member already used this name.
        if (Object.prototype.hasOwnProperty.call(out, child.sectionName)) {
            errorHandler.pushOrBail(
                undefined,
                'Syntax-Error',
                `Name collision between orphan member and section '${child.sectionName}'`,
                `The name '${child.sectionName}' is already used by a top-level member outside any explicit section and cannot also be used as a top-level section name.`,
                `Rename either the orphan member or the section to avoid the collision.`,
            )
            continue
        }

        define(out, child.sectionName, sectionToObject(child))
    }

    return out
}

/**
 * Convert a section (members + nested sections) to a plain object,
 * preserving insertion order.
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
    const IS_LOCAL_DEBUG = false
    debugPrint('In literalToJS(..)')

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
                if (IS_LOCAL_DEBUG && isDebug()) {
                    console.log('elem:')
                    printObject(elem)
                }
                return ret
            })

            if (IS_LOCAL_DEBUG && isDebug()) {
                console.log('Returning:')
                printObject(out)
            }

            return out
        }

        case 'Object': {
            const out: Record<string, unknown> = {}

            for (const k of Object.keys(v.entries)) {
                define(out, k, literalToJS(v.entries[k]))
            }

            return out
        }
    }
}

/**
 * Helper function that defines a property while preserving explicit
 * insertion order and enumerability.
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
