import {Lien} from "./lien";

export interface Personne {
  id: string;
  nom: string;
  prenom: string;
  numero: string;
  nombreTicket: number;
  links: Lien[];
}
