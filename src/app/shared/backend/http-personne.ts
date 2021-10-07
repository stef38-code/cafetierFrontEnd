import {HttpClient} from "@angular/common/http";
import {Personne} from "../../model/personne";
import {Observable} from "rxjs";

export class HttpPersonne {
  constructor(private http: HttpClient) { }
  getListPersonne(): Observable<Personne> {
    const href = 'http://localhost:8080/personne';
    const requestUrl ='http://localhost:8080/personne';


    let personneObservable = this.http.get<Personne>(requestUrl);
    personneObservable.forEach(pers=>{
      console.log(pers.nom);
    })
    return personneObservable;
  }
}
