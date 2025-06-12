// NODE_ENV (Standard Node.js mode (environment))
//
// Used in many JS frameworks and tools, for special purposes.
// Some even only know 'production' and treat everything else as 'development'.
// Also Jest sets this automatically to 'test'
type TNodeEnv = 'development' | 'production' | 'test'

// APP_ENV More custom envs / finer-grained control
type TAppEnv = 'local' | 'ci' | 'staging' | 'production'

const NODE_ENV = (process.env.NODE_ENV || 'development') as TNodeEnv
const APP_ENV = (process.env.APP_ENV || 'local') as TAppEnv

export const isDev = NODE_ENV === 'development'
export const isProd = NODE_ENV === 'production'
export const isTest = NODE_ENV === 'test'

export { NODE_ENV, APP_ENV }
