import {Lien} from "./lien";
import {Personne} from "./personne";

export interface Ticket {
  id: string;
  numero: string;
  montant: number;
  links: Lien[];
  personne: Personne;
}
