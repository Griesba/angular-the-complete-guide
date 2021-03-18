import {Actions, Effect, ofType} from '@ngrx/effects';

import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {of, throwError} from 'rxjs';

import * as LoginActions from './auth.actions';
import {environment} from '../../../environments/environment';
import {AuthResponseData} from '../auth.service';
import {Router} from '@angular/router';
import {User} from '../user.model';

const handleAuthentication = (expiresIn: number, email: string, userId: string, token: string) => {
  // expiresIn is in second, while Date().getTime() is in millisecond, that is why we need to times by 1000
  const tokenExpirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  return new LoginActions.Login({email, userId, token, expirationDate: tokenExpirationDate});
}
const handleError = (errResp: any) => {
  let errorMessage = 'An error occurred';
  if (!errResp.error || !errResp.error.error.message) {
    // return throwError(errorMessage); do not throwError it will destroy the state of the action
    return of(new LoginActions.AuthenticateFail(errorMessage)); // create and return  observable with error message
  }
  switch (errResp.error.error.message) {
    case 'EMAIL_EXISTS': errorMessage = 'The email address is already in use by another account.'; break;
    case 'OPERATION_NOT_ALLOWED': errorMessage = 'Password sign-in is disabled for this project.'; break;
    case 'EMAIL_NOT_FOUND': errorMessage = 'There is no user record corresponding to this identifier.'; break;
    case 'INVALID_PASSWORD': errorMessage = 'The password is invalid or the user does not have a password.'; break;
    case 'USER_DISABLED': errorMessage = 'The user account has been disabled by an administrator.'; break;
  }
  return of(new LoginActions.AuthenticateFail(errorMessage)); // create and return  observable with error message
}

@Injectable() // we are injecting httpClient and Actions
export class AuthEffects {

  @Effect()
  authSignUp = this.actions$.pipe(
    ofType(LoginActions.SIGN_UP_START),
    switchMap((signUpData: LoginActions.SignUpSuccess) => {
      return this.http
        .post<AuthResponseData>(
          environment.signUpAuthApiUrl,
          {
            email: signUpData.payload.email,
            password: signUpData.payload.password,
            returnSecureToken: true
          })
        .pipe(
          map(resData => {
            return handleAuthentication(+resData.expiresIn, resData.email, resData.localId, resData.idToken);
          }),
          catchError(err => {
            return handleError(err);
          })
        );
    })
  );


  // we do not catch error on global observer associated with actions$ as we have only one instance in the app lifecycle
// so we are catching error at internal level
  @Effect() // dispatching new action
  authLogin = this.actions$.pipe(
    ofType(LoginActions.AUTHENTICATE_START), // filter on which type of action
    switchMap((authData: LoginActions.AuthenticateStart) => {
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
            return new LoginActions.Login({
                email: resData.email,
                userId: resData.localId,
                token: resData.idToken,
                expirationDate: tokenExpirationDate
              });
          }),
          catchError(errResp => {
            return handleError(errResp);
          })
        );
    })
  );

  @Effect({dispatch: false})
  authSuccess = this.actions$.pipe(ofType(LoginActions.AUTHENTICATE_SUCCESS), tap(() => {
    this.router.navigate(['/']);
  } ));

  // note de diff between ngrx/store and ngrx/effects/action. the last one is an observable that is why we add $ sign at the end
  constructor(private actions$: Actions, private http: HttpClient, private router: Router) {}
}
