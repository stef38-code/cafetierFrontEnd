import {Ticket} from '../model/ticket';
import {TicketAction} from '../actions/ticket-action';
import * as ticketStore from '../store/Ticket';
import {TicketStore} from '../store/Ticket';
import {TicketTypeAction} from "../actions/ticket-type-action";

export namespace TicketReducer {
  export function reducer(state = TicketStore.initialState, action: TicketAction.Actions): TicketStore.State {
    switch (action.type) {
      case TicketTypeAction.LOAD: {
        console.log("Chargement des tickets");
        return state;
      }
      case TicketTypeAction.ADD: {
        console.log("Ajout d'un ticket")
        const ticket: Ticket = action.payload;
        if (state.ids.indexOf(ticket.id) > -1) {
          return state;
        }
        return Object.assign({}, state, {
          ids: [...state.ids, ticket.id],
          entities: Object.assign({}, state.entities, {
            [ticket.id]: ticket
          }),
          selectedPersonneId: state.selectedId
        });
      }

      case TicketTypeAction.LOAD_SUCCESS_ACTION: {
        const tickets = action.payload;
        const newticket = tickets.filter(personne => !state.entities[personne.id]);

        const newTicketIds = newticket.map(personne => personne.id);
        const newTicketEntities = newticket.reduce((entities: { [id: string]: Ticket }, ticket: Ticket) => {
          return Object.assign(entities, {
            [ticket.id]: ticket
          });
        }, {});
        return {
          ids: [...state.ids, ...newTicketIds],
          entities: Object.assign({}, state.entities, newTicketEntities),
          selectedId: state.selectedId
        };
      }
      case TicketTypeAction.EDIT: {
        return {
          ids: state.ids,
          entities: state.entities,
          selectedId: action.payload
        };
      }
      default: {
        return state;
      }
    }
  }
}

