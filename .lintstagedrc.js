/**
 * @see https://github.com/okonet/lint-staged#configuration
 * PATH="/usr/local/bin:$PATH"
 */
module.exports = {
  "./**/*.{js,jsx}": "eslint --config ./eslintrc.js",
  "./**/*.{ts,tsx}": "eslint --config ./eslintrc-ts.js",
  "./src/**/*.{scss,less,vue}": "stylelint"
};