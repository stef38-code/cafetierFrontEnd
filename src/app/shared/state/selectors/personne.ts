import {createSelector} from "reselect";
import {RootSelector} from "./root";
import {ApplicationStore} from "../reducers";
import {Categorie} from "../model/categorie";
import {PersonneStore} from "../store/personne";
import {Personne} from "../model/personne";

export namespace PersonneSelector {
  /**
   * ---> personnes
   */
  export const getPersonne = createSelector(RootSelector.getRootState, (state: ApplicationStore.State) => state.personne);
  /******************************************************************************
   *
   */
  export const getEntitie = (state: PersonneStore.State) => state.entitie;
  export const getPersonneSelected = createSelector(getPersonne, getEntitie);
  export const getSelected = createSelector(getPersonne, getEntitie, (entitie) => {
    if (entitie) {
      return entitie;
    }
    return {
      nom: '',
      prenom: '',
      id: '',
      nombreTicket: 0,
      categorie: {} as Categorie,
      tickets: [],
      links: []
    } as Personne;
  });
}
