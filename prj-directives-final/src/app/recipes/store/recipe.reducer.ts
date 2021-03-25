import {Recipe} from '../recipe.model';

import * as RecipesAction from './recipe.action';

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: []
};

export function recipeReducer(state = initialState, action: RecipesAction.RecipeActions) {
  switch (action.type) {
    case RecipesAction.SET_RECIPE:
      return {
        ...state,
        recipes: [...action.payload]
      };
    case RecipesAction.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case RecipesAction.UPDATE_RECIPE:
      const updateRecipe = {
        ...state.recipes[action.payload.index],
        ...action.payload.recipe
      };
      const updatedRecipes = [...state.recipes];
        updatedRecipes[action.payload.index] = updateRecipe;

      return {
        ...state,
        recipes: updatedRecipes
      };
    case RecipesAction.DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter((recipe, index) => {
          return index !== action.payload;
        })
      };
    default :
      return state;
  }
}
