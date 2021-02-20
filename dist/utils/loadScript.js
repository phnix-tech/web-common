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
    function isScriptExisted(src) {
        var isExisted = false;
        var scripts = document.querySelectorAll("script");
        for (var i = 0; i < scripts.length; i++) {
            var script = scripts[i];
            if (script.getAttribute("src") === src) {
                isExisted = true;
                break;
            }
        }
        return isExisted;
    }
    /**
     * 动态加载JS脚本
     * @param src
     * @returns Promise<*>
     */
    function loadScript(src) {
        if (isScriptExisted(src)) {
            return new Promise(function (resolve) {
                resolve(undefined);
            });
        }
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = src;
        return new Promise(function (resolve, reject) {
            script.onload = function () {
                resolve(undefined);
            };
            script.onerror = function (e) {
                reject(e);
            };
            document.body.appendChild(script);
        });
    }
    exports.default = loadScript;
});
