// 身份证号码
// const REG_IDNUMBER = /^(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  // 身份证验证
const REG_ID_NUMBER = /^([0-9]{15})|([0-9]{18})|([0-9]{17}(X|x))$/;  // 身份证验证

const REG_URL = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\\.,@?^=%&:/~\\+#]*[\w\-\\@?^=%&/~\\+#])?/

// 快递单号
const expressNumberRegular = /^[a-zA-Z0-9]{1,32}$/

// 名字 10字
const nameRegular = /^[\u4e00-\u9fa5a-zA-Z]{2,10}$/

// 名字 20字
const nameRegular20 = /^[\u4e00-\u9fa5a-zA-Z]{2,20}$/

// 手机号码
const REG_MOBILE = /^(1)\d{10}$/

// 固定电话号码 新需求RONG-3533 和杨阔商定，允许输入 数字 和 -，- 位置和个数不做限制。
const REG_TELEPHONE = /^[\d-]{5,20}$/

// 邮件地址
const REG_EMAIL = /^([a-zA-Z0-9]+[_|\\_|\\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\\_|\\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/

// 车牌号, 共7-8位, 第1位为汉字, 第2位为字母(需要自动把小写字母弄成大写), 5至6位车牌号
const REG_CAR_PLATE = /^[\u4e00-\u9fa5][A-Za-z]([A-Za-z0-9]){5,6}$/

// 验证码
const verifyCodeRegular = /^[0-9]{6}$/

// 匹配特殊字符
const specialCharRegular = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？%+_]")

// 经纬度正则
const longitudeRegular = /^[+-]?((\d|[1-9]\d|[1][1-7]\d)(\.\d{1,6})?|180(\.0{1,6})?)$/
const latitudeRegular = /^[+-]?((\d|[1-8]\d)(\.\d{1,6})?|90(\.0{1,6})?)$/

/**
 * 是否是正确的身份证号码
 * @param {string} idCard
 * @return {boolean}
 */
function isIdNumber(idCard) {
    return REG_ID_NUMBER.test(idCard)
}

module.exports = {
    REG_ID_NUMBER,
    REG_URL,
    REG_MOBILE,
    REG_TELEPHONE,
    REG_EMAIL,
    REG_CAR_PLATE,
    isIdNumber,
}
