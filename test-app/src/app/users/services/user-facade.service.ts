import { Injectable } from '@angular/core';
import {UsersStoreState} from '../store/models/user-state.model';
import {Store} from '@ngrx/store';
import * as UsersActions from '../store/actions/users.actions';
import {isError, usersQuery} from '../store/selector/users.selectors';
import {User} from '../store/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersFacadeService {
  users$ = this.store.select(usersQuery.users);
  selectedUsers$ = this.store.select(usersQuery.selectedUsers);
  isLoading$ = this.store.select(usersQuery.isLoading);
  isError$ = this.store.select(usersQuery.isError);

  constructor(
    private store: Store<UsersStoreState>
  ) { }

  loadUsers(): void {
    this.store.dispatch(UsersActions.loadUsers());
  }

  setUsers(user: User[]): void {
    this.store.dispatch(UsersActions.loadUsersSuccess({payload: user}));
  }

  setUser(user: User): void {
    this.store.dispatch(UsersActions.loadUserSuccess({payload: user}));
  }
}
