import {SystemStore} from "../store/system";
import {SystemAction} from "../actions/system-action";
import {SystemTypeAction} from "../actions/system-type-action";

export namespace SystemReducer {
  export function reducer(state = SystemStore.initialState, action: SystemAction.Actions): SystemStore.State {
    switch (action.type) {
      case SystemTypeAction.START: {
        return {
          loading: true,
          erreurMessage: '',
          erreurTitre: ''
        };
      }
      case SystemTypeAction.STOP: {
        return {
          loading: false,
          erreurMessage: '',
          erreurTitre: ''
        };
      }
      default: {
        return state;
      }
    }
  }

}
