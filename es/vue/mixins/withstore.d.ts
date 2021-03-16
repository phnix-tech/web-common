import { Store } from "vuex";
import { EmptyObject } from "../../types";
interface CreateStore<T extends unknown[] = unknown[], S = EmptyObject> {
    (...rest: T): Store<S>;
}
interface This<S> {
    store: Store<S>;
    $store: Store<S>;
    $$store: Store<S>;
    $parent: This<S>;
    overrideGlobalStore: boolean;
}
/**
 * 页面级独立store创建，主要用于多组件构成的页面之间状态管理
 *
 * @template T type of createStore function rest parameters
 * @template S type of vuex Store
 * @param createStore
 * store顶级组件传递createStore函数构造store实例, 赋值到组件store/$store属性上
 * store后代组件不传递任何参数自动解析顶级store实例, 赋值到组件store/$store属性上
 * @param rest 额外参数传递给createStore函数
 */
declare function createStore<T extends unknown[] = unknown[], S = EmptyObject>(this: This<S>, createStore?: CreateStore<T, S>, ...rest: T): {
    beforeCreate(this: This<S>): void;
    beforeDestroy(this: This<S>): void;
    props?: undefined;
} | {
    props: {
        /**
         * 是否重写默认$store对象，主要用于mapXXX辅助函数的使用
         * 默认覆盖全局$store
         */
        overrideGlobalStore: {
            type: BooleanConstructor;
            default: boolean;
        };
    };
    created(this: This<S>): void;
};
export default createStore;
