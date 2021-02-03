import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, Subject, throwError} from 'rxjs';
import {User} from './user.model';
import {Router} from '@angular/router';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  // user = new Subject<User>();
  // with BehaviorSubject we can get access to a value publish before the subscription
  user = new BehaviorSubject<User>(null);


  constructor(private http: HttpClient, private router: Router) {
  }

  signUp(email: string, password: string) {

    return this.http.post<AuthResponseData>(environment.signUpAuthApiUrl, {email: email, password: password, returnSecureToken: true})
      .pipe(catchError(this.handelError));
  }

  logIn(email: string, password: string) {
    return this.http.post<AuthResponseData>(environment.signInAuthApiUrl, {email: email, password: password})
      .pipe(
        catchError(this.handelError),
        tap(respData => {// tap operator process data without modification on it
          // given that respData.expiresIn is a string, we can convert is to double like this +respData.expiresIn
          this.handleAuthentication(respData.email, respData.localId, respData.idToken, +respData.expiresIn);
        }));
  }

  private handelError(errResp: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (!errResp.error || !errResp.error.error.message) {
      return throwError(errorMessage);
    }
    switch (errResp.error.error.message) {
      case 'EMAIL_EXISTS': errorMessage = 'The email address is already in use by another account.'; break;
      case 'OPERATION_NOT_ALLOWED': errorMessage = 'Password sign-in is disabled for this project.'; break;
      case 'EMAIL_NOT_FOUND': errorMessage = 'There is no user record corresponding to this identifier.'; break;
      case 'INVALID_PASSWORD': errorMessage = 'The password is invalid or the user does not have a password.'; break;
      case 'USER_DISABLED': errorMessage = 'The user account has been disabled by an administrator.'; break;
    }
    return throwError(errorMessage);
  }

  private handleAuthentication (email: string, id: string, idToken: string, expiresIn: number) {
    // expiresIn is in second, while Date().getTime() is in millisecond, that is why we need to times by 1000
    const tokenExpirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const  newUser = new User(email, id, idToken, tokenExpirationDate);
    this.user.next(newUser);
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
  }
}
