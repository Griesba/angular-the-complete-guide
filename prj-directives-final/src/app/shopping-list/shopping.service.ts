import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

export class ShoppingService {
  ingredientChangedEvent = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
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
    this.ingredientChangedEvent.next(this.ingredients.slice());
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientChangedEvent.next(this.ingredients.slice());
  }

  updateIngredient(index: number, editedIngredient: Ingredient) {
    this.ingredients[index] = editedIngredient;
    this.ingredientChangedEvent.next(this.ingredients.slice());
  }
}
