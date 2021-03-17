import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

export const loadUsers = createAction('[USERS] Load Users');
export const loadUsersSuccess = createAction('[USERS] Load Users Success', props<{ payload: User[] }>());
export const loadUsersFailure = createAction('[USERS] Load Users Failure', props<{payload: Error}>());

export const loadUser = createAction('[SELECTED_USER] Load User');
export const loadUserSuccess = createAction('[SELECTED_USER] Load User Success', props<{ payload: User }>());
export const loadUserFailure = createAction('[SELECTED_USER] Load User Failure', props<{payload: Error}>());
