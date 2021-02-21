import React, {useEffect, useRef} from "react";
import {Action, AnyAction, Store} from "redux";
import {Provider, ReactReduxContextValue} from "react-redux";
import {Any, EmptyObject} from "../../types";

interface IProps<
  S = Any,
  A extends Action = AnyAction,
  C = null
> {
  createStore: () => Store<S, A>;
  context?: React.Context<C>;
}

/**
 * wrap component with redux store support
 * @template P - the returned FC component props type
 * @template S - redux store state type
 * @template A - dispatch actions type
 * @template C - redux context type
 * @param Component - source component
 * @param props - wrap options
 */
export default <
  P extends EmptyObject,
  S = Any,
  A extends Action = AnyAction,
  C = null
>(
  Component: React.ComponentType<Any>,
  props: IProps<S, A, C>
): React.FunctionComponent<P> => {
  const {
    createStore,
    context
  } = props;

  return function (props: React.PropsWithChildren<P>) {
    // 防止函数组件多次创建store
    const store = useRef<Store<S, A> | null>(createStore());
    // store.current类型保护
    if (store.current === null) {
      return null;
    }

    useEffect(() => {
      return () => {
        store.current = null;
      };
    }, []);

    const ctx = context as unknown as React.Context<ReactReduxContextValue>;
    return (
      <Provider store={store.current} context={ctx}>
        <Component {...props}/>
      </Provider>
    );
  };
};