import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import * as UsersActions from '../actions/users.actions';
import {UsersService} from '../../services/users.service';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class UsersEffects {
  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.loadUsers),
      switchMap(() =>
        this.usersService.getUsers().pipe(
          map(data => UsersActions.loadUsersSuccess({ payload: data })),
          catchError(error => {
            this.toast.error('Something went wrong');
            return of(UsersActions.loadUsersFailure({ payload: error }))
          }))
      ),
    );
  });

  constructor(
    private actions$: Actions,
    private usersService: UsersService,
    private toast: ToastrService,
  ) { }
}
