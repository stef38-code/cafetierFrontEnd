import {createSelector} from "reselect";
import * as fromPersonne from "../reducers/personne.reducer";
import * as fromRootStore from "./root.selector";
import {State} from "../reducers";
import * as personneStore from "../store/personne.store";

/**
 * ---> personnes
 */
export const getPersonnes = createSelector(fromRootStore.getRootState,(state: State) => state.personnes);
/******************************************************************************
 *
 */
export const getEntities = (state: personneStore.StatePersonne) => state.entities;
export const getIds = (state: personneStore.StatePersonne) => state.ids;

export const getPersonneEntities = createSelector(getPersonnes, getEntities);
export const getCollectionPersonneIds = createSelector(getPersonnes, getIds);
export const getPersonneEntites = createSelector(getPersonneEntities, getCollectionPersonneIds, (entities, ids) => {
  return ids.map(id => entities[id]);
});
