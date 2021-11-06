import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Ticket} from "../state/model/ticket";
import {Categorie} from "../state/model/categorie";

@Injectable({
  providedIn: 'root'
})
export class TicketHttpService {
  private ApiURL: string = 'http://localhost:8080/ticket';

  constructor(private httpclient: HttpClient) {
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
}
