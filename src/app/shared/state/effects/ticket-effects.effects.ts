import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, tap} from "rxjs/operators";
import {SystemAction} from "../actions/system-action";
import {HttpClient} from "@angular/common/http";
import {Store} from "@ngrx/store";
import {ApplicationStore} from "../reducers";
import {TicketHttpService} from "../../services/ticket-http.service";
import {TicketTypesActions} from "../actions/ticket-types-actions";
import {CollectionTicketAction} from "../actions/collection-tickets-action";
import {Ticket} from "../model/ticket";


@Injectable()
export class TicketEffectsEffects {

  private httpTicket: TicketHttpService;
  effectAddCategorie$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(TicketTypesActions.ADD),
        map((payload, c) => {
          /*console.log(JSON.stringify(payload));

          console.log(JSON.stringify(c));*/
          this.httpTicket!.add(payload).subscribe(
            () => {
              this.store.dispatch(new SystemAction.Start());
              this.store.dispatch(new CollectionTicketAction.Load());
              this.store.dispatch(new SystemAction.Stop());
            });
          return {} as Ticket;
        })
        ,
        tap((payload: Ticket) => console.log('Action LOAD Dispatched', payload))
      );
    },
    {dispatch: false}
  );

  constructor(private actions$: Actions,
              private http$: HttpClient,
              private store: Store<ApplicationStore.State>) {
    this.httpTicket = new TicketHttpService(this.http$);
  }
}
