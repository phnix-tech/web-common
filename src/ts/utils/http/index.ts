import http, {
  RequestOptions,
  Options,
  createHttpRequest as createHttpRequestType
} from "@/types/http";

/**
 * 外部需要先设置`createHttpRequest`后才可正常调用接口
 */
let createHttpRequest: createHttpRequestType;

function request (opts: RequestOptions) {
  const url = opts;
  if (typeof url === "string") {
    opts = {url};
  }
  return createHttpRequest(opts as Options);
}

function post (opts: RequestOptions) {
  const url = opts;
  if (typeof url === "string") {
    opts = {url};
  }

  opts = opts as Options;
  opts = {
    method: "post",
    ...opts
  };
  return createHttpRequest(opts);
}

function put (opts: RequestOptions) {
  const url = opts;
  if (typeof url === "string") {
    opts = {url};
  }

  opts = opts as Options;
  opts = {
    method: "put",
    ...opts
  };
  return createHttpRequest(opts);
}

const http: http = {
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
  delete (opts: RequestOptions) {
    const url = opts;
    if (typeof url === "string") {
      opts = {url};
    }

    opts = opts as Options;
    opts = {
      method: "delete",
      ...opts
    };
    return createHttpRequest(opts);
  }
};

export default http;