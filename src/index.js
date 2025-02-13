export default class utilsVue {
    // 静态变量
    static REG_IDNUMBER = /^(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  // 身份证验证
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
     * 金额转为千分位分隔
     * @param {number} n - 传入金额
     * @returns {string} - 返回千分位分隔的金额字符
     */
    static setPercentileSeparation (n){
        if (!n) return '0';

        const [integerPart, decimalPart = ''] = n.toString().split('.');
        // 正则表达式 /\B(?=(\d{3})+(?!\d))/g
        // \B：匹配非单词边界，这可以确保不会在数字开头插入逗号。
        // (?=(\d{3})+(?!\d))：使用前瞻断言检查是否有连续的 3 位数字组，不包括末尾的数字。
        const formattedInt = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        return decimalPart ? `${formattedInt}.${decimalPart}` : formattedInt;
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

    /**
     * 防抖函数
     * @param {function} fn - 要防抖的函数，只有在指定的等待时间后才会被执行
     * @param {number} wait - 等待时间（毫秒），表示两次调用之间的最小间隔
     * @returns {function} - 返回一个新的防抖函数，该函数在连续调用时会延迟执行
     *
     * @throws {TypeError} 如果 fn 不是函数，或者 wait 不是非负数字，则抛出 TypeError
     */
    static debounce (fn, wait) {
        if (typeof fn !== 'function') {
            throw new TypeError('Expected a function');
        }
        if (typeof wait !== 'number' || wait < 0) {
            throw new TypeError('Expected a non-negative number');
        }
        let timer = null;

        return function(...args) {
            const context = this;

            // 清除之前的定时器
            clearTimeout(timer);

            timer = setTimeout(() => {
                fn.apply(context, args);
            }, wait);
        };
    }

    /**
     * 节流函数
     * @param {function} fn - 要节流的函数，只有在指定的时间间隔内才会被调用
     * @param {number} delay - 节流延迟时间（毫秒），表示两次调用之间的最小间隔
     * @returns {function} - 返回一个新函数，该函数在指定时间间隔内只会执行一次
     *
     * @throws {TypeError} 如果 fn 不是函数，或者 delay 不是非负数字，则抛出 TypeError
     */
    static throttle (fn, delay) {
        if (typeof fn !== 'function') {
            throw new TypeError('Expected a function');
        }
        if (typeof delay !== 'number' || delay < 0) {
            throw new TypeError('Expected a non-negative number');
        }
        let lastExecutionTime = 0;

        return function(...args) {
            const context = this;
            const now = Date.now();

            if (now - lastExecutionTime >= delay) {
                lastExecutionTime = now;
                return fn.apply(context, args);
            }
        };
    }

    /**
     * 对象深拷贝
     * @param {Object} obj - 要进行深拷贝的对象
     * @param {WeakMap} [hash=new WeakMap()] - 用于解决循环引用的 WeakMap
     * @returns {Object} - 返回深拷贝后的新对象
     */
    static deepClone (obj, hash = new WeakMap()) {
        // 检查输入是否为对象或数组
        if (obj === null || typeof obj !== 'object') {
            return obj; // 基本数据类型直接返回
        }

        // 如果是日期对象，返回一个新的日期对象
        if (obj instanceof Date){
            return new Date(obj);
        }

        // 如果是正则对象，返回一个新的正则对象
        if (obj instanceof RegExp){
            return new RegExp(obj);
        }
        // 检查是否存在循环引用，如果有，直接返回已存在的克隆对象
        if (hash.has(obj)){
            return hash.get(obj);
        }
        // 获取对象所有自身属性的描述符
        let allDesc = Object.getOwnPropertyDescriptors(obj);
        // 创建一个新的对象，使用原对象的原型和属性描述符
        let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc)
        // 将原对象和克隆对象的映射存储到 WeakMap 中，以处理循环引用
        hash.set(obj, cloneObj)
        // 遍历原对象的所有键
        for (let key of Reflect.ownKeys(obj)) {
            // 递归拷贝对象属性
            cloneObj[key] = this.deepClone(obj[key], hash);
        }
        // 返回深拷贝后的新对象
        return cloneObj
    }

    /**
     * 根据身份证号码获取年龄、生日和性别
     * @param {string} identityCard - 身份证号码
     * @returns {Object} - 返回一个对象，包含年龄、生日、性别。若身份证无效，返回 '无效身份证'。
     */
    static getIDCardInfo(identityCard) {
        // 正则表达式验证身份证号码格式（15位或18位）
        if (!this.REG_IDNUMBER.test(identityCard)) {
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
     * 定时任务器
     * @returns {Object} - 返回一个对象包含3个函数：添加任务、启动任务、销毁任务。
     */
    static createDailyScheduler() {
        const tasks = [];
        const timers = [];

        /**
         * 添加定时任务
         * @param {string} time - 每天的时间，格式为 "HH:mm"。
         * @param {function} callback - 到指定时间触发的回调函数。
         */
        function addTask(time, callback) {
            const [hour, minute] = time.split(':').map(Number);
            if (isNaN(hour) || isNaN(minute)) {
                throw new Error('时间格式错误，请使用 "HH:mm" 格式');
            }
            tasks.push({ hour, minute, callback });
        }

        /**
         * 启动所有任务
         */
        function start() {
            tasks.forEach(task => scheduleTask(task.hour, task.minute, task.callback));
        }

        /**
         * 销毁所有任务
         */
        function destroy() {
            timers.forEach(timerId => clearTimeout(timerId)); // 清理所有定时器
            timers.length = 0; // 清空定时器数组
            console.log('所有定时任务已销毁');
        }

        /**
         * 定时任务调度
         * @param {number} hour - 目标小时。
         * @param {number} minute - 目标分钟。
         * @param {function} callback - 到时间触发的回调函数。
         */
        function scheduleTask(hour, minute, callback) {
            const now = new Date();
            const targetTime = new Date();
            targetTime.setHours(hour, minute, 0, 0);

            // 如果目标时间已过，调整为明天
            if (targetTime <= now) {
                targetTime.setDate(targetTime.getDate() + 1);
            }

            const delay = targetTime - now; // 计算延迟时间

            // 设置定时器
            const timerId = setTimeout(() => {
                callback(); // 执行任务

                // 再次调度，确保明天也能触发
                scheduleTask(hour, minute, callback);
            }, delay);

            timers.push(timerId); // 保存定时器 ID，用于销毁
        }

        return { addTask, start, destroy };
    }

    /**
     * 全屏展示功能
     * @param {Object} el - ref对象、DOM对象
     * @returns {Object} - 返回 全屏展示、退出全屏
     */
    static fullScreenDisplay(el) {
        let fullscreenText = '全屏展示';

        // 请求全屏
        function enterFullscreen(el) {
            const requestFullScreen =
                el.requestFullscreen ||
                el.webkitRequestFullScreen ||
                el.mozRequestFullScreen ||
                el.msRequestFullscreen;

            if (requestFullScreen) {
                requestFullScreen.call(el);
                fullscreenText = '退出全屏';
            }
        }

        // 退出全屏
        function exitFullScreen() {
            const exitFullscreen =
                document.exitFullscreen ||
                document.mozCancelFullScreen ||
                document.webkitCancelFullScreen ||
                document.msExitFullscreen;

            if (exitFullscreen) {
                exitFullscreen.call(document);
                fullscreenText = '全屏展示';
            }
        }

        // 判断当前是否已进入全屏
        function isFullScreen() {
            return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
        }

        // 切换全屏状态
        function toggleFullScreen() {
            if (isFullScreen()) {
                exitFullScreen();
            } else {
                enterFullscreen(el);
            }
        }

        return { enterFullscreen, exitFullScreen, toggleFullScreen, fullscreenText };
    }

    /**
     * 实现两个大数字符串相加
     * @param {string} num1 第一个大数字符串
     * @param {string} num2 第二个大数字符串
     * @returns {string} 相加结果的字符串
     */
    static addStrings(num1, num2) {
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

}
