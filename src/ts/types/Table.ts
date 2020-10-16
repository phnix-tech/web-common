// Table components interface definition

import {Any} from "./index";

/**
 * table data source record
 */
export type Record<T = {
  [key: string]: Any;
}> = T;

export interface PageParams {
  page: number;
  pageSize: number;
}

/**
 * vue component table api
 */
export default interface Table {
  pageLists <T = Any>(...rest: Any[]): Promise<T>;

  selectedData <T = Any>(): T[];

  getData <T = Any>(): T[];

  handlePageChg (currentPage: number): this;
}

/**
 * 由于Table中覆盖内置`Record`，这里复制内置实现(lib.es5.d.ts)用于内部使用
 * Construct a type with a set of properties K of type T
 */
type BuildInRecord<K extends keyof Any, T> = {
  [P in K]: T;
};

/**
 * react component table api
 */
export interface RTable {
  search: <T = Any>(...rest: Any[]) => Promise<T>;
  /**
   * 搜索条件搜索重置页码第一页，不然UI和实际搜索条件不一致导致搜索结果显示有误
   */
  resetPageSearch: <T = Any>(...rest: Any[]) => Promise<T>;
  /**
   *
   * @param state - optional reset state while reload data
   */
  reset: <T = Any, S = BuildInRecord<string, unknown>>(state?: S) => Promise<T>;
}