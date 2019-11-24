import * as  AuthActions from './auth.action';
import { User } from '../user.model';

export interface State {
  user: User;
  authError: string;
  loading: boolean;
}
const initialState: State = {
  user: null,
  authError: null,
  loading : false
}
export function AuthReducer(
  state = initialState,
  action: AuthActions.AuthActions
) {

  switch (action.type) {
    case AuthActions.LOGIN_START:
    case AuthActions.SIGNUP_START:
      return {
        ...state,
        authError: null,
        loading: true
      };
    case AuthActions.AUTHENTIFICATE_SUCCESS:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.dateExpiration
      );
      return {
        ...state,
        authError: null,
        user: user,
        loading: false
      };
    case AuthActions.AUTHENTIFICATE_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null
      };
    case AuthActions.CLEAR_ERROR:
      return {
        ...state,
        authError: null
      };
    default:
      return state;
  }
}
