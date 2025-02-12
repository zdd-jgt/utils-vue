/**
 * @description 是否是Android终端
 * @returns {Boolean} 是返回true，不是返回false
 * @example
 * lm.baseUtils.isAndroid() => true or false
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
 * lm.baseUtils.isIOS() => true or false
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
 * lm.baseUtils.isWeiXin() => true or false
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
 * lm.baseUtils.isWeiXinMiniprogram() => true or false
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
 * lm.baseUtils.isAliPay() => true or false
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
 * lm.baseUtils.isZlbApp() => true or false
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
 * lm.baseUtils.isZlbMP() => true or false
 */
function isZlbMP () {
    let source = sessionStorage.getItem('source')
    return source === 'zlb'
}

/**
 * @description 是否是支付宝小程序终端
 * @returns {Boolean} 返回 true 是，false 不是
 * @example
 * lm.baseUtils.isAliPayMiniprogram() => true or false
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
 * lm.baseUtils.isDingTalk() => true or false
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
 * lm.baseUtils.isDingTalkMP() => true or false
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
 * lm.baseUtils.isDingTalkH5() => true or false
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
 * lm.baseUtils.isGovDingTalk() => true or false
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
 * lm.baseUtils.getIOSVersion() => 13.3.1
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

/**
 * @description 获取 location.hash 对应参数值
 * @param {String} name 参数key
 * @returns {String} 参数存在，返回对应的value；参数不存在，返回空字符
 * @example
 * lm.baseUtils.getHashParam('name') => '张三'
 */
function getHashParam (name) {
    try {
        if (!name) {
            return ''
        }
        if (location.hash.indexOf('?') === -1) {
            return ''
        }
        let params = location.hash.split('?')[1]
        let paramList = []
        let param = null
        let theRequest = {}
        if (params.length > 0) {
            if (params.indexOf('&') >= 0) {
                paramList = params.split('&')
            } else {
                paramList[0] = params
            }
            for (let i = 0; i < paramList.length; i++) {
                theRequest[paramList[i].split('=')[0]] = decodeURIComponent(paramList[i].split('=')[1])
            }
            param = theRequest[name]
        }
        return param
    } catch (error) {
        return ''
    }
}

export {
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
    getHashParam,
}


