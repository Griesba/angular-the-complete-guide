import {Component, OnDestroy, OnInit} from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import {ShoppingService} from './shopping.service';
import {Subscription} from 'rxjs';
import {LoggingService} from '../logging.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  private shopSubscription: Subscription;

  constructor(private shoppingService: ShoppingService, private logging: LoggingService) { }

  ngOnInit() {
    this.ingredients = this.shoppingService.getIngredients();
    this.shopSubscription = this.shoppingService.ingredientChangedEvent.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    });
    this.logging.printLog('hello from ShoppingListComponent ngOnInt');
  }

  onEditItem (index: number) {
    this.shoppingService.startedEditing.next(index);
  }

  ngOnDestroy(): void {
    this.shopSubscription.unsubscribe();
  }

}
