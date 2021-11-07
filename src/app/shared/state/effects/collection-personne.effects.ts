import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {HttpClient} from "@angular/common/http";
import {CollectionPersonnesTypesActions} from "../actions/collection-personnes-types-actions";
import {CollectionPersonneAction} from "../actions/collection-personnes-action";
import {map, tap} from "rxjs/operators";
import {Personne} from "../model/personne";
import {PersonneHttpService} from "../../services/personne-http.service";
import {Store} from "@ngrx/store";
import {ApplicationStore} from "../reducers";
import {SystemAction} from "../actions/system-action";
import {Categorie} from "../model/categorie";
import {Lien} from "../model/lien";
import {CollectionCategorieAction} from "../actions/collection-categories-action";
import {CollectionTicketAction} from "../actions/collection-tickets-action";
import {PersonneTypesActions} from "../actions/personne-types-actions";


@Injectable()
export class CollectionPersonneEffects {
  effectLoadSuccessPersonne$ = createEffect(
    () => this.action$.pipe(
      ofType(CollectionPersonnesTypesActions.LOAD_SUCCESS_ACTION),
      tap((payload) => console.log('Action LOAD_SUCCESS_ACTION Dispatched', payload))
    ),
    {dispatch: false}
  );
  private httpPersonne: PersonneHttpService;
  effectLoadPersonne$ = createEffect(
    () => this.action$.pipe(
      ofType(CollectionPersonnesTypesActions.LOAD),
      map(action => {
          this.httpPersonne!.lister().subscribe(
            (r: Personne[]) => {
              this.store.dispatch(new SystemAction.Start());
              this.store.dispatch(new CollectionPersonneAction.LoadSuccessAction(r));
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
  effectDeleteCategorie$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(PersonneTypesActions.DELETE),
        map((store: any, c) => {
          console.log("delete:", JSON.stringify(store.payload));
          const personne: Personne = store.payload;
          let links: Lien[] = personne.links;
          const linkDelete: Lien | undefined = links.find(link => (link.rel === 'supprimer' && link.type === 'DELETE' && link.href.length !== 0));
          if (linkDelete) {
            console.log("delete:", JSON.stringify(linkDelete));
            this.httpPersonne!.supprimer(linkDelete.href).subscribe(
              () => {
                this.store.dispatch(new SystemAction.Start());
                this.store.dispatch(new CollectionCategorieAction.Load());
                this.store.dispatch(new CollectionPersonneAction.Load());
                this.store.dispatch(new CollectionTicketAction.Load());
                this.store.dispatch(new SystemAction.Stop());
              });
          }
          return {} as Categorie;
        })
        ,
        tap((payload: Categorie) => console.log('Action LOAD Dispatched', payload))
      );
    },
    {dispatch: false}
  );

  constructor(private action$: Actions, private http$: HttpClient, private store: Store<ApplicationStore.State>) {
    this.httpPersonne = new PersonneHttpService(this.http$);
  }

}
