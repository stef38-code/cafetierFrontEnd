import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {Personne} from "../../shared/state/model/personne.model";
import {Observable} from "rxjs";

export class HttpPersonne {
  baseURL: string = "http://localhost:8080/";

  prefix: string = 'personne';
  optionRequete: any = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*'
    })
  };
  constructor(private http: HttpClient) {

  }
  lister(): Observable<Personne> {
    let personneObservable = this.http.get<Personne>(this.baseURL + this.prefix);
    return personneObservable;
  }
  ajouter(personne:Personne): Observable<Personne> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(personne);
    console.log(body)
    return this.http.post<Personne>(this.baseURL + this.prefix, body,{'headers':headers})
  }
  supprimer(url:string): Observable<Personne>{
    const headers = { 'content-type': 'application/json'}
    this.http.delete(url,this.optionRequete).subscribe(response => {
      console.log(JSON.stringify(response))
    });
    return this.lister();
  }

  editer(url: string): Observable<Personne> {
    const headers = { 'content-type': 'application/json'};
    return this.http.get<Personne>(url, {'headers':headers})
  }
}
