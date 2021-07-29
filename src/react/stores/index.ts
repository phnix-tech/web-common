import type React from "react";
import type {Action, AnyAction, Dispatch, MiddlewareAPI, PreloadedState, Store} from "redux";
import type {Any, EmptyObject} from "../../types";

export type State<S = Record<string, Any>> = PreloadedState<S>;

export type MiddlewareDispatch<
  D extends Dispatch = Dispatch,
  S = Any
> = ({dispatch, getState}: MiddlewareAPI<D, S>) => Any;

export type GetStateMiddlewareDispatch<
  D extends Dispatch = Dispatch,
  S = Any
> = (action: MiddlewareDispatch<D, S>) => Any;

export type MixedDispatch<
  A extends Action = AnyAction,
  D extends Dispatch = Dispatch,
  S = Any
> =
  | Dispatch<A>
  | GetStateMiddlewareDispatch<D, S>;

export type Context<C> = React.Context<C>;

export type CreateStore<S, A extends Action = AnyAction> = () => Store<S, A>;

/**
 * withStore components wrapper
 * @template P - the returned FC component props type
 * @param Component - source component
 */
export type WithStore = <P extends EmptyObject>(Component: React.ComponentType<Any>) => React.FunctionComponent<P>;

export type MapStateToProps<S> = (state: S) => S;

export type MapDispatchToProps<D> = (dispatch: MixedDispatch) => D;

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