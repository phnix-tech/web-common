import {createStore, applyMiddleware, Reducer, Store, Action, AnyAction} from "redux";
import getStateMiddleware from "./getStateMiddleware";
import {State} from "./index";
import {Any} from "../../ts/types";

/**
 * redux store factory
 * @param reducer
 * @param initState
 */
export default function <S = Any, A extends Action = AnyAction>(
  reducer: Reducer<S, A>,
  initState?: S
): Store<S, A> {
  // 可以这样断言吗？
  const s = initState as State<S>;
  return createStore(reducer, s, applyMiddleware(getStateMiddleware));
}