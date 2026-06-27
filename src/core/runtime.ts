// src/core/runtime.ts
import fs from 'fs'
import { isDev } from '../config/env'
import {
    getShebangPlacementIssue,
    normalizeShebangCommentLines,
    stripBomAndValidShebang,
} from '../parsers/validateShebangPlacement'
import { ParsedObject, ParseOptions, PreferredFailLevel } from '../types'
import { getFileNameExtension } from '../utils/pathAndFileName'
import { debugPrint, devPrint, printObject } from '../utils/print'
import { computeSha256 } from '../utils/string'
import {
    IParseCoreOptions,
    IRuntimeInfo,
    TBailSensitivityLevel,
    TParserMode,
} from './internalTypes'
import { getDefaultUserOptions } from './options/defaultParserOptions'
import { mapFailLevelToBail } from './options/failLevel'
import {
    inferModeFromArgs,
    isOptionsObjectForm,
    toCoreOptions,
} from './options/optionsFunctions'
import { runPipeline } from './pipeline/pipeline'

/**
 * Private class representing a runtime context for a single parse call.
 *
 * @note This design prevents race conditions: each call gets its own
 *       runtimeInfo and related state. Without this, multiple calls
 *       (especially in parallel) could overwrite each other's data.
 *
 * @note The following options MUST be respected!
 *   quiet?: boolean // Reduce output (show only errors, does not effect warnings and etc. in meta data).
 *   silent?: boolean // Suppress all output (even errors, exit code only).
 */
export class YiniRuntime {
    /**
     * @note Leading # makes the property "truly private" at runtime.
     */
    #runtime: IRuntimeInfo

    constructor(sourceType: 'Inline' | 'File') {
        this.#runtime = this.makeRuntimeInfo()
        this.#runtime.sourceType = sourceType
    }

    private makeRuntimeInfo(): IRuntimeInfo {
        return {
            sourceType: 'Inline',
            fileName: undefined,
            fileByteSize: null,
            lineCount: null,
            timeIoMs: null,
            preferredBailSensitivity: null,
            sha256: null,
            preflightIssues: [],
        }
    }

    // --- Method overload signature ---------------------------------------
    // (With no body + not declared with arrow function.)
    // NOTE: Must be method declaration with NO =, arrow functions not (currently) supported for this type of method overloading.
    // Easier and simpler positional form ((legacy/simple)).
    public runParse(
        yiniContent: string,
        strictMode?: boolean,
        failLevel?: PreferredFailLevel,
        includeMetadata?: boolean,
    ): ParsedObject

    // --- Method overload signature ---------------------------------------
    // (With no body + not declared with arrow function.)
    // NOTE: Must be method declaration with NO =, arrow functions not (currently) supported for this type of method overloading.
    // Options-object form (recommended) for power/expert users (more future-proof).
    public runParse(yiniContent: string, options?: ParseOptions): ParsedObject

    // --- Single implementation --------------------------------------------
    // Implementation method (not declared with arrow function) for both method overload signatures.
    // NOTE: Must be method declaration with NO =, arrow functions not (currently) supported for this type of method overloading.
    public runParse(
        yiniContent: string,
        arg2?: boolean | ParseOptions, // strictMode | options
        failLevel: PreferredFailLevel = 'auto',
        includeMetadata = false,
    ): ParsedObject {
        debugPrint('-> Entered runParse(..) in YiniRuntime class\n')

        // Runtime guard to catch illegal/ambiguous calls coming from JS or any-cast code
        if (
            isOptionsObjectForm(arg2) &&
            (failLevel !== 'auto' || includeMetadata !== false)
        ) {
            throw new TypeError(
                'Invalid call: when providing an options object, do not also pass positional parameters.',
            )
        }

        const mode: TParserMode = inferModeFromArgs(arg2)
        const defaultOptions = getDefaultUserOptions(mode)

        // Normalize to a fully-required options object.
        let userOpts: Required<ParseOptions>

        // Required, makes all properties in T required, no undefined.
        if (isOptionsObjectForm(arg2)) {
            userOpts = {
                ...defaultOptions, // Sets the default options.
                ...arg2,
            }
        } else {
            // Positional form.
            userOpts = {
                ...defaultOptions, // Sets the default options.
                strictMode:
                    (arg2 as boolean | undefined) ?? defaultOptions.strictMode,
                failLevel,
                includeMetadata,
            }
        }

        const shebangIssue = getShebangPlacementIssue(
            yiniContent,
            userOpts.strictMode,
        )
        if (shebangIssue) {
            this.#runtime.preflightIssues.push(shebangIssue)
        }

        const originalContent = yiniContent
        yiniContent = stripBomAndValidShebang(yiniContent)
        yiniContent = normalizeShebangCommentLines(yiniContent)

        if (originalContent.startsWith('\uFEFF')) {
            devPrint(
                'runParse(..): BOM was detected and stripped from UTF-8 content.',
            )
        }

        if (
            originalContent.startsWith('#!') ||
            originalContent.startsWith('\uFEFF#!')
        ) {
            devPrint(
                'runParse(..): Shebang detected on first line and ignored.',
            )
        }

        if (userOpts.includeMetadata && this.#runtime.sourceType === 'Inline') {
            const lineCount = yiniContent.split(/\r?\n/).length // Counts the lines.
            const sha256 = computeSha256(yiniContent) // NOTE: Compute BEFORE any possible tampering of content.

            this.#runtime.lineCount = lineCount
            this.#runtime.preferredBailSensitivity = userOpts.failLevel
            this.#runtime.sha256 = sha256
        }

        // NOTE: Important: Do not trim or mutate the yiniContent here, due
        // to it will mess up the line numbers in error reporting.

        // if (!yiniContent) {
        //     throw new Error('Syntax-Error: Unexpected blank YINI input')
        // }

        if (yiniContent === null || yiniContent === undefined) {
            throw new Error('Syntax-Error: Missing YINI input')
        }

        // IMPORTANT: Makes sure input ends with an empty NL!
        if (!yiniContent.endsWith('\n')) {
            yiniContent += '\n'
        }

        let level: TBailSensitivityLevel = mapFailLevelToBail(
            userOpts.strictMode,
            userOpts.failLevel,
        )

        const coreOpts: IParseCoreOptions = toCoreOptions(userOpts, level)

        debugPrint()
        debugPrint('==== Call runPipeline(..) ==========================')
        const result = runPipeline(
            yiniContent,
            coreOpts,
            this.#runtime,
            userOpts,
        )
        debugPrint('==== End call runPipeline ==========================\n')

        if (isDev()) {
            console.log()
            devPrint('runParse(..): result:')
            console.log(result)

            devPrint('Complete result:')
            printObject(result)
        }

        return result
    }

