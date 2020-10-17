import React from "react";
import {Dispatch, MiddlewareAPI, Action, AnyAction} from "redux";
import {Any} from "../../ts/types";
import {RTable} from "../../ts/types/Table";
import {GetStateMiddlewareDispatch, MixedDispatch, IStore} from "./index";
import createStores from "./createStore";

enum ActionType {
  SET_STATE,
  SEARCH_PARAMS,
  RESET
}

interface PageStoreAction<S> extends Action<ActionType> {
  value: S;
}

interface IMapDispatchToProps<S, SP> {
  setState (state: S): PageStoreAction<S>;

  setSearchParams (searchParams: SP): PageStoreAction<SP>;

  /**
   * 同步获取store state
   */
  getState (): S;

  search <P = Any>(...rest: Any[]): Promise<P>;

  resetPageSearch <P = Any>(...rest: Any[]): Promise<P>;

  reset <P = Any>(state?: S): Promise<P>;
}

/**
 * @template C - redux context
 * @template S - redux store state
 * @template SP - search params
 * @template A - dispatch actions
 */
interface ISearchPageStore<C, S, SP, A extends Action = AnyAction> extends IStore<C, S, IMapDispatchToProps<S, SP>, A> {

}

interface IState<T, SP> {
  table: T | null;
  searchParams?: SP;
}

/**
 * @template SP - search params generic type
 * @template T - table api generic type
 * @template C - redux store context generic type
 * @param searchParams - initial search params state
 */
export default function<
  SP = Record<string, unknown>,
  T extends RTable = RTable,
  C = null
> (searchParams?: SP): ISearchPageStore<C, IState<T, SP>, SP, PageStoreAction<IState<T, SP>>> {
  if (searchParams) {
    searchParams = {
      ...searchParams
    };
  }

  const INIT_STATE: IState<T, SP> = {
    table: null,
    searchParams
  };
  const context = React.createContext<C | null>(null);

  function reducer (state: IState<T, SP> | undefined, action: PageStoreAction<IState<T, SP>>) {
    state = state as IState<T, SP>;
    switch (action.type) {
      case ActionType.SET_STATE:
        state = {
          ...state,
          ...action.value
        };
        break;
      case ActionType.SEARCH_PARAMS:
        state = {
          ...state,
          searchParams: {
            ...state.searchParams,
            ...action.value
          } as SP
        };
        break;
      case ActionType.RESET:
        state = {
          ...state,
          searchParams: {
            ...INIT_STATE.searchParams,
            ...action.value
          } as SP
        };
        break;
      default:
        break;
    }
    return state;
  }

  function createStore () {
    return createStores<IState<T, SP>, PageStoreAction<IState<T, SP>>>(reducer, INIT_STATE);
  }

  function mapStateToProps (state: IState<T, SP>) {
    return {
      ...state
    };
  }

  function mapDispatchToProps (dispatch: MixedDispatch): IMapDispatchToProps<IState<T, SP>, SP> {
    return {
      setState (state: IState<T, SP>) {
        const handler: Dispatch<PageStoreAction<IState<T, SP>>> = dispatch as Dispatch;
        return handler({
          type: ActionType.SET_STATE,
          value: state
        });
      },

      setSearchParams (searchParams: SP) {
        const handler: Dispatch<PageStoreAction<SP>> = dispatch as Dispatch;
        return handler({
          type: ActionType.SEARCH_PARAMS,
          value: searchParams
        });
      },

      getState () {
        const handler = dispatch as GetStateMiddlewareDispatch;
        return handler(({getState}: MiddlewareAPI) => {
          return getState;
        });
      },

      search <P = Any>(...rest: Any[]) {
        const handler: GetStateMiddlewareDispatch<Dispatch, IState<T, SP>> = dispatch as GetStateMiddlewareDispatch;
        return handler(({getState}) => {
          const {table} = getState();
          if (!table) {
            return Promise.resolve();
          }
          return table.search<P>(...rest);
        });
      },

      resetPageSearch <P = Any>(...rest: Any[]) {
        const handler: GetStateMiddlewareDispatch<Dispatch, IState<T, SP>> = dispatch as GetStateMiddlewareDispatch;
        return handler(({getState}) => {
          const {table} = getState();
          if (!table) {
            return Promise.resolve();
          }
          return table.resetPageSearch<P>(...rest);
        });
      },

      reset <P = Any>(state?: IState<T, SP>) {
        let handler: Dispatch<PageStoreAction<IState<T, SP>>> | GetStateMiddlewareDispatch<Dispatch, IState<T, SP>>;
        handler = dispatch as Dispatch<PageStoreAction<IState<T, SP>>>;
        if (state) {
          handler({
            type: ActionType.RESET,
            value: state
          });
        }

        handler = dispatch as GetStateMiddlewareDispatch<Dispatch, IState<T, SP>>;
        return handler(({getState}) => {
          const {table} = getState();
          if (table) {
            return table.reset<P, IState<T, SP>>(state);
          }
          return Promise.resolve();
        });
      }
    };
  }

  return {
    context,
    createStore,
    mapStateToProps,
    mapDispatchToProps
  };
}