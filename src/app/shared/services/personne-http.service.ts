import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Personne} from "../state/model/personne";

@Injectable({
  providedIn: 'root'
})
export class PersonneHttpService {

  private ApiURL: string = 'http://localhost:8080/personne';
  optionRequete: any = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*'
    })
  };
  constructor(private httpclient: HttpClient) { }

  lister(): Observable<Personne[]> {
    return this.httpclient.get<Personne[]>(this.ApiURL);
  }
  ajouter(personne:Personne): Observable<Personne> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(personne);
    console.log(body)
    return this.httpclient.post<Personne>(this.ApiURL, body,{'headers':headers})
  }
  supprimer(url:string): Observable<Personne[]>{
    const headers = { 'content-type': 'application/json'}
    this.httpclient.delete(url,this.optionRequete).subscribe(response => {
      console.log(JSON.stringify(response))
    });
    return this.lister();
  }

  editer(url: string): Observable<Personne> {
    const headers = { 'content-type': 'application/json'};
    return this.httpclient.get<Personne>(url, {'headers':headers})
  }
}
