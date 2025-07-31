import { IFileList } from '../golden.test'

export const fileListLenient: IFileList = {
    valid: [
        'common/boolean-literals-1',
        'common/boolean-literals-2',
        'common/boolean-literals-3',
        'common/boolean-literals-4',
        'common/double-quoted-strings-1',
    ],
    invalid: [
        'common/bad-boolean-literals-1',
        'common/bad-boolean-literals-2',
        'common/bad-boolean-literals-3',
        'common/bad-boolean-literals-4',
        'common/bad-boolean-literals-5',
    ],
}
