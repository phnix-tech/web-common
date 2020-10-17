const cfg = require("./eslintrc-ts");

if (!cfg.parserOptions.ecmaFeatures) {
  cfg.parserOptions.ecmaFeatures = {};
}

/**
 * eslint tsx配置
 * https://eslint.org/docs/user-guide/configuring#specifying-parser-options
 */
Object.assign(cfg.parserOptions, {
  ecmaFeatures: Object.assign(
    cfg.parserOptions.ecmaFeatures,
    {
      jsx: true
    }
  )
});

module.exports = cfg;