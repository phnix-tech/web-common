import Response from "../Response";

export type ObjectParam = {
  // eslint-disable-next-line
  [key: string]: any;
}

// ObjectParam alias
export type ObjectParams = ObjectParam;

// array params or object params
// eslint-disable-next-line
export type Params = any[] | ObjectParam;

export interface Options {
  url: string;
  // request method, default `get`
  method?: "get" | "post" | "put" | "delete";
  // request body data or url params
  data?: Params;
  // 2xx状态下是否提示后端返回msg，默认值false
  msg?: boolean;
  // 非2xx状态下是否自动提示后端错误消息，默认值true
  errmsg?: boolean;
  // 是否返回axios resp.data和resp
  // 注意：由于promise resolve只能传递一个参数，请用数组解构接受多个参数
  resp?: boolean;
  // 请求超时时间, 默认10s
  timeout?: number;
}

// request options
// get方法只传递单个字符串参数则当做url参数处理
export type RequestOptions = string | Options;

export type request = (opts: RequestOptions) => Promise<Response>;

export type createHttpRequest = (opts: Options) => Promise<Response>;

export default interface http {
  createHttpRequest: createHttpRequest;
  request: request;
  get: request;
  post: request;
  put: request;
  delete: request;
}