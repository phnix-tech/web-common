import isobj from "./isobj";
/**
 * Vuex Store混合
 *
 * @returns
 */
function extendstore() {
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
            var state = (store.state || {});
            var s = source.state;
            if (typeof s === "function") {
                // @ts-ignore: Type 'S & Function' has no call signatures.ts(2349)
                Object.assign(state, s());
            }
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
export default extendstore;
