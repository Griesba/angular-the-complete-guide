import {Actions, Effect, ofType} from '@ngrx/effects';
import {map, switchMap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

import {Recipe} from '../recipe.model';
import * as fromRecipes from './recipe.action';
import {Injectable} from '@angular/core';

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

  constructor(private actions$: Actions, private http: HttpClient) {
  }

}
