const _window = typeof window !== "undefined" ? window : {
  ___APP_BASE_URL: undefined
};
const {env} = process;

/**
 * 在window或者process.env中获取全局变量或者环境变量值
 * window全局变量key格式为`__APP_XXX`
 * process.env环境变量key格式为`VUE_APP_XXX`或者`REACT_APP_XXX`
 * @param {string} key
 * @returns {string|undefined|*}
 */
function getValue (key) {
  return _window[`___APP_${key}`] || env[`VUE_APP_${key}`] || env[`REACT_APP_${key}`];
}

// 注意：如果前后端都依赖publicPath，请用VUE_APP/REACT_APP形式环境变量，因为vue cli、create react app只会传递特定的环境变量到前端
// process.env.PUBLIC_PATH环境变量只用于后端，如果前端使用publicPath获取不到环境变量设置的值
// webpack public path，可用于配置CDN发布地址
const publicPath = env.PUBLIC_PATH || getValue("PUBLIC_PATH");
// http request baseURL
const baseURL = getValue("BASE_URL");

module.exports = {
  publicPath,
  baseURL,
  getValue
};