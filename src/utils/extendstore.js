import isobj from "./isobj";

/**
 * Vuex Store混合
 * @returns {object}
 */
export default function () {
  const store = {};

  [...arguments].forEach(source => {
    if (!isobj(source)) {
      return;
    }

    if (source.state) {
      const state = store.state || {};
      Object.assign(state, typeof source.state === "function" ?
        source.state() : source.state);
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
        store.plugins.push(plugin);
      });
    }
  });

  return store;
}
