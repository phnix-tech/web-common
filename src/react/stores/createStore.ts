import {createStore, applyMiddleware, Reducer} from "redux";
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
) {
  return createStore(reducer, initState, applyMiddleware(getStateMiddleware));
}