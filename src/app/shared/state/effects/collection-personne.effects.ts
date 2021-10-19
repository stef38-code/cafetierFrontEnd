import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, tap} from "rxjs/operators";
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class CollectionPersonneEffects {

  /*loadCollection$ = createEffect(() => {
    this.actions$
    .ofType(collection.LOAD)
    .startWith(new collection.LoadAction())
    .switchMap(() =>
      this.db.query('books')
        .toArray()
        .map((Personnes: Personnes[]) => new collection.LoadSuccessAction(books))
        .catch(error => of(new collection.LoadFailAction(error)))
  });*/

/*
  addBookToCollection$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(collection.ADD_PERSONNE),
        map((action: collection.AddPersonneAction) => action.payload)
        ,
        tap((action) => {
          console.log('handler ADD_PERSONNE', action)
          //new collection.AddPersonneSuccessAction(action.payload);
        }),
      )
    },
    {dispatch: false}
  );
*/


  /*addBookToCollection$= createEffect(() => {
    return this.actions$.pipe(
      ofType(collection.ADD_PERSONNE)
    ,
      switchMap( personne => {
        console.log('handler rejected', personne)
      }),

     /!* map(() => (action: collection.AddPersonneAction) => action.payload)*!/
        /!*.mergeMap(personne => {
          map(() => new collection.AddPersonneSuccessAction(personne))
            .catch(() => of(new collection.AddPersonneFailAction(personne)))
        })
         ,
      { console.log('bidule') }*!/

    )});*/

  constructor(private actions$: Actions) {
  }

}
