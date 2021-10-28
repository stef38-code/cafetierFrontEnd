import {Ticket} from "../model/ticket";
export namespace TicketStore {
  export interface State {
    ids: string[];
    entities: { [id: string]: Ticket };
    selectedId: string | null;
  };
  export const initialState: State = {
    ids: [],
    entities: {},
    selectedId: '',
  };
}
