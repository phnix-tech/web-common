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

/**
 * request options
 */
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
   * `Promise<[R, RawData, RawResponse]>`
   */
  resp?: boolean;
  /**
   * 请求超时时间, 默认10s
   */
  timeout?: number;
  /**
   * loading功能标识符，loading功能表示在网络请求前显示`加载中...`或者`转圈圈`等实现方具体定义的效果，请求完毕隐藏loading。  
   * 默认`false`或者`undefined`表示无loading功能，如果传递`true`实现方需要实现loading功能，
   * 比如在小程序中调用`wx.showLoading` - https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showLoading.html 在element ui中调用`Loading.service(options)` - https://element.eleme.cn/#/zh-CN/component/loading#fu-wu 实现加载中功能。
   */
  loading?: boolean;
  /**
   * 请求头
   */
  headers?: Record<string, string>;
}

/**
 * request options  
 * 如果传递单个字符串参数则当做url参数处理
 */
export type RequestOptions = string | Options;

/**
 * @template R Type of response，默认为通用响应类型，建议实现方内部处理好接口数据后将真实data数据resolve到外部，外部在调用api接口时可传递对应data类型泛型推断出相应数据类型。
 * @param opts Request options
 * @returns Reponse Promise
 */
export type Request = <R = Response>(opts: RequestOptions) => Promise<R>;

/**
 * @template R Type of response，默认为通用响应类型，建议实现方内部处理好接口数据后将真实data数据resolve到外部，外部在调用api接口时可传递对应data类型泛型推断出相应数据类型。
 * @param opts Request options
 * @returns Reponse Promise
 */
export type CreateHttpRequest = <R = Response>(opts: Options) => Promise<R>;

/**
 * @deprecated, use `Request` instead
 */
export type request = Request;

/**
 * @deprecated, use `CreateHttpRequest` instead
 */
export type createHttpRequest = CreateHttpRequest;

/**
 * 通用http接口定义，具体实现参考`../../utils/http`
 */
export default interface Http {
  createHttpRequest: CreateHttpRequest;
  request: Request;
  get: Request;
  post: Request;
  put: Request;
  delete: Request;
}