import {Action} from '@ngrx/store';
import {Ingredient} from '../../shared/ingredient.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';

export class AddIngredientAction  implements Action {
  readonly type = ADD_INGREDIENT;

  constructor(public data: Ingredient) { }
}

export class AddIngredientsActions  implements Action {
  readonly type = ADD_INGREDIENTS;

  constructor(public data: Ingredient[]) { }
}

export type ShoppingListActions = AddIngredientAction | AddIngredientsActions;
