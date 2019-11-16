import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendsListComponent } from './friends-list/friends-list.component';
import { FriendsRoutingModule } from './friends.routing.module';
import { FriendsItemComponent } from './friends-item/friends-item.component';
import { MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [FriendsListComponent, FriendsItemComponent],
  imports: [
    CommonModule,
    FriendsRoutingModule,
    MatButtonModule
  ]
})
export class FriendsModule { }
