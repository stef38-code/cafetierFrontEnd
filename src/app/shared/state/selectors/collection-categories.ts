import {createSelector} from "reselect";
import {RootSelector} from "./root";
import {ApplicationStore} from "../reducers";
import {CollectionCategoriesStore} from "../store/collection-categories";

export namespace CollectionCategorieSelector {
  /**
   * ---> tickets
   */
  export const getCategorie = createSelector(RootSelector.getRootState, (state: ApplicationStore.State) => state.categories);
  /******************************************************************************
   *
   */
  export const getEntities = (state: CollectionCategoriesStore.State) => state.entities;
  export const getSelectedId = (state: CollectionCategoriesStore.State) => state.selectedId;
  export const getIds = (state: CollectionCategoriesStore.State) => state.ids;

  export const getCategorieEntities = createSelector(getCategorie, getEntities);
  export const getCollectionCategorieIds = createSelector(getCategorie, getIds);
  export const getCategorieEntites = createSelector(getCategorieEntities, getCollectionCategorieIds, (entities, ids) => {
    return ids.map(id => entities[id]);
  });
  export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
    if (selectedId) {
      return entities[selectedId];
    }
    return {
      id: '',
      nom: '',
      libelle: ''
    }
  });
}
