const
  path = require("path"),
  projectRoot = path.join(__dirname, "../../..");

/**
 * 基于项目根路径解析相对路径
 * @returns {string}
 */
module.exports = function () {
  return path.resolve.apply(path, [projectRoot, ...arguments]);
};
