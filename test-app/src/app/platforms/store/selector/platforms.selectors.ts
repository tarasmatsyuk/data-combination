import { createFeatureSelector, createSelector } from '@ngrx/store';
import {platformsReducerFeatureKey, PlatformsState } from '../reducers/platforms-reducer.reducer';

export const getPlatformsState = createFeatureSelector<PlatformsState>(platformsReducerFeatureKey);

export const platforms = createSelector(
  getPlatformsState,
  (state: PlatformsState) => state.platforms?.platforms
);

export const selectedPlatform = createSelector(
  getPlatformsState,
  (state: PlatformsState) => state.selectedPlatform
);

export const userCount = createSelector(
  getPlatformsState,
  (state: PlatformsState) => state.platforms?.user_count
);

export const isLoading = createSelector(
  getPlatformsState,
  (state: PlatformsState) => state.loading
);

export const isError = createSelector(
  getPlatformsState,
  (state: PlatformsState) => state.error
);

export const platformsQuery = {
  platforms,
  userCount,
  isLoading,
  isError,
  selectedPlatform,
};
