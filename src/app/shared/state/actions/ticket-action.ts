import {Action} from '@ngrx/store';
import {Personne} from "../model/personne";
import {PersonneTypeAction} from "./personne-type-action";
import {Ticket} from "../model/ticket";
import {TicketTypeAction} from "./ticket-type-action";

export namespace TicketAction {

  export class Add implements Action {
    public readonly type = TicketTypeAction.ADD;

    constructor(public payload: Ticket) {
    }
  }

  export class Load implements Action {
    public readonly type = TicketTypeAction.LOAD;
  }

  export class LoadSuccessAction implements Action {
    public readonly type = TicketTypeAction.LOAD_SUCCESS_ACTION;

    constructor(public payload: Ticket[]) {
    }
  }

  export class LoadFailAction implements Action {
    public readonly type = TicketTypeAction.LOAD_FAIL_ACTION;

    constructor(public payload: Error) {
    }
  }
  export class editerAction implements Action {
    public readonly type = TicketTypeAction.EDIT;

    constructor(public payload: string) { }
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
