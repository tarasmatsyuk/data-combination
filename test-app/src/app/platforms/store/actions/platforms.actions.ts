import { createAction, props } from '@ngrx/store';
import {Platform, PlatformResponse } from '../models/platform.model';

export const loadPlatforms = createAction('[PLATFORMS] Load Platforms');
export const loadPlatformsSuccess = createAction('[PLATFORMS] Load Platforms Success', props<{ payload: PlatformResponse }>());
export const loadPlatformsFailure = createAction('[PLATFORMS] Load Platforms Failure', props<{payload: Error}>());

export const loadPlatform = createAction('[PLATFORM] Load Platform', props<{ payload: string }>());
export const loadPlatformSuccess = createAction('[PLATFORM] Load Platform Success', props<{ payload: Platform }>());
export const loadPlatformFailure = createAction('[PLATFORM] Load Platform Failure', props<{payload: Error}>());
