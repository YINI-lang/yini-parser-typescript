/**
 * System Smoke Tests.
 */
describe('System Smoke Tests:', () => {
    beforeAll(() => {})
    beforeAll(() => {
        console.log('beforeAll')

        // const isDebug = !!process.env.IS_DEBUG
        // if (!isDebug) {
        //     console.log('process.env.IS_DEBUG is false, OK')
        // } else {
        //     console.error('process.env.IS_DEBUG is true, FAIL')
        //     console.error(
        //         'Detected that IS_DEBUG is true, is should be false when testing',
        //     )
        //     console.error('process.env.IS_DEBUG:')
        //     console.error(process.env.IS_DEBUG)

        //     throw Error('ERROR: A variable in ENV has wrong state')
        // }
    })
    test('Basic test case.', () => {
        // Arrange.
        const a = 3
        const b = 4
        // Act.
        const result = a + b
        // Assert.
        expect(result).toEqual(7)
    })
})
