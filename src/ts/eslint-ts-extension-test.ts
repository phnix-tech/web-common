// ====================================================================
// eslint typescript extension rules
// ====================================================================

export const x: string[] = ["a", "b"];
export const y: readonly string[] = ["a", "b"];
// export const x1: Array<string> = ["a", "b"];
// export const y1: ReadonlyArray<string> = ["a", "b"];

/**
 * TypeScript 4.0 added support for adding an explicit any or unknown type annotation on a catch clause variable.
 *
 * By default, TypeScript will type a catch clause variable as any
 * so explicitly annotating it as unknown can add a lot of safety to your codebase.
 */
// try {
//   // ...
// } catch (e) {
//   // ...
//   console.log(e);
// }

/**
 * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-literal-enum-member.md
 */
export enum Valid {
  A,
  // A regular string
  B = "TestStr",
  // A number
  C = 4,
  // @ts-ignore: 测试TS枚举值类型，可以为非数字和字符串！？
  D = null, // eslint-disable-line
  // @ts-ignore: 测试TS枚举值类型，可以为非数字和字符串！？
  E = /some_regex/, // eslint-disable-line
  // @ts-ignore: 测试TS枚举值类型，可以为非数字和字符串！？
  F = 2 + 2 // eslint-disable-line
}
// export const str = "Test";
// export enum Invalid {
//   A = str, // Variable assignment
//   B = {}, // Object assignment
//   C = "A template literal string", // Template literal
//   D = new Set(1, 2, 3), // Constructor in assignment
//   E = 2 + 2, // Expression assignment
// }