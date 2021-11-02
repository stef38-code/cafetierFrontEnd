import {createSelector} from "reselect";
import {RootSelector} from "./root";
import {ApplicationStore} from "../reducers";
import {TicketStore} from "../store/ticket";

export namespace TicketSelector {
  /**
   * ---> tickets
   */
  export const getTicket = createSelector(RootSelector.getRootState, (state: ApplicationStore.State) => state.ticket);
  /******************************************************************************
   *
   */
  export const getEntitie = (state: TicketStore.State) => state.entitie;
  export const getTicketSelected = createSelector(getTicket, getEntitie);
  export const getSelected = createSelector(getTicket, getEntitie, (entitie) => {
    if (entitie) {
      return entitie;
    }
    return {
      id: '',
      montant: '',
      numero: '',
      personne: null,
      links: []
    }
  });
}
