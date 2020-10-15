const cfg = require("@web-io/lint/eslint/.eslintrc");

/**
 * https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md
 */
Object.assign(cfg, {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: Object.assign(
    cfg.parserOptions,
    {
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/TYPED_LINTING.md
      // tsconfigRootDir: __dirname,
      // project: ["./tsconfig.json"]
    }
  ),
  extends: [
    ...(Array.isArray(cfg.extends) ? cfg.extends : [cfg.extends]),
    "plugin:@typescript-eslint/recommended"
    // "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ],
  plugins: [
    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin
    "@typescript-eslint"
  ]
});

Object.assign(cfg.rules, {
  // 该规则不能正确解析export default from语法
  "object-curly-spacing": "off"
}, {
  // ====================================================================
  // eslint TypeScript rules override
  // ====================================================================

  /**
   *  note you must disable the base rule as it can report incorrect errors
   *  统一双引号
   */
  quotes: "off",
  "@typescript-eslint/quotes": ["error"],

  /**
   * note you must disable the base rule as it can report incorrect errors
   * eslint分号规则对于处理`export default interface`会报错
   * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/semi.md
   */
  semi: "off",
  "@typescript-eslint/semi": ["error", "always"],

  /**
   * note you must disable the base rule as it can report incorrect errors
   * 注意泛型符号`<>`保持和函数名、类名、接口名、类型别名一边，而不要靠近函数括号、类/接口/类型别名大括号一边
   * function request<R = Response> (opts: RequestOptions) {
   *   // codes
   * }
   * interface Param<T> {
   *   [param: string]: T;
   * }
   * type Param<T> = {
   *   [param: string]: T;
   * };
   *
   * 注意改规则不会处理带泛型的函数类型
   * export type request = <R = Response>(opts: RequestOptions) => Promise<R>;
   */
  "space-before-function-paren": "off",
  "@typescript-eslint/space-before-function-paren": "error",

  /**
   * adds support for trailing comma in a types parameters list.
   */
  "comma-spacing": "off",
  "@typescript-eslint/comma-spacing": [
    "error",
    {
      before: false,
      after: true
    }
  ],

  "keyword-spacing": "off",
  "@typescript-eslint/keyword-spacing": ["error"],
  "func-call-spacing": "off",
  "@typescript-eslint/func-call-spacing": ["error"],

  /**
   * support ts enums, generics, tuples
   */
  "comma-dangle": "off",
  "@typescript-eslint/comma-dangle": ["error"],

  /**
   * support for enum, interface, namespace and module declarations
   */
  "brace-style": "off",
  "@typescript-eslint/brace-style": [
    "error",
    "1tbs",
    {
      allowSingleLine: true
    }
  ],

  /**
   * note you must disable the base rule as it can report incorrect errors
   * parameter properties in constructor functions will trigger eslint no-empty-function invalid
   */
  "no-empty-function": "off",
  "@typescript-eslint/no-empty-function": ["error"],
  /**
   * adds support for type-only import and export
   */
  "no-duplicate-imports": "off",
  "@typescript-eslint/no-duplicate-imports": ["error"],
  "no-useless-constructor": "off",
  "@typescript-eslint/no-useless-constructor": ["error"],

  // ====================================================================
  // eslint TypeScript only rules
  // ====================================================================

  /**
   * 类型标记一致空格
   * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/type-annotation-spacing.md
   * colon default: with space after, but not before
   * arrow default: with spaces before and after the fat arrow
   * const foo: string = "hello world";
   * type Foo = (name: string) => string;
   */
  "@typescript-eslint/type-annotation-spacing": ["error"],

  /**
   * 统一接口/类型字面值分隔符风格为分号，保持跟其它高级语言一致的形式
   * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/member-delimiter-style.md
   */
  "@typescript-eslint/member-delimiter-style": [
    "error",
    {
      /**
       * 统一单行形式最后一个成员一致分号，默认是不需要分号
       * `export type ObjectParam = { [key: string]: Any; };`
       */
      singleline: {
        requireLast: true
      }
    }
  ],

  /**
   * 非必要条件检查
   * Arguments to the &&, || and ?: (ternary) operators
   * Conditions for if, for, while, and do-while statements
   * Base values of optional chain expressions
   * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unnecessary-condition.md
   * function foo (arg: "bar" | "baz") {
   *   // arg is never nullable or empty string, so this is unnecessary
   *   if (arg) {
   *
   *   }
   * }
   */
  // requires type information
  // "@typescript-eslint/no-unnecessary-condition": ["error"],

  /**
   * 统一类型断言`as`风格
   * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-type-assertions.md
   */
  "@typescript-eslint/consistent-type-assertions": ["error"]

  /**
   * 模块导出边界需要显示指定类型，主要针对导出`函数`、`类`，不要去依赖类型推断
   * 该规则属于推荐规则，默认警告提示，比如`warning  Missing return type on function  @typescript-eslint/explicit-module-boundary-types`
   * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-module-boundary-types.md
   */
  // "@typescript-eslint/explicit-module-boundary-types": ["error"],
});

module.exports = cfg;