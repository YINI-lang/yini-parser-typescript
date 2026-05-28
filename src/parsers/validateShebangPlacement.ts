// src/parsers/validateShebangPlacement.ts

import { IPreflightIssue } from '../core/internalTypes'

export const getShebangPlacementIssue = (
    input: string,
    strictMode: boolean,
): IPreflightIssue | undefined => {
    const text = input.startsWith('\uFEFF') ? input.slice(1) : input
    const lines = text.split(/\r?\n/)

    for (let index = 0; index < lines.length; index++) {
        const line = lines[index]
        const trimmedStart = line.trimStart()

        if (!trimmedStart.startsWith('#!')) {
            continue
        }

        const isFirstLine = index === 0
        const startsAtFirstColumn = line.startsWith('#!')

        if (isFirstLine && startsAtFirstColumn) {
            return undefined
        }

        const message =
            'Misplaced shebang-like sequence. A shebang is only recognized when #! is the first two non-BOM characters of the document.'

        const lineNumber = index + 1
        const columnNumber = line.length - trimmedStart.length + 1

        return {
            locInput: {
                line: lineNumber,
                column: columnNumber,
                endColumn: columnNumber,
            },
            type: strictMode ? 'Syntax-Error' : 'Syntax-Warning',
            msgWhat: 'Misplaced shebang-like sequence.',
            msgWhy: message,
            msgHint: 'Move the shebang to the first line and first column, or remove the leading whitespace.',
        }
    }

    return undefined
}

export const stripBomAndValidShebang = (input: string): string => {
    let text = input

    if (text.startsWith('\uFEFF')) {
        text = text.slice(1)
    }

    if (!text.startsWith('#!')) {
        return text
    }

    const newlineIndex = text.indexOf('\n')

    if (newlineIndex < 0) {
        return ''
    }

    return text.slice(newlineIndex + 1)
}
