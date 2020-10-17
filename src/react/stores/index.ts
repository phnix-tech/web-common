import React from "react";
import {Action, AnyAction, Dispatch, MiddlewareAPI, PreloadedState, Store} from "redux";
import {Any} from "../../ts/types";

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

/**
 * @template C - redux context
 * @template S - redux store state
 * @template D - mapDispatchToProps interface
 * @template A - dispatch actions
 */
export interface IStore<C, S, D, A extends Action = AnyAction> {
  context: React.Context<C | null>;

  createStore (): Store<S, A>;

  mapStateToProps (state: S): S;

  mapDispatchToProps (dispatch: MixedDispatch): D;
}