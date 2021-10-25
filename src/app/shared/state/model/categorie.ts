import {Lien} from "./lien";

export interface Categorie {
  id: string;
  nom: string;
  libelle: string;
  links: Lien[];
}
