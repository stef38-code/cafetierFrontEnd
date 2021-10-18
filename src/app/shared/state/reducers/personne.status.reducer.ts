import * as personneCollection from '../actions/personne.collection.action';


export interface State {
  loaded: boolean;
  loading: boolean;
  ids: string[];
};

const initialState: State = {
  loaded: false,
  loading: false,
  ids: []
};

export function reducer(state = initialState, action: personneCollection.Actions): State {
  switch (action.type) {
    case personneCollection.LOAD: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case personneCollection.LOAD_SUCCESS: {
      const personnes = action.payload;

      return {
        loaded: true,
        loading: false,
        ids: personnes.map(personne => personne.id)
      };
    }

    case personneCollection.ADD_PERSONNE_SUCCESS:
    case personneCollection.REMOVE_PERSONNE_FAIL: {
      const personne = action.payload;

      if (state.ids.indexOf(personne.id) > -1) {
        return state;
      }

      return Object.assign({}, state, {
        ids: [ ...state.ids, personne.id ]
      });
    }

    case personneCollection.REMOVE_PERSONNE_SUCCESS:
    case personneCollection.ADD_PERSONNE_FAIL: {
      const personne = action.payload;

      return Object.assign({}, state, {
        ids: state.ids.filter(id => id !== personne.id)
      });
    }

    default: {
      return state;
    }
  }
}


export const getPersonneLoaded = (state: State) => state.loaded;

export const getPersonneLoading = (state: State) => state.loading;

export const getPersonneIds = (state: State) => state.ids;
