// 由于eslint默认配置文件名(.eslintrc.js)会被主项目检查时规则重写报错误
// 所以修改配置文件为eslintrc.js
const cfg = require("@web-io/lint/eslint");
Object.assign(cfg.rules, {
  // add extra rules
});
module.exports = cfg;