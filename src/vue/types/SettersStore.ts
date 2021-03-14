import {Store} from "vuex";

class SettersStore<S> extends Store<S> {
  __hasSetters = false;
}

export default SettersStore;