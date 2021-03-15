import { createReducer, on } from '@ngrx/store';
import * as PlatformsActions from '../actions/platforms.actions';
import { Platform, PlatformResponse } from '../models/platform.model';

export const platformsReducerFeatureKey = 'platformsReducer';

export interface PlatformsState {
  platforms: PlatformResponse;
  selectedPlatform: Platform;
  loading: boolean;
  error: Error;
}

export const initialState: PlatformsState = {
  platforms: null,
  selectedPlatform: null,
  loading: false,
  error: null,
};

export const platformsReducer = createReducer(
  initialState,
  on(PlatformsActions.loadPlatforms,
    (state, action) => ({ ...state, loading: true })
  ),
  on(PlatformsActions.loadPlatformsSuccess,
    (state, action) => ({ ...state, platforms: action.payload, loading: false })
  ),
  on(PlatformsActions.loadPlatformsFailure,
    (state, action) => ({ ...state, platforms: null, loading: false })
  ),
  on(PlatformsActions.loadPlatform,
    (state, action) => ({ ...state, loading: true })
  ),
  on(PlatformsActions.loadPlatformSuccess,
    (state, action) => ({ ...state, selectedPlatform: action.payload, loading: false })
  ),
  on(PlatformsActions.loadPlatformFailure,
    (state, action) => ({ ...state, selectedPlatform: null, loading: false })
  ),
);

