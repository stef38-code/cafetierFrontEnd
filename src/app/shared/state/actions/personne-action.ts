import {Action} from '@ngrx/store';
import {Personne} from "../model/personne";
import {PersonneTypeAction} from "./personne-type-action";

export namespace PersonneAction {

  export class Add implements Action {
    public readonly type = PersonneTypeAction.ADD;

    constructor(public payload: Personne) {
    }
  }

  export class Load implements Action {
    public readonly type = PersonneTypeAction.LOAD;
  }

  export class LoadSuccessAction implements Action {
    public readonly type = PersonneTypeAction.LOAD_SUCCESS_ACTION;

    constructor(public payload: Personne[]) {
    }
  }

  export class LoadFailAction implements Action {
    public readonly type = PersonneTypeAction.LOAD_FAIL_ACTION;

    constructor(public payload: Error) {
    }
  }
  export class editerAction implements Action {
    public readonly type = PersonneTypeAction.EDIT;

    constructor(public payload: string) { }
  }
  /**
   *
   */
  export type Actions =
    Add
    | Load
    | LoadSuccessAction
    | LoadFailAction
    | editerAction
    ;
}
