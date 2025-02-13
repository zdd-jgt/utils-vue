/**
 * 定时任务器
 * @returns {Object} - 返回一个对象包含3个函数：添加任务、启动任务、销毁任务。
 */
function createDailyScheduler() {
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
 * 防抖函数
 * @param {function} fn - 要防抖的函数，只有在指定的等待时间后才会被执行
 * @param {number} wait - 等待时间（毫秒），表示两次调用之间的最小间隔
 * @returns {function} - 返回一个新的防抖函数，该函数在连续调用时会延迟执行
 *
 * @throws {TypeError} 如果 fn 不是函数，或者 wait 不是非负数字，则抛出 TypeError
 */
function debounce (fn, wait) {
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
 * 对象深拷贝
 * @param {Object} obj - 要进行深拷贝的对象
 * @param {WeakMap} [hash=new WeakMap()] - 用于解决循环引用的 WeakMap
 * @returns {Object} - 返回深拷贝后的新对象
 */
function deepClone (obj, hash = new WeakMap()) {
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
 * 全屏展示功能
 * @param {Object} el - ref对象、DOM对象
 * @returns {Object} - 返回 全屏展示、退出全屏
 */
function fullScreenDisplay(el) {
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

/**
 * 颜色格式转换：hex格式转为rgba格式
 * @param {string} hex - hex格式颜色，例如：#C598FF
 * @param {number} alpha - 颜色透明程度
 * @returns {string} - 返回rgba格式的
 */
function hexToRgba(hex, alpha) {
    const hexValue = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => '#' + r + r + g + g + b + b)
    const bigint = parseInt(hexValue.substring(1), 16)
    const r = (bigint >> 16) & 255
    const g = (bigint >> 8) & 255
    const b = bigint & 255
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

/**
 * 节流函数
 * @param {function} fn - 要节流的函数，只有在指定的时间间隔内才会被调用
 * @param {number} delay - 节流延迟时间（毫秒），表示两次调用之间的最小间隔
 * @returns {function} - 返回一个新函数，该函数在指定时间间隔内只会执行一次
 *
 * @throws {TypeError} 如果 fn 不是函数，或者 delay 不是非负数字，则抛出 TypeError
 */
function throttle (fn, delay) {
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

module.exports = {
    createDailyScheduler,
    debounce,
    deepClone,
    fullScreenDisplay,
    getHashParam,
    hexToRgba,
    throttle
}


