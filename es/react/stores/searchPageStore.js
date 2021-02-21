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
import React from "react";
import createStores from "./createStore";
import withStores from "../components/withStore";
var ActionType;
(function (ActionType) {
    ActionType[ActionType["SET_STATE"] = 0] = "SET_STATE";
    ActionType[ActionType["SEARCH_PARAMS"] = 1] = "SEARCH_PARAMS";
    ActionType[ActionType["RESET"] = 2] = "RESET";
})(ActionType || (ActionType = {}));
/**
 * @template SP - search params generic type
 * @template T - table api generic type
 * @template C - redux store context generic type
 * @param searchParams - initial search params state
 * @param extraState - extra state
 * @param ctx - optional store context
 */
export default function (searchParams, extraState, ctx) {
    if (ctx === void 0) { ctx = null; }
    searchParams = __assign({}, searchParams);
    // @ts-ignore: TS2322: Type '{ table: null; searchParams: SP; }' is not assignable to type 'IState<T, SP, ES>'.
    var INIT_STATE = __assign({ table: null, searchParams: searchParams }, extraState);
    var context = React.createContext(ctx);
    function reducer(state, action) {
        state = state;
        switch (action.type) {
            case ActionType.SET_STATE:
                state = __assign(__assign({}, state), action.value);
                break;
            case ActionType.SEARCH_PARAMS:
                state = __assign(__assign({}, state), { searchParams: __assign(__assign({}, state.searchParams), action.value) });
                break;
            case ActionType.RESET:
                state = __assign(__assign({}, state), { searchParams: __assign(__assign({}, INIT_STATE.searchParams), action.value) });
                break;
            default:
                break;
        }
        return state;
    }
    function createStore() {
        return createStores(reducer, INIT_STATE);
    }
    function mapStateToProps(state) {
        return __assign({}, state);
    }
    function mapDispatchToProps(dispatch) {
        return {
            setState: function (state) {
                var dispatchFn = dispatch;
                return dispatchFn({
                    type: ActionType.SET_STATE,
                    value: state
                });
            },
            setSearchParams: function (searchParams) {
                var dispatchFn = dispatch;
                return dispatchFn({
                    type: ActionType.SEARCH_PARAMS,
                    value: searchParams
                });
            },
            getState: function () {
                var dispatchFn = dispatch;
                return dispatchFn(function (_a) {
                    var getState = _a.getState;
                    return getState();
                });
            },
            search: function () {
                var rest = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    rest[_i] = arguments[_i];
                }
                var dispatchFn = dispatch;
                return dispatchFn(function (_a) {
                    var getState = _a.getState;
                    var table = getState().table;
                    if (!table) {
                        return Promise.resolve();
                    }
                    return table.search.apply(table, rest);
                });
            },
            resetPageSearch: function () {
                var rest = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    rest[_i] = arguments[_i];
                }
                var dispatchFn = dispatch;
                return dispatchFn(function (_a) {
                    var getState = _a.getState;
                    var table = getState().table;
                    if (!table) {
                        return Promise.resolve();
                    }
                    return table.resetPageSearch.apply(table, rest);
                });
            },
            reset: function (searchParams) {
                if (searchParams) {
                    var dispatchFn = dispatch;
                    dispatchFn({
                        type: ActionType.RESET,
                        value: searchParams
                    });
                }
                else {
                    var dispatchFn = dispatch;
                    dispatchFn({
                        type: ActionType.RESET
                    });
                }
                var dispatchFn1 = dispatch;
                return dispatchFn1(function (_a) {
                    var getState = _a.getState;
                    var table = getState().table;
                    if (table) {
                        return table.reset(searchParams);
                    }
                    return Promise.resolve();
                });
            }
        };
    }
    function withStore(Component) {
        return withStores(Component, { createStore: createStore, context: context });
    }
    return {
        context: context,
        createStore: createStore,
        withStore: withStore,
        mapStateToProps: mapStateToProps,
        mapDispatchToProps: mapDispatchToProps
    };
}
