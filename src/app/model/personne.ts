export class Personne {
  id: string = '';
  nom: string = '';
  prenom: string = '';
  numero: string = '';
  nombreTicket: number = 0;
  links: Links[] = [] ;
}
export class Links {
  rel: string = '';
  href: string = '';
  type: string = '';
}
