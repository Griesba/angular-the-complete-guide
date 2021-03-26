import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {interval, Observable, Subscribable, Subscription} from 'rxjs';
import {filter, map} from 'rxjs/operators';

import { Recipe } from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as fromApp from '../../store/app-reducer';
import {ofType} from '@ngrx/effects';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  // private firstObsSubscription: Subscription;
  // private secondObsSubscription: Subscription;
  private recipeChangedSubscription: Subscription;

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute,
              private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store.select('recipes')
      .pipe(map(recipeState => recipeState.recipes))
      .subscribe( (recipes: Recipe[]) => {
        this.recipes = recipes;
      });
/*     this.firstObsSubscription = interval(1000).subscribe(counter => {
      console.log('firstObs ' + counter);
    }); */

/*     const customIntervalObserver = new Observable((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 3) {
          observer.error(new Error('Observer error: count is equals to 3!'));
        }
        if (count === 4) {
          // this will never happen in this case as counter throw an error when it is 3
          observer.complete();
        }
        count++;
      }, 1100);
    }); */

/*     customIntervalObserver.pipe(
      filter( data => {
        return data > 0; // filter  positive numbers
      }),
      map((data: number) => {
      return 'Rounded ' + (data + 1); // add one to the current number
    })); */

/*     this.secondObsSubscription = customIntervalObserver.subscribe(count => {
      console.log('second obs: ' + count);
    }, error => {
    console.log(error);
    alert(error.message);
    }, () => {
      console.log('observer completed!');
    }); */
  }

  onNewRecipe () {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
    if (this.recipeChangedSubscription) {
      this.recipeChangedSubscription.unsubscribe();
    }
/*     this.firstObsSubscription.unsubscribe();
    this.secondObsSubscription.unsubscribe(); */
  }

}
