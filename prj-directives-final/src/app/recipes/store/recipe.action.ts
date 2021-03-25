import {Recipe} from '../recipe.model';
import {Action} from '@ngrx/store';

export const SET_RECIPE = '[Recipe] SET RECIPE';
export const FETCH_RECIPE = '[Recipes] FETCH RECIPE';
export const ADD_RECIPE = '[Recipes] ADD RECIPE';
export const UPDATE_RECIPE = '[Recipes] UPDATE RECIPE';
export const DELETE_RECIPE = '[Recipes] DELETE RECIPE';

export class SetRecipe implements Action {
  readonly type = SET_RECIPE;

  constructor(public payload: Recipe[]) {}
}

export class FetchRecipe {
  readonly type = FETCH_RECIPE;
}

export class AddRecipe {
  readonly type = ADD_RECIPE;

  constructor(public payload: Recipe) {}
}

export class UpdateRecipe {
  readonly type = UPDATE_RECIPE;

  constructor(public payload: {index: number, recipe: Recipe}) {}
}

export class DeleteRecipe {
  readonly type = DELETE_RECIPE;

  constructor(public payload: number) {}
}

export type RecipeActions = SetRecipe | FetchRecipe | AddRecipe | UpdateRecipe | DeleteRecipe;
