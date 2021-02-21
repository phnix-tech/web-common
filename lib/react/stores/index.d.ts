import React from "react";
import { Action, AnyAction, Dispatch, MiddlewareAPI, PreloadedState, Store } from "redux";
import { Any, EmptyObject } from "../../types";
export declare type State<S = Record<string, Any>> = PreloadedState<S>;
export declare type MiddlewareDispatch<D extends Dispatch = Dispatch, S = Any> = ({ dispatch, getState }: MiddlewareAPI<D, S>) => Any;
export declare type GetStateMiddlewareDispatch<D extends Dispatch = Dispatch, S = Any> = (action: MiddlewareDispatch<D, S>) => Any;
export declare type MixedDispatch<A extends Action = AnyAction, D extends Dispatch = Dispatch, S = Any> = Dispatch<A> | GetStateMiddlewareDispatch<D, S>;
export declare type Context<C> = React.Context<C>;
export declare type CreateStore<S, A extends Action = AnyAction> = () => Store<S, A>;
/**
 * withStore components wrapper
 * @template P - the returned FC component props type
 * @param Component - source component
 */
export declare type WithStore = <P extends EmptyObject>(Component: React.ComponentType<Any>) => React.FunctionComponent<P>;
export declare type MapStateToProps<S> = (state: S) => S;
export declare type MapDispatchToProps<D> = (dispatch: MixedDispatch) => D;
/**
 * @template C - redux context
 * @template S - redux store state
 * @template D - mapDispatchToProps interface
 * @template A - dispatch actions
 */
export interface IStore<C, S, D, A extends Action = AnyAction> {
    context: Context<C>;
    createStore: CreateStore<S, A>;
    withStore: WithStore;
    mapStateToProps: MapStateToProps<S>;
    mapDispatchToProps: MapDispatchToProps<D>;
}
