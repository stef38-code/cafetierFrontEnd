import {Action} from '@ngrx/store';
import {Personne} from "../model/personne";
import {PersonneTypeAction} from "./personne-type-action";
import {SystemTypeAction} from "./system-type-action";

export namespace SystemAction {

  export class Start implements Action {
    public readonly type = SystemTypeAction.START;
  }

  export class Stop implements Action {
    public readonly type = SystemTypeAction.STOP;
  }
  /**
   *
   */
  export type Actions =
    Start
    | Stop

    ;
}
