"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_redux_1 = require("react-redux");
/**
 * wrap component with redux store support
 * @template P - the returned FC component props type
 * @template S - redux store state type
 * @template A - dispatch actions type
 * @template C - redux context type
 * @param Component - source component
 * @param props - wrap options
 */
exports.default = (function (Component, props) {
    var createStore = props.createStore, context = props.context;
    return function (props) {
        // 防止函数组件多次创建store
        var store = react_1.useRef(createStore());
        // store.current类型保护
        if (store.current === null) {
            return null;
        }
        react_1.useEffect(function () {
            return function () {
                store.current = null;
            };
        }, []);
        var ctx = context;
        return (react_1.default.createElement(react_redux_1.Provider, { store: store.current, context: ctx },
            react_1.default.createElement(Component, __assign({}, props))));
    };
});
