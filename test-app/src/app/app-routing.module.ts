import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'platforms', pathMatch: 'full' },
  {
    path: 'platforms',
    loadChildren: () => import('./platforms/platforms.module').then(m => m.PlatformsModule),
    data: { state: 'platforms' }
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
    data: { state: 'users' }
  },
  { path: '**', redirectTo: 'platforms', }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
