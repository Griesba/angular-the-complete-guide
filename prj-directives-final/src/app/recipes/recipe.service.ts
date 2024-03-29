import {Recipe} from './recipe.model';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Store} from '@ngrx/store';

import {Ingredient} from '../shared/ingredient.model';
import {ShoppingService} from '../shopping-list/shopping.service';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromApp from '../store/app-reducer';

@Injectable() // inject ShoppingService in this service
export class RecipeService {
  selectedRecipe = new Subject<Recipe>();
  recipeChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];
/*    [new Recipe(
      'A Test Recipe',
      'This is simply a test',
      'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
      [
        new Ingredient('French Fries', 20),
        new Ingredient('Meat', 1),
      ]
      ),
    new Recipe(
      'Another Test Recipe',
      'This is simply a test',
      'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ])
  ];*/

  constructor(// private shoppingService: ShoppingService,
              // retrieve ingredient from rxjs store
              private store: Store<fromApp.AppState>) {
  }


  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  sendToShippingList(ingredients: Ingredient[]) {
    // this.shoppingService.addIngredients(ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredientsActions(ingredients));
  }

  getRecipe(index: number) {
    return this.recipes.slice()[index];
  }

  updateRecipe(id: number, recipe: Recipe) {
    this.recipes[id] = recipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
