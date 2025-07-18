/**
 * This file contains general system helper functions (utils).
 * @note More specific YINI helper functions should go into yiniHelpers.ts-file.
 */

import { isDebug, isDev, isProdEnv, isTestEnv } from '../config/env'

export const debugPrint = (str: any = '') => {
    isDebug() && console.debug('DEBUG: ' + str)
}

export const devPrint = (str: any = '') => {
    isDev() && !isTestEnv() && console.log('DEV: ' + str)
}

export const printObject = (obj: any) => {
    if (isProdEnv() || (isTestEnv() && !isDebug())) return

    const str = JSON.stringify(obj, null, 4)
    console.log(str)
}
