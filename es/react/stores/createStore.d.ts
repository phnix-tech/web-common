import { Reducer, Store, Action, AnyAction } from "redux";
import { Any } from "../../types";
/**
 * redux store factory
 * @param reducer
 * @param initState
 */
export default function <S = Any, A extends Action = AnyAction>(reducer: Reducer<S, A>, initState?: S): Store<S, A>;
