import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output,
  OnDestroy
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import {Store} from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingService } from '../shopping.service';
import * as ShoppingListAction from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput', { static: false }) nameInputRef: ElementRef;
  // @ViewChild('amountInput', { static: false }) amountInputRef: ElementRef;
  @ViewChild('f', {static: false}) shoppingListForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedIdem: Ingredient;

  constructor(private shoppingService: ShoppingService,
              private store: Store<fromShoppingList.AppState>) { }

  ngOnInit() {
    this.subscription = this.shoppingService.startedEditing.subscribe((index) => {
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedIdem = this.shoppingService.getIngredient(index);
      this.shoppingListForm.setValue({
        name: this.editedIdem.name,
        amount: this.editedIdem.amount
      });
    });
  }

  onSubmit(form: NgForm) {
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      // this.shoppingService.updateIngredient(this.editedItemIndex, newIngredient);
      this.store.dispatch(new ShoppingListAction.UpdateIngredientAction({index: this.editedItemIndex, ingredient: newIngredient}));
    } else {
      this.store.dispatch(new ShoppingListAction.AddIngredientAction(newIngredient));
      // this.shoppingService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onDelete() {
    if (this.editMode) {
      // this.shoppingService.deleteIngredient(this.editedItemIndex);
      this.store.dispatch(new ShoppingListAction.DeleteIngredientAction(this.editedItemIndex));
      this.onClear();
    }
  }

  onClear() {
    this.editMode = false;
    this.shoppingListForm.reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
