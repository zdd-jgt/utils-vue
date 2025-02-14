/**
 * @description 是否是Android终端
 * @returns {Boolean} 是返回true，不是返回false
 * @example
 * isAndroid() => true or false
 */
function isAndroid () {
    let u = navigator.userAgent
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
    return isAndroid
}

/**
 * @description 是否是iOS终端
 * @returns {Boolean} 是返回true，不是返回false
 * @example
 * isIOS() => true or false
 */
function isIOS () {
    let u = navigator.userAgent
    let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    return isIOS
}

/**
 * @description 是否是微信终端
 * @returns {Boolean} 返回 true 是，false 不是
 * @example
 * isWeiXin() => true or false
 */
function isWeiXin () {
    let ua = navigator.userAgent.toLowerCase()
    let matchRes = ua.match(/MicroMessenger/i)
    if (matchRes && matchRes[0] === 'micromessenger') {
        return true
    } else {
        return false
    }
}

/**
 * @description 是否是微信小程序终端
 * @returns {Boolean} 返回 true 是，false 不是
 * @example
 * isWeiXinMiniprogram() => true or false
 */
function isWeiXinMiniprogram () {
    let ua = navigator.userAgent.toLowerCase()
    let matchRes = ua.match(/MicroMessenger/i)
    if (matchRes && matchRes[0] === 'micromessenger') {
        matchRes = ua.match(/miniProgram/i)
        if (matchRes && matchRes[0] === 'miniprogram') {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}

/**
 * @description 是否是支付宝终端
 * @returns {Boolean} 返回 true 是，false 不是
 * @example
 * isAliPay() => true or false
 */
function isAliPay () {
    let ua = navigator.userAgent.toLowerCase()
    let matchRes = ua.match(/Alipayclient/i)
    if (matchRes && matchRes[0] === 'alipayclient') {
        return true
    } else {
        return false
    }
}

/**
 * @description 是否是浙里办App
 * @returns {Boolean} 返回 true 是，false 不是
 * @example
 * isZlbApp() => true or false
 */
function isZlbApp () {
    let ua = navigator.userAgent.toLowerCase()
    let matchRes = ua.match(/@zlb/i)
    return !!matchRes
}

/**
 * @description 是否是浙里办小程序
 * @returns {Boolean} 返回 true 是，false 不是
 * @example
 * isZlbMP() => true or false
 */
function isZlbMP () {
    let source = sessionStorage.getItem('source')
    return source === 'zlb'
}

/**
 * @description 是否是支付宝小程序终端
 * @returns {Boolean} 返回 true 是，false 不是
 * @example
 * isAliPayMiniprogram() => true or false
 */
function isAliPayMiniprogram () {
    let ua = navigator.userAgent.toLowerCase()
    let matchRes = ua.match(/Alipayclient/i)
    if (matchRes && matchRes[0] === 'alipayclient') {
        matchRes = ua.match(/miniProgram/i)
        if (matchRes && matchRes[0] === 'miniprogram') {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}

/**
 * @description 是否是钉钉终端[个人钉钉]
 * @returns {Boolean} 返回 true 是，false 不是
 * @example
 * isDingTalk() => true or false
 */
function isDingTalk () {
    const ua = navigator.userAgent.toLowerCase()
    const matchRes = ua.match(/AliApp\(DingTalk/i)
    if (matchRes && matchRes[0] === 'aliapp(dingtalk') {
        return true
    } else {
        return false
    }
}

/**
 * @description 是否是钉钉小程序端[个人钉钉]
 * @returns {Boolean} 返回 true 是，false 不是
 * @example
 * isDingTalkMP() => true or false
 */
function isDingTalkMP () {
    if (isDingTalk()) {
        const ua = navigator.userAgent.toLowerCase()
        const matchRes = ua.match(/Nebula/i)
        if (matchRes && matchRes[0] === 'nebula') {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}

/**
 * @description 是否是钉钉H5端(如钉钉微应用)[个人钉钉]
 * @returns {Boolean} 返回 true 是，false 不是
 * @example
 * isDingTalkH5() => true or false
 */
function isDingTalkH5 () {
    if (isDingTalk()) {
        if (!isDingTalkMP()) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}

/**
 * @description 是否是专有钉钉端
 * @returns {Boolean} 返回 true 是，false 不是
 * @example
 * isGovDingTalk() => true or false
 */
function isGovDingTalk () {
    const ua = navigator.userAgent.toLowerCase()
    const matchRes = ua.match(/nebulasdk/i)
    if (matchRes && matchRes[0] === 'nebulasdk') {
        return true
    } else {
        return false
    }
}

/**
 * @description 获取iOS系统版本
 * @returns {Number} 是iOS终端返回终端系统版本号，不是返回 undefined
 * @example
 * getIOSVersion() => 13.3.1
 */
function getIOSVersion () {
    if (isIOS()) {
        let str = navigator.userAgent.toLowerCase().match(/cpu iphone os (\d+)(_(\d+)){1,2} like/)
        let ver = str[0].split(' ')[3].replace(/_/g, '.')
        return parseFloat(ver)
    } else {
        return undefined
    }
}

module.exports = {
    isIOS,
    isAndroid,
    isWeiXin,
    isWeiXinMiniprogram,
    isAliPay,
    isAliPayMiniprogram,
    isDingTalk,
    isDingTalkMP,
    isDingTalkH5,
    isGovDingTalk,
    isZlbApp,
    isZlbMP,
    getIOSVersion,
}


