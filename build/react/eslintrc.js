/**
 *
 * @param {object|undefined} dftCfg
 * @returns {object}
 */
module.exports = function (dftCfg) {
  dftCfg = dftCfg || {};

  return Object.assign({}, dftCfg);
};
