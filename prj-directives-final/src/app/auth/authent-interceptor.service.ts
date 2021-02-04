import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {exhaustMap, take} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthentInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // exhaustMap wait for the first observable (the one in take(1)) to complete, then implicitly replace the normal subscription
    return this.authService.user.pipe(
      take(1), // take the value once and unsubscribe
      exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedRequest = req.clone({params: new HttpParams().set('auth', user.token)});
        console.log('request', modifiedRequest);
        return next.handle(modifiedRequest);
      }));
  }

}
