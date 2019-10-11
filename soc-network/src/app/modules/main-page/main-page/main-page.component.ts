import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers/auth/auth.service';
import { UserService } from 'src/app/providers/user/user.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  user;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser().subscribe((user) => {
      this.user = user;
    });
  }

}
