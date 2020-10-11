import React, {useEffect, useRef} from "react";
import {Store} from "redux";
import {Provider} from "react-redux";
import {Any} from "../../ts/types";

interface IProps {
  createStore: () => Store;
  context?: React.Context<Any>;
}

export default <P extends {}>(
  Component: React.ComponentType<Any>,
  props: IProps
): React.FunctionComponent<P> => {
  const {
    createStore,
    context
  } = props;

  return function (props: React.PropsWithChildren<P>) {
    // 防止函数组件多次创建store
    const store = useRef<Store>(createStore());

    useEffect(() => {
      return () => {
        // @ts-ignore
        store.current = null;
      };
    }, []);

    return (
      <Provider store={store.current} context={context}>
        <Component {...props}/>
      </Provider>
    );
  };
};