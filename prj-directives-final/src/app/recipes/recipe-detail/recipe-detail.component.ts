import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {map, switchMap} from 'rxjs/operators';

import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import * as fromApp from '../../store/app-reducer';
import * as RecipeActions from '../store/recipe.action';
import * as fromShoppingList from '../../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    // subscribe to event helps to taking into account changes event after the page load.
    // using static initialization like this.router.params['id'] will keep  the initial value and will not change.
    this.route.params
      .pipe(
        map(params => {
          return +params['id'];
        }),
        switchMap(id => {
          this.id = id;
          return this.store.select('recipes');
        }),
        map(recipeState => {
          return recipeState.recipes.find((recipe, index) => {
            return index === this.id;
          });
        })
    ).subscribe(recipe => {
      this.recipe = recipe;
    });
/*    this.route.params.subscribe( (params: Params) => {
      this.id = +params['id']; // + is for casting to number
       this.recipe = this.recipeService.getRecipe(this.id);
    });*/

  }

  sendToShippingList () {
    // this.recipeService.sendToShippingList(this.recipe.ingredients);
    this.store.dispatch(new fromShoppingList.AddIngredientsActions(this.recipe.ingredients));
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    // this.recipeService.deleteRecipe(this.id);
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }
}
