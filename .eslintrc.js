const cfg = require("@web-io/lint/eslint/eslint-ts");
cfg.rules = Object.assign(cfg.rules || {}, {
  // add or override rules
  "no-trailing-spaces": [
    "error",
    {
      ignoreComments: true
    }
  ]
});
module.exports = cfg;