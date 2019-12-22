import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-users-item',
  templateUrl: './users-item.component.html',
  styleUrls: ['./users-item.component.scss']
})
export class UsersItemComponent {
  @Input() user: any;

  constructor(public sanitizer: DomSanitizer, private router: Router) { }

  get avatarStyle() {
    return this.sanitizer.bypassSecurityTrustStyle('url(data:image/png;base64,' + this.user.img + ')');
  }

  navigateToUserPage() {
    this.router.navigate(['users', this.user._id]);
  }

  navigateToDialog(event) {
    event.stopPropagation();
    this.router.navigate(['communication', this.user._id]);
  }

}
