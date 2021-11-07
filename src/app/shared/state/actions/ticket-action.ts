import {Action} from '@ngrx/store';
import {Ticket} from "../model/ticket";
import {TicketTypesActions} from "./ticket-types-actions";

export namespace TicketAction {

  export class Add implements Action {
    public readonly type = TicketTypesActions.ADD;

    constructor(public payload: Ticket) {
    }
  }

  export class Load implements Action {
    public readonly type = TicketTypesActions.LOAD;

    constructor(public payload: Ticket) {
    }
  }

  export class LoadSuccessAction implements Action {
    public readonly type = TicketTypesActions.LOAD_SUCCESS_ACTION;

    constructor(public payload: Ticket) {
    }
  }

  export class LoadFailAction implements Action {
    public readonly type = TicketTypesActions.LOAD_FAIL_ACTION;

    constructor(public payload: Error) {
    }
  }

  export class editerAction implements Action {
    public readonly type = TicketTypesActions.EDIT;

    constructor() {
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
