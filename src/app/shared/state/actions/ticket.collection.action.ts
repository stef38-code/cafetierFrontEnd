import { Action } from '@ngrx/store';
import { Ticket } from '../model/ticket.model';


export const ADD_TICKET =             '[Ticket Collection] Add Ticket';
export const ADD_TICKET_SUCCESS =     '[Ticket Collection] Add Ticket Success';
export const ADD_TICKET_FAIL =        '[Ticket Collection] Add Ticket Fail';
export const REMOVE_TICKET =          '[Ticket Collection] Remove Ticket';
export const REMOVE_TICKET_SUCCESS =  '[Ticket Collection] Remove Ticket Success';
export const REMOVE_TICKET_FAIL =     '[Ticket Collection] Remove Ticket Fail';
export const LOAD =                 '[Ticket Collection] Load';
export const LOAD_SUCCESS =         '[Ticket Collection] Load Success';
export const LOAD_FAIL =            '[Ticket Collection] Load Fail';


/**
 * Add Ticket to Collection Actions
 */
export class AddTicketAction implements Action {
  readonly type = ADD_TICKET;

  constructor(public payload: Ticket) { }
}

export class AddTicketSuccessAction implements Action {
  readonly type = ADD_TICKET_SUCCESS;

  constructor(public payload: Ticket) { }
}

export class AddTicketFailAction implements Action {
  readonly type = ADD_TICKET_FAIL;

  constructor(public payload: Ticket) { }
}


/**
 * Remove Ticket from Collection Actions
 */
export class RemoveTicketAction implements Action {
  readonly type = REMOVE_TICKET;

  constructor(public payload: Ticket) { }
}

export class RemoveTicketSuccessAction implements Action {
  readonly type = REMOVE_TICKET_SUCCESS;

  constructor(public payload: Ticket) { }
}

export class RemoveTicketFailAction implements Action {
  readonly type = REMOVE_TICKET_FAIL;

  constructor(public payload: Ticket) {}
}

/**
 * Load Collection Actions
 */
export class LoadTicketAction implements Action {
  readonly type = LOAD;
}

export class LoadTicketSuccessAction implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: Ticket[]) { }
}

export class LoadTicketFailAction implements Action {
  readonly type = LOAD_FAIL;

  constructor(public payload: any) { }
}


export type Actions
  = AddTicketAction
  | AddTicketSuccessAction
  | AddTicketFailAction
  | RemoveTicketAction
  | RemoveTicketSuccessAction
  | RemoveTicketFailAction
  | LoadTicketAction
  | LoadTicketSuccessAction
  | LoadTicketFailAction;
