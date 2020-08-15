/**
 *
 * @param {object|undefined} dftCfg
 * @returns {object}
 */
module.exports = function (dftCfg) {
  dftCfg = dftCfg || {};

  const cfg = Object.assign({}, dftCfg);

  cfg.globals = cfg.globals || {};
  // 修改4个空格缩进为2个空格
  cfg.rules.indent[1] = 2;

  return cfg;
};
