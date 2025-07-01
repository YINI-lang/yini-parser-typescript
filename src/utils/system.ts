import { isDebug, isDev, isProd } from '../config/env'

export const debugPrint = (str: any = '') => {
    isDebug() && console.debug('DEBUG: ' + str)
}

export const devPrint = (str: any = '') => {
    isDev() && console.log('DEV: ' + str)
}

export const printObject = (obj: any) => {
    if (isProd()) return

    const str = JSON.stringify(obj, null, 4)
    console.log(str)
}
