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