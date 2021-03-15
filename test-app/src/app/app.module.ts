import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import {EffectsModule} from '@ngrx/effects';
import {UsersEffects} from './users/store/effects/users.effects';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import {ToastrModule} from 'ngx-toastr';
import * as fromUsers from './users/store/reducers/users-reducer.reducer';
import * as fromPlatform from './platforms/store/reducers/platforms-reducer.reducer';
import { PlatformsEffects } from './platforms/store/effects/platforms.effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    StoreModule.forRoot({
      [fromUsers.usersReducerFeatureKey]: fromUsers.usersReducer,
      [fromPlatform.platformsReducerFeatureKey]: fromPlatform.platformsReducer,
    }),
    EffectsModule.forRoot([
      PlatformsEffects,
      UsersEffects
    ]),
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true,
      progressBar: true,
    }),
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }) : [],
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
