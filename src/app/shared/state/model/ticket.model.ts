import {Lien} from "./lien.model";
import {Personne} from "./personne.model";

export interface Ticket {
  id: string;
  numero: string;
  montant: number;
  links: Lien[];
  personne: Personne;
}
