import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Categorie} from "../state/model/categorie";

@Injectable({
  providedIn: 'root'
})
export class CategorieHttpService {
  private ApiURL: string = 'http://localhost:8080/categories';

  constructor(private httpclient: HttpClient) {
  }

  lister(): Observable<Categorie[]> {
    return this.httpclient.get<Categorie[]>(this.ApiURL);
  }
}
