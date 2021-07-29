import type {Action, AnyAction, Store} from "redux";
import type {ReactReduxContextValue} from "react-redux";
import type {Any, EmptyObject} from "../../types";
import React, {useEffect, useRef} from "react";
import {Provider} from "react-redux";

/**
 * withStore对外暴露的属性.
 * 
 * @template S Type of store state.
 * @template A Type of store action.
 * @template C Type of store context, store use `React.Context`存储数据.
 */
interface IProps<
  S = Any,
  A extends Action = AnyAction,
  C = null
> {
  /**
   * 内部不直接创建store, 外部需提供创建store方法, 以便内部获取store.
   */
  createStore: () => Store<S, A>;
  /**
   * 可选的store context, 如果需要创建独立store, 则外部需要提供context, 不然会公用redux默认的全局context.
   */
  context?: React.Context<C>;
}

/**
 * wrap component with isolated redux store support,
 * visit https://www.redux.org.cn/docs/recipes/IsolatingSubapps.html know more.
 *
 * @template P - the returned FC component props type
 * @template S - redux store state type
 * @template A - dispatch actions type
 * @template C - redux context type
 * @param Component - source component
 * @param props - wrap options
 */
function withStore<
  P extends EmptyObject,
  S = Any,
  A extends Action = AnyAction,
  C = null
> (
  Component: React.ComponentType<Any>,
  props: IProps<S, A, C>
): React.FunctionComponent<P> {
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
}

export default withStore;