import {Component, OnInit} from '@angular/core';

import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService, private router: ActivatedRoute) { }

  ngOnInit() {
    // subscribe to event helps to taking into account changes event after the page load.
    // using static initialization like this.router.params['id'] will keep  the initial value and will not change.
     this.router.params.subscribe( (params: Params) => {
      this.id = +params['id']; // + is for casting to number
       this.recipe = this.recipeService.getRecipe(this.id);
    });

  }

  sendToShippingList () {
    this.recipeService.sendToShippingList(this.recipe.ingredients);
  }

}
