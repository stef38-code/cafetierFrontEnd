import {Personne} from "../model/personne.model";

export interface StatePersonne {
  ids: string[];
  entities: { [id: string]: Personne };
  selectedPersonneId: string | null;
};
export const initialState: StatePersonne = {
  ids: [],
  entities: {},
  selectedPersonneId: '',
};
