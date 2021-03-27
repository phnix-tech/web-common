import Vuex, {Store} from "vuex";
import {EmptyObject} from "../../types";

interface CreateStore<
  T extends unknown[] = unknown[],
  S = EmptyObject
> {
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
function createStore<
  T extends unknown[] = unknown[],
  S = EmptyObject
> (
  this: This<S>,
  createStore?: CreateStore<T, S>,
  ...rest: T
) {
  // 设置root component store
  if (createStore) {
    if (typeof createStore !== "function") {
      throw new TypeError("createStore MUST be function");
    }

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const ctx = this;

    return {
      beforeCreate (this: This<S>) {
        // 每个组件需要创建独立的store
        const store = createStore.apply(ctx, rest);
        if (!(store instanceof Vuex.Store)) {
          throw new TypeError("store MUST be instanceof Vuex.Store");
        }

        // 注意：使用的组件需要在根级别实现createStore方法
        // 而不能在methods中定义，因为beforeCreate早于methods执行
        this.store = store;
        // $$store保存全局store
        if (this.$store) {
          this.$$store = this.$store;
        }
        this.$store = this.store;
      },

      beforeDestroy (this: This<S>) {
        try {
          // @ts-ignore: Property '__hasSetters' does not exist on type 'Store<S>'.ts(2339)
          if (this.store.__hasSetters) {
            this.store.commit("unSetters");
            // @ts-ignore: Property '__hasSetters' does not exist on type 'Store<S>'.ts(2339)
            delete this.store.__hasSetters;
          }
        } catch (e) {
          // 忽略Vuex unknown mutation type error
        }
      }
    };
  }

  // 设置子组件store, 自下往上从$parent中查询store
  return {
    props: {
      /**
       * 是否重写默认$store对象，主要用于mapXXX辅助函数的使用
       * 默认覆盖全局$store
       */
      overrideGlobalStore: {
        type: Boolean,
        default: true
      }
    },
    created (this: This<S>) {
      let parent = this.$parent;
      let store = parent.store;

      while (!store && parent && parent !== this) {
        parent = parent.$parent;
        store = parent.store;
      }

      // 自动检查父组件store属性，并且设置到子组件
      if (!(store instanceof Vuex.Store)) {
        throw new Error("parent component MUST have store(Vuex.Store) property");
      }

      this.store = store;

      if (this.overrideGlobalStore) {
        // $$store保存全局store
        if (this.$store) {
          this.$$store = this.$store;
        }
        this.$store = store;
      }
    }
  };
}

export default createStore;