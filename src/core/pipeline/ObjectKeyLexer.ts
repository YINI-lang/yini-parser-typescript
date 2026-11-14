import { Token } from 'antlr4'
import YiniLexer from '../../grammar/generated/YiniLexer'

/** Resolves the hex: prefix when the grammar expects an object member key. */
export default class ObjectKeyLexer extends YiniLexer {
    private readonly delimiters: number[] = []
    private previousType = Token.INVALID_TYPE

    override reset(): void {
        super.reset()
        this.delimiters.length = 0
        this.previousType = Token.INVALID_TYPE
    }

    override nextToken(): Token {
        let token = super.nextToken()
        const isObjectKey =
            this.delimiters[this.delimiters.length - 1] === YiniLexer.OC &&
            (this.previousType === YiniLexer.OC ||
                this.previousType === YiniLexer.COMMA)

        if (
            isObjectKey &&
            token.type === YiniLexer.NUMBER &&
            /^hex:/i.test(token.text)
        ) {
            const key = token.cloneWithType(YiniLexer.KEY)
            key.text = token.text.slice(0, 3)
            key.stop = key.start + 2

            // Re-lex from the colon, including the entire value. Splitting only
            // the emitted token would misread values such as hex:10.5 or hex:0xFF.
            super.reset()
            token.getInputStream().seek(token.start + 3)
            this.line = token.line
            this.column = token.column + 3
            token = key
        }

        switch (token.type) {
            case YiniLexer.NL:
            case YiniLexer.SHEBANG:
            case YiniLexer.FULL_LINE_COMMENT:
            case YiniLexer.DISABLED_LINE:
                return token
            case YiniLexer.OC:
            case YiniLexer.OB:
                this.delimiters.push(token.type)
                break
            case YiniLexer.CC:
                if (
                    this.delimiters[this.delimiters.length - 1] === YiniLexer.OC
                ) {
                    this.delimiters.pop()
                }
                break
            case YiniLexer.CB:
                if (
                    this.delimiters[this.delimiters.length - 1] === YiniLexer.OB
                ) {
                    this.delimiters.pop()
                }
                break
        }
        this.previousType = token.type
        return token
    }
}
