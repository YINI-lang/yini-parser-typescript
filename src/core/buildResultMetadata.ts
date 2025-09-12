// const pkg = require('../../package.json')
import pkg from '../../package.json' // NOTE: Requires "resolveJsonModule": true (or "esModuleInterop": true).
import { isDebug, isDev, localAppEnv, localNodeEnv } from '../config/env'
import { AllUserOptions, FailLevelKey, ResultMetadata } from '../types'
import { sortObjectKeys } from '../utils/object'
import { toLowerKebabCase } from '../utils/string'
import { ErrorDataHandler } from './errorDataHandler'
import {
    IParseCoreOptions,
    IRuntimeInfo,
    IYiniAST,
    TBailSensitivityLevel,
} from './internalTypes'

// Helper interface just to bundle inputs for a single call at one time.
export interface IBuildResultMetadataParams {
    ast: IYiniAST
    coreOptions: IParseCoreOptions
    runtimeInfo: IRuntimeInfo
    _meta_userOpts: AllUserOptions
    errorHandler: ErrorDataHandler
    runStartedAt: string
    runFinishedAt: string
    durationMs: number
    timeStartMs: number
    timeEnd1Ms: number
    timeEnd2Ms: number
    timeEnd3Ms: number
    timeEnd4Ms: number
}

export const buildResultMetadata = (
    p: IBuildResultMetadataParams,
): ResultMetadata => {
    // --- Construct meta information -------------------------------------
    const to3 = (n: number): number => Number.parseFloat(n.toFixed(3))

    // Construct meta data.
    const metadata: ResultMetadata = {
        parserVersion: pkg.version,
        mode: p.coreOptions.isStrict ? 'strict' : 'lenient',
        totalErrors: p.errorHandler.getNumOfErrors(),
        totalWarnings: p.errorHandler.getNumOfWarnings(),
        totalMessages: p.errorHandler.getNumOfAllMessages(),
        runStartedAt: p.runStartedAt,
        runFinishedAt: p.runFinishedAt,
        durationMs: to3(p.durationMs),
        preservesOrder: true,
        orderGuarantee: 'implementation-defined',
        source: {
            // sourceType: toLowerSnakeCase(ast.sourceType),
            sourceType: toLowerKebabCase(p.ast.sourceType),
            fileName: p.ast.fileName,
            hasDocumentTerminator: p.ast.terminatorSeen,
            hasYiniMarker: p.ast.yiniMarkerSeen,
            lineCount: p.runtimeInfo.lineCount,
            byteSize: p.runtimeInfo.fileByteSize,
            sha256: p.runtimeInfo.sha256,
        },
        structure: {
            maxDepth: p.ast.maxDepth,
            sectionCount: p.ast.numOfSections,
            memberCount: p.ast.numOfMembers,
            keysParsedCount: null,
            // objectCount: null,
            // listCount: null,
            sectionNamePaths: p.ast.sectionNamePaths,
        },
        metaSchemaVersion: '1.1.0',
    }

    // Attach optional diagnostics.
    if (p.coreOptions.isWithDiagnostics) {
        const mapLevelKey = (level: TBailSensitivityLevel): FailLevelKey => {
            switch (level) {
                case '0-Ignore-Errors':
                    return 'ignore-errors'
                case '1-Abort-on-Errors':
                    return 'errors'
                case '2-Abort-Even-on-Warnings':
                    return 'warnings-and-errors'
            }
        }
        const mapLevelDescription = (
            level: TBailSensitivityLevel,
        ): string | null => {
            switch (level) {
                case '0-Ignore-Errors':
                    return 'Continue despite errors.'
                case '1-Abort-on-Errors':
                    return 'Abort when errors occur.'
                case '2-Abort-Even-on-Warnings':
                    return 'Abort when errors or warnings occur.'
            }
            return null
        }

        metadata.diagnostics = {
            failLevel: {
                preferredLevel: p.runtimeInfo.preferredBailSensitivity,
                usedLevelType: p.coreOptions.bailSensitivity,
                usedLevelKey: mapLevelKey(p.coreOptions.bailSensitivity),
                levelDescription: <any>(
                    mapLevelDescription(p.coreOptions.bailSensitivity)
                ),
            },
            errors: {
                errorCount: p.errorHandler.getNumOfErrors(),
                payload: p.errorHandler.getErrors(),
            },
            warnings: {
                warningCount: p.errorHandler.getNumOfWarnings(),
                payload: p.errorHandler.getWarnings(),
            },
            notices: {
                noticeCount: p.errorHandler.getNumOfNotices(),
                payload: p.errorHandler.getNotices(),
            },
            infos: {
                infoCount: p.errorHandler.getNumOfInfos(),
                payload: p.errorHandler.getInfos(),
            },
            environment: {
                NODE_ENV: process.env.NODE_ENV,
                APP_ENV: process.env.APP_ENV,
                lib: {
                    nodeEnv: localNodeEnv,
                    appEnv: localAppEnv,
                    flags: { isDev: isDev(), isDebug: isDebug() },
                },
            },
            effectiveOptions: sortObjectKeys({
                // IMPORTANT: (!) These user options MUST be mapped from coreOptions (to user options).
                strictMode: p.coreOptions.isStrict,
                failLevel: mapLevelKey(p.coreOptions.bailSensitivity),
                includeMetadata: p.coreOptions.isIncludeMeta,
                includeDiagnostics: p.coreOptions.isWithDiagnostics,
                includeTiming: p.coreOptions.isWithTiming,
                preserveUndefinedInMeta: p.coreOptions.isKeepUndefinedInMeta,
                suppressWarnings: p.coreOptions.isAvoidWarningsInConsole,
                requireDocTerminator: p.coreOptions.requireDocTerminator,
                treatEmptyValueAsNull: p.coreOptions.treatEmptyValueAsNull,
                onDuplicateKey: p.coreOptions.onDuplicateKey,
            }),
            options: sortObjectKeys(p._meta_userOpts),
        }
    }

    // Attach optional durations timing data.
    if (p.coreOptions.isWithTiming) {
        metadata.timing = {
            total: !p.coreOptions.isWithTiming
                ? null
                : {
                      timeMs: to3(p.durationMs), // durationMs = timeEnd4Ms - timeStartMs
                      name:
                          p.runtimeInfo.sourceType === 'Inline'
                              ? 'Total'
                              : 'Total (excluding phase0 (I/O))',
                  },
            phase0:
                !p.coreOptions.isWithTiming ||
                p.runtimeInfo.sourceType === 'Inline'
                    ? undefined
                    : {
                          timeMs: to3(p.runtimeInfo.timeIoMs!),

                          name: 'I/O',
                      },
            phase1: !p.coreOptions.isWithTiming
                ? null
                : {
                      timeMs: to3(p.timeEnd1Ms - p.timeStartMs),

                      name: 'Lexing',
                  },
            phase2: !p.coreOptions.isWithTiming
                ? null
                : {
                      timeMs: to3(p.timeEnd2Ms - p.timeEnd1Ms),
                      name: 'Parsing',
                  },
            phase3: !p.coreOptions.isWithTiming
                ? null
                : {
                      timeMs: to3(p.timeEnd3Ms - p.timeEnd2Ms),
                      name: 'AST Building',
                  },
            phase4: !p.coreOptions.isWithTiming
                ? null
                : {
                      timeMs: to3(p.timeEnd4Ms - p.timeEnd3Ms),
                      name: 'Object Building',
                  },
        }
    }

    return metadata
}
