import {TicketStore} from "../store/ticket";
import {TicketAction} from "../actions/ticket-action";
import {TicketTypesActions} from "../actions/ticket-types-actions";

export namespace TicketReducer {
  export function reducer(state = TicketStore.initialState, action: TicketAction.Actions): TicketStore.State {
    switch (action.type) {
      case TicketTypesActions.LOAD: {
        return state;
      }
      case TicketTypesActions.ADD: {
        state.entitie = action.payload;

        return state;

      }

      case TicketTypesActions.LOAD_SUCCESS_ACTION: {
        state.entitie = action.payload;
        return state;
      }
      case TicketTypesActions.EDIT: {
        return {
          entitie: state.entitie,
        };
      }
      default: {
        return state;
      }
    }
  }
}

