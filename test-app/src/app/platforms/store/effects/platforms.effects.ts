import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { PlatformsService } from '../../services/platforms.service';
import * as PlatformsActions from '../actions/platforms.actions';

@Injectable()
export class PlatformsEffects {
  loadPlatforms$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PlatformsActions.loadPlatforms),
      switchMap(() =>
        this.platformsService.getPlatforms().pipe(
          map(data => PlatformsActions.loadPlatformsSuccess({ payload: data })),
          catchError(error => {
            this.toast.error('Something went wrong');
            return of(PlatformsActions.loadPlatformsFailure({ payload: error }))
          }))
      ),
    );
  });

  loadPlatform$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PlatformsActions.loadPlatform),
      switchMap((action) => {
        console.log(action.payload);
          return this.platformsService.getPlatform(action.payload).pipe(
            map(data => PlatformsActions.loadPlatformSuccess({ payload: data })),
            catchError(error => {
              this.toast.error('Something went wrong');
              return of(PlatformsActions.loadPlatformFailure({ payload: error }))
            }))
      }

      ),
    );
  });

  constructor(
    private actions$: Actions,
    private platformsService: PlatformsService,
    private toast: ToastrService,
  ) { }
}
