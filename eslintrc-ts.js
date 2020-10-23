const cfg = require("@web-io/lint/eslint/eslint-ts");
const rules = cfg.rules || {};
Object.assign(rules, {
  // add or override rules
});
module.exports = cfg;