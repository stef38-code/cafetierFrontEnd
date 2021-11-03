import {PersonneStore} from "../store/personne";
import {PersonneAction} from "../actions/personne-action";
import {PersonneTypesActions} from "../actions/personne-types-actions";
import {Personne} from "../model/personne";

export namespace PersonneReducer {
  export function reducer(state = PersonneStore.initialState, action: PersonneAction.Actions): PersonneStore.State {
    switch (action.type) {
      case PersonneTypesActions.LOAD: {
        console.log("PersonneTypesActions.LOAD", action.payload);
        return {entitie: action.payload}
      }
      case PersonneTypesActions.ADD: {
        return {entitie: action.payload}

      }
      case PersonneTypesActions.DELETE: {
        return state;
      }
      case PersonneTypesActions.CLEAR: {
        return {entitie: {} as Personne}

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
