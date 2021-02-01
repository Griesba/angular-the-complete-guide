import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

interface AuthResponseData {
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

    return this.http.post<AuthResponseData>(environment.authApiUrl, {email: email, password: password, returnSecureToken: true})
      .pipe(catchError(errResp => {
        let errorMessage = 'An error occurred';
        if (!errResp.error || !errResp.error.error.message) {
          return throwError(errorMessage);
        }
        switch (errResp.error.error.message) {
          case 'EMAIL_EXISTS': errorMessage = 'The email address is already in use by another account.'; break;
          case 'OPERATION_NOT_ALLOWED': errorMessage = 'Password sign-in is disabled for this project.'; break;
        }
        return throwError(errorMessage);
      }));
  }
}
