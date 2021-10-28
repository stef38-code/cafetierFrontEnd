import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {HttpClient} from "@angular/common/http";
import {PersonneTypeAction} from "../actions/personne-type-action";
import {PersonneAction} from "../actions/personne-action";
import {map, tap} from "rxjs/operators";
import {Personne} from "../model/personne";
import {PersonneHttpService} from "../../services/personne-http.service";
import {Store} from "@ngrx/store";
import {ApplicationStore} from "../reducers";
import {SystemAction} from "../actions/system-action";


@Injectable()
export class CollectionPersonneEffects {
  effectLoadSuccessPersonne$ = createEffect(
    () => this.action$.pipe(
      ofType(PersonneTypeAction.LOAD_SUCCESS_ACTION),
      tap((payload) => console.log('Action LOAD_SUCCESS_ACTION Dispatched', payload))
    ),
    {dispatch: false}
  );
  private httpPersonne: PersonneHttpService;
  effectLoadPersonne$ = createEffect(
    () => this.action$.pipe(
      ofType(PersonneTypeAction.LOAD),
      map(action => {
          this.httpPersonne!.lister().subscribe(
            (r: Personne[]) => {
              this.store.dispatch(new SystemAction.Start());
              this.store.dispatch(new PersonneAction.LoadSuccessAction(r));
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
    this.httpPersonne = new PersonneHttpService(this.http$);
  }

}