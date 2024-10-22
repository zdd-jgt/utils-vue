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

    /**
     * 驼峰命名转换成短横线命名
     * @param {string} str - 驼峰字符串
     * @returns {string} - 返回短横线命名
     */
    static getKebabCase (str){
        return str.replace(/[A-Z]/g, (item) => '-' + item.toLowerCase())
    }

    /**
     * 数字转化为大写金额
     * @param {number} n - 要转化数字
     * @returns {string} - 返回大写金额
     */
    static digitUppercase (n){
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
    static intToChinese (n){
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

}