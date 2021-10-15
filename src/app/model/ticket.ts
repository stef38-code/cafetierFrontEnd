import {Links} from "./links";
import {Personne} from "./personne";

export class Ticket {
  id: string = '';
  numero: string= '';
  montant: number=0;
  links: Links[]= [];
  personne!: Personne;
}
