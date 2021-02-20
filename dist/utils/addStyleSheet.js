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
    function isStyleSheetExisted(href) {
        var isExisted = false;
        var styleSheets = document.querySelectorAll("link");
        for (var i = 0; i < styleSheets.length; i++) {
            var styleSheet = styleSheets[i];
            if (styleSheet.getAttribute("href") === href) {
                isExisted = true;
                break;
            }
        }
        return isExisted;
    }
    /**
     * 动态加载样式文件
     * @param href
     */
    function addStyleSheet(href) {
        if (isStyleSheetExisted(href)) {
            return;
        }
        var link = document.createElement("link");
        var head = document.querySelector("head");
        var styleSheets = head.querySelectorAll("link");
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = href;
        var nextSibling;
        if (styleSheets.length <= 0 ||
            !(nextSibling = styleSheets[styleSheets.length - 1].nextSibling)) {
            head.appendChild(link);
            return;
        }
        // append after last link stylesheet
        head.insertBefore(link, nextSibling);
    }
    exports.default = addStyleSheet;
});
