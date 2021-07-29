import type {Dispatch, MiddlewareAPI, Action, AnyAction} from "redux";
import type {Any, EmptyObject} from "../../types";
import type {ITable} from "../../types/Table";
import type {GetStateMiddlewareDispatch, MixedDispatch, IStore} from "./index";
import React from "react";
import createStores from "./createStore";
import withStores from "../components/withStore";

enum ActionType {
  SET_STATE,
  SEARCH_PARAMS,
  RESET
}

/**
 * @template S Type of store state.
 */
interface PageStoreAction<S> extends Action<ActionType> {
  value: Partial<S>;
}

/**
 * @template S Type of store state.
 * @template SP Type of search params.
 */
interface IMapDispatchToProps<S, SP> {
  setState (state: Partial<S>): PageStoreAction<S>;

  setSearchParams (searchParams: Partial<SP>): PageStoreAction<SP>;

  /**
   * 同步获取store state
   */
  getState (): S;

  /**
   * fix IntelliJ IDEA warning `Promise returned from xxx is ignored`
   * @param rest
   */
  search (...rest: Any[]): void;
  search <P = Any>(...rest: Any[]): Promise<P>;

  resetPageSearch (...rest: Any[]): void;
  resetPageSearch <P = Any>(...rest: Any[]): Promise<P>;

  reset (searchParams?: Partial<SP>): void;
  reset <P = Any>(searchParams?: Partial<SP>): Promise<P>;
}

/**
 * @template C - redux context
 * @template S - redux store state
 * @template SP - search params
 * @template A - dispatch actions
 */
interface ISearchPageStore<C, S, SP, A extends Action = AnyAction> extends IStore<C, S, IMapDispatchToProps<S, SP>, A> {

}

/**
 * search page store state definition.
 * 
 * @template T Type of `table`
 * @template SP Type of search params
 * @template ES Type of extra params, 如果提供了该该类型, 会将其合并到store state上, 默认空对象类型.
 */
type IState<T, SP, ES = EmptyObject> = {
  /**
   * table字段, 可通过该字段主动调用table search、reset方法刷新数据.
   */
  table: T | null;
  /**
   * 搜索参数.
   */
  searchParams: SP;
} & ES;

/**
 * 搜索页store函数.
 * 
 * @template SP Type of search params.
 * @template ES Type of extra state params.
 * @template T Type table api.
 * @template C Type of redux store context.
 * @param searchParams Initial search params state.
 * @param extraState Extra state params.
 * @param ctx Optional store context, default `null`.
 */
function searchPageStore<
  SP = Record<string, unknown>,
  ES = EmptyObject,
  T extends ITable = ITable,
  C = null
> (
  searchParams?: SP,
  extraState?: ES,
  ctx: C | null = null
): ISearchPageStore<C, IState<T, SP, ES>, SP, PageStoreAction<IState<T, SP, ES>>> {
  // @ts-ignore: Type '{}' is not assignable to type 'SP'.
  // 'SP' could be instantiated with an arbitrary type which could be unrelated to '{}'.ts(2322)
  searchParams = {
    ...searchParams
  };

  // @ts-ignore: TS2322: Type '{ table: null; searchParams: SP; }' is not assignable to type 'IState<T, SP, ES>'.
  const INIT_STATE: IState<T, SP, ES> = {
    table: null,
    searchParams,
    // mixin extra state
    ...extraState
  };

  const context = React.createContext<C>(ctx as C);

  function reducer (state: IState<T, SP, ES> | undefined, action: PageStoreAction<IState<T, SP, ES>>) {
    state = state as IState<T, SP, ES>;
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
    return createStores<IState<T, SP, ES>, PageStoreAction<IState<T, SP, ES>>>(reducer, INIT_STATE);
  }

  function mapStateToProps (state: IState<T, SP, ES>) {
    return {
      ...state
    };
  }

  function mapDispatchToProps (dispatch: MixedDispatch): IMapDispatchToProps<IState<T, SP, ES>, SP> {
    return {
      setState (state) {
        const dispatchFn: Dispatch<PageStoreAction<IState<T, SP, ES>>> = dispatch as Dispatch;
        return dispatchFn({
          type: ActionType.SET_STATE,
          value: state
        });
      },

      setSearchParams (searchParams) {
        const dispatchFn: Dispatch<PageStoreAction<SP>> = dispatch as Dispatch;
        return dispatchFn({
          type: ActionType.SEARCH_PARAMS,
          value: searchParams
        });
      },

      getState () {
        const dispatchFn = dispatch as GetStateMiddlewareDispatch<Dispatch, IState<T, SP, ES>>;
        return dispatchFn(({getState}: MiddlewareAPI) => {
          return getState();
        });
      },

      search <P = Any>(...rest: Any[]) {
        const dispatchFn: GetStateMiddlewareDispatch<Dispatch, IState<T, SP, ES>> = dispatch as GetStateMiddlewareDispatch;
        return dispatchFn(({getState}) => {
          const {table} = getState();
          if (!table) {
            return Promise.resolve();
          }
          return table.search<P>(...rest);
        });
      },

      resetPageSearch <P = Any>(...rest: Any[]) {
        const dispatchFn: GetStateMiddlewareDispatch<Dispatch, IState<T, SP, ES>> = dispatch as GetStateMiddlewareDispatch;
        return dispatchFn(({getState}) => {
          const {table} = getState();
          if (!table) {
            return Promise.resolve();
          }
          return table.resetPageSearch<P>(...rest);
        });
      },

      reset <P = Any>(searchParams?: Partial<SP>) {
        if (searchParams) {
          const dispatchFn = dispatch as Dispatch<PageStoreAction<SP>>;
          dispatchFn({
            type: ActionType.RESET,
            value: searchParams
          });
        } else {
          const dispatchFn = dispatch as Dispatch;
          dispatchFn({
            type: ActionType.RESET
          });
        }

        const dispatchFn1 = dispatch as GetStateMiddlewareDispatch<Dispatch, IState<T, SP, ES>>;
        return dispatchFn1(({getState}) => {
          const {table} = getState();
          if (table) {
            return table.reset<P, Partial<SP>>(searchParams);
          }
          return Promise.resolve();
        });
      }
    };
  }

  function withStore<P> (Component: React.ComponentType<Any>): React.FunctionComponent<P> {
    return withStores<P, IState<T, SP, ES>, PageStoreAction<IState<T, SP, ES>>, C>(Component, {createStore, context});
  }

  return {
    context,
    createStore,
    withStore,
    mapStateToProps,
    mapDispatchToProps
  };
}

export default searchPageStore;