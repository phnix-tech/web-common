const cfg = require("@web-io/lint/stylelint");
const rules = cfg.rules || {};
Object.assign(rules, {
  // add or override rules
});
module.exports = cfg;