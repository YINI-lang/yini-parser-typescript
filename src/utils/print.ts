/**
 * This file contains general system helper functions (utils).
 * @note More specific YINI helper functions should go into yiniHelpers.ts-file.
 */
import util from 'util'
import { isDebug, isDev, isProdEnv, isTestEnv } from '../config/env'

export const debugPrint = (str: any = '') => {
    isDebug() && console.debug('DEBUG: ' + str)
}

export const devPrint = (str: any = '') => {
    isDev() && !isTestEnv() && console.log('DEV: ' + str)
}

export const toPrettyJSON = (obj: any): string => {
    const str = JSON.stringify(obj, null, 4)
    return str
}

/** Pretty-prints a JavaScript object as formatted JSON to the console.
 * Strict JSON, all keys are enclosed in ", etc.
 */
export const printJSON = (obj: any, isForce = false) => {
    if (!isForce) {
        if (isProdEnv() || (isTestEnv() && !isDebug())) return
    }

    const str = toPrettyJSON(obj)
    console.log(str)
}

/**
 * Print a full JavaScript object in a human-readable way (not as JSON).
 * Not strict JSON, and shows functions, symbols, getters/setters, and class names.
 * @param isColors If true, the output is styled with ANSI color codes.
 */
export const printObject = (obj: any, isForce = false, isColors = true) => {
    if (!isForce) {
        if (isProdEnv() || (isTestEnv() && !isDebug())) return
    }

    console.log(util.inspect(obj, { depth: null, colors: isColors }))
}
