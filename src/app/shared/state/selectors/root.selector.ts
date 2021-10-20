import {createFeatureSelector} from "@ngrx/store";
import {State} from "../reducers";

/***********************************************************************************************************
 * root du store
 * reducer
 * ---> personnes
 * ------->ids
 * ------->entities
 * ------->selectedPersonneId
 */
export const getRootState = createFeatureSelector<State>('reducer');
