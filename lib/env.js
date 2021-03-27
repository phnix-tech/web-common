"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// env可以是浏览器或者nodejs环境
var _window = (typeof window !== "undefined" ? window : {});
// 对象解构语法会导致环境变量获取失败
var envObj = (
// @ts-ignore: 忽略某些环境下找不到process类型申明，比如cnpm环境，同时也让外部不用显示依赖`@types/node`
typeof process !== "undefined" ? process.env : {});
/**
 * 在window或者process.env中获取全局变量或者环境变量值
 * window全局变量key格式`___APP_XXX`
 * process.env环境变量key格式`VUE_APP_XXX`或者`REACT_APP_XXX`
 * @param key
 * @returns environment value
 */
function getValue(key) {
    return _window["___APP_" + key] || envObj["VUE_APP_" + key] || envObj["REACT_APP_" + key];
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
    _window["___APP_" + key] = value;
    // 同步预定义环境变量值，建议通过getValue和setValue形式读取环境变量
    switch (key) {
        case "PUBLIC_PATH":
            envObj.PUBLIC_PATH = value;
            break;
        case "BASE_URL":
            envObj.BASE_URL = value;
            break;
        default:
            break;
    }
}
var env = {
    PUBLIC_PATH: envObj.PUBLIC_PATH || getValue("PUBLIC_PATH"),
    BASE_URL: getValue("BASE_URL"),
    getValue: getValue,
    setValue: setValue
};
exports.default = env;
