import {createSelector} from "reselect";
import {RootSelector} from "./root";
import {ApplicationStore} from "../reducers";
import {CategorieStore} from "../store/categorie";
import {Categorie} from "../model/categorie";

export namespace CategorieSelector {
  /**
   * ---> tickets
   */
  export const getCategorie = createSelector(RootSelector.getRootState, (state: ApplicationStore.State) => state.categorie);
  /******************************************************************************
   *
   */
  export const getEntitie = (state: CategorieStore.State) => state.entitie;
  export const getCategorieSelected = createSelector(getCategorie, getEntitie);
  export const getSelected = createSelector(getCategorie, getEntitie, (entitie,) => {
    if (entitie) {
      return entitie;
    }
    return {
      id: '',
      nom: '',
      libelle: '',
      links: [],
    } as Categorie;
  });
}
