import {PersonneStore} from "../store/personne";
import {PersonneAction} from "../actions/personne-action";
import {PersonneTypesActions} from "../actions/personne-types-actions";

export namespace PersonneReducer {
  export function reducer(state = PersonneStore.initialState, action: PersonneAction.Actions): PersonneStore.State {
    switch (action.type) {
      case PersonneTypesActions.LOAD: {
        return state;
      }
      case PersonneTypesActions.ADD: {
        state.entitie = action.payload;

        return state;

      }

      case PersonneTypesActions.LOAD_SUCCESS_ACTION: {
        state.entitie = action.payload;
        return state;
      }
      case PersonneTypesActions.EDIT: {
        return {
          entitie: state.entitie,
        };
      }
      default: {
        return state;
      }
    }
  }

}
