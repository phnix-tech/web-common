declare const _default: {
    mutations: {
        /**
         * setters插件使用形式
         * 由于commit不能传递多个参数，所以我们用数组传递多个参数
         * store.commit("setters", {key: "service", value: service});
         * store.commit("setters", ["service", service])
         * store.commit("setters", [["service", service], ["source", source]])
         */
        setters(): void;
        unSetters(): void;
    };
};
export default _default;
