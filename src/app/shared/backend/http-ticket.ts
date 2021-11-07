import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Ticket} from "../state/model/ticket";
import {environment} from "../../../environments/environment";

export class HttpTicket {
  constructor(private http: HttpClient) { }
  getListTicket(): Observable<Ticket> {
    const href = environment.hostBackend.concat('ticket');
    const requestUrl = environment.hostBackend.concat('ticket');


    let ticketObservable = this.http.get<Ticket>(requestUrl);
    ticketObservable.forEach(ticket => {
      console.log(ticket.numero, ticket.montant);
    })
    return ticketObservable;
  }
}
