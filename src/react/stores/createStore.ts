import {
  createStore as _createStore, applyMiddleware,
  Reducer, Store, Action, AnyAction
} from "redux";
import getStateMiddleware from "./getStateMiddleware";
import {State} from "./index";
import {Any} from "../../types";

/**
 * redux store factory with async action middleware
 * @param reducer
 * @param initState
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