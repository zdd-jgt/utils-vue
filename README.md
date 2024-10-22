# 常用工具函数

## 安装

`npm install utils-vue`

```javascript
import utilsVue from 'utils-vue'
utilsVue.isEmpty('0')
// false
```

## 目录

| 方法名                     | 说明                   | 参数                      | 版本   |
|-------------------------|----------------------|-------------------------|------|
| isEmpty                 | 检查字符串是否为空            | (string):boolean        | 1.0  |
| hexToRgba               | 颜色格式转换：hex格式转为rgba格式 | (string, number):string | 1.0  |
| randomNum               | 生成指定范围随机数            | (number, number):number | 1.0  |
| setPercentileSeparation | 数字转为千分位分隔            | (number):string         | 1.0  |
| fistLetterUpper         | 字符串首字母大写             | (string):string         | 1.0  |
| telFormat               | 手机号中间四位变成*           | (number或string):string  | 1.0  |
| getCamelCase            | 短横线命名转换成驼峰命名         | (string):string         | 1.0  |
| getKebabCase            | 驼峰命名转换成短横线命名         | (string):string         | 1.0  |
| digitUppercase          | 数字转化为大写金额            | (number):string         | 1.0  |
| intToChinese            | 数字转化为中文数字（不支持小数）     | (number):string         | 1.0  |

## 详细

### isEmpty(string)
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

### hexToRgba(string, number)
颜色格式转换：hex格式转为rgba格式
- 示例
```javascript
hexToRgba('#00000', 0.8)
// 'rgba(0, 0, 0, 0.8)'
```

### randomNum(number, number)
生成指定范围随机数
- 示例
```javascript
randomNum(0, 10000)
// 5560 8264 4560
```

### setPercentileSeparation(number)
数字转为千分位分隔,不支持支持小数
- 示例
```javascript
setPercentileSeparation(100)
// '100'
setPercentileSeparation(1000)
// '1,000'
```

### fistLetterUpper(string)
字符串首字母大写
- 示例
```javascript
fistLetterUpper('object')
// 'Object'
```

### telFormat(string|number)
手机号中间四位变成*
- 示例
```javascript
telFormat(13836789010)
// '138****9010'
telFormat('13836789010')
// '138****9010'
```

### getCamelCase(string)
短横线命名转换成驼峰命名
- 示例
```javascript
getCamelCase('get_camel_case')
// 'get_camel_case'
```

### getKebabCase(string)
驼峰命名转换成短横线命名
- 示例
```javascript
getKebabCase('getKebabCase')
// 'get-kebab-case'
```

### digitUppercase(number)
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

### intToChinese(number)
数字转化为中文数字（不支持小数）
- 示例
```javascript
intToChinese('999999999')
// '九亿九千九百九十九万九千九百九十九'
```