import { EmptyObject } from "../../../types";
import Store from "../../types/SettersStore";
/**
 * setters插件，setters用于在state中存储与状态无关的属性，用于跨组件action调用
 * setters直接注入在state中，执行action前注入setter，执行后删除setter
 *
 * @template S type of vuex Store
 * @param setters
 * @returns
 */
declare function createsetters<S extends EmptyObject = EmptyObject>(setters?: Record<string, unknown>): (store: Store<S>) => void;
export declare type Payload<K extends string = string, V = unknown> = {
    key: K;
    value: V;
} | [K, V] | Payload<K, V>[];
export default createsetters;
