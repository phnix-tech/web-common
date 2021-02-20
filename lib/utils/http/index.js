"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = http;
