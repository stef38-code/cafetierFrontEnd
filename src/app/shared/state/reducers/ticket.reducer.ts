import {Ticket} from '../model/ticket.model';
import * as ticketAction from '../actions/ticket.action';
import {createSelector} from "@ngrx/store";

export interface State {
  ids: string[];
  entities: { [id: string]: Ticket };
  selectedTicketId: string | null;
};
export const initialState: State = {
  ids: [],
  entities: {},
  selectedTicketId: null,
};

export function reducer(state = initialState, action: ticketAction.Actions): State {
  switch (action.type) {
    case ticketAction.SEARCH_COMPLETE: {
      const tickets = action.payload;
      const newPersonne = tickets.filter(ticket => !state.entities[ticket.id]);

      const newTicketIds = newPersonne.map(ticket => ticket.id);
      const newTicketEntities = newPersonne.reduce((entities: { [id: string]: Ticket }, ticket: Ticket) => {
        return Object.assign(entities, {
          [ticket.id]: ticket
        });
      }, {});

      return {
        ids: [...state.ids, ...newTicketIds],
        entities: Object.assign({}, state.entities, newTicketEntities),
        selectedTicketId: state.selectedTicketId
      };
    }

    case ticketAction.LOAD: {
      const ticket = action.payload;

      if (state.ids.indexOf(ticket.id) > -1) {
        return state;
      }

      return {
        ids: [...state.ids, ticket.id],
        entities: Object.assign({}, state.entities, {
          [ticket.id]: ticket
        }),
        selectedTicketId: state.selectedTicketId
      };
    }

    case ticketAction.SELECT: {
      return {
        ids: state.ids,
        entities: state.entities,
        selectedTicketId: action.payload
      };
    }

    default: {
      return state;
    }
  }
}

/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */

export const getEntities = (state: State) => state.entities;

export const getIds = (state: State) => state.ids;

export const getSelectedId = (state: State) => state.selectedTicketId;

export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
  if (selectedId)
    return entities[selectedId];

  return null;
});

export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
  return ids.map(id => entities[id]);
});
