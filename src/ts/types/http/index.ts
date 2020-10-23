import {Any} from "../index";
import Response from "./Response";

/**
 * object params
 */
export type ObjectParams = {
  [key: string]: Any;
};

/**
 * `ObjectParams` alias
 */
export type ObjectParam = ObjectParams;

/**
 * array params or object params
 */
export type Params = Any[] | ObjectParams;

export interface Options {
  /**
   * request url
   */
  url: string;
  /**
   * request method, default `get`
   */
  method?: "get" | "post" | "put" | "delete";
  /**
   * request body data or url params
   */
  data?: Params;
  /**
   * 2xx状态下是否提示后端返回msg，默认`false`
   */
  msg?: boolean;
  /**
   * 非2xx状态下是否自动提示后端错误消息，默认`true`
   */
  errmsg?: boolean;
  /**
   * 是否返回raw response，比如axios response.data和response
   * 注意：由于promise resolve只能传递一个参数，请用数组解构接受多个参数
   * Promise<[R, RawData, RawResponse]>
   */
  resp?: boolean;
  /**
   * 请求超时时间, 默认10s
   */
  timeout?: number;
}

/**
 * request options
 * 如果传递单个字符串参数则当做url参数处理
 */
export type RequestOptions = string | Options;

export type request = <R = Response>(opts: RequestOptions) => Promise<R>;

export type createHttpRequest = <R = Response>(opts: Options) => Promise<R>;

export default interface http {
  createHttpRequest: createHttpRequest;
  request: request;
  get: request;
  post: request;
  put: request;
  delete: request;
}