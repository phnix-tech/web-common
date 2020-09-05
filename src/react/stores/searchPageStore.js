import React from "react";
import createStores from "./createStore";

export default function (searchParams = {}) {
  searchParams = {
    ...searchParams
  };

  const
    INIT_STATE = {
      table: null,
      searchParams
    },
    context = React.createContext(null);

  function reducer (state, action) {
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

  function mapStateToProps (state) {
    return {
      ...state
    };
  }

  function mapDispatchToProps (dispatch) {
    return {
      setState (value) {
        return dispatch({
          type: "SET_STATE",
          value
        });
      },

      setSearchParams (value) {
        return dispatch({
          type: "SEARCH_PARAMS",
          value
        });
      },

      getState () {
        return dispatch(({getState}) => {
          return Promise.resolve(getState);
        });
      },

      search () {
        return dispatch(({getState}) => {
          const {table} = getState();
          if (!table) {
            return Promise.resolve();
          }
          return table.search.apply(table, arguments);
        });
      },

      resetPageSearch () {
        return dispatch(({getState}) => {
          const {table} = getState();
          if (!table) {
            return Promise.resolve();
          }
          return table.resetPageSearch.apply(table, arguments);
        });
      },

      reset (value = {}) {
        dispatch({
          type: "RESET",
          value
        });
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