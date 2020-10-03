const cfg = require("@web-io/lint/eslint/.eslintrc");
Object.assign(cfg.rules, {
  // 该规则不能正确解析export default from语法
  "object-curly-spacing": "off"
});

module.exports = cfg;