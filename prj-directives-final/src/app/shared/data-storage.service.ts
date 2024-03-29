import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {exhaustMap, map, take, tap} from 'rxjs/operators';

import {Recipe} from '../recipes/recipe.model';
import {RecipeService} from '../recipes/recipe.service';
import {AuthService} from '../auth/auth.service';
import * as fromApp from '../store/app-reducer';
import * as RecipesActions from '../recipes/store/recipe.action';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  url = 'https://ng-recipe-book-f6ff8-default-rtdb.firebaseio.com/';

  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService,
              private store: Store<fromApp.AppState>) {}

  createRecipes() {
    const recipes = this.recipeService.getRecipes();

    this.http.put(this.url + 'recipes.json', recipes).subscribe(response => {
      console.log(response);
    });
  }

  fetchRecipe() {
    // the AuthentInterceptorService add the request params
    return this.http.get<Recipe[]>(this.url + 'recipes.json')
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          this.store.dispatch(new RecipesActions.SetRecipe(recipes));
        })
      );

/*      .subscribe()
    return this.http.get<Recipe[]>(this.url + 'recipes.json')
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        }));*/
  }
}
