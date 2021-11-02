import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {CategorieHttpService} from "../../services/categorie-http.service";
import {HttpClient} from "@angular/common/http";
import {Store} from "@ngrx/store";
import {ApplicationStore} from "../reducers";
import {map, tap} from "rxjs/operators";
import {SystemAction} from "../actions/system-action";
import {CollectionCategorieAction} from "../actions/collection-categories-action";
import {Categorie} from "../model/categorie";
import {CategorieTypesActions} from "../actions/categorie-types-actions";
import {Lien} from "../model/lien";
import {CollectionPersonneAction} from "../actions/collection-personnes-action";
import {CollectionTicketAction} from "../actions/collection-tickets-action";


@Injectable()
export class CategorieEffectsEffects {
  private httpCategorie: CategorieHttpService;
  effectAddCategorie$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CategorieTypesActions.ADD),
        map((payload, c) => {
          /*console.log(JSON.stringify(payload));

          console.log(JSON.stringify(c));*/
          this.httpCategorie!.add(payload).subscribe(
            () => {
              this.store.dispatch(new SystemAction.Start());
              this.store.dispatch(new CollectionCategorieAction.Load());
              this.store.dispatch(new SystemAction.Stop());
            });
          return {} as Categorie;
        })
        ,
        tap((payload: Categorie) => console.log('Action LOAD Dispatched', payload))
      );
    },
    {dispatch: false}
  );
  effectDeleteCategorie$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CategorieTypesActions.DELETE),
        map((store: any, c) => {
          /*console.log(JSON.stringify(payload));
          payload.
          console.log(JSON.stringify(c));*/
          console.log("delete:", JSON.stringify(store.payload));
          const categorie: Categorie = store.payload;
          let links: Lien[] = categorie.links;
          const linkDelete: Lien | undefined = links.find(link => (link.rel === 'supprimer' && link.type === 'DELETE' && link.href.length !== 0));
          if (linkDelete) {
            console.log("delete:", JSON.stringify(linkDelete));
            this.httpCategorie!.delete(linkDelete.href).subscribe(
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

  constructor(
    private actions$: Actions,
    private http$: HttpClient,
    private store: Store<ApplicationStore.State>) {
    this.httpCategorie = new CategorieHttpService(this.http$);
  }
}
