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
     * @param para
     * @return 格式化两位数字
     * */
    function handleDouble(para) {
        return ("" + para).length > 1 ? "" + para : "0" + para;
    }
    /**
     * @param timeStamp eg:1551323702241
     * @param formatter eg:yyyy-MM-dd yyyy/MM/dd yyyy-M-d yyyy/M/d yyyy-MM-dd hh:mm:ss
     * @returns formatted date string
     */
    function timestamp2String(timeStamp, formatter) {
        var date = new Date(timeStamp);
        var obj = {
            "y+": date.getFullYear(),
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds()
        };
        for (var item in obj) {
            var key = item;
            if (new RegExp("(" + key + ")").test(formatter)) {
                formatter = formatter.replace(RegExp.$1, RegExp.$1.length > 1 ? handleDouble(obj[key]) : obj[key].toString());
            }
        }
        return formatter;
    }
    /**
     * @param date eg: new Date(2019, 7, 2, 23, 58, 12), 1551323702241
     * @param formatter eg:yyyy-MM-dd yyyy/MM/dd yyyy-M-d yyyy/M/d yyyy-MM-dd hh:mm:ss
     * @returns formatted date string
     */
    function date2String(date, formatter) {
        var timestamp = date instanceof Date ? date.getTime() : date;
        return timestamp2String(timestamp, formatter);
    }
    exports.default = {
        timestamp2String: timestamp2String,
        date2String: date2String
    };
});