const
  path = require("path"),
  resolve = dir => path.join(__dirname, dir);

/**
 *
 * webpack别名定义，用于IDE智能提示
 * @/- 定位到项目根目录下的src目录
 */
module.exports = {
  resolve: {
    alias: {
      "@": resolve("../.."),
      "-": resolve("../..")
    }
  }
};
