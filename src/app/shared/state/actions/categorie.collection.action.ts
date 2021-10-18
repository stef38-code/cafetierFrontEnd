import { Action } from '@ngrx/store';
import { Categorie } from '../model/categorie.model';


export const ADD_CATEGORIE =             '[Categorie Collection] Add Categorie';
export const ADD_CATEGORIE_SUCCESS =     '[Categorie Collection] Add Categorie Success';
export const ADD_CATEGORIE_FAIL =        '[Categorie Collection] Add Categorie Fail';
export const REMOVE_CATEGORIE =          '[Categorie Collection] Remove Categorie';
export const REMOVE_CATEGORIE_SUCCESS =  '[Categorie Collection] Remove Categorie Success';
export const REMOVE_CATEGORIE_FAIL =     '[Categorie Collection] Remove Categorie Fail';
export const LOAD =                 '[Categorie Collection] Load';
export const LOAD_SUCCESS =         '[Categorie Collection] Load Success';
export const LOAD_FAIL =            '[Categorie Collection] Load Fail';


/**
 * Add Categorie to Collection Actions
 */
export class AddCategorieAction implements Action {
  readonly type = ADD_CATEGORIE;

  constructor(public payload: Categorie) { }
}

export class AddCategorieSuccessAction implements Action {
  readonly type = ADD_CATEGORIE_SUCCESS;

  constructor(public payload: Categorie) { }
}

export class AddCategorieFailAction implements Action {
  readonly type = ADD_CATEGORIE_FAIL;

  constructor(public payload: Categorie) { }
}


/**
 * Remove Categorie from Collection Actions
 */
export class RemoveCategorieAction implements Action {
  readonly type = REMOVE_CATEGORIE;

  constructor(public payload: Categorie) { }
}

export class RemoveCategorieSuccessAction implements Action {
  readonly type = REMOVE_CATEGORIE_SUCCESS;

  constructor(public payload: Categorie) { }
}

export class RemoveCategorieFailAction implements Action {
  readonly type = REMOVE_CATEGORIE_FAIL;

  constructor(public payload: Categorie) {}
}

/**
 * Load Collection Actions
 */
export class LoadCategorieAction implements Action {
  readonly type = LOAD;
}

export class LoadCategorieSuccessAction implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: Categorie[]) { }
}

export class LoadCategorieFailAction implements Action {
  readonly type = LOAD_FAIL;

  constructor(public payload: any) { }
}


export type Actions
  = AddCategorieAction
  | AddCategorieSuccessAction
  | AddCategorieFailAction
  | RemoveCategorieAction
  | RemoveCategorieSuccessAction
  | RemoveCategorieFailAction
  | LoadCategorieAction
  | LoadCategorieSuccessAction
  | LoadCategorieFailAction;
