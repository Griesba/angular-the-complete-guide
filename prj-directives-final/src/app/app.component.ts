import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {LoggingService} from './logging.service';
import * as fromApp from './store/app-reducer';
import * as fromAuthAction from './auth/store/auth.actions';
import {Store} from '@ngrx/store';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(// private authService: AuthService,
              private logging: LoggingService,
              private store: Store<fromApp.AppState>,
              @Inject(PLATFORM_ID) private platformId) {} // this is how you inject a constant value in

  ngOnInit(): void {
    // this.authService.autoLogin();
    if (isPlatformBrowser(this.platformId)) { // we want to dispatch the auto login only on browser and not on the server
      this.store.dispatch(new fromAuthAction.AutoLogin());
    }
    this.logging.printLog('hello from AppComponent ngOnInt');
  }

}
