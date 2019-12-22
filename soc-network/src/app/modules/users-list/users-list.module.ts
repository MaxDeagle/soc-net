import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersListRoutingModule } from './users-list.routing.module';

@NgModule({
  declarations: [UsersListComponent],
  imports: [
    CommonModule,
    UsersListRoutingModule,
    MatButtonModule
  ]
})
export class UsersListModule { }
