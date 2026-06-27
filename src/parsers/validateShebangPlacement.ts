// src/parsers/validateShebangPlacement.ts

import { IPreflightIssue } from '../core/internalTypes'

const isLineTriviaBeforeContent = (line: string): boolean => {
    const trimmed = line.trimStart()

    return (
        trimmed === '' ||
        trimmed.startsWith('//') ||
        trimmed.startsWith(';') ||
        trimmed.startsWith('--') ||
        trimmed.startsWith('# ') ||
        trimmed.startsWith('#\t')
    )
}

const isYiniDirectiveLine = (line: string): boolean =>
    /^\s*@yini(?:\s|$)/i.test(line)

const getShebangCommentLines = (input: string): Set<number> => {
    const text = input.startsWith('\uFEFF') ? input.slice(1) : input
    const lines = text.split(/\r?\n/)
    const commentLines = new Set<number>()
    let seenYiniDirective = false
    let seenContent = false

    for (let index = 0; index < lines.length; index++) {
        const line = lines[index]

        if (index === 0 && line.startsWith('#!')) {
            continue
        }

        if (line.startsWith('#!')) {
            if (seenYiniDirective && !seenContent) {
                commentLines.add(index)
                continue
            }

            seenContent = true
            continue
        }

        if (isLineTriviaBeforeContent(line)) {
            continue
        }

        if (!seenContent && isYiniDirectiveLine(line)) {
            seenYiniDirective = true
            continue
        }

        seenContent = true
    }

    return commentLines
}

export const getShebangPlacementIssue = (
    input: string,
    strictMode: boolean,
): IPreflightIssue | undefined => {
    const text = input.startsWith('\uFEFF') ? input.slice(1) : input
    const lines = text.split(/\r?\n/)
    const shebangCommentLines = getShebangCommentLines(input)

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

        if (shebangCommentLines.has(index)) {
            continue
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

export const normalizeShebangCommentLines = (input: string): string => {
    const shebangCommentLines = getShebangCommentLines(input)

    if (shebangCommentLines.size === 0) {
        return input
    }

    const parts = input.split(/(\r\n|\n|\r)/)
    const result: string[] = []
    let lineIndex = 0

    for (let index = 0; index < parts.length; index += 2) {
        const line = parts[index] ?? ''
        const eol = parts[index + 1] ?? ''

        result.push(
            shebangCommentLines.has(lineIndex) ? line.replace(/^#!/, '//') : line,
            eol,
        )
        lineIndex++
    }

    return result.join('')
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

    // Keep the newline so downstream parser locations still match the
    // original source line numbers after ignoring the shebang content.
    return text.slice(newlineIndex)
}
