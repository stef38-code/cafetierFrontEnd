import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {HttpClient} from "@angular/common/http";
import {Store} from "@ngrx/store";
import {ApplicationStore} from "../reducers";
import {map, tap} from "rxjs/operators";
import {TicketHttpService} from "../../services/ticket-http.service";
import {Ticket} from "../model/ticket";
import {CollectionTicketAction} from "../actions/collection-tickets-action";
import {CollectionTicketsTypesActions} from "../actions/collection-tickets-types-actions";


@Injectable()
export class CollectionTicketEffects {

  private httpTicket: TicketHttpService;

  constructor(private action$: Actions, private http$: HttpClient, private store: Store<ApplicationStore.State>) {
    this.httpTicket = new TicketHttpService(this.http$);
  }

  effectLoadTicket$ = createEffect(
    () => this.action$.pipe(
      ofType(CollectionTicketsTypesActions.LOAD),
      map(action => {
          this.httpTicket!.lister().subscribe(
            (r: Ticket[]) => {
              this.store.dispatch(new CollectionTicketAction.LoadSuccessAction(r));
            },
            e => console.log("error chargement des tickets", e)
          )
        }
      ),
      tap(() => console.log('Action LOAD Dispatched'))
    ),
    {dispatch: false}
  );
  effectLoadSuccessTicket$ = createEffect(
    () => this.action$.pipe(
      ofType(CollectionTicketsTypesActions.LOAD_SUCCESS_ACTION),
      tap((payload) => console.log('Action LOAD_SUCCESS_ACTION Dispatched', payload))
    ),
    {dispatch: false}
  );
}
