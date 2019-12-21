import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/providers/user/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  user;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.route.snapshot.params.id) {
      this.userService.getUser(this.route.snapshot.params.id).subscribe((user) => {
        this.user = user;
        this.user.records = this.user.records ? this.user.records.slice().reverse() : [];
      });
    } else {
      this.userService.getUser().subscribe((user) => {
        this.user = user;
        this.user.records = this.user.records ? this.user.records.slice().reverse() : [];
      });
    }
  }

}
