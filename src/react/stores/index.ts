import {Dispatch, MiddlewareAPI, PreloadedState} from "redux";
import {Any} from "../../ts/types";

export type State<S = Record<string, Any>> = PreloadedState<S>;

export type MiddlewareDispatch = ({dispatch, getState}: MiddlewareAPI) => Any;
export type GetStateMiddlewareDispatch = (action: MiddlewareDispatch) => Any;
export type MixedDispatch = Dispatch | GetStateMiddlewareDispatch;