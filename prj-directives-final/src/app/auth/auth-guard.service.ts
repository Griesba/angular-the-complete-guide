import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {map, take} from 'rxjs/operators';

import {AuthService} from './auth.service';
import * as fromApp from '../store/app-reducer';

@Injectable({providedIn: 'root'})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private store: Store<fromApp.AppState>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select('auth').pipe(
      take(1), // take the latest value and unsubscribe as the subject can continuously sent event we don't want ot listen to
      map(authState => {
        return authState.user;
      }),
      map(user => {
        const isAuth =  !!user;
        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(['/auth']);
      }));
  }


/*
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean
    | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.user.pipe(
      // take the lasted user value and unsubscribe to user subscription
      // as the subject can continuously sent event we don't want ot listen to
      take(1),
      map(user => {
      const isAuth =  !!user;
      if (isAuth) {
        return true;
      }
      return this.router.createUrlTree(['/auth']);
    }));
  }
*/

}
