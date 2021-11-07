import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, Subscription} from "rxjs";
import {Ticket} from "../state/model/ticket";
import {Categorie} from "../state/model/categorie";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TicketHttpService {

  optionRequete: any = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    })
  };
  private ApiURL: string = environment.hostBackend.concat('ticket');

  constructor(private httpclient: HttpClient) {
  }

  liberer(href: string): Subscription {
    const headers = {'content-type': 'application/json'}
    return this.httpclient.delete(href, this.optionRequete).subscribe(response => {
      console.log('suppresion d\'une personne', JSON.stringify(response));
    });
  }

  lister(): Observable<Ticket[]> {
    return this.httpclient.get<Ticket[]>(this.ApiURL);
  }

  nonAffecter(): Observable<Ticket[]> {
    return this.httpclient.get<Ticket[]>(this.ApiURL.concat("/nonAffectes"));
  }

  affecter(url: string, idPersonne: string): Observable<any> {
    const headers = {'content-type': 'application/json'};
    console.log("url:", url);
    console.log("id:", idPersonne);
    const newUrl = url.replace('@@', idPersonne).replace('idPersonne', idPersonne);
    console.log("newUrl:", newUrl);
    return this.httpclient.post<Categorie>(newUrl, {'headers': headers});
  }

  add(ticket: any) {
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(ticket.payload);
    console.log("const Add Ticket body", body);
    return this.httpclient.post<Ticket>(this.ApiURL, body, {'headers': headers});
  }
}
