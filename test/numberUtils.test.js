const { digitUppercase, intToChinese } = require('../src/utils/numberUtils');

describe('digitUppercase 函数测试', () => {
  test('应该将 0 转换为 零元整', () => {
    expect(digitUppercase(0)).toBe('零元整');
  });

  test('应该将 123.45 转换为 壹佰贰拾叁元肆角伍分', () => {
    expect(digitUppercase(123.45)).toBe('壹佰贰拾叁元肆角伍分');
  });

  test('应该将 1000 转换为 壹仟元整', () => {
    expect(digitUppercase(1000)).toBe('壹仟元整');
  });

  test('应该将 10000 转换为 壹万元整', () => {
    expect(digitUppercase(10000)).toBe('壹万元整');
  });

  test('应该将 100000000 转换为 壹亿元整', () => {
    expect(digitUppercase(100000000)).toBe('壹亿元整');
  });

  test('应该将 0.01 转换为 壹分', () => {
    expect(digitUppercase(0.01)).toBe('壹分');
  });

  test('应该将 0.1 转换为 壹角', () => {
    expect(digitUppercase(0.1)).toBe('壹角');
  });

  test('应该将 0.11 转换为 壹角壹分', () => {
    expect(digitUppercase(0.11)).toBe('壹角壹分');
  });

  test('应该将 10.01 转换为 壹拾元零壹分', () => {
    expect(digitUppercase(10.01)).toBe('壹拾元零壹分');
  });

  test('应该将 10.1 转换为 壹拾元壹角', () => {
    expect(digitUppercase(10.1)).toBe('壹拾元壹角');
  });

  test('应该将 100.01 转换为 壹佰元零壹分', () => {
    expect(digitUppercase(100.01)).toBe('壹佰元零壹分');
  });

  test('应该将 1001.01 转换为 壹仟零壹元零壹分', () => {
    expect(digitUppercase(1001.01)).toBe('壹仟零壹元零壹分');
  });

  test('应该将 -123.45 转换为 壹佰贰拾叁元肆角伍分 (负数取绝对值)', () => {
    expect(digitUppercase(-123.45)).toBe('壹佰贰拾叁元肆角伍分');
  });

  test('应该将 1234567890.12 转换为 壹拾贰亿叁仟肆佰伍拾陆万柒仟捌佰玖拾元壹角贰分', () => {
    expect(digitUppercase(1234567890.12)).toBe('壹拾贰亿叁仟肆佰伍拾陆万柒仟捌佰玖拾元壹角贰分');
  });
});


describe('intToChinese 函数测试', () => {
  test('basic numbers', () => {
    expect(intToChinese(0)).toBe('零');
    expect(intToChinese(5)).toBe('五');
    expect(intToChinese(10)).toBe('十');
    expect(intToChinese(15)).toBe('十五');
  });

  test('numbers with middle zeros', () => {
    expect(intToChinese(105)).toBe('一百零五');
    expect(intToChinese(206)).toBe('二百零六');
    expect(intToChinese(1234)).toBe('一千二百三十四');
    expect(intToChinese(2008)).toBe('二千零八');
    expect(intToChinese(10005)).toBe('一万零五');
    expect(intToChinese(10500)).toBe('一万零五百');
    expect(intToChinese(1000005)).toBe('一百万零五');
    expect(intToChinese(1001001)).toBe('一百万一千零一');
  });

  test('large numbers with units', () => {
    expect(intToChinese(10000)).toBe('一万');
    expect(intToChinese(12345)).toBe('一万二千三百四十五');
    expect(intToChinese(100000000)).toBe('一亿');
    expect(intToChinese(123456789)).toBe('一亿二千三百四十五万六千七百八十九');
  });

  test('edge cases', () => {
    expect(intToChinese(100)).toBe('一百');
    expect(intToChinese(101)).toBe('一百零一');
    expect(intToChinese(1001)).toBe('一千零一');
    expect(intToChinese(20030040)).toBe('二千零三万零四十');
    expect(intToChinese(100000001)).toBe('一亿零一');
    expect(intToChinese(101010101)).toBe('一亿零一百零一万零一百零一');
    expect(intToChinese(21000000000)).toBe('二百一十亿');
    expect(intToChinese(100200030004)).toBe('一千零二亿零三万零四');
    expect(intToChinese(9111110012345)).toBe('九万一千一百一十一亿一千零一万二千三百四十五');
    expect(intToChinese(9999999999999)).toBe('九万九千九百九十九亿九千九百九十九万九千九百九十九');
    expect(intToChinese(1000000000000001)).toBe('一千万亿零一');
  });

  test('special patterns', () => {
    expect(intToChinese(100000)).toBe('十万');
    expect(intToChinese(1000000)).toBe('一百万');
    expect(intToChinese(10000000)).toBe('一千万');
    expect(intToChinese(1000000000)).toBe('十亿');
    expect(intToChinese(10000000000)).toBe('一百亿');
    expect(intToChinese(100000000000)).toBe('一千亿');
    expect(intToChinese(1000000000000)).toBe('一万亿');
    expect(intToChinese(10000000000000)).toBe('十万亿');
    expect(intToChinese(100000000000000)).toBe('一百万亿');
    expect(intToChinese(1000000000000000)).toBe('一千万亿');
  });
});