import {Action} from '@ngrx/store';
import {Ticket} from "../model/ticket";
import {CollectionTicketsTypesActions} from "./collection-tickets-types-actions";

export namespace CollectionTicketAction {

  export class Add implements Action {
    public readonly type = CollectionTicketsTypesActions.ADD;

    constructor(public payload: Ticket) {
    }
  }

  export class Load implements Action {
    public readonly type = CollectionTicketsTypesActions.LOAD;
  }

  export class LoadSuccessAction implements Action {
    public readonly type = CollectionTicketsTypesActions.LOAD_SUCCESS_ACTION;

    constructor(public payload: Ticket[]) {
    }
  }

  export class LoadFailAction implements Action {
    public readonly type = CollectionTicketsTypesActions.LOAD_FAIL_ACTION;

    constructor(public payload: Error) {
    }
  }

  export class editerAction implements Action {
    public readonly type = CollectionTicketsTypesActions.EDIT;

    constructor(public payload: string) {
    }
  }

  /**
   *
   */
  export type Actions =
    Add
    | Load
    | LoadSuccessAction
    | LoadFailAction
    | editerAction
    ;
}
