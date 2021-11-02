import {Personne} from "../model/personne";

export namespace PersonneStore {

  export interface State {
    entitie: Personne;
  };
  export const initialState: State = {
    entitie: {} as Personne,
  };
}
