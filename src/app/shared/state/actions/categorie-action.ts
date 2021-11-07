import {Action} from '@ngrx/store';
import {Categorie} from "../model/categorie";
import {CategorieTypesActions} from "./categorie-types-actions";

export namespace CategorieAction {

  export class Add implements Action {
    public readonly type = CategorieTypesActions.ADD;

    constructor(public payload: Categorie) {
    }
  }

  export class Delete implements Action {
    public readonly type = CategorieTypesActions.DELETE;

    constructor(public payload: Categorie) {
    }
  }

  export class Load implements Action {
    public readonly type = CategorieTypesActions.LOAD;

    constructor(public payload: Categorie) {
    }
  }

  export class LoadSuccessAction implements Action {
    public readonly type = CategorieTypesActions.LOAD_SUCCESS_ACTION;

    constructor(public payload: Categorie) {
    }
  }

  export class LoadFailAction implements Action {
    public readonly type = CategorieTypesActions.LOAD_FAIL_ACTION;

    constructor(public payload: Error) {
    }
  }

  export class editerAction implements Action {
    public readonly type = CategorieTypesActions.EDIT;

    constructor() {
    }
  }

  /**
   *
   */
  export type Actions =
    Add
    | Delete
    | Load
    | LoadSuccessAction
    | LoadFailAction
    | editerAction
    ;
}
