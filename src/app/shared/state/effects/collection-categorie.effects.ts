import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, tap} from "rxjs/operators";
import {SystemAction} from "../actions/system-action";
import {HttpClient} from "@angular/common/http";
import {Store} from "@ngrx/store";
import {ApplicationStore} from "../reducers";
import {CategorieTypeAction} from "../actions/categorie-type-action";
import {CategorieHttpService} from "../../services/categorie-http.service";
import {CategorieAction} from "../actions/categorie-action";
import {Categorie} from "../model/categorie";


@Injectable()
export class CollectionCategorieEffects {

  effectLoadSuccessCategorie$ = createEffect(
    () => this.action$.pipe(
      ofType(CategorieTypeAction.LOAD_SUCCESS_ACTION),
      tap((payload) => console.log('Action LOAD_SUCCESS_ACTION Dispatched', payload))
    ),
    {dispatch: false}
  );
  private httpCategorie: CategorieHttpService;
  effectLoadPersonne$ = createEffect(
    () => this.action$.pipe(
      ofType(CategorieTypeAction.LOAD),
      map(action => {
          this.httpCategorie!.lister().subscribe(
            (r: Categorie[]) => {
              this.store.dispatch(new SystemAction.Start());
              this.store.dispatch(new CategorieAction.LoadSuccessAction(r));
              this.store.dispatch(new SystemAction.Stop());
            },
            e => console.log("error chargement des personne", e)
          )
        }
      ),
      tap(() => console.log('Action LOAD Dispatched'))
    ),
    {dispatch: false}
  );

  constructor(private action$: Actions, private http$: HttpClient, private store: Store<ApplicationStore.State>) {
    this.httpCategorie = new CategorieHttpService(this.http$);
  }

}
