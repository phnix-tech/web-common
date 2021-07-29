const cfg = require("@web-io/lint/eslint/eslint-ts");
cfg.rules = Object.assign(cfg.rules || {}, {
  // add or override rules
});
module.exports = cfg;