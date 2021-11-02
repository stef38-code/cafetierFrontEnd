import {Action} from '@ngrx/store';
import {Categorie} from "../model/categorie";
import {CollectionCategoriesTypesActions} from "./collection-categories-types-actions";

export namespace CollectionCategorieAction {

  export class Add implements Action {
    public readonly type = CollectionCategoriesTypesActions.ADD;

    constructor(public payload: Categorie) {
    }
  }

  export class Load implements Action {
    public readonly type = CollectionCategoriesTypesActions.LOAD;
  }

  export class LoadSuccessAction implements Action {
    public readonly type = CollectionCategoriesTypesActions.LOAD_SUCCESS_ACTION;

    constructor(public payload: Categorie[]) {
    }
  }

  export class LoadFailAction implements Action {
    public readonly type = CollectionCategoriesTypesActions.LOAD_FAIL_ACTION;

    constructor(public payload: Error) {
    }
  }

  export class editerAction implements Action {
    public readonly type = CollectionCategoriesTypesActions.EDIT;

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
