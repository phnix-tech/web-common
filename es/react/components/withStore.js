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
import React, { useEffect, useRef } from "react";
import { Provider } from "react-redux";
/**
 * wrap component with redux store support
 * @template P - the returned FC component props type
 * @template S - redux store state type
 * @template A - dispatch actions type
 * @template C - redux context type
 * @param Component - source component
 * @param props - wrap options
 */
export default (function (Component, props) {
    var createStore = props.createStore, context = props.context;
    return function (props) {
        // 防止函数组件多次创建store
        var store = useRef(createStore());
        // store.current类型保护
        if (store.current === null) {
            return null;
        }
        useEffect(function () {
            return function () {
                store.current = null;
            };
        }, []);
        var ctx = context;
        return (React.createElement(Provider, { store: store.current, context: ctx },
            React.createElement(Component, __assign({}, props))));
    };
});
