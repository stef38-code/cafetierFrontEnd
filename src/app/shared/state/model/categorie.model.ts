import {Lien} from "./lien.model";

export interface Categorie {
  id: string;
  nom: string;
  libelle: string;
  links: Lien[];
}
