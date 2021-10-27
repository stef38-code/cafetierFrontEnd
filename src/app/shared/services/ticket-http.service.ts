import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Ticket} from "../state/model/ticket";

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
}
