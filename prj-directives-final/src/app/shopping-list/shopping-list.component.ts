import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import {ShoppingService} from './shopping.service';
import {LoggingService} from '../logging.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ingredients: Ingredient[]}>;
  private shopSubscription: Subscription;

  constructor(private shoppingService: ShoppingService,
              private logging: LoggingService,
              // shoppingList is the same present in app.module and ingredients is the same name in shopping-list.reducer
              private store: Store<{shoppingList: {ingredients: Ingredient[]}}> ) { }

  ngOnInit() {
    // ingredients is an observable and to resolve it we will use async to access the array of ingredient in the html
    this.ingredients = this.store.select('shoppingList');
/*    this.ingredients = this.shoppingService.getIngredients();
    this.shopSubscription = this.shoppingService.ingredientChangedEvent.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    });*/
  }

  onEditItem (index: number) {
    this.shoppingService.startedEditing.next(index);
  }

  ngOnDestroy(): void {
    // this.shopSubscription.unsubscribe();
  }

}
