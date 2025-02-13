/**
 * 实现两个大数字符串相加
 * @param {string} num1 第一个大数字符串
 * @param {string} num2 第二个大数字符串
 * @returns {string} 相加结果的字符串
 */
function addStrings(num1, num2) {
    let i = num1.length - 1;
    let j = num2.length - 1;
    let carry = 0;
    let result = '';

    // 循环遍历两个数字的每一位
    while (i >= 0 || j >= 0 || carry > 0) {
        const digit1 = i >= 0 ? Number(num1[i]) : 0; // 获取 num1 当前位数字
        const digit2 = j >= 0 ? Number(num2[j]) : 0; // 获取 num2 当前位数字

        // 当前位的和加上进位
        const sum = digit1 + digit2 + carry;

        // 计算当前位的结果和新的进位
        result = (sum % 10) + result; // 当前位是 sum 的个位
        carry = Math.floor(sum / 10); // 更新进位

        // 移动到前一位
        i--;
        j--;
    }

    return result;
}

/**
 * 字符串首字母大写
 * @param {string} str - 首字母要大写的字符串
 * @returns {string} - 返回首字母要大写的字符串
 */
function fistLetterUpper (str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * 根据身份证号码获取年龄、生日和性别
 * @param {string} identityCard - 身份证号码
 * @returns {Object} - 返回一个对象，包含年龄、生日、性别。若身份证无效，返回 '无效身份证'。
 */
function getIDCardInfo(identityCard) {
    // 正则表达式验证身份证号码格式（15位或18位）
    if (!validateIDCard(identityCard)) {
        return '无效身份证'; // 如果身份证格式不正确，返回 '无效身份证'
    }

    const len = identityCard.length;
    let birthDate, sexNum;

    // 获取生日字符串
    if (len === 18) {
        // 18位身份证：年、月、日从指定位置提取
        birthDate = `${identityCard.substr(6, 4)}-${identityCard.substr(10, 2)}-${identityCard.substr(12, 2)}`;
        sexNum = parseInt(identityCard.charAt(16), 10); // 18位身份证的性别位在第17位（从0开始索引）
    } else if (len === 15) {
        // 15位身份证：年份需要加上 "19" 前缀
        birthDate = `19${identityCard.substr(6, 2)}-${identityCard.substr(8, 2)}-${identityCard.substr(10, 2)}`;
        sexNum = parseInt(identityCard.charAt(14), 10); // 15位身份证的性别位在第15位（从0开始索引）
    }

    // 计算年龄
    const birthDateObj = new Date(birthDate);
    const nowDateTime = new Date();
    let age = nowDateTime.getFullYear() - birthDateObj.getFullYear();

    // 如果当前日期早于出生日期，则年龄减去 1
    if (nowDateTime.getMonth() < birthDateObj.getMonth() ||
        (nowDateTime.getMonth() === birthDateObj.getMonth() && nowDateTime.getDate() < birthDateObj.getDate())) {
        age--;
    }

    // 根据性别位判断性别（奇数为男，偶数为女）
    const sex = sexNum % 2 === 1 ? '男' : '女';

    return {
        age: age || 0,  // 兼容age为NAN则返回 0
        sex: sex,
        birthday: birthDate // 返回格式化后的生日
    };
}

/**
 * 短横线命名转换成驼峰命名
 * @param {string} str - 短横线字符串
 * @returns {string} - 返回驼峰命名
 */
function getCamelCase (str){
    return str.replace( /-([a-z])/g, (i, item) => item.toUpperCase())
}

/**
 * 驼峰命名转换成短横线命名
 * @param {string} str - 驼峰字符串
 * @returns {string} - 返回短横线命名
 */
function getKebabCase (str){
    return str.replace(/[A-Z]/g, (item) => '-' + item.toLowerCase())
}

/**
 * 检查字符串是否为空
 * @param {string} str - 要检查的字符串
 * @returns {boolean} - 如果为空，返回 true；否则返回 false
 */
function isEmpty(str) {
    return !str || str.trim().length === 0;
}

/**
 * 校验身份证号是否合法
 * @param {string} idCard 身份证号
 * @returns {boolean} 是否有效
 */
function validateIDCard(idCard) {
    const reg15 = /^\d{15}$/; // 15位正则
    const reg18 = /^\d{17}(\d|X|x)$/; // 18位正则

    if (idCard.length === 15) {
        return validate15IDCard(idCard);
    } else if (idCard.length === 18) {
        return validate18IDCard(idCard);
    } else {
        return false;
    }
}

/**
 * 校验15位身份证号
 * @param {string} idCard 15位身份证号
 * @returns {boolean} 是否有效
 */
function validate15IDCard(idCard) {
    // 15位身份证号基本验证规则
    const reg15 = /^\d{15}$/;
    if (!reg15.test(idCard)) return false;

    const birthDate = '19' + idCard.slice(6, 8) + '-' + idCard.slice(8, 10) + '-' + idCard.slice(10, 12);
    const birthDateObj = new Date(birthDate);
    return birthDateObj.getDate() === parseInt(idCard.slice(10, 12)); // 验证出生日期
}

/**
 * 校验18位身份证号
 * @param {string} idCard 18位身份证号
 * @returns {boolean} 是否有效
 */
function validate18IDCard(idCard) {
    const reg18 = /^\d{17}(\d|X|x)$/;
    if (!reg18.test(idCard)) return false;

    const birthDate = idCard.slice(6, 10) + '-' + idCard.slice(10, 12) + '-' + idCard.slice(12, 14);
    const birthDateObj = new Date(birthDate);
    if (birthDateObj.getDate() !== parseInt(idCard.slice(12, 14))) {
        return false; // 验证出生日期
    }

    // 校验位验证
    const checkCode = calculateCheckCode(idCard);
    if (checkCode !== idCard[17].toUpperCase()) {
        return false; // 校验码不匹配
    }

    return true;
}

/**
 * 计算18位身份证的校验位
 * @param {string} idCard 前17位
 * @returns {string} 校验位
 */
function calculateCheckCode(idCard) {
    const weight = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    const checkCodeMap = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
    let sum = 0;

    // 计算加权和
    for (let i = 0; i < 17; i++) {
        sum += parseInt(idCard[i]) * weight[i];
    }

    // 校验位
    const checkCode = checkCodeMap[sum % 11];
    return checkCode;
}

module.exports = {
    addStrings,
    fistLetterUpper,
    getIDCardInfo,
    getCamelCase,
    getKebabCase,
    isEmpty,
    validateIDCard,
    validate15IDCard,
    validate18IDCard
}
