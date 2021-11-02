import {Ticket} from '../model/ticket';
import {CollectionTicketAction} from '../actions/collection-tickets-action';
import {CollectionTicketsStore} from '../store/collection-tickets';
import {CollectionTicketsTypesActions} from "../actions/collection-tickets-types-actions";

export namespace CollectionTicketsReducer {
  export function reducer(state = CollectionTicketsStore.initialState, action: CollectionTicketAction.Actions): CollectionTicketsStore.State {
    switch (action.type) {
      case CollectionTicketsTypesActions.LOAD: {
        console.log("Chargement des tickets");
        return state;
      }
      case CollectionTicketsTypesActions.ADD: {
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

      case CollectionTicketsTypesActions.LOAD_SUCCESS_ACTION: {
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
      case CollectionTicketsTypesActions.EDIT: {
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

