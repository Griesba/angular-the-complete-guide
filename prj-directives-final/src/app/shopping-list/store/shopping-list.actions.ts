import {Action} from '@ngrx/store';
import {Ingredient} from '../../shared/ingredient.model';

// in order to make action identifier unique we precede it by the name of the feature
export const ADD_INGREDIENT = '[Shopping list] ADD_INGREDIENT';
export const ADD_INGREDIENTS = '[Shopping list] ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = '[Shopping list] UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = '[Shopping list] DELETE_INGREDIENT';
export const START_EDIT = '[Shopping list] START_EDIT';
export const STOP_EDIT = '[Shopping list] STOP_EDIT';

export class AddIngredientAction  implements Action {
  readonly type = ADD_INGREDIENT;

  constructor(public data: Ingredient) { }
}

export class AddIngredientsActions  implements Action {
  readonly type = ADD_INGREDIENTS;

  constructor(public data: Ingredient[]) { }
}

export class UpdateIngredientAction {
  readonly type = UPDATE_INGREDIENT;
  // constructor(public data: {index: number, ingredient: Ingredient}) { }
  // id don't need to pass the index parameter no more it is in the reducer State (editedIngredientIndex)
  constructor(public data: Ingredient) { }
}

export class DeleteIngredientAction {
  readonly type = DELETE_INGREDIENT;
  constructor(public data: number) {}
}

export class StartEditAction {
  readonly type = START_EDIT;
  // data is index of ingredient to edit
  constructor(public data: number) {}
}

export class StopEditAction {
  readonly type = STOP_EDIT;
}

export type ShoppingListActions =
  | AddIngredientAction
  | AddIngredientsActions
  | DeleteIngredientAction
  | UpdateIngredientAction
  | StartEditAction
  | StopEditAction;
