const cfg = require("gs-lint/eslint/.eslintrc");
// 修改4个空格缩进为2个空格
cfg.rules.indent[1] = 2;
Object.assign(cfg.rules, {
  // 该规则不能正确解析export default from语法
  "object-curly-spacing": "off"
});

module.exports = cfg;