    // --- Method overload signature ---------------------------------------
    // (With no body + not declared with arrow function.)
    // NOTE: Must be method declaration with NO =, arrow functions not (currently) supported for this type of method overloading.
    // Easy and simple positional API (great for most users).
    public doParseFile(
        filePath: string,
        strictMode?: boolean,
        failLevel?: PreferredFailLevel,
        includeMetadata?: boolean,
    ): ParsedObject

    // --- Method overload signature ---------------------------------------
    // (With no body + not declared with arrow function.)
    // NOTE: Must be method declaration with NO =, arrow functions not (currently) supported for this type of method overloading.
    // Options-object form (recommended) for power/expert users (more future-proof).
    public doParseFile(filePath: string, options?: ParseOptions): ParsedObject

    // --- Single implementation --------------------------------------------
    // Implementation method (not declared with arrow function) for both method overload signatures.
    // NOTE: Must be method declaration with NO =, arrow functions not (currently) supported for this type of method overloading.
    public doParseFile(
        filePath: string,
        arg2?: boolean | ParseOptions, // strictMode | options
        failLevel: PreferredFailLevel = 'auto',
        includeMetadata = false,
    ): ParsedObject {
        debugPrint('-> Entered doParseFile(..) in YiniRuntime class\n')
        debugPrint('Current directory = ' + process.cwd())

        // Runtime guard to catch illegal/ambiguous calls coming from JS or any-cast code
        if (
            isOptionsObjectForm(arg2) &&
            (failLevel !== 'auto' || includeMetadata !== false)
        ) {
            throw new TypeError(
                'Invalid call: when providing an options object, do not also pass positional parameters.',
            )
        }

        const mode: TParserMode = inferModeFromArgs(arg2)
        const defaultOptions = getDefaultUserOptions(mode)

        // Normalize to a fully-required options object.
        let userOpts: Required<ParseOptions>

        // Required, makes all properties in T required, no undefined.
        if (isOptionsObjectForm(arg2)) {
            // Options-object Form.
            userOpts = {
                ...defaultOptions, // Sets the default options.
                ...arg2,
            }
        } else {
            // Positional form.
            userOpts = {
                ...defaultOptions, // Sets the default options.
                strictMode:
                    (arg2 as boolean | undefined) ?? defaultOptions.strictMode,
                failLevel,
                includeMetadata,
            }
        }

        if (getFileNameExtension(filePath).toLowerCase() !== '.yini') {
            throw new Error('Error: Unexpected file extension for YINI file')
        }

        // ---- Phase 0: I/O ----
        const timeStartMs = performance.now()

        // let content = fs.readFileSync(filePath, 'utf8')
        const rawBuffer = fs.readFileSync(filePath) // Raw buffer for size.
        const fileByteSize = rawBuffer.byteLength // Byte size in UTF-8.

        let content = rawBuffer.toString('utf8')
        const timeEndMs = performance.now()

        // this.#runtime.sourceType = 'File'
        this.#runtime.fileName = filePath
        this.#runtime.timeIoMs = +(timeEndMs - timeStartMs).toFixed(3) // NOTE: (!) Dependent of isWithTiming.

        if (userOpts.includeMetadata) {
            this.#runtime.lineCount = content.split(/\r?\n/).length // Counts the lines.
            this.#runtime.fileByteSize = fileByteSize
            // this.#runtime.timeIoMs = +(timeEndMs - timeStartMs).toFixed(3) // NOTE: (!) Dependent of isWithTiming.
            this.#runtime.preferredBailSensitivity = userOpts.failLevel
            this.#runtime.sha256 = computeSha256(content) // NOTE: Compute BEFORE any possible tampering of content.
        }

        if (!content.endsWith('\n')) {
            this.#runtime.preflightIssues.push({
                locInput: undefined,
                type: 'Syntax-Warning',
                msgWhat: 'No newline at end of file.',
                msgWhy: `It's recommended to end a YINI file with a newline. File: "${filePath}"`,
            })
            content += '\n'
        }

        const result = this.runParse(content, {
            ...userOpts,
        })

        return result
    }
}
