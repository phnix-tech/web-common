// ====================================================================
// eslint typescript recommended rules
// ====================================================================

/**
 * 方法重载签名规整在一起
 * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/adjacent-overload-signatures.md
 */
export type Foo = {
  foo(s: string): void;
  foo(n: number): void;
  foo(sn: string | number): void;
  bar(): void;
};
// export type Foo = {
//   foo(s: string): void;
//   foo(n: number): void;
//   bar(): void;
//   foo(sn: string | number): void;
// };

/**
 * Disallows awaiting a value that is not a Thenable (await-thenable)
 * 需要类型信息，默认没有起效!?
 */
export async function thenable (): Promise<void> {
  const createValue = () => "value";
  await createValue();
}

/*
// @ts-ignore: ban-ts-comment测试
if (false) { // eslint-disable-line
             // @ts-ignore: Unreachable code error
  console.log("hello");
}*/

/**
 * // @typescript-eslint/no-inferrable-types
 * This rule disallows explicit type declarations on parameters
 * variables and properties where the type can be easily inferred from its value.
 * 针对如果可以通过值推导变量类型的情况下禁用显示指定类型
 */
export const FOO = "hello world";
// Type string trivially inferred from a string literal, remove type annotation  @typescript-eslint/no-inferrable-types
// export const FOO1: string = "hello world";