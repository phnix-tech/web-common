import Http, {
  RequestOptions,
  Options,
  CreateHttpRequest
} from "../../types/http";
import Response from "../../types/http/Response";

/**
 * 外部需要先设置`createHttpRequest`后才可正常调用接口
 */
let createHttpRequest: CreateHttpRequest;

function isOptions (opts: RequestOptions): opts is Options {
  return Object.prototype.toString.call(opts) === "[object Object]";
}

function request<R = Response> (opts: RequestOptions) {
  if (!createHttpRequest) {
    throw new TypeError("createHttpRequest must be set before send request");
  }

  const url = opts;
  if (typeof url === "string") {
    opts = {url};
  }

  if (isOptions(opts)) {
    opts.method = opts.method || "get";
  }

  return createHttpRequest<R>(opts as Options);
}

function handleDefaultMethod<R = Response> (opts: RequestOptions, method: Options["method"]) {
  const url = opts;
  if (typeof url === "string") {
    opts = {url};
  }

  if (isOptions(opts)) {
    opts = {
      ...opts,
      method
    };
  }

  return request<R>(opts);
}

function post<R = Response> (opts: RequestOptions) {
  return handleDefaultMethod<R>(opts, "post");
}

function put<R = Response> (opts: RequestOptions) {
  return handleDefaultMethod<R>(opts, "put");
}

function deleteMethod<R = Response> (opts: RequestOptions) {
  return handleDefaultMethod<R>(opts, "delete");
}

/**
 * 通用http接口实现，注：外部需要实现`createHttpRequest`方法后才可正常调用接口
 */
const http: Http = {
  get createHttpRequest () {
    return createHttpRequest;
  },
  set createHttpRequest (val) {
    createHttpRequest = val;
  },

  request,

  get: request,

  post,

  put,

  /**
   * delete 为关键字，所以不能单独定义函数
   */
  delete: deleteMethod
};

export default http;