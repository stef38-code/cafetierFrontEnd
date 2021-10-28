import {Action} from '@ngrx/store';
import {Personne} from "../model/personne";
import {PersonneTypeAction} from "./personne-type-action";
import {Categorie} from "../model/categorie";
import {CategorieTypeAction} from "./categorie-type-action";

export namespace CategorieAction {

  export class Add implements Action {
    public readonly type =  CategorieTypeAction.ADD;

    constructor(public payload: Categorie) {
    }
  }

  export class Load implements Action {
    public readonly type =  CategorieTypeAction.LOAD;
  }

  export class LoadSuccessAction implements Action {
    public readonly type =  CategorieTypeAction.LOAD_SUCCESS_ACTION;

    constructor(public payload: Categorie[]) {
    }
  }

  export class LoadFailAction implements Action {
    public readonly type =  CategorieTypeAction.LOAD_FAIL_ACTION;

    constructor(public payload: Error) {
    }
  }
  export class editerAction implements Action {
    public readonly type =  CategorieTypeAction.EDIT;

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
