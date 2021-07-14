// ====================================================================
// http response interface definition
// ====================================================================

import {Any} from "../index";

/**
 * page list response `Page` data  
 * we define a commonly pagination data structure
 */
export interface Page {
  /**
   * total page count
   */
  total: number;
  /**
   * current page number
   */
  page: number;
  /**
   * number of per page
   */
  pageSize: number;
}

/**
 * @template T Type of object response, 默认为任意结构对象类型
 */
export type ObjectResponse<T = {
  [key: string]: Any;
}> = T;

/**
 * @template T Type of array response item, 默认为任意类型数组
 */
export type ArrayResponse<T = Any> = T[];

/**
 * 分页响应
 *
 * @template T 分页响应数据字段类型
 */
export interface PageResponse<T = Any> {
  /**
   * 分页响应数据字段
   */
  body: T;
  /**
   * 分页响应分页字段
   */
  page?: Page;
}

/**
 * http lib raw response, it's lib dependent
 * see `AxiosResponse` - https://github.com/axios/axios#response-schema
 * `jqXHR` Object - https://api.jquery.com/jquery.ajax/
 * `fetch` Response - https://developer.cdn.mozilla.net/en-US/docs/Web/API/Fetch_API
 * 
 * @template T Type of raw response, default any type
 */
export type RawResponse<T = Any> = T;

/**
 * server response raw data, it's commonly defined as json format  
 * `{data: any; msg: string; status: number;}`  
 * `{data: any; message: string; success: boolean;}`
 * 
 * @template T Type of server raw data, default any type
 */
export type RawData<T = Any> = T;

/**
 * http response type
 */
type Response = ObjectResponse | ArrayResponse | PageResponse;

export default Response;