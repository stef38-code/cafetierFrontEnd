import {Personne} from '../model/personne.model';
import * as personneAction from '../actions/personne.action';
import * as personneStore from '../store/personne.store';
import {PersonneTypeAction} from "../actions/personne-type-action";


export function reducer(state = personneStore.initialState, action: personneAction.Actions): personneStore.StatePersonne {
  switch (action.type) {
    case PersonneTypeAction.LOAD: {
      console.log("Ajout d'une personne");
      return state;
    }
   case PersonneTypeAction.ADD: {
     console.log("Ajout d'une personne")
      const personne:Personne = action.payload;
     if (state.ids.indexOf(personne.id) > -1) {
       /*console.group();
       console.log("Personne deja existante")
       console.groupEnd();*/
       return state;
     }
    /* console.group();
     console.log("Affectation")
     console.groupEnd();*/
     return Object.assign({}, state, {
       ids: [ ...state.ids, personne.id ],
       entities:  Object.assign({}, state.entities, {
         [personne.id]: personne
       }),
       selectedPersonneId : state.selectedPersonneId
     });
    }

    default: {
      return state;
    }
  }
}


