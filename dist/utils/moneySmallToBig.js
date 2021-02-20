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
     *
     * 数字金额大写转换(可以处理整数, 小数, 负数)
     * @param n
     * @returns
     * @see https://www.cnblogs.com/stsinghua/p/6419427.html
     */
    function default_1(n) {
        var fraction = ["角", "分"], digit = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"], unit = [["元", "万", "亿"], ["", "拾", "佰", "仟"]], head = n < 0 ? "欠" : "";
        n = Math.abs(n);
        var s = "";
        for (var i = 0; i < fraction.length; i++) {
            s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] +
                fraction[i]).replace(/零./, "");
        }
        s = s || "整";
        n = Math.floor(n);
        for (var i = 0; i < unit[0].length && n > 0; i++) {
            var p = "";
            for (var j = 0; j < unit[1].length && n > 0; j++) {
                p = digit[n % 10] + unit[1][j] + p;
                n = Math.floor(n / 10);
            }
            s = p.replace(/(零.)*零$/, "")
                .replace(/^$/, "零") +
                unit[0][i] + s;
        }
        return head + s.replace(/(零.)*零元/, "元")
            .replace(/(零.)+/g, "零")
            .replace(/^整$/, "零元整");
    }
    exports.default = default_1;
});
