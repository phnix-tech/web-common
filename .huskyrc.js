/**
 * @type {{hooks: {"pre-commit": string}}}
 * @see https://github.com/typicode/husky
 */
module.exports = {
  hooks: {
    "pre-commit": "lint-staged -c ./.lintstagedrc.js"
  }
};