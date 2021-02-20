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
    // https://gist.github.com/bgrins/6194623
    var regex = /^\s*data:([a-z]+\/[a-z0-9]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,[a-z0-9!$&',()*+;=\-._~:@/?%\s]*\s*$/i;
    /**
     * 检查是否是dataURL协议格式`data:`内容
     * https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
     * @param src
     * @return {boolean}
     */
    function isDataUrl(src) {
        src = src || "";
        return !!src.match(regex);
    }
    exports.default = isDataUrl;
});
