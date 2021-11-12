import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, tap} from "rxjs/operators";
import {SystemAction} from "../actions/system-action";
import {PersonneHttpService} from "../../services/personne-http.service";
import {PersonneTypesActions} from "../actions/personne-types-actions";
import {HttpClient} from "@angular/common/http";
import {Store} from "@ngrx/store";
import {ApplicationStore} from "../reducers";
import {Personne} from "../model/personne";
import {CollectionPersonneAction} from "../actions/collection-personnes-action";
import {PersonneAction} from "../actions/personne-action";


@Injectable()
export class PersonneEffectsEffects {

  private httpPersonne: PersonneHttpService;
  effectAddCategorie$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(PersonneTypesActions.ADD),
        map((payload, c) => {
          //console.log(JSON.stringify(payload));

          //console.log(JSON.stringify(c));
          this.httpPersonne!.add(payload).subscribe(
            (res) => {
              this.store.dispatch(new SystemAction.Start());
              this.store.dispatch(new CollectionPersonneAction.Load());
              this.store.dispatch(new PersonneAction.Load(res));
              this.store.dispatch(new SystemAction.Stop());
            });
          return {} as Personne;
        })
        ,
        tap((payload: Personne) => console.log('Action LOAD Dispatched', payload))
      );
    },
    {dispatch: false}
  );

  /* effectEditCategorie$ = createEffect(
     () => {
       return this.actions$.pipe(
         ofType(PersonneTypesActions.EDIT),
         map((url:any) => {
           console.log("edition",JSON.stringify(url));
           this.httpPersonne!.editer(url.payload).subscribe(
             (res) => {
               this.store.dispatch(new SystemAction.Start());
               this.store.dispatch(new CollectionPersonneAction.Load());
               console.log("---Personne editable----",JSON.stringify(res));
               this.store.dispatch(new PersonneAction.Load(res));
               this.store.dispatch(new SystemAction.Stop());
             });
           return {} as Personne;
         })
         ,
         tap((payload: Personne) => console.log('Action Editer Dispatched', payload))
       );
     },
     {dispatch: false}
   );*/
  constructor(private actions$: Actions,
              private http$: HttpClient,
              private store: Store<ApplicationStore.State>) {
    this.httpPersonne = new PersonneHttpService(this.http$);
  }

}
