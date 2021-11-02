import {Action} from '@ngrx/store';
import {Personne} from "../model/personne";
import {CollectionPersonnesTypesActions} from "./collection-personnes-types-actions";

export namespace CollectionPersonneAction {

  export class Add implements Action {
    public readonly type = CollectionPersonnesTypesActions.ADD;

    constructor(public payload: Personne) {
    }
  }

  export class Load implements Action {
    public readonly type = CollectionPersonnesTypesActions.LOAD;
  }

  export class LoadSuccessAction implements Action {
    public readonly type = CollectionPersonnesTypesActions.LOAD_SUCCESS_ACTION;

    constructor(public payload: Personne[]) {
    }
  }

  export class LoadFailAction implements Action {
    public readonly type = CollectionPersonnesTypesActions.LOAD_FAIL_ACTION;

    constructor(public payload: Error) {
    }
  }

  export class editerAction implements Action {
    public readonly type = CollectionPersonnesTypesActions.EDIT;

    constructor(public payload: string) {
    }
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
