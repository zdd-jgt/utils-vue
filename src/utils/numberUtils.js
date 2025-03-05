/**
 * 数字转化为大写金额
 * @param {number} n - 要转化数字
 * @returns {string} - 返回大写金额
 */
function digitUppercase(n) {
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
    
    // 处理小数部分
    const decimal = Math.round((n - Math.floor(n)) * 100);
    const jiao = Math.floor(decimal / 10);
    const fen = decimal % 10;

   // 处理整数部分
   n = Math.floor(n);
   let integerPart = '';
   for (let i = 0; i < unit[0].length && n > 0; i++) {
       let p = '';
       for (let j = 0; j < unit[1].length && n > 0; j++) {
           p = digit[n % 10] + unit[1][j] + p;
           n = Math.floor(n / 10);
       }
       const currentUnit = unit[0][i];
       integerPart = p.replace(/(零.)+零?$/, '')
                    .replace(/^$/, '零') 
                    + currentUnit + integerPart;
       
       // 新增单位层级控制
       if (currentUnit === '亿' && n > 0) {
           unit[0][1] = ''; // 遇到亿单位后清空万单位
       }
   }

    // 组合逻辑优化
    if (integerPart) {
        s = integerPart.replace(/零+([元万亿])/g, '$1')
                      .replace(/(亿万|亿元)/g, '亿')  // 处理特殊组合
                      .replace(/(零仟|零佰|零拾)/g, '零')
                      + (integerPart.includes('元') ? '' : '元');
        if (jiao === 0 && fen > 0) {
            s += '零' + digit[fen] + '分';
        } else {
            if (jiao > 0) s += digit[jiao] + '角';
            if (fen > 0) s += digit[fen] + '分';
        }
    } else {
        // 纯小数处理
        if (jiao > 0) s += digit[jiao] + '角';
        if (fen > 0) s += digit[fen] + '分';
    }

    // 最终格式化
    s =  s.replace(/零{2,}/g, '零')
    .replace(/亿万/g, '亿')
    .replace(/([万亿])元元/g, '$1元')
    .replace(/([万亿])(?=元)/g, '$1')
    .replace(/元$/, '元整')
    return s || '零元整';
}

/**
 * 数字转化为中文数字（不支持小数）
 * @param {number} num - 要转化数字
 * @returns {string} - 返回中文数字
 */
function intToChinese (num) {
    num = Number(num);
  if (isNaN(num)) return '';
  if (num === 0) return '零';

  const digits = ['零','一','二','三','四','五','六','七','八','九'];
  const units = ['', '十', '百', '千'];

  // 将小于10000的数字转换为中文
  function convertUnder10000(n) {
    let str = '';
    const s = n.toString();
    const len = s.length;
    let zeroFlag = false;
    for (let i = 0; i < len; i++) {
      const digit = parseInt(s[i]);
      const pos = len - i - 1;
      if (digit === 0) {
        zeroFlag = true;
      } else {
        if (zeroFlag) {
          str += '零';
          zeroFlag = false;
        }
        // 特殊处理：如果是十位且第一位为1，则直接输出“十”
        if (!(digit === 1 && pos === 1 && str === '')) {
          str += digits[digit];
        }
        str += units[pos];
      }
    }
    return str;
  }

  let result = '';

  const yiUnit = 1e8; // 亿单位
  if (num >= yiUnit) {
    let yi = Math.floor(num / yiUnit); // 亿部分
    let remainder = num % yiUnit;        // 亿以下部分

    // 将亿部分如果大于等于10000，则进一步转换为“万”
    if (yi >= 10000) {
      const wan = Math.floor(yi / 10000);
      const remYi = yi % 10000;
      result += convertUnder10000(wan) + '万';
      if (remYi > 0) {
        result += convertUnder10000(remYi);
      }
    } else {
      result += convertUnder10000(yi);
    }
    result += '亿';

    // 处理亿部分以下的数字（小于1e8）
    if (remainder > 0) {
      // 当余数较小（不足1e7）时，在前面补“零”
      if (remainder < 1e7) {
        result += '零';
      }
      if (remainder >= 1e4) {
        const wan = Math.floor(remainder / 1e4);
        const unitPart = remainder % 1e4;
        result += convertUnder10000(wan) + '万';
        if (unitPart > 0) {
          if (unitPart < 1000) result += '零';
          result += convertUnder10000(unitPart);
        }
      } else {
        result += convertUnder10000(remainder);
      }
    }
  } else {
    // 数字小于1e8
    if (num >= 1e4) {
      const wan = Math.floor(num / 1e4);
      const unitPart = num % 1e4;
      result += convertUnder10000(wan) + '万';
      if (unitPart > 0) {
        if (unitPart < 1000) result += '零';
        result += convertUnder10000(unitPart);
      }
    } else {
      result = convertUnder10000(num);
    }
  }

  // 清理连续的“零”并去掉末尾多余的零
  return result.replace(/零+/g, '零').replace(/零$/, '');
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
