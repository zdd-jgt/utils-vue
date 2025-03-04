import baseUtils from './utils/baseUtils'
import numberUtils from './utils/numberUtils'
import regular from './utils/regular.js'
import stringUtils from './utils/stringUtils.js'
import terminalUtils from './utils/terminalUtils.js'
import timeUtils from './utils/timeUtils.js'

export const utils =  {
    ...baseUtils,
    ...numberUtils,
    ...regular,
    ...stringUtils,
    ...terminalUtils,
    ...timeUtils
}
