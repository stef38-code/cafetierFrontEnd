/**
 * combineReducers is another useful metareducer that takes a map of reducer
 * functions and creates a new reducer that gathers the values
 * of each reducer and stores them using the reducer's key. Think of it
 * almost like a database, where every reducer is a table in the db.
 *
 * More: https://egghead.io/lessons/javascript-redux-implementing-combinereducers-from-scratch
 */
import {ActionReducer, ActionReducerMap, combineReducers} from '@ngrx/store';
import {environment} from '../../../../environments/environment';

/**
 * The compose function is one of our most handy tools. In basic terms, you give
 * it any number of functions and it returns a function. This new function
 * takes a value and chains it through every composed function, returning
 * the output.
 *
 * More: https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch5.html
 */
import {compose} from '@ngrx/core/compose';

/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import {storeFreeze} from 'ngrx-store-freeze';


/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */
import {CollectionPersonnesStore} from '../store/collection-personnes';
import {CollectionPersonnesReducer} from './collection-personnes';
import {CollectionTicketsStore} from '../store/collection-tickets';
import {CollectionTicketsReducer} from './collection-tickets';
import {CollectionCategoriesStore} from '../store/collection-categories';
import {CollectionCategoriesRecuder} from './collection-categories';
import {CategorieRecuder} from './categorie';
import {SystemReducer} from "./system";
import {SystemStore} from "../store/system";
import {PersonneStore} from "../store/personne";
import {CategorieStore} from "../store/categorie";
import {TicketStore} from "../store/ticket";
import {PersonneReducer} from "./personne";
import {TicketReducer} from "./ticket";

export namespace ApplicationStore {

  /**
   */
  export interface State {
    personnes: CollectionPersonnesStore.State;
    personne: PersonneStore.State;
    tickets: CollectionTicketsStore.State;
    ticket: TicketStore.State;
    categories: CollectionCategoriesStore.State;
    categorie: CategorieStore.State;
    system: SystemStore.State;
  }


  /**
   */
  export const reducers: ActionReducerMap<State, any> = {
    personnes: CollectionPersonnesReducer.reducer,
    personne: PersonneReducer.reducer,
    tickets: CollectionTicketsReducer.reducer,
    ticket: TicketReducer.reducer,
    categories: CollectionCategoriesRecuder.reducer,
    categorie: CategorieRecuder.reducer,
    system: SystemReducer.reducer
  };

  const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
  const productionReducer: ActionReducer<State> = combineReducers(reducers);

  export function reducer(state: any, action: any) {
    if (environment.production) {
      console.log("-productionReducer----");
      return productionReducer(state, action);
    } else {
      console.log("-developmentReducer----");
      return developmentReducer(state, action);
    }
  }

}
