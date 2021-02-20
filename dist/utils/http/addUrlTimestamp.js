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
    function isAry(obj) {
        return Object.prototype.toString.call(obj) === "[object Array]";
    }
    /**
     * add timestamp to url (GET method only) for disable cache
     * @param {string} url
     * @returns {string}
     */
    function default_1(url) {
        if (url === void 0) { url = ""; }
        var segments = url.split("?")
            .filter(function (segment) { return segment.trim() !== ""; }), kvObj = {};
        if (segments.length > 1) {
            var search_1 = segments[1], kv = search_1.split("&");
            kv.forEach(function (str) {
                var equalIdx = str.indexOf("=");
                if (equalIdx === -1) {
                    kvObj[str] = undefined;
                    return;
                }
                var key = str.substring(0, equalIdx), value = decodeURIComponent((equalIdx + 1 <= str.length - 1) ?
                    str.substring(equalIdx + 1) : "");
                if (!kvObj.hasOwnProperty(key)) {
                    kvObj[key] = value;
                }
                else {
                    // 数组值
                    var existVal = kvObj[key];
                    if (!isAry(existVal)) {
                        existVal = [existVal];
                    }
                    existVal.push(value);
                    kvObj[key] = existVal;
                }
            });
        }
        var search = "?";
        search += Object.keys(kvObj).map(function (key) {
            var str;
            var value = kvObj[key];
            if (isAry(value)) {
                str = value.map(function (v) { return v !== undefined ? key + "=" + v : key; }).join("&");
            }
            else if (value === undefined) {
                // absent value, e.g. ?foo&foo1=test
                str = key;
            }
            else {
                str = key + "=" + value;
            }
            return str;
        }).join("&");
        if (search !== "?") {
            search += "&";
        }
        search += ("_=" + Date.now());
        url = segments[0] + search;
        return url;
    }
    exports.default = default_1;
});
