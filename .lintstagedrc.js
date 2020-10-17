/**
 * @see https://github.com/okonet/lint-staged#configuration
 * PATH="/usr/local/bin:$PATH"
 */
module.exports = {
  "./**/*.js": "eslint --config ./eslintrc.js",
  "./**/*.ts": "eslint --config ./eslintrc-ts.js",
  "./**/*.tsx": "eslint --config ./eslintrc-tsx.js",
  "./src/**/*.{scss,less,vue}": "stylelint"
};