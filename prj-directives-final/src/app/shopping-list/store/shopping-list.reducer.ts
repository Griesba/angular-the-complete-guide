import {Ingredient} from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';
import {Action} from '@ngrx/store';

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ]
};

// state default value is initialState. It all start there by default
// state change is immutable. create new one with the copy of old state
export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
    switch (action.type) {
      case ShoppingListActions.ADD_INGREDIENT:
        return {
          ...state,
          ingredients: [...state.ingredients, action.data]
        };
      case ShoppingListActions.ADD_INGREDIENTS:
        return {
          ...state,
          ingredients: [...state.ingredients, ...action.data]
        }
      default:
        return state;
    }
}
