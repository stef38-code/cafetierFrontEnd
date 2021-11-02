import {CollectionCategorieAction} from '../actions/collection-categories-action';
import {CollectionCategoriesStore} from '../store/collection-categories';
import {CollectionCategoriesTypesActions} from "../actions/collection-categories-types-actions";
import {Categorie} from "../model/categorie";

export namespace CollectionCategoriesRecuder {
  export function reducer(state = CollectionCategoriesStore.initialState, action: CollectionCategorieAction.Actions): CollectionCategoriesStore.State {
    switch (action.type) {
      case CollectionCategoriesTypesActions.LOAD: {
        console.log("Chargement des categories");
        return state;
      }
      case CollectionCategoriesTypesActions.ADD: {
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

      case CollectionCategoriesTypesActions.LOAD_SUCCESS_ACTION: {
        const categorie = action.payload;
        /*const newCategorie = categorie.filter(categorie => !state.entities[categorie.id]);*/

        const newIds = categorie.map(categorie => categorie.id);
        const newEntities = categorie.reduce((entities: { [id: string]: Categorie }, categorie: Categorie) => {
          return Object.assign(entities, {
            [categorie.id]: categorie
          });
        }, {});
        /*const newCategorieEntities */
        return {
          ids: [...newIds],
          entities: newEntities,
          selectedId: state.selectedId
        };
      }
      case CollectionCategoriesTypesActions.EDIT: {
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

