import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {Personne} from "../../model/personne";
import {Observable} from "rxjs";

export class HttpPersonne {
  baseURL: string = "http://localhost:8080/";

  prefix: string = 'personne';
  optionRequete: any = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
      'mon-entete-personnalise':'maValeur'
    })
  };
  constructor(private http: HttpClient) {

  }
  getListPersonne(): Observable<Personne> {
    let personneObservable = this.http.get<Personne>(this.baseURL + this.prefix);
    return personneObservable;
  }
  addPersonne(personne:Personne): Observable<Personne> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(personne);
    console.log(body)
    return this.http.post<Personne>(this.baseURL + this.prefix, body,{'headers':headers})
  }
  deletePersonne(url:string){
    const headers = { 'content-type': 'application/json'}
    this.http.delete(url,{'headers':headers}).subscribe(response => {
      console.log(JSON.stringify(response))
    });
  }
}
