import {Personne} from '../model/personne.model';
import * as personneAction from '../actions/personne.action';
import {createSelector} from "@ngrx/store";

export interface StatePersonne {
  ids: string[];
  entities: { [id: string]: Personne };
  selectedPersonneId: string | null;
};
export const initialState: StatePersonne = {
  ids: [],
  entities: {},
  selectedPersonneId: '',
};

export function reducer(state = initialState, action: personneAction.Actions): StatePersonne {
  switch (action.type) {
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

export const getEntities = (state: StatePersonne) => state.entities;

export const getIds = (state: StatePersonne) => state.ids;

export const getSelectedId = (state: StatePersonne) => state.selectedPersonneId;

export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
  if (selectedId)
    return entities[selectedId];

  return null;
});

export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
  return ids.map(id => entities[id]);
});
