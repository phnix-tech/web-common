var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "redux", "./getStateMiddleware"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var redux_1 = require("redux");
    var getStateMiddleware_1 = __importDefault(require("./getStateMiddleware"));
    /**
     * redux store factory
     * @param reducer
     * @param initState
     */
    function default_1(reducer, initState) {
        // 可以这样断言吗？
        var s = initState;
        return redux_1.createStore(reducer, s, redux_1.applyMiddleware(getStateMiddleware_1.default));
    }
    exports.default = default_1;
});
