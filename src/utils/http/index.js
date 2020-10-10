/**
 * 外部需要先设置HttpRequest后才可正常调用接口
 * @type {Function}
 */
let HttpRequest;

/**
 *
 * @param {object|string} opts - request options
 * get方法只传递单个字符串参数则当做url参数处理
 * {'get'|'post'|'put'|'delete'} method - http request method, default get method
 * {string} url - request url
 * {object} data - request parameter or payload
 * {boolean} msg 2xx状态下是否提示后端返回msg，默认值false
 * {boolean} errmsg 非2xx状态下是否自动提示后端错误消息，默认值true
 * {boolean} resp 是否返回response
 * 注意：由于promise resolve只能传递一个参数，请用数组解构接受多个参数[resp.data, resp]
 * {number} timeout 请求超时时间, 默认10s
 * @return {Promise<*>}
 */
function request (opts = {}) {
  const url = opts;
  if (typeof opts === "string") {
    opts = {url};
  }
  if (!HttpRequest) {
    throw new TypeError("HttpRequest must be set before send request");
  }
  return new HttpRequest(opts);
}

function handleDefaultMethod (opts, method) {
  const url = opts;
  if (typeof url === "string") {
    opts = {url};
  }

  opts = {
    ...opts,
    method
  };
  return request(opts);
}

function post (opts = {}) {
  return handleDefaultMethod(opts, "post");
}

function put (opts = {}) {
  return handleDefaultMethod(opts, "put");
}

function deleteMethod (opts = {}) {
  return handleDefaultMethod(opts, "delete");
}

export default {
  get HttpRequest () {
    return HttpRequest;
  },
  set HttpRequest (val) {
    HttpRequest = val;
  },

  request,

  get: request,

  post,

  put,

  /**
   * delete 为关键字，所以不能单独定义函数
   * @returns {Promise<*>}
   */
  delete: deleteMethod
};
