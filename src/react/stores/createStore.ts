import type {Reducer, Store, Action, AnyAction} from "redux";
import type {State} from "./index";
import type {Any} from "../../types";
import {createStore as _createStore, applyMiddleware} from "redux";
import getStateMiddleware from "./getStateMiddleware";

/**
 * Redux store factory with async action middleware.
 * 
 * @template S Type of store state.
 * @template A Type of store action, default redux `AnyAction`.
 * @param reducer Redux reducer.
 * @param initState Optional initial state.
 * @returns Redux store.
 */
function createStore<S = Any, A extends Action = AnyAction> (
  reducer: Reducer<S, A>,
  initState?: S
): Store<S, A> {
  // 可以这样断言吗？
  const s = initState as State<S>;
  return _createStore(reducer, s, applyMiddleware(getStateMiddleware));
}

export default createStore;