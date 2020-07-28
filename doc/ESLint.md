```javascript
/**
 * @see https://goo.gl/uKcXWi
 */
module.exports = {
    // https://goo.gl/bmLZjl
    env: {
        browser: true,
        es6: true,
        node: true
    },
    // https://goo.gl/aLuuhy
    extends: "eslint:recommended",
    // https://goo.gl/wBtHAq
    parserOptions: {
        sourceType: "module",
        ecmaVersion: 2018
    },
    rules: {
        // https://goo.gl/6N3dKr
        strict: ["error", "function"],
        // https://goo.gl/U52rRQ
        indent: [
            "error",
            4,
            {
                "SwitchCase": 1
            }
        ],
        // https://goo.gl/L7KrbH
        quotes: [
            "error",
            "double"
        ],
        // https://goo.gl/jqpzbc
        semi: [
            "error",
            "always"
        ],
        // https://goo.gl/YVw0T0
        // var变量函数作用域，变量会提升，所以declaring all variables in a single declaration
        // let/const为块级作用域，没有变量提升，所以就近申明变量，就近多个同类型变量定义在一起
        "one-var": ["error", {var: "always", let: "consecutive", const: "consecutive"}],
        // https://goo.gl/xq0dHS
        eqeqeq: "error",
        // https://goo.gl/jBOk1t
        camelcase: "error",
        // https://goo.gl/CraU5J
        "space-before-function-paren": ["error", "always"],
        // https://goo.gl/nwEFv7
        "spaced-comment": ["error", "always"],
        // https://goo.gl/pBBYO8
        "space-infix-ops": ["error", {"int32Hint": false}],
        // https://goo.gl/IqOWbM
        "space-before-blocks": ["error", "always"],
        // https://goo.gl/lBVZC4
        "comma-spacing": ["error", {"before": false, "after": true}],
        // https://goo.gl/THUavy
        "key-spacing": ["error", {"mode": "strict"}],
        // https://goo.gl/QQ0CdV
        "keyword-spacing": "error",
        // https://goo.gl/rQ3Pfi
        "semi-spacing": "error",
        // https://goo.gl/nxxqXw
        // this.uid = 1, this.name = ""; => error
        "no-sequences": "error",
        // https://goo.gl/uieY4v
        // var foo = {a: 1, b: false,}, arr = [1,2,]; => error
        "comma-dangle": ["error", "never"]
        // no-useless-escape
        // Escaping non-special characters in strings, template literals, and regular expressions
        // doesn't have any effect
        // https://eslint.org/docs/rules/no-useless-escape

    }
};
```