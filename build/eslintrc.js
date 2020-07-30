/**
 * eslint vue规则配置
 * 依赖包(注意对等版本依赖)：
 * eslint(6.8.0+)
 * babel-eslint(10.0.3+)
 * eslint-plugin-vue(6.1.2+)
 * @see https://eslint.vuejs.org
 * @param {object|undefined} dftCfg
 * @returns {object}
 */
module.exports = function (dftCfg) {
  dftCfg = dftCfg || {};

  const cfg = Object.assign({}, dftCfg);

  cfg.globals = cfg.globals || {};
  // 修改4个空格缩进为2个空格
  cfg.rules.indent[1] = 2;
  Object.assign(cfg.rules, {
    // 该规则不能正确解析export default from语法
    "object-curly-spacing": "off"
  });

  return cfg;
};
