import { Store } from "vuex";
declare class SettersStore<S> extends Store<S> {
    __hasSetters: boolean;
}
export default SettersStore;
