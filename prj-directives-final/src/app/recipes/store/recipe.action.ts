import {Recipe} from '../recipe.model';
import {Action} from '@ngrx/store';

export const SET_RECIPE = '[Recipe] SET RECIPE';

export class SetRecipe implements Action {
  readonly type = SET_RECIPE;

  constructor(public payload: Recipe[]) {}
}

export type RecipeActions = SetRecipe;
