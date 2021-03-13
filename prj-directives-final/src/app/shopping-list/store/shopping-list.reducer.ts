import {Ingredient} from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

// this is flexible type definition
// if we have a new info to add, we will add it as State interface attribute
export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

// describe the whole application state
export interface AppState {
  shoppingList: State;
}

const initialState: State = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};

// state default value is initialState. It all start there by default
// state change is immutable. create new one with the copy of old state
export function shoppingListReducer(state: State = initialState, action: ShoppingListActions.ShoppingListActions) {
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
        };
      case ShoppingListActions.UPDATE_INGREDIENT:
        const ingredientToUpdate = state.ingredients[action.data.index];  // ingredient to update
        // copy and modification of ingredient. We cannot edit ingredient as rxjs advocate immutability
        const updatedIngredient = {
          ...ingredientToUpdate,
          ...action.data.ingredient
        };
        const updatedIngredients = [...state.ingredients];
        updatedIngredients[action.data.index] = updatedIngredient;

        return {
          ...state,
          ingredients: updatedIngredients
        };
      case ShoppingListActions.DELETE_INGREDIENT:
        return {
          ...state,
          ingredients: state.ingredients.filter((x, index) => {
            return index !== action.data;
          })
        };
      case ShoppingListActions.START_EDIT:
        return {
          ...state, // always copy the previous state if you don't want to loose it
          editedIngredientIndex: action.data,
          editedIngredient: {...state.ingredients[action.data]} // a copy of state.ingredients is made because it is the original source
        };
      case ShoppingListActions.STOP_EDIT:
        return {
          ...state,
          editedIngredientIndex: -1,
          editedIngredient: null
        }
      default:
        return state;
    }
}
