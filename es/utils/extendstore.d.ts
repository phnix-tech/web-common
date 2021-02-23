interface Store {
    state?: Record<string, unknown> | (() => Record<string, unknown>);
    getters?: Record<string, unknown>;
    mutations?: Record<string, unknown>;
    actions?: Record<string, unknown>;
    plugins?: unknown[];
}
/**
 * Vuex Store混合
 * @returns object
 */
export default function (...args: Store[]): Store;
export {};
