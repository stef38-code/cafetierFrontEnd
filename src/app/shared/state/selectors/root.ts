import {createFeatureSelector} from "@ngrx/store";
import {ApplicationStore} from "../reducers";
export namespace RootSelector {
  /***********************************************************************************************************
   * root du store
   * reducer
   * ---> personnes
   * ------->ids
   * ------->entities
   * ------->selectedPersonneId
   */
  export const getRootState = createFeatureSelector<ApplicationStore.State>('reducer');
}
