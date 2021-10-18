import {Personne} from '../model/personne.model';
import * as personneAction from '../actions/personne.action';
import {createSelector} from "@ngrx/store";

export interface State {
  ids: string[];
  entities: { [id: string]: Personne };
  selectedPersonneId: string | null;
};
export const initialState: State = {
  ids: [],
  entities: {},
  selectedPersonneId: null,
};

export function reducer(state = initialState, action: personneAction.Actions): State {
  switch (action.type) {
    case personneAction.SEARCH_COMPLETE: {
      const personnes = action.payload;
      const newPersonne = personnes.filter(personne => !state.entities[personne.id]);

      const newTicketIds = newPersonne.map(personne => personne.id);
      const newTicketEntities = newPersonne.reduce((entities: { [id: string]: Personne }, personne: Personne) => {
        return Object.assign(entities, {
          [personne.id]: personne
        });
      }, {});

      return {
        ids: [...state.ids, ...newTicketIds],
        entities: Object.assign({}, state.entities, newTicketEntities),
        selectedPersonneId: state.selectedPersonneId
      };
    }

    case personneAction.LOAD: {
      const personne = action.payload;

      if (state.ids.indexOf(personne.id) > -1) {
        return state;
      }

      return {
        ids: [...state.ids, personne.id],
        entities: Object.assign({}, state.entities, {
          [personne.id]: personne
        }),
        selectedPersonneId: state.selectedPersonneId
      };
    }

    case personneAction.SELECT: {
      return {
        ids: state.ids,
        entities: state.entities,
        selectedPersonneId: action.payload
      };
    }

    default: {
      return state;
    }
  }
}

/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */

export const getEntities = (state: State) => state.entities;

export const getIds = (state: State) => state.ids;

export const getSelectedId = (state: State) => state.selectedPersonneId;

export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
  if (selectedId)
    return entities[selectedId];

  return null;
});

export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
  return ids.map(id => entities[id]);
});
