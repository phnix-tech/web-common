import httpInterface, {
  RequestOptions,
  Options,
  createHttpRequest as createHttpRequestType
} from "../../types/http";

/**
 * 外部需要先设置`createHttpRequest`后才可正常调用接口
 */
let createHttpRequest: createHttpRequestType;

function request (opts: RequestOptions) {
  const url = opts;
  if (typeof url === "string") {
    opts = {url};
  }
  if (!createHttpRequest) {
    throw new TypeError("createHttpRequest must be set before send request");
  }
  return createHttpRequest(opts as Options);
}

function handleDefaultMethod (opts: RequestOptions, method: Options["method"]) {
  const url = opts;
  if (typeof url === "string") {
    opts = {url};
  }

  opts = opts as Options;
  opts = {
    ...opts,
    method
  };
  return request(opts);
}

function post (opts: RequestOptions) {
  return handleDefaultMethod(opts, "post");
}

function put (opts: RequestOptions) {
  return handleDefaultMethod(opts, "put");
}

function deleteMethod (opts: RequestOptions) {
  return handleDefaultMethod(opts, "delete");
}

const http: httpInterface = {
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