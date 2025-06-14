/*
 * NOTE:

 * NOT NOT use:
 *    export default { ... }  // (!) This is an ES Module!
 * 
 * Since we are using CommonJS currently, it must be:
 *    module.exports = { ... }
 */
/** @type {import('jest').Config} */
module.exports = {
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testPathIgnorePatterns: ['/dist/', '/node_modules/'],
}
