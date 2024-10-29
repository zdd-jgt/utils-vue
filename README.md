# 常用工具函数

> github: https://github.com/zdd-jgt/utils-vue

## 安装

`npm install utils-vue`

```javascript
import utilsVue from 'utils-vue'
utilsVue.isEmpty('0')
// false
```

## 目录

| 方法名                                                 | 说明                   | 参数                          | 版本   |
|-----------------------------------------------------|----------------------|-----------------------------|------|
| [isEmpty](#isEmpty)                                 | 检查字符串是否为空            | (string):boolean            | 1.0  |
| [hexToRgba](#hexToRgba)                             | 颜色格式转换：hex格式转为rgba格式 | (string, number):string     | 1.0  |
| [randomNum](#randomNum)                             | 生成指定范围随机数            | (number, number):number     | 1.0  |
| [setPercentileSeparation](#setPercentileSeparation) | 金额转为千分位分隔            | (number):string             | 1.0  |
| [fistLetterUpper](#fistLetterUpper)                 | 字符串首字母大写             | (string):string             | 1.0  |
| [telFormat](#telFormat)                             | 手机号中间四位变成*           | (number或string):string      | 1.0  |
| [getCamelCase](#getCamelCase)                       | 短横线命名转换成驼峰命名         | (string):string             | 1.0  |
| [getKebabCase](#getKebabCase)                       | 驼峰命名转换成短横线命名         | (string):string             | 1.0  |
| [digitUppercase](#digitUppercase)                   | 数字转化为大写金额            | (number):string             | 1.0  |
| [intToChinese](#intToChinese)                       | 数字转化为中文数字（不支持小数）     | (number):string             | 1.0  |
| [debounce](#debounce)                               | 防抖函数                 | (function, number):function | 1.0  |
| [throttle](#throttle)                               | 节流函数                 | (function, number):function | 1.0  |
| [deepClone](#deepClone)                             | 对象深拷贝                | (Object, WeakMap):Object    | 1.0  |

## 详细

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

> This message is used to verify that this feed (feedId:73927881847740416) belongs to me (userId:73917280460788736). Join me in enjoying the next generation information browser https://follow.is.