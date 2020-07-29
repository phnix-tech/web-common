/**
 * 外部需要先设置HttpRequest后才可正常调用接口
 * @type {Function}
 */
let HttpRequest;

/**
 *
 * @param {object} opts - request options
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
  return new HttpRequest(opts);
}

function post (opts = {}) {
  opts = {
    method: "post",
    ...opts
  };
  return new HttpRequest(opts);
}

function put (opts = {}) {
  opts = {
    method: "put",
    ...opts
  };
  return new HttpRequest(opts);
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
  delete (opts = {}) {
    opts = {
      method: "delete",
      ...opts
    };
    return new HttpRequest(opts);
  }
};
