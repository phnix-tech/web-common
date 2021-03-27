const resolve = require("./resolve");

/**
 * webpack别名定义，用于IDE智能提示
 * `@` 定位到项目根目录下的`src`目录
 */
module.exports = {
  resolve: {
    alias: {
      "@": resolve("./src")
    }
  }
};