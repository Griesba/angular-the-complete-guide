import {Action} from '@ngrx/store';

export const AUTHENTICATE_START = '[Auth] LOGIN START';
export const AUTHENTICATE_SUCCESS = '[Auth] AUTHENTICATE SUCCESS';
export const AUTHENTICATE_FAIL = '[Auth] LOGIN FAIL';
export const SIGNUP_START = '[Auth] SING UP';
export const LOGOUT = '[Auth] LOGOUT';

export class Login implements Action {
  readonly type = AUTHENTICATE_SUCCESS;

  constructor(public payload: {email: string, userId: string, token: string, expirationDate: Date}) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class AuthenticateStart {
  readonly type = AUTHENTICATE_START;

  constructor(public payload: {email: string, password: string}) {}
}

export class SignUpSuccess {
  readonly type = SIGNUP_START;

  constructor(public payload: {email: string, password: string}) {}
}

export class AuthenticateFail {
  readonly type = AUTHENTICATE_FAIL;

  constructor(public payload: string) {}

}
export type AuthActions = Login | Logout | AuthenticateStart | AuthenticateFail | SignUpSuccess;
