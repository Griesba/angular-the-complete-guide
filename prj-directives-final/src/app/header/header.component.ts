import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';

import {AuthService} from '../auth/auth.service';
import {DataStorageService} from '../shared/data-storage.service';
import * as fromApp from '../store/app-reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as fromRecipe from '../recipes/store/recipe.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  private userSubscription: Subscription;
  isAuthenticated = false;
  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService, private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    // we can also pipe(map(userState => userState.user)) to pop out the user
    this.userSubscription = this.store.select('auth').subscribe( userState => {
      this.isAuthenticated = !!userState.user;
    });

    /*    this.userSubscription = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });*/
  }

  storeData() {
    this.dataStorageService.createRecipes();
  }

  fetchData() {
    // this.dataStorageService.fetchRecipe().subscribe();
    this.store.dispatch(new fromRecipe.FetchRecipe());
  }

  onLogout() {
    // this.authService.logout();
    this.store.dispatch(new AuthActions.Logout());
  }
}
