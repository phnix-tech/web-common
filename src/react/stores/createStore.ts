import {createStore, applyMiddleware, Reducer, Store} from "redux";
import getStateMiddleware from "./getStateMiddleware";
import {State} from "./index";

/**
 * redux store factory
 * @param reducer
 * @param initState
 */
export default function (
  reducer: Reducer,
  initState: State | undefined = undefined
): Store {
  return createStore(reducer, initState, applyMiddleware(getStateMiddleware));
}