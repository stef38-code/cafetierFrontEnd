import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, Subscription} from "rxjs";
import {Ticket} from "../state/model/ticket";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TicketHttpService {
  private ApiURL: string = environment.hostBackend.concat('ticket');

  optionRequete: any = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private httpclient: HttpClient) {
  }

  delete(href: string) {
    const headers = {'content-type': 'application/json'};
    return this.httpclient.delete<Ticket>(href, {'headers': headers});
  }

  liberer(href: string): Subscription {
    const headers = {'content-type': 'application/json'}
    return this.httpclient.delete(href, this.optionRequete).subscribe(response => {
      console.log('suppresion d\'un ticket', JSON.stringify(response));
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
    return this.httpclient.post<Ticket>(newUrl, {'headers': headers});
  }

  add(ticket: any) {
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(ticket.payload);
    console.log("const Add Ticket body", body);
    return this.httpclient.post<Ticket>(this.ApiURL, body, {'headers': headers});
  }

  editer(href: string): Observable<Ticket> {
    const headers = {'content-type': 'application/json'};
    return this.httpclient.get<Ticket>(href, {'headers': headers});

  }

  enregister(ticket: Ticket): Observable<Ticket> {
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(ticket);
    console.log("const body", body);
    return this.httpclient.post<Ticket>(this.ApiURL, body, {'headers': headers});
  }
}
