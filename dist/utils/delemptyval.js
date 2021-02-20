(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * 过滤空（字符串）值， empty string, undefined, null
     * 主要用于处理后端没有把空字符串当做查询全部结果的情况
     */
    function default_1(obj) {
        if (!obj) {
            return {};
        }
        Object.keys(obj).forEach(function (key) {
            var val = obj[key];
            if (val === "" ||
                val === undefined ||
                val === null) {
                delete obj[key];
            }
        });
        return obj;
    }
    exports.default = default_1;
});
