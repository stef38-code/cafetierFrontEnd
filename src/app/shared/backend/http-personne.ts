import {HttpClient} from "@angular/common/http";
import {Personne} from "../../model/personne";
import {Observable} from "rxjs";

export class HttpPersonne {
  baseURL: string = "http://localhost:8080/";

  prefix: string = 'personne';
  constructor(private http: HttpClient) { }
  getListPersonne(): Observable<Personne> {
    let personneObservable = this.http.get<Personne>(this.baseURL + this.prefix);
    personneObservable.forEach(pers=>{
      console.log(pers.nom);
    })
    return personneObservable;
  }
  addPersonne(personne:Personne): Observable<Personne> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(personne);
    console.log(body)
    return this.http.post<Personne>(this.baseURL + this.prefix, body,{'headers':headers})
  }
}
