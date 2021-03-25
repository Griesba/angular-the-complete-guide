import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Recipe} from './recipe.model';
import {DataStorageService} from '../shared/data-storage.service';
import {RecipeService} from './recipe.service';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app-reducer';
import * as fromRecipe from './store/recipe.action';
import {Actions, ofType} from '@ngrx/effects';
import {map, switchMap, take} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable({providedIn: 'root'})
export class RecipeResolverService implements Resolve<Recipe[]> {

  // constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService) {}
  constructor(private store: Store<fromApp.AppState>, private actions$: Actions) {}

  // resolver subscribe for me
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('recipes').pipe(
      take(1),
      map(recipeState => recipeState.recipes),
      switchMap(recipes => {
        if (recipes.length === 0) {// if we have no recipe localy then we fetch from server
          this.store.dispatch(new fromRecipe.FetchRecipe()); // dispatch the recipe
          return this.actions$.pipe(
            ofType(fromRecipe.SET_RECIPE), // wait for the recipe to be set. effect will listen only to SET RECIPE actions
            take(1)
          );
        } else { // otherwise return local recipes
          return of(recipes);
        }
      })
    );


    /*    const recipes = this.recipeService.getRecipes();
    if (recipes.length === 0) {
      return this.dataStorageService.fetchRecipe();
    } else {
      return recipes;
    }*/
  }

}
