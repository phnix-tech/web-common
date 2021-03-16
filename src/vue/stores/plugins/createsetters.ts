import {EmptyObject} from "../../../types";
import isobj from "../../../utils/isobj";
import Store from "../../types/SettersStore";

/**
 * setters插件，setters用于在state中存储与状态无关的属性，用于跨组件action调用
 * setters直接注入在state中，执行action前注入setter，执行后删除setter
 *
 * @template S type of vuex Store
 * @param setters
 * @returns
 */
function createsetters<
  S extends EmptyObject = EmptyObject
> (
  setters: Record<string, unknown> = {}
) {
  return function (store: Store<S>) {
    store.subscribe(mutation => {
      const {type, payload} = mutation;
      if (type === "setters") {
        // setters标记，用于销毁setters条件判断
        store.__hasSetters = true;
        setVal(payload, setters);
      } else if (type === "unSetters") {
        delVal(payload, setters);
      }
    });

    store.subscribeAction({
      before (action, state) {
        // 往state注入setter
        Object.keys(setters).forEach(key => {
          Object.defineProperty(state, key, {
            value: setters[key],
            configurable: true
          });
        });
      },

      after (action, state) {
        // 执行完毕action后删除setter
        Object.keys(setters).forEach(key => {
          if (state.hasOwnProperty(key)) {
            // @ts-ignore: No index signature with a parameter of type 'string' was found on type 'EmptyObject'.ts(7053)
            delete state[key];
          }
        });
      }
    });
  };
}

export type Payload<
  K extends string = string,
  V = unknown
> =
| {
  key: K;
  value: V;
}
| [K, V]
| Payload<K, V>[];

function setVal (payload: Payload, setters: Record<string, unknown>) {
  let key, value;

  // 纯对象key/value
  if (isobj(payload) && "key" in payload) {
    key = payload.key;
    value = payload.value;
  } else if (Array.isArray(payload)) {
    // 只有两个元素，并且第一个元素为string
    if (
      payload.length === 2 &&
      typeof payload[0] === "string"
    ) {
      key = payload[0];
      value = payload[1];
    } else {
      // 递归设置value
      payload.forEach(pld => {
        setVal(pld as Payload, setters);
      });
    }
  }

  if (key && setters.hasOwnProperty(key)) {
    setters[key] = value;
  }
}

function delVal (payload: Payload, setters: Record<string, unknown>) {
  // 不传参数销毁全部setters
  if (payload === undefined) {
    Object.keys(setters).forEach(key => {
      setters[key] = null;
      delete setters[key];
    });
  } else if (typeof payload === "string") {
    if (setters.hasOwnProperty(payload)) {
      setters[payload] = null;
      delete setters[payload];
    }
  } else if (Array.isArray(payload)) {
    payload.forEach(key => {
      if (typeof key === "string" &&
        setters.hasOwnProperty(key)
      ) {
        setters[key] = null;
        delete setters[key];
      }
    });
  }
}

export default createsetters;