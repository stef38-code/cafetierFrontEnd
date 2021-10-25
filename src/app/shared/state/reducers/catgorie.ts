import {CategorieAction} from '../actions/categorie-action';
import {CategorieStore} from '../store/Categorie';
import {CategorieTypeAction} from "../actions/categorie-type-action";
import {Categorie} from "../model/categorie";

export namespace CategorieRecuder {
  export function reducer(state = CategorieStore.initialState, action: CategorieAction.Actions): CategorieStore.State {
    switch (action.type) {
      case CategorieTypeAction.LOAD: {
        console.log("Chargement des personnes");
        return state;
      }
      case CategorieTypeAction.ADD: {
        console.log("Ajout d'une categorie")
        const categorie: Categorie = action.payload;
        if (state.ids.indexOf(categorie.id) > -1) {
          return state;
        }
        return Object.assign({}, state, {
          ids: [...state.ids, categorie.id],
          entities: Object.assign({}, state.entities, {
            [categorie.id]: categorie
          }),
          selectedId: state.selectedId
        });
      }

      case CategorieTypeAction.LOAD_SUCCESS_ACTION: {
        const categorie = action.payload;
        const newCategorie = categorie.filter(categorie => !state.entities[categorie.id]);

        const newcatgorieIds = newCategorie.map(categorie => categorie.id);
        const newCategorieEntities = newCategorie.reduce((entities: { [id: string]: Categorie }, categorie: Categorie) => {
          return Object.assign(entities, {
            [categorie.id]: categorie
          });
        }, {});
        return {
          ids: [...state.ids, ...newcatgorieIds],
          entities: Object.assign({}, state.entities, newCategorieEntities),
          selectedId: state.selectedId
        };
      }
      case CategorieTypeAction.EDIT: {
        return {
          ids: state.ids,
          entities: state.entities,
          selectedId: action.payload
        };
      }
      default: {
        return state;
      }
    }
  }
}

