import { createStore, applyMiddleware } from "redux";
import getStateMiddleware from "./getStateMiddleware";
/**
 * redux store factory
 * @param reducer
 * @param initState
 */
export default function (reducer, initState) {
    // 可以这样断言吗？
    var s = initState;
    return createStore(reducer, s, applyMiddleware(getStateMiddleware));
}
