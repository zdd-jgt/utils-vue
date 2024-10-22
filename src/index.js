export default class utilsVue {
    /**
     * 检查字符串是否为空
     * @param {string} str - 要检查的字符串
     * @returns {boolean} - 如果为空，返回 true；否则返回 false
     */
    static isEmpty(str) {
        return !str || str.trim().length === 0;
    }

    /**
     * 颜色格式转换：hex格式转为rgba格式
     * @param {string} hex - hex格式颜色，例如：#C598FF
     * @param {number} alpha - 颜色透明程度
     * @returns {string} - 返回rgba格式的
     */
    static hexToRgba(hex, alpha) {
        const hexValue = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => '#' + r + r + g + g + b + b)
        const bigint = parseInt(hexValue.substring(1), 16)
        const r = (bigint >> 16) & 255
        const g = (bigint >> 8) & 255
        const b = bigint & 255
        return `rgba(${r}, ${g}, ${b}, ${alpha})`
    }

    /**
     * 生成指定范围随机数
     * @param {number} min - 最小值
     * @param {number} max - 最大值
     * @returns {number} - 返回生产随机数
     */
    static randomNum (min, max){
        return Math.floor(Math.random() * (max - min + 1 )) + min;
    }

    /**
     * 数字转为千分位分隔
     * @param {number} n - 传入整数
     * @returns {string} - 返回千分位分隔的金额字符
     */
    static setPercentileSeparation (n){
        if (!n) return '0'
        let num = n.toString();
        let len = num.length;
        if (len <= 3) {
            return num;
        } else {
            let temp = '';
            let remainder = len % 3;
            if (remainder > 0) { // 不是3的整数倍
                return num.slice(0, remainder) + ',' + num.slice(remainder, len).match(/\d{3}/g).join(',') + temp;
            } else { // 3的整数倍
                return num.slice(0, len).match(/\d{3}/g).join(',') + temp;
            }
        }
    }

    /**
     * 字符串首字母大写
     * @param {string} str - 首字母要大写的字符串
     * @returns {string} - 返回首字母要大写的字符串
     */
    static fistLetterUpper (str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    /**
     * 手机号中间四位变成*
     * @param {number|string} tel - 手机号
     * @returns {string} - 返回脱敏手机号
     */
    static telFormat (tel) {
        tel = String(tel);
        return tel.substr(0,3) + "****" + tel.substr(7);
    }

    /**
     * 短横线命名转换成驼峰命名
     * @param {string} str - 短横线字符串
     * @returns {string} - 返回驼峰命名
     */
    static getCamelCase (str){
        return str.replace( /-([a-z])/g, (i, item) => item.toUpperCase())
    }

}