import {Personne} from "../model/personne";

export namespace PersonneStore {

  export interface State {
    ids: string[];
    entities: { [id: string]: Personne };
    selectedId: string | null;
  };
  export const initialState: State = {
    ids: [],
    entities: {},
    selectedId: '',
  };
}
