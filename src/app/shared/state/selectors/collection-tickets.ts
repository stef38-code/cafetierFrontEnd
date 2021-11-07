import {createSelector} from "reselect";
import {RootSelector} from "./root";
import {ApplicationStore} from "../reducers";
import {CollectionTicketsStore} from "../store/collection-tickets";

export namespace CollectionTicketSelector {
  /**
   * ---> tickets
   */
  export const getTickets = createSelector(RootSelector.getRootState, (state: ApplicationStore.State) => state.tickets);
  /******************************************************************************
   *
   */
  export const getEntities = (state: CollectionTicketsStore.State) => state.entities;
  export const getSelectedId = (state: CollectionTicketsStore.State) => state.selectedId;
  export const getIds = (state: CollectionTicketsStore.State) => state.ids;

  export const getTicketEntities = createSelector(getTickets, getEntities);
  export const getCollectionTicketIds = createSelector(getTickets, getIds);
  export const getTicketEntites = createSelector(getTicketEntities, getCollectionTicketIds, (entities, ids) => {
    return ids.map(id => entities[id]);
  });
  export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
    if (selectedId) {
      return entities[selectedId];
    }
    return {
      id: '',
      montant: '',
      numero: '',
      personne: null,
      links: []
    }
  });
  export const getSelectedPersonne = createSelector(getTickets, getSelected);
}
