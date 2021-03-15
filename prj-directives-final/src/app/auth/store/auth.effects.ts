import {Actions, Effect, ofType} from '@ngrx/effects';

import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

import * as LoginActions from './auth.actions';
import {environment} from '../../../environments/environment';
import {AuthResponseData} from '../auth.service';



@Injectable() // we are injecting httpClient and Actions
export class AuthEffects {
// we do not catch error on global observer associated with actions$ as we have only one instance in the app lifecycle
// so we are catching error at internal level
  @Effect() // dispatching new action
  authLogin = this.actions$.pipe(
    ofType(LoginActions.LOGIN_START), // filter on which type of action
    switchMap((authData: LoginActions.LoginStart) => {
      return this.http
        .post<AuthResponseData>(
          environment.signInAuthApiUrl,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true
          })
        .pipe(
          map(resData => {
            const tokenExpirationDate = new Date(new Date().getTime() + (+resData.expiresIn) * 1000);
            return of(
              new LoginActions.Login({
                email: resData.email,
                userId: resData.localId,
                token: resData.idToken,
                expirationDate: tokenExpirationDate
              })
            );
          }),
          catchError(err => {
            //
            return of(); // create and return empty observable
          })
        );
    })
  );

  // note de diff between ngrx/store and ngrx/effects/action. the last one is an observable that is why we add $ sign at the end
  constructor(private actions$: Actions, private http: HttpClient) {}
}
