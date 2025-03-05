declare module 'utils-vue' {
  /**
   * 性别枚举
   */
  enum Sex {
    Male = '男',
    Female = '女'
  }
  /**
   * 身份证信息接口
   */
  interface IDCardInfo {
    age: number;
    birthday: string;
    sex: Sex;
  }
  /**
   * 工具函数接口
   */
  interface Utils {
    // 数字处理工具
    digitUppercase(n: number): string;
    intToChinese(n: number): string;
    randomNum<T extends number>(min: T, max: T): T;
    setPercentileSeparation(num: number): string;
    telFormat(tel: string | number): string;

    // 字符串处理工具
    addStrings(num1: string, num2: string): string;
    fistLetterUpper(str: string): string;
    getCamelCase(str: string): string;
    getIDCardInfo(idCard: string): IDCardInfo | '无效身份证';
    getKebabCase(str: string): string;
    isEmpty(str: string | null | undefined): boolean;
    validateIDCard(idCard: string): boolean;

    // 正则表达式
    readonly REG: {
      ID_NUMBER: RegExp;
      URL: RegExp;
      MOBILE: RegExp;
      TELEPHONE: RegExp;
      EMAIL: RegExp;
      CAR_PLATE: RegExp;
      PASSWORD: RegExp;
    };

    // 终端校验
    isIOS(): boolean;
    isAndroid(): boolean;
    isWeiXin(): boolean;
    isWeiXinMiniprogram(): boolean;
    isAliPay(): boolean;
    getIOSVersion(): number | undefined;

    // 时间处理
    addDays(date: Date, days: number): Date;
    dateFormat(date: string | number | Date, formatType?: string): string;
    dealYear(year: string): string;
    isLeapYear(year: string): boolean;

    // 其他工具
    hexToRgba(hex: string, alpha: number): string;
    debounce<T extends (...args: any[]) => any>(fn: T, delay: number): T;
    throttle<T extends (...args: any[]) => any>(fn: T, delay: number): T;
    deepClone<T>(obj: T, weakMap?: WeakMap<any, any>): T;
    createDailyScheduler(): {
      addTask: (time: string, callback: () => void) => void;
      start: () => void;
      destroy: () => void;
    };
    fullScreenDisplay(el: HTMLElement): {
      toggleFullScreen: () => void;
      fullscreenText: string;
    };
    getHashParam<T = string>(key: string): T | null;
  }

  const utils: Utils;
  export { utils };
}