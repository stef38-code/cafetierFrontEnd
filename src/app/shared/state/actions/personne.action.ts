import {Action} from '@ngrx/store';
import {Personne} from "../model/personne.model";
import {PersonneTypeAction} from "./personne-type-action";

export const ADD = '[Personne] Ajout';

export class Add implements Action {
  public readonly type = PersonneTypeAction.ADD;
  constructor(public payload: Personne) {
  }
}
export class Load implements Action {
  public readonly type = PersonneTypeAction.LOAD;
}

/**
 *
 */
export type Actions =
  Add
  | Load
;
