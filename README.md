# 常用工具函数

> github: https://github.com/zdd-jgt/utils-vue

## 安装

`npm install utils-vue`

```javascript
import utilsVue from 'utils-vue'
utilsVue.isEmpty('0')
// false
utilsVue.REG_IDNUMBER
// /^(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
```

## 目录

| 方法名                                                 | 说明                   | 参数                                              | 版本    |
|-----------------------------------------------------|----------------------|-------------------------------------------------|-------|
| [REG_IDNUMBER](#REG_IDNUMBER)                       | 静态变量:身份证验证           | 无                                               | 1.0   |
| [isEmpty](#isEmpty)                                 | 检查字符串是否为空            | (string):boolean                                | 1.0   |
| [hexToRgba](#hexToRgba)                             | 颜色格式转换：hex格式转为rgba格式 | (string, number):string                         | 1.0   |
| [randomNum](#randomNum)                             | 生成指定范围随机数            | (number, number):number                         | 1.0   |
| [setPercentileSeparation](#setPercentileSeparation) | 金额转为千分位分隔            | (number):string                                 | 1.0   |
| [fistLetterUpper](#fistLetterUpper)                 | 字符串首字母大写             | (string):string                                 | 1.0   |
| [telFormat](#telFormat)                             | 手机号中间四位变成*           | (number或string):string                          | 1.0   |
| [getCamelCase](#getCamelCase)                       | 短横线命名转换成驼峰命名         | (string):string                                 | 1.0   |
| [getKebabCase](#getKebabCase)                       | 驼峰命名转换成短横线命名         | (string):string                                 | 1.0   |
| [digitUppercase](#digitUppercase)                   | 数字转化为大写金额            | (number):string                                 | 1.0   |
| [intToChinese](#intToChinese)                       | 数字转化为中文数字（不支持小数）     | (number):string                                 | 1.0   |
| [addStrings](#addStrings)                           | 实现两个大数字符串相加          | (string, string):string                         | 1.0   |
| [debounce](#debounce)                               | 防抖函数                 | (function, number):function                     | 1.0   |
| [throttle](#throttle)                               | 节流函数                 | (function, number):function                     | 1.0   |
| [deepClone](#deepClone)                             | 对象深拷贝                | (Object, WeakMap):Object                        | 1.0   |
| [getIDCardInfo](#getIDCardInfo)                     | 根据身份证号码获取年龄、生日和性别    | (string):{age: any, birthday: any, sex: string} | 1.0   |
| [createDailyScheduler](#createDailyScheduler)       | 设置定时任务器              | ():Object                                       | 1.0   |
| [fullScreenDisplay](#fullScreenDisplay)             | 全屏展示功能               | (el):function                                   | 1.0   |

## 详细

### REG_IDNUMBER

静态变量：身份证验证正则

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
