import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersComponent} from './components/users/users.component';
import {UserDetailsComponent} from './components/user-details/user-details.component';
import {UserResolverResolver} from './services/user-resolver.resolver';

const routes: Routes = [
  {path: '', component: UsersComponent},
  {
    path: ':id', component: UserDetailsComponent,
    resolve: {data: UserResolverResolver}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
