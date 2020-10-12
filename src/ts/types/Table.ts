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

export default interface Table {
  pageLists (...rest: Any[]): void;

  selectedData (): Any[];

  getData (): Any[];

  handlePageChg (currentPage: number): this;
}