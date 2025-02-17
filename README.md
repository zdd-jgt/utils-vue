# 常用工具函数

> github: https://github.com/zdd-jgt/utils-vue

## 安装

`npm install utils-vue`

```javascript
import utilsVue from 'utils-vue'
utilsVue.utils.isEmpty('0')
// false
utilsVue.utils.REG_ID_NUMBER
// /^(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
```

## 目录

### 数字处理工具

| 方法名                                                 | 说明                   | 参数                                              | 版本    |
|-----------------------------------------------------|----------------------|-------------------------------------------------|-------|
| [digitUppercase](#digitUppercase)                   | 数字转化为大写金额            | (number):string                                 | 1.0   |
| [intToChinese](#intToChinese)                       | 数字转化为中文数字（不支持小数）     | (number):string                                 | 1.0   |
| [randomNum](#randomNum)                             | 生成指定范围随机数            | (number, number):number                         | 1.0   |
| [setPercentileSeparation](#setPercentileSeparation) | 金额转为千分位分隔            | (number):string                                 | 1.0   |
| [telFormat](#telFormat)                             | 手机号中间四位变成*           | (number或string):string                          | 1.0   |

### 字符串处理工具

| 方法名                                 | 说明                | 参数                                              | 版本  |
|-------------------------------------|-------------------|-------------------------------------------------|-----|
| [addStrings](#addStrings)           | 实现两个大数字符串相加       | (string, string):string                         | 1.0 |
| [fistLetterUpper](#fistLetterUpper) | 字符串首字母大写          | (string):string                                 | 1.0 |
| [getCamelCase](#getCamelCase)       | 短横线命名转换成驼峰命名      | (string):string                                 | 1.0 |
| [getIDCardInfo](#getIDCardInfo)     | 根据身份证号码获取年龄、生日和性别 | (string):{age: any, birthday: any, sex: string} | 1.0 |
| [getKebabCase](#getKebabCase)       | 驼峰命名转换成短横线命名      | (string):string                                 | 1.0 |
| [isEmpty](#isEmpty)                 | 检查字符串是否为空         | (string):boolean                                | 1.0 |
| [validateIDCard](#validateIDCard)   | 校验身份证号是否合法        | (string):boolean                                | 1.0 |

### 常用正则表达式判断

| 方法名                       | 说明          | 参数               | 版本  |
|---------------------------|-------------|------------------|-----|
| [REG](#REG)               | 静态变量        | 无                | 1.0 |
| [isIdNumber](#isIdNumber) | 是否是正确的身份证号码 | (string):boolean | 1.0 |

### 终端校验工具

| 方法名                 | 说明           | 参数         | 版本  |
|---------------------|--------------|------------|-----|
| isIOS               | 是否是iOS终端     | ():boolean | 1.0 |
| isAndroid           | 是否是Android终端 | ():boolean | 1.0 |
| isWeiXin            | 是否是微信终端      | ():boolean | 1.0 |
| isWeiXinMiniprogram | 是否是微信小程序终端   | ():boolean | 1.0 |
| isAliPay            | 是否是支付宝终端     | ():boolean | 1.0 |
| getIOSVersion       | 获取iOS系统版本    | ():number  | 1.0 |

### 时间相关通用工具

| 方法名                            | 说明                            | 参数                      | 版本  |
|--------------------------------|-------------------------------|-------------------------|-----|
| [addDays](#addDays)            | 添加几天                          | (date, number):date     | 1.0 |
| [dateFormat](#dateFormat)      | 日期格式化                         | (string, string):string | 1.0 |
| [dealYear](#dealYear)          | 处理年份                          | (string):string         | 1.0 |
| [isLeapYear](#isLeapYear)      | 是否为闰年，能被4整除且不能被100整除，或能被400整除 | (string):boolean        | 1.0 |

### 其他工具

| 方法名                                           | 说明                      | 参数                          | 版本  |
|-----------------------------------------------|-------------------------|-----------------------------|-----|
| [hexToRgba](#hexToRgba)                       | 颜色格式转换：hex格式转为rgba格式    | (string, number):string     | 1.0 |
| [debounce](#debounce)                         | 防抖函数                    | (function, number):function | 1.0 |
| [throttle](#throttle)                         | 节流函数                    | (function, number):function | 1.0 |
| [deepClone](#deepClone)                       | 对象深拷贝                   | (object, weakMap):object    | 1.0 |
| [createDailyScheduler](#createDailyScheduler) | 设置定时任务器                 | ():object                   | 1.0 |
| [fullScreenDisplay](#fullScreenDisplay)       | 全屏展示功能                  | (el):function               | 1.0 |
| [getHashParam](#getHashParam)                 | 获取 location.hash 对应参数值  | (string):any                | 1.0 |

## 详细

### REG

静态变量
```javascript
REG_ID_NUMBER // 身份证号码
REG_URL // 网络链接地址
REG_MOBILE // 手机号码
REG_TELEPHONE // 固定电话号码
REG_EMAIL // 邮件地址
REG_CAR_PLATE // 车牌号
REG_PASSWORD // 常用8至12位包含英文、字符、数字的密码
```

### isIdNumber
isIdNumber(string)

是否是正确的身份证号码
- 示例
```javascript
isIdNumber('')
// false
```

### isEmpty
isEmpty(string)

检查字符串是否为空
- 示例
```javascript
isEmpty('')
// true

isEmpty('0')
// false

isEmpty('1')
// false

isEmpty(null)
// true

isEmpty(undefined)
// true
```

### hexToRgba
hexToRgba(string, number)

颜色格式转换：hex格式转为rgba格式
- 示例
```javascript
hexToRgba('#00000', 0.8)
// 'rgba(0, 0, 0, 0.8)'
```

### randomNum
randomNum(number, number)

生成指定范围随机数
- 示例
```javascript
randomNum(0, 10000)
// 5560 8264 4560
```

### setPercentileSeparation
setPercentileSeparation(number)

金额转为千分位分隔
- 示例
```javascript
setPercentileSeparation(100)
// '100'
setPercentileSeparation(1000)
// '1,000'
setPercentileSeparation(1234567.2002)
// '1,234,567.2002'
```

### fistLetterUpper
fistLetterUpper(string)

字符串首字母大写
- 示例
```javascript
fistLetterUpper('object')
// 'Object'
```

### telFormat
telFormat(string|number)

手机号中间四位变成*
- 示例
```javascript
telFormat(10000000000)
// '100****0000'
```

### getCamelCase
getCamelCase(string)

短横线命名转换成驼峰命名
- 示例
```javascript
getCamelCase('get_camel_case')
// 'get_camel_case'
```

### getKebabCase
getKebabCase(string)

驼峰命名转换成短横线命名
- 示例
```javascript
getKebabCase('getKebabCase')
// 'get-kebab-case'
```

### digitUppercase
digitUppercase(number)

数字转化为大写金额
- 示例
```javascript
digitUppercase('999999999')
// '玖亿玖仟玖佰玖拾玖万玖仟玖佰玖拾玖元整'
digitUppercase('9999999.99')
// '玖佰玖拾玖万玖仟玖佰玖拾玖元玖角玖分'
digitUppercase('99999.9999')
// '玖万玖仟玖佰玖拾玖元玖角玖分'
```

### intToChinese
intToChinese(number)

数字转化为中文数字（不支持小数）
- 示例
```javascript
intToChinese('999999999')
// '九亿九千九百九十九万九千九百九十九'
```

### addStrings
addStrings(string, string)

实现两个大数字符串相加
- 示例
```javascript
addStrings('123456789012233', '39087556789900901')
// '39211013578913134'
```

### debounce
debounce(function, number)

防抖是一种技术，用于限制某个函数在连续触发时只执行一次，具体是在事件触发后的某个延迟时间内，如果事件再次被触发，则重置延迟。换句话说，只有在事件触发后的延迟时间内没有再次触发时，才会执行函数。
- 使用场景：

  输入框搜索建议

  窗口调整大小事件

  按钮点击事件

- 示例
```javascript
// 在事件频繁触发时，只有在事件停止触发一段时间后才执行函数。适合处理频繁触发的事件，最后只想保留一次执行。
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', debounce(function() {
  console.log('Searching for:', this.value);
}, 300));
```

### throttle
throttle(function, number)

节流是一种控制函数执行频率的技术。与防抖不同，节流在指定的时间间隔内只允许函数执行一次，即使该事件在这个时间间隔内被多次触发。可以理解为“每隔一定时间就执行一次”。
- 使用场景：

  滚动事件

  窗口调整大小事件
  
  按钮点击频率限制

- 示例
```javascript
// 在指定的时间间隔内执行函数，即使事件频繁触发。适合控制事件的执行频率，确保不会在短时间内多次执行。
const button = document.getElementById('myButton');
button.addEventListener('click', throttle(function() {
  console.log('Button clicked');
}, 2000));
```

### deepClone
deepClone(object, WeakMap)

对象深拷贝
- 示例
```javascript
const original = {
  name: 'John',
  age: 30,
  dateOfBirth: new Date('1990-01-01'),
  hobbies: ['reading', 'traveling'],
  address: {
    street: '123 Main St',
    city: 'Anytown'
  }
};
// 循环引用测试
original.self = original;

// 使用深拷贝函数
const cloned = deepClone(original);

// 修改原对象以验证深拷贝
original.name = 'Doe';
original.hobbies.push('coding');

console.log('Original:', original);
console.log('Cloned:', cloned);

// 验证深拷贝是否成功
console.log(cloned.name); // John
console.log(cloned.hobbies); // ['reading', 'traveling']
console.log(cloned.dateOfBirth); // Date object
console.log(cloned.self === cloned); // true (保持循环引用)
```

### getIDCardInfo
getIDCardInfo(string)

根据身份证号码获取年龄、生日和性别

返回一个对象，包含年龄、生日、性别。若身份证无效，返回 '无效身份证'。
- 示例
```javascript
console.log(getIDCardInfo("123456198901011234"));
// 示例：{age:35, birthday: "1989-01-01", sex: "男"}
console.log(getIDCardInfo("123456789012345"));
// 示例：{age:0, birthday: "1978-90-12", sex: "男"}
console.log(getIDCardInfo(""));
// 示例：返回 '无效身份证'
console.log(getIDCardInfo("123456789012345678"));
// 示例：返回 '无效身份证'
```

### createDailyScheduler
const scheduler = createDailyScheduler();

添加定时任务

返回一个对象包含3个函数：添加任务、启动任务、销毁任务。

用户只需调用 addTask 添加任务，调用 start 启动任务，调用 destroy 销毁任务即可。
- 示例
```javascript
const scheduler = createDailyScheduler();

// 添加每天 8:00 的任务
scheduler.addTask('08:00', () => {
  console.log(`任务1 - 当前时间: ${new Date().toLocaleString()}`);
});

// 添加每天 12:00 的任务
scheduler.addTask('12:00', () => {
  console.log(`任务2 - 当前时间: ${new Date().toLocaleString()}`);
});

// 启动任务
scheduler.start();

// 在需要时销毁任务
// scheduler.destroy();
```

### fullScreenDisplay
const scheduler = fullScreenDisplay(document.documentElement);

全屏展示功能

返回 全屏展示、退出全屏
- 示例
```javascript
const { toggleFullScreen, fullscreenText } = fullScreenDisplay(document.documentElement);
console.log(fullscreenText); // 输出 '全屏展示'
toggleFullScreen(); // 切换至全屏
console.log(fullscreenText); // 输出 '退出全屏'
```

### validateIDCard
validateIDCard(string)

校验身份证号是否合法

返回 是否有效(true/false)

- 示例
```javascript
validateIDCard('142323199010410090')
// false
```

### getHashParam
getHashParam(string)

获取 location.hash 对应参数值

参数存在，返回对应的value；参数不存在，返回空字符
- 示例
```javascript
// url: https://xxx.com?name=张三
const name = getHashParam('name')
console.log(name)
// 张三
```

### addDays
addDays(date, number)

获取添加几天后的新日期

- 示例
```javascript
const time = addDays(new Date(), 3)
console.log(time)
// Mon Feb xx xxxx xx:xx:xx GMT+0800 (中国标准时间)
```

### dateFormat
dateFormat(string|number}, string)

日期格式化

返回格式化后的日期
- 示例
```javascript
const time = addDays(new Date(), 3)
console.log(time)
// Mon Feb xx xxxx xx:xx:xx GMT+0800 (中国标准时间)
dateFormat(time)
// 'YYYY-MM-DD HH:mm:ss'
```

### dealYear
dealYear(string)

处理年份

返回格式化后的日期
- 示例
```javascript
console.log(dealYear('2025'))
// '今年'
console.log(dealYear('2024'))
// '去年'
console.log(dealYear('2026'))
// '明年'
console.log(dealYear('2027'))
// '2027年'
```

### isLeapYear
isLeapYear(string)

是否为闰年，能被4整除且不能被100整除，或能被400整除

是返回 true，不是返回 false
- 示例
```javascript
console.log(isLeapYear('2025'))
// false
console.log(isLeapYear('2020'))
// true
```
