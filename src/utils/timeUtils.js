/**
 * @fileOverview 时间相关通用JS方法
 */

/**
 * @description 处理年份
 * @param {String} year
 * @returns {string}
 * @example
 * dealYear('2020') => '今年'
 * dealYear('2019') => '去年'
 * dealYear('2021') => '明年'
 * dealYear('2025') => '2025年'
 */
function dealYear (year) {
    let yearStr = ''
    year = parseInt(year)
    let now = new Date()
    let currentYear = now.getFullYear()
    let margin = year - currentYear
    switch (margin) {
        case 0:
            yearStr = `今年(${year})`
            break
        case 1:
            yearStr = `明年(${year})`
            break
        case -1:
            yearStr = `去年(${year})`
            break
        default:
            yearStr = `${year}年`
            break
    }
    return yearStr
}

/**
 * @description 添加几天
 * @param {Date} targetDate 计算的日期
 * @param {Number} days 天数, 单位是天
 * @returns {Date} 新的日期
 */
function addDays (targetDate, days) {
    let millSeconds = targetDate.getTime() + (days * 86400000) // 24 * 60 * 60 * 1000 => 86400000
    let value = new Date(millSeconds)
    return value
}

/**
 * @description 是否为闰年，能被4整除且不能被100整除，或能被400整除
 * @param {String} year 年份
 * @returns {Boolean} 是返回 true，不是返回 false
 * @example
 * isLeapYear('2025') => false
 * isLeapYear('2020') => true
 */
function isLeapYear (year) {
    if (year && year.length === 0) {
        return
    }
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

/**
 * @description 日期格式化
 * @param {String|Number} date 日期
 * @param {String} formatType 格式
 * @returns {String} 返回格式化后的日期
 */
function dateFormat (date, formatType = 'YYYY-MM-DD HH:mm:ss') {
    if (typeof date === 'string') {
        date = new Date(date.replace(/-/g, '/'))
    }
    if (typeof date === 'number') {
        date = new Date(date)
    }
    let o = {
        'M+': date.getMonth() + 1,
        'D+': date.getDate(),
        'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
        'H+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        'S': date.getMilliseconds()
    }
    let week = {
        '0': '\u65e5',
        '1': '\u4e00',
        '2': '\u4e8c',
        '3': '\u4e09',
        '4': '\u56db',
        '5': '\u4e94',
        '6': '\u516d'
    }
    if (/(Y+)/.test(formatType)) {
        formatType = formatType.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    if (/(E+)/.test(formatType)) {
        formatType = formatType.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '\u661f\u671f' : '\u5468') : '') +
            week[date.getDay() + ''])
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(formatType)) {
            formatType = formatType.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
    }
    return formatType
}

module.exports = {
    addDays,
    dateFormat,
    dealYear,
    isLeapYear
}
