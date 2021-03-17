import { createReducer, on } from '@ngrx/store';
import * as UsersActions from '../actions/users.actions';
import { User } from '../models/user.model';


export const usersReducerFeatureKey = 'usersReducer';

export interface UsersState {
  users: User[];
  selectedUser: User;
  loading: boolean;
  error: Error | null;
}

export const initialState: UsersState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
};


export const usersReducer = createReducer(
  initialState,
  on(UsersActions.loadUsers,
    (state, action) => ({ ...state, loading: true })
  ),
  on(UsersActions.loadUsersSuccess,
    (state, action) => ({ ...state, users: action.payload, loading: false })
  ),
  on(UsersActions.loadUsersFailure,
    (state, action) => ({ ...state, error: action.payload, loading: false })
  ),
  on(UsersActions.loadUser,
    (state, action) => ({ ...state, loading: true })
  ),
  on(UsersActions.loadUserSuccess,
    (state, action) => ({ ...state, selectedUser: action.payload, loading: false })
  ),
  on(UsersActions.loadUserFailure,
    (state, action) => ({ ...state, error: action.payload, loading: false })
  ),
);

