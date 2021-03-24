import {Recipe} from '../recipe.model';
import {Action} from '@ngrx/store';

export const SET_RECIPE = '[Recipe] SET RECIPE';
export const FETCH_RECIPE = '[Recipes] FETCH RECIPE';

export class SetRecipe implements Action {
  readonly type = SET_RECIPE;

  constructor(public payload: Recipe[]) {}
}

export class FetchRecipe {
  readonly type = FETCH_RECIPE;
}

export type RecipeActions = SetRecipe | FetchRecipe;
