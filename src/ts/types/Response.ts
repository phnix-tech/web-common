/**
 * http response interface definition
 */

import {Any} from "./index";

/**
 * page list response `Page` data
 */
export interface Page {
  total: number;
  page: number;
  pageSize: number;
}

export type ObjectResponse<T = {
  [key: string]: Any;
}> = T;

export type ArrayResponse<T = Any> = T[];

export interface PageResponse<T = Any> {
  body: T;
  page?: Page;
}

export type RawResponse<T = Any> = T;

type Response = ObjectResponse | ArrayResponse | PageResponse;

export default Response;