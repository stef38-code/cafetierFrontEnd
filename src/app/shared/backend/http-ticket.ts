import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Ticket} from "../state/model/ticket";

export class HttpTicket {
  constructor(private http: HttpClient) { }
  getListTicket(): Observable<Ticket> {
    const href = 'http://localhost:8080/ticket';
    const requestUrl ='http://localhost:8080/ticket';


    let ticketObservable = this.http.get<Ticket>(requestUrl);
    ticketObservable.forEach(ticket=>{
      console.log(ticket.numero,ticket.montant);
    })
    return ticketObservable;
  }
}
