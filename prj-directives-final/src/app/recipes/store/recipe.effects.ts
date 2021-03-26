import {Actions, Effect, ofType} from '@ngrx/effects';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';

import {Recipe} from '../recipe.model';
import * as fromRecipes from './recipe.action';
import * as fromApp from '../../store/app-reducer';

@Injectable() // to make sur we can inject httpClient
export class RecipeEffects {

  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(fromRecipes.FETCH_RECIPE),
    switchMap(() => {
      return this.http.get<Recipe[]>('https://ng-recipe-book-f6ff8-default-rtdb.firebaseio.com/recipes.json')
    }),
    map(recipes => {
      return recipes.map(recipe => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : []
        };
      });
    }),
    map(recipe => {
      return new fromRecipes.SetRecipe(recipe); // is automatically dispatch by ngrx
    })
  );

  @Effect({dispatch: false})
  storeRecipe = this.actions$.pipe(
    ofType(fromRecipes.STORE_RECIPE),
    withLatestFrom(this.store.select('recipes')), // merge existing recipes subscribe with new one
    switchMap(([actionData, recipeState]) => {
      // first element actionData is from ofType second element recipeState is from withLatestFrom
      return this.http.put('https://ng-recipe-book-f6ff8-default-rtdb.firebaseio.com/recipes.json',
        recipeState.recipes);
    })
  );

  constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>) {
  }

}
