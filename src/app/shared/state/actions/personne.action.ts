import { Action } from '@ngrx/store';
import {Personne} from "../model/personne.model";
export const SEARCH =           '[Personne] Search';
export const SEARCH_COMPLETE =  '[Personne] Search Complete';
export const LOAD =             '[Personne] Load';
export const SELECT =           '[Personne] Select';


/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
/*export class SearchAction implements Action {
  readonly type = SEARCH;

  constructor(public payload: string) { }
}

export class SearchCompleteAction implements Action {
  readonly type = SEARCH_COMPLETE;

  constructor(public payload: Personne[]) { }
}

export class LoadAction implements Action {
  readonly type = LOAD;

  constructor(public payload: Personne) { }
}



/!**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 *!/
export type Actions
  = SearchAction
  | SearchCompleteAction
  | LoadAction
  //| SelectAction
  ;*/
export class SelectPersonneAction implements Action {
  public readonly type = SELECT;
  constructor(public payload: string) { }
}
export type Actions = SelectPersonneAction;
