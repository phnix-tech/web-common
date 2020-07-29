/**
 * 依赖包
 * "husky": "4.2.1"
 * "lint-staged": "10.0.7"
 * @type {{hooks: {"pre-commit": string}}}
 * @see https://github.com/typicode/husky
 */
module.exports = {
  hooks: {
    "pre-commit": "lint-staged -c ./.lintstagedrc.js"
  }
};