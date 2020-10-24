/* eslint-disable */
// 这是自动构建生成的文件，请勿单独修改

// ------------------------------------------------------------------
// 注：修改该文件后请运行`npm run build`构建esm和cjs版本
// ------------------------------------------------------------------
// env可以是浏览器或者nodejs环境
const _window = (typeof window !== "undefined" ? window : {});
// 对象解构语法会导致环境变量获取失败
const env = process.env;
/**
 * 在window或者process.env中获取全局变量或者环境变量值
 * window全局变量key格式`___APP_XXX`
 * process.env环境变量key格式`VUE_APP_XXX`或者`REACT_APP_XXX`
 * @param key
 * @returns environment value
 */
function getValue(key) {
    return _window[`___APP_${key}`] || env[`VUE_APP_${key}`] || env[`REACT_APP_${key}`];
}
/**
 * 目前仅支持在浏览器环境设置window上的全局环境变量
 * 注意：浏览器环境webpack构建提供的process.env为只读模式
 * @param key
 * @param value - environment value, `undefined`用于设置示例会被忽略
 */
function setValue(key, value) {
    // `undefined`用于设置示例
    if (value === undefined) {
        return;
    }
    _window[`___APP_${key}`] = value;
    // 同步预定义环境变量值，建议通过getValue和setValue形式读取环境变量
    switch (key) {
        case "PUBLIC_PATH":
            _env.PUBLIC_PATH = value;
            break;
        case "BASE_URL":
            _env.BASE_URL = value;
            break;
        default:
            break;
    }
}
const _env = {
    PUBLIC_PATH: env.PUBLIC_PATH || getValue("PUBLIC_PATH"),
    BASE_URL: getValue("BASE_URL"),
    getValue,
    setValue
};
export default _env;
