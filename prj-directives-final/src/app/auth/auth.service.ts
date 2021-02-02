import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  signUp(email: string, password: string) {

    return this.http.post<AuthResponseData>(environment.signUpAuthApiUrl, {email: email, password: password, returnSecureToken: true})
      .pipe(catchError(this.handelError));
  }

  logIn(email: string, password: string) {
    return this.http.post<AuthResponseData>(environment.signInAuthApiUrl, {email: email, password: password})
      .pipe(catchError(this.handelError));
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
}
