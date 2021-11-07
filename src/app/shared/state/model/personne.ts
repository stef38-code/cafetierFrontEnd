import {Lien} from "./lien";
import {Ticket} from "./ticket";
import {Categorie} from "./categorie";

export interface Personne {
  id: string;
  nom: string;
  prenom: string;
  nombreTicket: number;
  categorie: Categorie;
  tickets: Ticket[];
  links: Lien[];
}
