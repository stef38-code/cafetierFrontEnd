import {createSelector} from "reselect";
import {RootSelector} from "./root";
import {ApplicationStore} from "../reducers";
import {SystemStore} from "../store/system";

export namespace SystemSelector {
  /**
   * ---> system
   */
  export const getSystem = createSelector(RootSelector.getRootState, (state: ApplicationStore.State) => state.system);
  /******************************************************************************
   *
   */
  export const getLoading = (state: SystemStore.State) => state.loading;
  export const getSystemLoading = createSelector(getSystem, getLoading);

}
