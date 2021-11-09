import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Categorie} from "../state/model/categorie";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CategorieHttpService {
  private ApiURL: string = environment.hostBackend.concat('categories');

  constructor(private httpclient: HttpClient) {
  }

  lister(): Observable<Categorie[]> {
    return this.httpclient.get<Categorie[]>(this.ApiURL);
  }

  add(categorie: any): Observable<Categorie> {
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(categorie.payload);
    console.log("const body", body);
    return this.httpclient.post<Categorie>(this.ApiURL, body, {'headers': headers});
  }

  delete(href: string): Observable<any> {
    const headers = {'content-type': 'application/json'};
    return this.httpclient.delete<Categorie>(href, {'headers': headers});
  }

  editer(href: string): Observable<Categorie> {
    const headers = {'content-type': 'application/json'};
    return this.httpclient.get<Categorie>(href, {'headers': headers});
  }

  enregister(categorie: Categorie): Observable<Categorie> {
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(categorie);
    console.log("const body", body);
    return this.httpclient.post<Categorie>(this.ApiURL, body, {'headers': headers});
  }
}
