// src/parsers/validateShebangPlacement.ts

export const validateShebangPlacement = (
    input: string,
    options: {
        strictMode: boolean
        quiet?: boolean
        silent?: boolean
    },
): void => {
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
            return
        }

        const message =
            'Misplaced shebang-like sequence. A shebang is only recognized when #! is the first two non-BOM characters of the document.'

        const lineNumber = index + 1
        const columnNumber = line.length - trimmedStart.length + 1

        if (options.strictMode) {
            throw new Error(
                `Syntax-Error: ${message}\nAt line: ${lineNumber}, column(s): ${columnNumber}-${columnNumber}.`,
            )
        }

        if (!options.quiet && !options.silent) {
            console.warn(
                `Warning: ${message}\nAt line: ${lineNumber}, column(s): ${columnNumber}-${columnNumber}.`,
            )
        }

        return
    }
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
