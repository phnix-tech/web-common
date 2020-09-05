/**
 * @see https://github.com/okonet/lint-staged#configuration
 * PATH="/usr/local/bin:$PATH"
 */
module.exports = {
  "./**/*.js": "eslint --config ./eslintrc.js",
  "./src/**/*.{scss,less,vue}": "stylelint"
};