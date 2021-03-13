import {Action} from '@ngrx/store';
import {Ingredient} from '../../shared/ingredient.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const START_EDIT = 'START_EDIT';
export const STOP_EDIT = 'STOP_EDIT';

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
  constructor(public data: {index: number, ingredient: Ingredient}) { }
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
