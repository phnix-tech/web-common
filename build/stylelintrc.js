/**
 * stylelint原生支持vue单文件style标签lint ！？
 * 连vue template中标签的inline style也可以检查 ！？
 * @see https://vue-loader.vuejs.org/zh/guide/linting.html#stylelint
 * @param {object} dftCfg
 * @returns {*}
 */
module.exports = function (dftCfg) {
  dftCfg = dftCfg || {};

  const cfg = Object.assign({}, dftCfg);

  // 修改缩进为2个空格
  Object.assign(cfg.rules, {
    indentation: 2
  });

  return cfg;
};
