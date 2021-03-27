import {StoreOptions} from "vuex";
import isobj from "./isobj";

/**
 * Vuex Store混合
 *
 * @returns
 */
function extendstore<S> (...args: StoreOptions<S>[]) {
  const store: StoreOptions<S> = {};

  args.forEach(source => {
    if (!isobj(source)) {
      return;
    }

    if (source.state) {
      const state = (store.state || {}) as S;
      const s = source.state;
      if (typeof s === "function") {
        // @ts-ignore: Type 'S & Function' has no call signatures.ts(2349)
        Object.assign(state, s());
      }
      store.state = state;
    }

    if (source.getters) {
      const getters = store.getters || {};
      Object.assign(getters, source.getters);
      store.getters = getters;
    }

    if (source.mutations) {
      const mutations = store.mutations || {};
      Object.assign(mutations, source.mutations);
      store.mutations = mutations;
    }

    if (source.actions) {
      const actions = store.actions || {};
      Object.assign(actions, source.actions);
      store.actions = actions;
    }

    if (Array.isArray(source.plugins)) {
      store.plugins = store.plugins || [];
      source.plugins.forEach(plugin => {
        store.plugins?.push(plugin);
      });
    }
  });

  return store;
}

export default extendstore;
