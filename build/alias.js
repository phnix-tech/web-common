const path = require("path");

/**
 * 基于项目根解析路径
 * git子模块引用：假设当前路径为`src/common/build`
 * npm包引用：假设当前路径`node_modules/@web-io/common/build`
 *
 * @param {string[]} dir
 * @returns
 */
function resolve (...dir) {
  let projectRoot = path.join(__dirname, "../../..");
  // npm包引用
  if (path.basename(projectRoot) === "node_modules") {
    projectRoot = path.join(projectRoot, "..");
  }
  return path.join(projectRoot, ...dir);
}

/**
 *
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
