import { TBailSensitivityLevel, TPreferredFailLevel } from '../types'

type NewType = TBailSensitivityLevel

export function mapFailLevelToBail(
    isStrict: boolean,
    failLevel: TPreferredFailLevel,
): TBailSensitivityLevel {
    let bailLevel: TBailSensitivityLevel = 0

    if (failLevel === 'auto') {
        if (!isStrict) bailLevel = 0
        if (isStrict) bailLevel = 1
    } else {
        switch (failLevel) {
            case 'ignore-errors':
                bailLevel = 0
                break
            case 'errors':
                bailLevel = 1
                break
            case 'warnings-and-errors':
                bailLevel = 2
                break
        }
    }

    return bailLevel
}
