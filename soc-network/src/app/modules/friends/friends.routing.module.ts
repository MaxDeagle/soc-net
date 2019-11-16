import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { FriendsListComponent } from './friends-list/friends-list.component';

const routes: Routes = [
  {
    path: '',
    component: FriendsListComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class FriendsRoutingModule { }
