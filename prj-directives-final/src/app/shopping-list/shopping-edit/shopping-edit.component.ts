import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output
} from '@angular/core';
import { NgForm } from '@angular/forms';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  // @ViewChild('nameInput', { static: false }) nameInputRef: ElementRef;
  // @ViewChild('amountInput', { static: false }) amountInputRef: ElementRef;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit() {
  }

  onAddItem(form: NgForm) {
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;
    const value = form.value;
    console.log(value);
    const newIngredient = new Ingredient(value.name, value.amount);
    this.shoppingService.addIngredient(newIngredient);
  }

}
