import { createFeatureSelector, createSelector } from '@ngrx/store';
import {usersReducerFeatureKey, UsersState} from '../reducers/users-reducer.reducer';

export const getUsersState = createFeatureSelector<UsersState>(usersReducerFeatureKey);

export const users = createSelector(
  getUsersState,
  (state: UsersState) => state.users
);

export const isLoading = createSelector(
  getUsersState,
  (state: UsersState) => state?.loading
);

export const isError = createSelector(
  getUsersState,
  (state: UsersState) => state?.error
);

export const usersQuery = {
  users,
  isLoading,
  isError
};
