import isobj from "./isobj";
/**
 * Vuex Store混合
 * @returns object
 */
export default function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var store = {};
    args.forEach(function (source) {
        if (!isobj(source)) {
            return;
        }
        if (source.state) {
            var state = store.state || {};
            Object.assign(state, typeof source.state === "function" ?
                source.state() : source.state);
            store.state = state;
        }
        if (source.getters) {
            var getters = store.getters || {};
            Object.assign(getters, source.getters);
            store.getters = getters;
        }
        if (source.mutations) {
            var mutations = store.mutations || {};
            Object.assign(mutations, source.mutations);
            store.mutations = mutations;
        }
        if (source.actions) {
            var actions = store.actions || {};
            Object.assign(actions, source.actions);
            store.actions = actions;
        }
        if (Array.isArray(source.plugins)) {
            store.plugins = store.plugins || [];
            source.plugins.forEach(function (plugin) {
                var _a;
                (_a = store.plugins) === null || _a === void 0 ? void 0 : _a.push(plugin);
            });
        }
    });
    return store;
}
