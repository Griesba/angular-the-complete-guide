import {User} from '../user.model';
import * as fromAuthActions from './auth.actions';

export interface State {
  user: User;
}

const initialState: State = {
  user: null
};

export function authReducer(state = initialState, action: fromAuthActions.AuthActions) {
  switch (action.type) {
    case 'LOGIN':
      const newUser = new User(action.payload.email, action.payload.userId, action.payload.token, action.payload.expirationDate);
      return {
        ...state,
        user: newUser
      };
    case 'LOGIN':
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
}
