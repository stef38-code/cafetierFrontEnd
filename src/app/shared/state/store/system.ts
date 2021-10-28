import {Personne} from "../model/personne";

export namespace SystemStore {

  export interface State {
    loading: boolean
  };
  export const initialState: State = {
    loading: false
  };
}
