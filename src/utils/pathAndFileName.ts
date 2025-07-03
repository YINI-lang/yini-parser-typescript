import path from 'path'

export const getFileNameExtension = (fullPath: string): string => {
    return path.extname(fullPath)
}
