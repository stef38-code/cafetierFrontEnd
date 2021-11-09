import {CategorieStore} from "../store/categorie";
import {CategorieAction} from "../actions/categorie-action";
import {CategorieTypesActions} from "../actions/categorie-types-actions";

export namespace CategorieRecuder {
  export function reducer(state = CategorieStore.initialState, action: CategorieAction.Actions): CategorieStore.State {
    switch (action.type) {
      case CategorieTypesActions.LOAD: {
        return {entitie: action.payload}
      }
      case CategorieTypesActions.ADD: {
        console.log(JSON.stringify(action.payload));
        return {
          entitie: action.payload
        };
      }

      case CategorieTypesActions.LOAD_SUCCESS_ACTION: {
        return {
          entitie: action.payload
        };
      }
      case CategorieTypesActions.DELETE: {
        return state;
      }
      case CategorieTypesActions.EDIT: {
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

