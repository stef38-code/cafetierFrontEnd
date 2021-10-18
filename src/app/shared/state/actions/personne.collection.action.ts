import { Action } from '@ngrx/store';
import { Personne } from '../model/personne.model';


export const ADD_PERSONNE =             '[Personne Collection] Add Personne';
export const ADD_PERSONNE_SUCCESS =     '[Personne Collection] Add Personne Success';
export const ADD_PERSONNE_FAIL =        '[Personne Collection] Add Personne Fail';
export const REMOVE_PERSONNE =          '[Personne Collection] Remove Personne';
export const REMOVE_PERSONNE_SUCCESS =  '[Personne Collection] Remove Personne Success';
export const REMOVE_PERSONNE_FAIL =     '[Personne Collection] Remove Personne Fail';
export const LOAD =                 '[Personne Collection] Load';
export const LOAD_SUCCESS =         '[Personne Collection] Load Success';
export const LOAD_FAIL =            '[Personne Collection] Load Fail';


/**
 * Add Personne to Collection Actions
 */
export class AddPersonneAction implements Action {
  readonly type = ADD_PERSONNE;

  constructor(public payload: Personne) { }
}

export class AddPersonneSuccessAction implements Action {
  readonly type = ADD_PERSONNE_SUCCESS;

  constructor(public payload: Personne) { }
}

export class AddPersonneFailAction implements Action {
  readonly type = ADD_PERSONNE_FAIL;

  constructor(public payload: Personne) { }
}


/**
 * Remove Personne from Collection Actions
 */
export class RemovePersonneAction implements Action {
  readonly type = REMOVE_PERSONNE;

  constructor(public payload: Personne) { }
}

export class RemovePersonneSuccessAction implements Action {
  readonly type = REMOVE_PERSONNE_SUCCESS;

  constructor(public payload: Personne) { }
}

export class RemovePersonneFailAction implements Action {
  readonly type = REMOVE_PERSONNE_FAIL;

  constructor(public payload: Personne) {}
}

/**
 * Load Collection Actions
 */
export class LoadPersonneAction implements Action {
  readonly type = LOAD;
}

export class LoadPersonneSuccessAction implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: Personne[]) { }
}

export class LoadPersonneFailAction implements Action {
  readonly type = LOAD_FAIL;

  constructor(public payload: any) { }
}


export type Actions
  = AddPersonneAction
  | AddPersonneSuccessAction
  | AddPersonneFailAction
  | RemovePersonneAction
  | RemovePersonneSuccessAction
  | RemovePersonneFailAction
  | LoadPersonneAction
  | LoadPersonneSuccessAction
  | LoadPersonneFailAction;
