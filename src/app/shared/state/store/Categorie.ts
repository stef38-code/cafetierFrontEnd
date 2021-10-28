import {Categorie} from "../model/categorie";
export namespace CategorieStore {
  export interface State {
    ids: string[];
    entities: { [id: string]: Categorie };
    selectedId: string | null;
  };
  export const initialState: State = {
    ids: [],
    entities: {},
    selectedId: '',
  };
}
