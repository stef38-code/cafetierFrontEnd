import {Categorie} from '../model/categorie.model';
import * as categorieAction from '../actions/categorie.action';
import {createSelector} from "@ngrx/store";

export interface State {
  ids: string[];
  entities: { [id: string]: Categorie };
  selectedCategorietId: string | null;
};
export const initialState: State = {
  ids: [],
  entities: {},
  selectedCategorietId: null,
};

export function reducer(state = initialState, action: categorieAction.Actions): State {
  switch (action.type) {
    case categorieAction.SEARCH_COMPLETE: {
      const categories = action.payload;
      const newCategorie = categories.  filter(categorie => !state.entities[categorie.id]);

      const newCategorieIds = newCategorie.map(categorie => categorie.id);
      const newCategorieCategorie = newCategorie.reduce((entities: { [id: string]: Categorie }, categorie: Categorie) => {
        return Object.assign(entities, {
          [categorie.id]: categorie
        });
      }, {});

      return {
        ids: [...state.ids, ...newCategorieIds],
        entities: Object.assign({}, state.entities, newCategorieCategorie),
        selectedCategorietId: state.selectedCategorietId
      };
    }

    case categorieAction.LOAD: {
      const categorie = action.payload;

      if (state.ids.indexOf(categorie.id) > -1) {
        return state;
      }

      return {
        ids: [...state.ids, categorie.id],
        entities: Object.assign({}, state.entities, {
          [categorie.id]: categorie
        }),
        selectedCategorietId: state.selectedCategorietId
      };
    }

    case categorieAction.SELECT: {
      return {
        ids: state.ids,
        entities: state.entities,
        selectedCategorietId: action.payload
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

export const getSelectedId = (state: State) => state.selectedCategorietId;

export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
  if (selectedId)
    return entities[selectedId];

  return null;
});

export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
  return ids.map(id => entities[id]);
});
