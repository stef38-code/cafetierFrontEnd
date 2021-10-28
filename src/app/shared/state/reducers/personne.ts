import {Personne} from '../model/personne';
import {PersonneAction} from '../actions/personne-action';
import {PersonneStore} from '../store/personne';
import {PersonneTypeAction} from "../actions/personne-type-action";

export namespace PersonneReducer {
  export function reducer(state = PersonneStore.initialState, action: PersonneAction.Actions): PersonneStore.State {
    switch (action.type) {
      case PersonneTypeAction.LOAD: {
        return state;
      }
      case PersonneTypeAction.ADD: {
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

      case PersonneTypeAction.LOAD_SUCCESS_ACTION: {
        const personnes = action.payload;
        const newPersonnes = personnes.filter(personne => !state.entities[personne.id]);

        const newPersonneIds = newPersonnes.map(personne => personne.id);
        const newPersonneEntities = newPersonnes.reduce((entities: { [id: string]: Personne }, personne: Personne) => {
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
      case PersonneTypeAction.EDIT: {
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
