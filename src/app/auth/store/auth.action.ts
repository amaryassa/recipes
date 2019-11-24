import { Action } from '@ngrx/store';
export const SIGNUP_START = '[Auth] Signup Start';
export const LOGIN_START = '[Auth] Login Start';
export const AUTHENTIFICATE_SUCCESS = '[Auth] Authentificate success';
export const AUTHENTIFICATE_FAIL = '[Auth] Authentificate Fail';
export const CLEAR_ERROR = '[Auth] Clear Error';
export const LOGOUT = '[Auth] Logout';
export const AUTO_LOGIN = '[Auth] Auto Login';
export const AUTO_LOGOUT = '[Auth] Auto Logout';



export class SignupStart implements Action {
  readonly type = SIGNUP_START;
  constructor(
    public payload: {
      email: string,
      password: string
    }
  ) { }
}
export class LoginStart implements Action {
  readonly type = LOGIN_START;
  constructor(
    public payload: {
      email: string,
      password: string
    }
  ) { }
}

export class AutentificateSuccess implements Action {
  readonly type = AUTHENTIFICATE_SUCCESS;

  constructor(
    public payload: {
      email: string,
      userId: string,
      token: string,
      dateExpiration: Date
    }
  ) { }
}

export class AutentificateFail implements Action {
  readonly type = AUTHENTIFICATE_FAIL;
  constructor(public payload: string) { }

}
export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}
export class Logout implements Action {
  readonly type = LOGOUT;
}
export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}
export class AutoLogout implements Action {
  readonly type = AUTO_LOGOUT;
}




export type AuthActions =

  | SignupStart
  | LoginStart
  | AutentificateSuccess
  | AutentificateFail
  | ClearError
  | Logout
  | AutoLogin
  | AutoLogout

  ;

