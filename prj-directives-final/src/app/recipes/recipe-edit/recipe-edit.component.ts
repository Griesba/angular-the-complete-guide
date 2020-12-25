import {Component, OnInit} from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import {ActivatedRoute, Params} from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  isEditMode = false;
  recipeForm: FormGroup;

  constructor(private router: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.router.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.isEditMode = params['id'] != null;
      this.initForm();
    });
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  private initForm(): void {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredient = new FormArray([]);

    if (this.isEditMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe.ingredients) {
        for (const ingredient of recipe.ingredients) {
          recipeIngredient.push(new FormGroup({
            'name': new FormControl(ingredient.name),
            'amount': new FormControl(ingredient.amount)
          }));
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(recipeImagePath),
      'description': new FormControl(recipeDescription),
      'ingredients': recipeIngredient
    });
  }

}
