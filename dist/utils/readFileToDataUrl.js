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
     * read blob file to base64 formatted string
     * @param file - blob file
     * @returns Promise<string|Error>
     */
    function readFileToDataUrl(file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise(function (resolve, reject) {
            reader.onload = function (e) {
                var _a;
                var base64DataURL = ((_a = e.target) === null || _a === void 0 ? void 0 : _a.result) || "";
                resolve(base64DataURL);
            };
            reader.onerror = reject;
        });
    }
    exports.default = readFileToDataUrl;
});