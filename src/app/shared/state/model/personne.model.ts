import {Lien} from "./lien.model";

export interface Personne {
  id: string;
  nom: string;
  prenom: string;
  numero: string;
  nombreTicket: number;
  links: Lien[];
}
