// src/parsers/validateShebangPlacement.ts

export const stripBomAndValidShebang = (input: string): string => {
    let text = input

    if (text.startsWith('\uFEFF')) {
        text = text.slice(1)
    }

    if (!text.startsWith('#!')) {
        return text
    }

    const newlineIndex = text.search(/[\r\n]/)

    if (newlineIndex < 0) {
        return ''
    }

    // Keep the newline so downstream parser locations still match the
    // original source line numbers after ignoring the shebang content.
    return text.slice(newlineIndex)
}
