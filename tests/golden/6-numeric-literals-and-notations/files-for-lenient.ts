import { IFileList } from '../golden-test-helpers'

/**
 * @note WITHOUT the extension (suffix) "".yini"!
 */
export const fileListLenient: IFileList = {
    valid: [
        'common/float-literals-1',
        'common/float-literals-2',
        'common/float-neg-literals-1',
        'common/float-pos-literals-1',
        'common/integer-literals-1',
        'common/integer-literals-2',
        'common/integer-neg-literals-1',
        'common/integer-neg-literals-2',
        'common/integer-pos-literals-1',
        'common/integer-pos-literals-2',
    ],
    invalid: [
        'common/bad-float-literal-1',
        'common/bad-integer-leading-zero-literal-1',
        'common/bad-integer-leading-zero-literal-2',
        'common/bad-integer-leading-zero-literal-3',
        'common/bad-integer-literal-1',
        'common/bad-integer-literal-2',
        'common/bad-integer-literal-3',
    ],
}
