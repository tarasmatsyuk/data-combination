import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './components/users/users.component';
import {MaterialModule} from '../material/material.module';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import {UserResolverResolver} from './services/user-resolver.resolver';

@NgModule({
  declarations: [UsersComponent, UserDetailsComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialModule,
  ],
  providers: [
    UserResolverResolver
  ]
})
export class UsersModule { }
