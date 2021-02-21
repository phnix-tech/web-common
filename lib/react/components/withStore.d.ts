import React from "react";
import { Action, AnyAction, Store } from "redux";
import { Any, EmptyObject } from "../../types";
interface IProps<S = Any, A extends Action = AnyAction, C = null> {
    createStore: () => Store<S, A>;
    context?: React.Context<C>;
}
declare const _default: <P extends EmptyObject, S = any, A extends Action<any> = AnyAction, C = null>(Component: React.ComponentType<Any>, props: IProps<S, A, C>) => React.FunctionComponent<P>;
/**
 * wrap component with redux store support
 * @template P - the returned FC component props type
 * @template S - redux store state type
 * @template A - dispatch actions type
 * @template C - redux context type
 * @param Component - source component
 * @param props - wrap options
 */
export default _default;
