import {Lien} from "./lien";
import {Ticket} from "./ticket";
import {Categorie} from "./categorie";

export interface RefPersonne {
  id: string;
  links: Lien[];
}

export interface Personne extends RefPersonne {
  nom: string;
  prenom: string;
  nombreTicket: number;
  categorie: Categorie;
  tickets: Ticket[];

}
