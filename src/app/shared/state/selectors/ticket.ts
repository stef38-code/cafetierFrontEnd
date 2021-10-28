import {createSelector} from "reselect";
import {RootSelector} from "./root";
import {ApplicationStore} from "../reducers";
import {PersonneStore} from "../store/personne";
import {TicketStore} from "../store/Ticket";

export namespace TicketSelector {
  /**
   * ---> tickets
   */
  export const getTickets = createSelector(RootSelector.getRootState, (state: ApplicationStore.State) => state.tickets);
  /******************************************************************************
   *
   */
  export const getEntities = (state: TicketStore.State) => state.entities;
  export const getSelectedId = (state: TicketStore.State) => state.selectedId;
  export const getIds = (state: TicketStore.State) => state.ids;

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
      montant:'',
      numero:'',
      personne: null,
      links: []
    }
  });
  export const getSelectedPersonne = createSelector(getTickets, getSelected);
}
