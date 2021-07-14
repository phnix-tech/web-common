/**
 * PATH="/usr/local/bin:$PATH"
 * @see https://github.com/okonet/lint-staged#configuration
 */
module.exports = {
  "./**/*.{js,jsx,ts,tsx}": "eslint",
  "./**/*.{scss,less,vue}": "stylelint"
};