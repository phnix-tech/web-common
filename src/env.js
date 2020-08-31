// env可以为浏览器或者nodejs环境
const _window = typeof window !== "undefined" ? window : {
  ___APP_BASE_URL: undefined
};
// 对象解构语法会导致环境变量获取失败
const env = process.env;

/**
 * 在window或者process.env中获取全局变量或者环境变量值
 * window全局变量key格式`__APP_XXX`
 * process.env环境变量key格式`VUE_APP_XXX`或者`REACT_APP_XXX`
 * @param {string} key
 * @returns {string|undefined|*}
 */
function getValue (key) {
  return _window[`___APP_${key}`] || env[`VUE_APP_${key}`] || env[`REACT_APP_${key}`];
}

/**
 * 目前仅支持在浏览器环境设置window上的全局环境变量
 * 注意：浏览器环境webpack构建提供的process.env为只读模式
 * @param {string} key
 * @param {*} value
 */
function setValue (key, value) {
  if (value !== undefined) {
    _window[`___APP_${key}`] = value;
    // 同步预定义环境变量值，建议通过getValue和setValue形式读取环境变量
    switch (key) {
      case "PUBLIC_PATH":
        PUBLIC_PATH = value;
        module.exports.PUBLIC_PATH = PUBLIC_PATH;
        break;
      case "BASE_URL":
        BASE_URL = value;
        module.exports.BASE_URL = BASE_URL;
        break;
      default:
        break;
    }
  }
}

// 注意：如果前后端都依赖publicPath，请用VUE_APP/REACT_APP形式环境变量
// 因为vue cli、create react app只会传递特定的环境变量到前端
// process.env.PUBLIC_PATH环境变量只用于后端，如果前端使用publicPath获取不到环境变量设置的值
// webpack public path，可用于配置CDN发布地址
let PUBLIC_PATH = env.PUBLIC_PATH || getValue("PUBLIC_PATH");
// http request baseURL
let BASE_URL = getValue("BASE_URL");

module.exports = {
  PUBLIC_PATH,
  BASE_URL,
  getValue,
  setValue
};