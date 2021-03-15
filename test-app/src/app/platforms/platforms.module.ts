import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlatformsRoutingModule } from './platforms-routing.module';
import { PlatformsComponent } from './components/platforms/platforms.component';
import { MaterialModule } from '../material/material.module';
import { StoreModule } from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import * as fromPlatform from './store/reducers/platforms-reducer.reducer';
import { PlatformsEffects } from './store/effects/platforms.effects';
import { PlatformDetailsComponent } from './components/platform-details/platform-details.component';
import {UsersEffects} from '../users/store/effects/users.effects';
import { PlatformResolverResolver } from './services/platform-resolver.resolver';

@NgModule({
  declarations: [PlatformsComponent, PlatformDetailsComponent],
  imports: [
    CommonModule,
    PlatformsRoutingModule,
    MaterialModule,
  ],
  providers: [
    PlatformResolverResolver,
  ]
})
export class PlatformsModule { }
