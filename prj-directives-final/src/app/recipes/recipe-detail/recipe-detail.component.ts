import { Component, OnInit, Input } from '@angular/core';

import { Recipe } from '../recipe.model';
import {ShoppingService} from '../../shopping-list/shopping.service';
import {RecipeService} from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
  }

  sendToShippingList () {
    this.recipeService.sendToShippingList(this.recipe.ingredients);
  }

}
