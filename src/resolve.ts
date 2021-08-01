import path from "path";
import type {Any} from "./types";

interface Resolve {
  /**
   * 基于项目根路径解析相对路径.
   *
   * @param dirPath 项目根下面的子目录路径.
   * @returns 返回基于项目根路径的绝对路径.
   */
  (...dirPath: string[]): string;
  /**
   * 基于项目根`node_modules`解析模块路径.
   *
   * @param modulePath module path.
   * @returns 模块绝对路径.
   */
  module: (...modulePath: string[]) => string;
  /**
   * `require` alias function.
   * 注意：传递绝对路径模块路径，相对路径会相对于`resolve`文件所在路径，可能跟预期不一样.
   * 可以使用`require.resolve`解析相对路径为绝对路径.
   *
   * @template T Type of module to be required.
   * @param modulePath module path.
   * @returns 模块绝对路径.
   */
  require: <T = Any>(modulePath: string) => T;
  /**
   * 项目根路径，通常为`package.json`所在目录，默认`process.cwd`，
   * 外部可以主动设置项目根路径，可以用于npm link本地开发.
   */
  projectRoot?: string;
}

/**
 * git子模块引用：假设当前路径为`src/common/build`,
 * npm包引用：假设当前位置
 * `node_modules/@web-io/build/lib/scripts`或
 * `node_modules/@web-io/common/lib/build`.
 */
const projectRoot = process.cwd();

/**
 * 基于项目根路径解析相对路径.
 *
 * @param dirPath 项目根下面的子目录路径.
 * @returns 返回基于项目根路径的绝对路径.
 */
const resolve: Resolve = function (...dirPath: string[]) {
  const basePath = resolve.projectRoot || projectRoot;
  return path.resolve(basePath, ...dirPath);
};

/**
 * 基于项目根`node_modules`解析模块路径.
 *
 * @param modulePath module path.
 * @returns 模块绝对路径.
 */
resolve.module = function (...modulePath: string[]) {
  return resolve("node_modules", ...modulePath);
};

/**
 * `require` alias function.
 * 注意：传递绝对路径模块路径，相对路径会相对于`resolve`文件所在路径，可能跟预期不一样.
 * 可以使用`require.resolve`解析相对路径为绝对路径.
 *
 * @template T Type of module to be required.
 * @param modulePath module path.
 * @returns 模块绝对路径.
 */
resolve.require = function <T = Any>(modulePath: string) {
  // error  Require statement not part of import statement  @typescript-eslint/no-var-requires
  // error  A `require()` style import is forbidden         @typescript-eslint/no-require-imports
  // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
  return require(modulePath) as T;
};

/**
 * 项目根路径，通常为`package.json`所在目录，默认`process.cwd`，
 * 外部可以主动设置项目根路径，可以用于npm link本地开发.
 */
resolve.projectRoot = undefined;

export default resolve;

export type {Resolve};