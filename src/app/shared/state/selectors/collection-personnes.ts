import {createSelector} from "reselect";
import {RootSelector} from "./root";
import {ApplicationStore} from "../reducers";
import {CollectionPersonnesStore} from "../store/collection-personnes";
import {Categorie} from "../model/categorie";

export namespace CollectionPersonneSelector {
  /**
   * ---> personnes
   */
  export const getPersonnes = createSelector(RootSelector.getRootState, (state: ApplicationStore.State) => state.personnes);
  /******************************************************************************
   *
   */
  export const getEntities = (state: CollectionPersonnesStore.State) => state.entities;
  export const getSelectedId = (state: CollectionPersonnesStore.State) => state.selectedId;
  export const getIds = (state: CollectionPersonnesStore.State) => state.ids;

  export const getPersonneEntities = createSelector(getPersonnes, getEntities);
  export const getCollectionPersonneIds = createSelector(getPersonnes, getIds);
  export const getPersonneEntites = createSelector(getPersonneEntities, getCollectionPersonneIds, (entities, ids) => {
    return ids.map(id => entities[id]);
  });
  export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedPersonneId) => {
    if (selectedPersonneId) {
      return entities[selectedPersonneId];
    }
    return {
      nom: '',
      prenom: '',
      id: '',
      nombreTicket: 0,
      categorie: {} as Categorie,
      tickets: [],
      links: []
    }
  });
  export const getSelectedPersonne = createSelector(getPersonnes, getSelected);
}
