import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/providers/user/user.service';


@Component({
  selector: 'app-all-dialogs',
  templateUrl: './all-dialogs.component.html',
  styleUrls: ['./all-dialogs.component.scss']
})

export class AllDialogsComponent implements OnInit {

  

  dialogs;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getDialogs().subscribe((dialogs) => {
      console.log(dialogs);
      this.dialogs = dialogs;
    });
  }

}
