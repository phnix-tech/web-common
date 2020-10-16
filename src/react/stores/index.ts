import {Action, AnyAction, Dispatch, MiddlewareAPI, PreloadedState} from "redux";
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