import {TicketStore} from "../store/ticket";
import {TicketAction} from "../actions/ticket-action";
import {TicketTypesActions} from "../actions/ticket-types-actions";

export namespace TicketReducer {
  export function reducer(state = TicketStore.initialState, action: TicketAction.Actions): TicketStore.State {
    switch (action.type) {
      case TicketTypesActions.LOAD: {
        return {entitie: action.payload};
      }
      case TicketTypesActions.ADD: {
        return {
          entitie: action.payload
        };

      }

      case TicketTypesActions.LOAD_SUCCESS_ACTION: {
        return Object.assign({}, state, {
          entitie: action.payload
        });
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

