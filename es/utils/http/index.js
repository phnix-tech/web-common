import { __assign } from "tslib";
/**
 * 外部需要先设置`createHttpRequest`后才可正常调用接口
 */
var createHttpRequest;
function request(opts) {
    var url = opts;
    if (typeof url === "string") {
        opts = { url: url };
    }
    if (!createHttpRequest) {
        throw new TypeError("createHttpRequest must be set before send request");
    }
    return createHttpRequest(opts);
}
function handleDefaultMethod(opts, method) {
    var url = opts;
    if (typeof url === "string") {
        opts = { url: url };
    }
    opts = opts;
    opts = __assign(__assign({}, opts), { method: method });
    return request(opts);
}
function post(opts) {
    return handleDefaultMethod(opts, "post");
}
function put(opts) {
    return handleDefaultMethod(opts, "put");
}
function deleteMethod(opts) {
    return handleDefaultMethod(opts, "delete");
}
var http = {
    get createHttpRequest() {
        return createHttpRequest;
    },
    set createHttpRequest(val) {
        createHttpRequest = val;
    },
    request: request,
    get: request,
    post: post,
    put: put,
    /**
     * delete 为关键字，所以不能单独定义函数
     */
    delete: deleteMethod
};
export default http;
