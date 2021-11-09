import {Personne} from '../model/personne';
import {CollectionPersonneAction} from '../actions/collection-personnes-action';
import {CollectionPersonnesStore} from '../store/collection-personnes';
import {CollectionPersonnesTypesActions} from "../actions/collection-personnes-types-actions";

export namespace CollectionPersonnesReducer {
  export function reducer(state = CollectionPersonnesStore.initialState, action: CollectionPersonneAction.Actions): CollectionPersonnesStore.State {
    switch (action.type) {
      case CollectionPersonnesTypesActions.LOAD: {
        return state;
      }
      case CollectionPersonnesTypesActions.ADD: {
        const personne: Personne = action.payload;
        if (state.ids.indexOf(personne.id) > -1) {
          return state;
        }
        return Object.assign({}, state, {
          ids: [...state.ids, personne.id],
          entities: Object.assign({}, state.entities, {
            [personne.id]: personne
          }),
          selectedId: state.selectedId
        });
      }

      case CollectionPersonnesTypesActions.LOAD_SUCCESS_ACTION: {
        const personnes = action.payload;

        const newPersonneIds = personnes.map(personne => personne.id);
        const newPersonneEntities = personnes.reduce((entities: { [id: string]: Personne }, personne: Personne) => {
          return Object.assign(entities, {
            [personne.id]: personne
          });
        }, {});
        return {
          ids: [...state.ids, ...newPersonneIds],
          entities: Object.assign({}, state.entities, newPersonneEntities),
          selectedId: state.selectedId
        };
      }
      case CollectionPersonnesTypesActions.EDIT: {
        return {
          ids: state.ids,
          entities: state.entities,
          selectedId: action.payload
        };
      }

      default: {
        return state;
      }
    }
  }

}
