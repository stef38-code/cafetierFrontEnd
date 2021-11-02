import {Categorie} from "../model/categorie";

export namespace CategorieStore {
  export interface State {
    entitie: Categorie;
  };
  export const initialState: State = {
    entitie: {} as Categorie,
  }
}
