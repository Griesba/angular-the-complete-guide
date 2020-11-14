import {Ingredient} from '../shared/ingredient.model';
import {EventEmitter} from '@angular/core';

export class ShoppingService {
  ingredientChangedEvent = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    // since we are returning a copy of ingredient array, an update of the original array is not repecuted on the copy
    // that is why we have to are using an EventEmiter that will emit changes to array copy.
    // another solution is not to slice() the original array
    this.ingredientChangedEvent.emit(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientChangedEvent.emit(this.ingredients.slice());
  }
}
