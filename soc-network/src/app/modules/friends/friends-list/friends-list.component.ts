import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../providers/user/user.service';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})
export class FriendsListComponent implements OnInit {

  constructor(private userService: UserService) { }

  friends: any;
  ngOnInit() {
    this.userService.getFriends().subscribe((friends) => {
      this.friends = friends;
    });
  }

}
