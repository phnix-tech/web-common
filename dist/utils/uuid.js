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
     * @param prefix
     * @returns uuid string
     * @desc get uuid, borrowed from `gs-common/fe/Functions@uuid`
     */
    function uuid(prefix) {
        prefix = prefix || "";
        var d = new Date().getTime();
        var str = prefix + "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
        return (str.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
        }));
    }
    exports.default = uuid;
});
