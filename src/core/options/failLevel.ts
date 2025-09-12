import { PreferredFailLevel } from '../../types'
import { TBailSensitivityLevel } from '../internalTypes'

type NewType = TBailSensitivityLevel

export function mapFailLevelToBail(
    isStrict: boolean,
    failLevel: PreferredFailLevel,
): TBailSensitivityLevel {
    let bailLevel: TBailSensitivityLevel = '0-Ignore-Errors'

    if (failLevel === 'auto') {
        if (!isStrict) bailLevel = '0-Ignore-Errors'
        if (isStrict) bailLevel = '1-Abort-on-Errors'
    } else {
        switch (failLevel) {
            case 'ignore-errors':
                bailLevel = '0-Ignore-Errors'
                break
            case 'errors':
                bailLevel = '1-Abort-on-Errors'
                break
            case 'warnings-and-errors':
                bailLevel = '2-Abort-Even-on-Warnings'
                break
        }
    }

    return bailLevel
}
