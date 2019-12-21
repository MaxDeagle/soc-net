import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../providers/user/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-news',
  templateUrl: './user-news.component.html',
  styleUrls: ['./user-news.component.scss']
})
export class UserNewsComponent implements OnInit {

  text: string;
  @Input() records: any[] = [];
  isCurrentUser = true;

  constructor(private userService: UserService, private route: ActivatedRoute) {
    if (this.route.snapshot.params.id) {
      this.isCurrentUser = false;
    }
   }

  ngOnInit() {
  }

  addNew() {
    this.userService.addPageRecord(this.text).subscribe(() => {
      this.records.unshift({ text: this.text, date: new Date()});
      this.text = '';
    });
  }
}
