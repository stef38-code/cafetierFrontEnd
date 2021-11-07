import {Action} from '@ngrx/store';
import {Personne} from "../model/personne";
import {PersonneTypesActions} from "./personne-types-actions";

export namespace PersonneAction {

  export class Add implements Action {
    public readonly type = PersonneTypesActions.ADD;

    constructor(public payload: Personne) {
    }
  }

  export class Load implements Action {
    public readonly type = PersonneTypesActions.LOAD;

    constructor(public payload: Personne) {
    }
  }

  export class LoadSuccessAction implements Action {
    public readonly type = PersonneTypesActions.LOAD_SUCCESS_ACTION;

    constructor(public payload: Personne) {
    }
  }

  export class Delete implements Action {
    public readonly type = PersonneTypesActions.DELETE;

    constructor(public payload: Personne) {
    }
  }

  export class LoadFailAction implements Action {
    public readonly type = PersonneTypesActions.LOAD_FAIL_ACTION;

    constructor(public payload: Error) {
    }
  }

  export class Clear implements Action {
    public readonly type = PersonneTypesActions.CLEAR;

    constructor() {
    }
  }

  export class editerAction implements Action {
    public readonly type = PersonneTypesActions.EDIT;

    constructor(public payload: Personne) {
    }
  }

  /**
   *
   */
  export type Actions =
    Add
    | Load
    | Delete
    | Clear
    | LoadSuccessAction
    | LoadFailAction
    | editerAction
    ;


}
