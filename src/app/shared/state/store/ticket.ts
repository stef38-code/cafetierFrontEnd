import {Ticket} from "../model/ticket";

export namespace TicketStore {
  export interface State {
    entitie: Ticket;
  };
  export const initialState: State = {
    entitie: {} as Ticket,
  };
}
