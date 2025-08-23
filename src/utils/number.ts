export const isNaNValue = (n: number): boolean => {
    return Number.isNaN(n)
}

export const isInfinityValue = (n: number): boolean => {
    return n === Infinity || n === -Infinity
}

export const isValidJSNumber = (str: string): boolean => {
    if (str.trim() === '') return false // Reject empty or whitespace-only.
    const n = Number(str)
    return !Number.isNaN(n) // True only if parse succeeded.
}
