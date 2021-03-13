import { Any } from "../index";
/**
 * page list response `Page` data
 */
export interface Page {
    total: number;
    page: number;
    pageSize: number;
}
export declare type ObjectResponse<T = {
    [key: string]: Any;
}> = T;
export declare type ArrayResponse<T = Any> = T[];
export interface PageResponse<T = Any> {
    body: T;
    page?: Page;
}
/**
 * http lib raw response, it's lib dependent
 * see `AxiosResponse` - https://github.com/axios/axios#response-schema
 * `jqXHR` Object - https://api.jquery.com/jquery.ajax/
 * `fetch` Response - https://developer.cdn.mozilla.net/en-US/docs/Web/API/Fetch_API
 */
export declare type RawResponse<T = Any> = T;
/**
 * server response raw data, it's commonly defined as json format
 * `{data: any; msg: string; status: number;}`
 * `{data: any; message: string; success: boolean;}`
 */
export declare type RawData<T = Any> = T;
declare type Response = ObjectResponse | ArrayResponse | PageResponse;
export default Response;
