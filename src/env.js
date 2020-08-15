const _window = typeof window !== "undefined" ? window : {
  ___APP_BASE_URL: undefined
};
// 注意：如果前后端都依赖publicPath，请用VUE_APP/REACT_APP形式环境变量，因为vue cli、create react app只会传递特定的环境变量到前端
// process.env.PUBLIC_PATH环境变量只用于后端，如果前端使用publicPath获取不到环境变量设置的值
// webpack public path
const {env} = process;
const publicPath = env.PUBLIC_PATH || env.VUE_APP_PUBLIC_PATH || env.REACT_APP_PUBLIC_PATH;
// http request baseURL
const baseURL = _window.___APP_BASE_URL || env.VUE_APP_BASE_URL || env.REACT_APP_BASE_URL;

module.exports = {
  publicPath,
  baseURL
};