/**
 * 数字转化为大写金额
 * @param {number} n - 要转化数字
 * @returns {string} - 返回大写金额
 */
function digitUppercase (n){
    const fraction = ['角', '分'];
    const digit = [
        '零', '壹', '贰', '叁', '肆',
        '伍', '陆', '柒', '捌', '玖'
    ];
    const unit = [
        ['元', '万', '亿'],
        ['', '拾', '佰', '仟']
    ];
    n = Math.abs(n);
    let s = '';
    for (let i = 0; i < fraction.length; i++) {
        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
    }
    s = s || '整';
    n = Math.floor(n);
    for (let i = 0; i < unit[0].length && n > 0; i++) {
        let p = '';
        for (let j = 0; j < unit[1].length && n > 0; j++) {
            p = digit[n % 10] + unit[1][j] + p;
            n = Math.floor(n / 10);
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
    }
    return s.replace(/(零.)*零元/, '元')
        .replace(/(零.)+/g, '零')
        .replace(/^整$/, '零元整');
}

/**
 * 数字转化为中文数字（不支持小数）
 * @param {number} n - 要转化数字
 * @returns {string} - 返回中文数字
 */
function intToChinese (n){
    const str = String(n);
    const len = str.length-1;
    const idxs = ['','十','百','千','万','十','百','千','亿','十','百','千','万','十','百','千','亿'];
    const num = ['零','一','二','三','四','五','六','七','八','九'];
    return str.replace(/([1-9]|0+)/g, ( $, $1, idx, full) => {
        let pos = 0;
        if($1[0] !== '0'){
            pos = len-idx;
            if(idx == 0 && $1[0] == 1 && idxs[len-idx] == '十'){
                return idxs[len-idx];
            }
            return num[$1[0]] + idxs[len-idx];
        } else {
            let left = len - idx;
            let right = len - idx + $1.length;
            if(Math.floor(right / 4) - Math.floor(left / 4) > 0){
                pos = left - left % 4;
            }
            if( pos ){
                return idxs[pos] + num[$1[0]];
            } else if( idx + $1.length >= len ){
                return '';
            }else {
                return num[$1[0]]
            }
        }
    });
}

/**
 * 生成指定范围随机数
 * @param {number} min - 最小值
 * @param {number} max - 最大值
 * @returns {number} - 返回生产随机数
 */
function randomNum (min, max){
    return Math.floor(Math.random() * (max - min + 1 )) + min;
}

/**
 * 金额转为千分位分隔
 * @param {number} n - 传入金额
 * @returns {string} - 返回千分位分隔的金额字符
 */
function setPercentileSeparation (n){
    if (!n) return '0';

    const [integerPart, decimalPart = ''] = n.toString().split('.');
    // 正则表达式 /\B(?=(\d{3})+(?!\d))/g
    // \B：匹配非单词边界，这可以确保不会在数字开头插入逗号。
    // (?=(\d{3})+(?!\d))：使用前瞻断言检查是否有连续的 3 位数字组，不包括末尾的数字。
    const formattedInt = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return decimalPart ? `${formattedInt}.${decimalPart}` : formattedInt;
}

/**
 * 手机号中间四位变成*
 * @param {number|string} tel - 手机号
 * @returns {string} - 返回脱敏手机号
 */
function telFormat (tel) {
    tel = String(tel);
    return tel.substr(0,3) + "****" + tel.substr(7);
}

module.exports = {
    digitUppercase,
    intToChinese,
    randomNum,
    setPercentileSeparation,
    telFormat,
}
