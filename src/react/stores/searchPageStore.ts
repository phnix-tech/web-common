import React from "react";
import {Dispatch, AnyAction, MiddlewareAPI, Store, Action} from "redux";
import {Any} from "../../ts/types";
import {State, GetStateMiddlewareDispatch, MixedDispatch} from "./index";
import createStores from "./createStore";

type PageStoreAction = Action<string> & {
  value: State;
};

type ISearchPageStore<C = Any> = {
  context: React.Context<C>;

  createStore (): Store;

  mapStateToProps (state: State): State;

  mapDispatchToProps (dispatch: MixedDispatch): {
    setState (value: State): PageStoreAction;

    setSearchParams (value: State): PageStoreAction;

    getState (): Promise<() => State>;

    search (...rest: Any[]): Promise<Any>;

    resetPageSearch (...rest: Any[]): Promise<Any>;

    reset (value?: State): Promise<Any>;
  };
};

export default function (searchParams: State = {}): ISearchPageStore {
  searchParams = {
    ...searchParams
  };

  const INIT_STATE = {
    table: null,
    searchParams
  };
  const context = React.createContext(null);

  function reducer (state: State | undefined, action: AnyAction) {
    state = state as State;
    switch (action.type) {
      case "SET_STATE":
        state = {
          ...state,
          ...action.value
        };
        break;
      case "SEARCH_PARAMS":
        state = {
          ...state,
          searchParams: {
            ...state.searchParams,
            ...action.value
          }
        };
        break;
      case "RESET":
        state = {
          ...state,
          searchParams: {
            ...INIT_STATE.searchParams,
            ...action.value
          }
        };
        break;
      default:
        break;
    }
    return state;
  }

  function createStore () {
    return createStores(reducer, INIT_STATE);
  }

  function mapStateToProps (state: State) {
    return {
      ...state
    };
  }

  function mapDispatchToProps (dispatch: MixedDispatch) {
    return {
      setState (value: State) {
        dispatch = dispatch as Dispatch;
        return dispatch({
          type: "SET_STATE",
          value
        });
      },

      setSearchParams (value: State) {
        dispatch = dispatch as Dispatch;
        return dispatch({
          type: "SEARCH_PARAMS",
          value
        });
      },

      getState () {
        dispatch = dispatch as GetStateMiddlewareDispatch;
        return dispatch(({getState}: MiddlewareAPI) => {
          return Promise.resolve(getState);
        });
      },

      search (...rest: Any[]) {
        dispatch = dispatch as GetStateMiddlewareDispatch;
        return dispatch(({getState}) => {
          const {table} = getState();
          if (!table) {
            return Promise.resolve();
          }
          return table.search(...rest);
        });
      },

      resetPageSearch (...rest: Any[]) {
        dispatch = dispatch as GetStateMiddlewareDispatch;
        return dispatch(({getState}) => {
          const {table} = getState();
          if (!table) {
            return Promise.resolve();
          }
          return table.resetPageSearch(...rest);
        });
      },

      reset (value: State = {}) {
        dispatch = dispatch as Dispatch;
        dispatch({
          type: "RESET",
          value
        });

        dispatch = dispatch as GetStateMiddlewareDispatch;
        return dispatch(({getState}) => {
          const {table} = getState();
          if (table) {
            return table.reset();
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