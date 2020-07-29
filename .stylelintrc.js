const cfg = require("gs-lint/stylelint/.stylelintrc");
Object.assign(cfg.rules, {
  indentation: 2
});
module.exports = cfg;