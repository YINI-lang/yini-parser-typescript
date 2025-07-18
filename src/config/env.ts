/**
 * NODE_ENV - Defacto Node.js modes (environments)
 *
 * Used in many JS frameworks and tools, for special purposes.
 * Some even only know 'production' and treat everything else as 'development'.
 * Also Jest sets NODE_ENV automatically to 'test'.
 */
type TNodeEnv = 'development' | 'production' | 'test'

/**
 * APP_ENV - More custom envs (more finer-grained control) for this project.
 * @note Since this is a library (as opposed to a Web/App), we don't use "staging".
 */
type TAppEnv = 'local' | 'ci' | 'production' // Note: 'staging' is omitted by purpose.

const localNodeEnv = (process.env.NODE_ENV || 'production') as TNodeEnv
const localAppEnv = (process.env.APP_ENV || 'production') as TAppEnv

// export const initEnvs = () => {
//     const localNodeEnv = (process.env.NODE_ENV || 'production') as TNodeEnv
//     const localAppEnv = (process.env?.APP_ENV || 'production') as TAppEnv

//     return { localNodeEnv, localAppEnv }
// }

// const { localNodeEnv, localAppEnv } = initEnvs()

/** Are we running in the environment "development"? Will be based on the (global) environment variable process.env.NODE_ENV. */
export const isDevEnv = (): boolean => localNodeEnv === 'development'

/** Are we running in the environment "production"? Will be based on the (global) environment variable process.env.NODE_ENV. */
export const isProdEnv = (): boolean => localNodeEnv === 'production'

/** Are we running in the environment "test"? Will be based on the (global) variable process.env.NODE_ENV. */
export const isTestEnv = (): boolean => localNodeEnv === 'test'

/** Will be based on the local argument when this process was launched.
 * @returns True if the DEV flag is set.
 * @example npm run start -- isDev=1
 * @example node dist/index.js isDev=1
 */
export const isDev = (): boolean => {
    const len = process.argv.length

    // NOTE: We will start with index 2, since the first element will be
    // execPath. The second element will be the path to the
    // JavaScript file being executed.
    for (let i = 2; i < len; i++) {
        const val: string = process.argv[i] || ''
        if (
            val.toLowerCase() === 'isdev=1' ||
            val.toLowerCase() === 'isdev=true'
        ) {
            return true
        }
    }

    return false
}

/** Will be based on the local argument when this process was launched.
 * @returns True if the DEBUG flag is set.
 * @example npm run start -- isDebug=1
 * @example node dist/index.js isDebug=1
 */
export const isDebug = (): boolean => {
    const len = process.argv.length

    // NOTE: We will start with index 2, since the first element will be
    // execPath. The second element will be the path to the
    // JavaScript file being executed.
    for (let i = 2; i < len; i++) {
        const val: string = process.argv[i] || ''
        if (
            val.toLowerCase() === 'isdebug=1' ||
            val.toLowerCase() === 'isdebug=true'
        ) {
            return true
        }
    }

    return false
}

export { localNodeEnv, localAppEnv }
