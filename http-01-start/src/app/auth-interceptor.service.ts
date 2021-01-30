import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';

export class AuthInterceptorService implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // intercept a request and handle it before it went to server
    console.log('request intercepted');
    const modifiedRequest = req.clone({headers: req.headers.append('Auth', 'xyz')});
    return next.handle(modifiedRequest).pipe(tap(event => {
      console.log(event)
      if (event.type === HttpEventType.Response) {
        console.log('response arrived', event.body);
      }
    }));
  }

}
