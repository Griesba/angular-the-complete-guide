import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Recipe} from '../recipes/recipe.model';
import {RecipeService} from '../recipes/recipe.service';
import {exhaustMap, map, take, tap} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  url = 'https://ng-recipe-book-f6ff8-default-rtdb.firebaseio.com/';

  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {}

  createRecipes() {
    const recipes = this.recipeService.getRecipes();

    this.http.put(this.url + 'recipes.json', recipes).subscribe(response => {
      console.log(response);
    });
  }

  fetchRecipe() {
    // exhaustMap wait for the first observable (the one in take(1)) to complete, then implicitly replace the normal subscription
    return this.authService.user.pipe(
      take(1), // take the value once and unsubscribe
      exhaustMap(user => {
        return this.http.get<Recipe[]>(this.url + 'recipes.json', {params: new HttpParams().set('auth', user.token)});
      }),
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
