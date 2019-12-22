import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { AuthGuard } from '../auth/auth.guard';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: UsersListComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class UsersListRoutingModule { }
