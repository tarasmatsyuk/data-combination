import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PlatformDetailsComponent} from './components/platform-details/platform-details.component';
import {PlatformsComponent} from './components/platforms/platforms.component';
import {PlatformResolverResolver} from './services/platform-resolver.resolver';

const routes: Routes = [
  {path: '', component: PlatformsComponent},
  {
    path: ':id', component: PlatformDetailsComponent,
    resolve: {data: PlatformResolverResolver}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlatformsRoutingModule {
}
