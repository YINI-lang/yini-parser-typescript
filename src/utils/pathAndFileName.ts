/**
 * This file contains general path and file name helper functions (utils).
 * @note More specific YINI helper functions should go into yiniHelpers.ts-file.
 */
import path from 'path'

export const getFileNameExtension = (fullPath: string): string => {
    return path.extname(fullPath)
}
