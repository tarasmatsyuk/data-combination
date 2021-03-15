import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';
import * as PlatformsActions from 'src/app/platforms/store/actions/platforms.actions';
import { platformsQuery } from 'src/app/platforms/store/selector/platforms.selectors';
import { UsersStoreState } from 'src/app/users/store/models/user-state.model';
import { PlatformsStoreState } from '../store/models/platforms-state.model';

@Injectable({
  providedIn: 'root'
})
export class PlatformsFacadeService {
  platforms$ = this.store.select(platformsQuery.platforms);
  userCount$ = this.store.select(platformsQuery.userCount);
  isLoading$ = this.store.select(platformsQuery.isLoading);
  isError$ = this.store.select(platformsQuery.isError);
  selectedPlatform$ = this.store.select(platformsQuery.selectedPlatform);

  constructor(
    private store: Store<PlatformsStoreState>
  ) { }

  loadPlatforms(): void {
    this.store.dispatch(PlatformsActions.loadPlatforms());
  }

  loadPlatform(id: string): void {
    this.store.dispatch(PlatformsActions.loadPlatform({payload: id}));
  }
}
