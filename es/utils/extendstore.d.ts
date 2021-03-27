import { StoreOptions } from "vuex";
/**
 * Vuex Store混合
 *
 * @returns
 */
declare function extendstore<S>(...args: StoreOptions<S>[]): StoreOptions<S>;
export default extendstore;
