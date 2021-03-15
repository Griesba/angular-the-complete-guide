import {Actions, ofType} from '@ngrx/effects';

import * as LoginActions from './auth.actions';
export class AuthEffects {
  authLogin = this.actions$.pipe(
    ofType(LoginActions.LOGIN_START) // filter on which type of action
  );

  // note de diff between ngrx/store and ngrx/effects/action. the last one is an observable that is why we add $ sign at the end
  constructor(private actions$: Actions) {}
}
