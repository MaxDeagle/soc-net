import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-friends-item',
  templateUrl: './friends-item.component.html',
  styleUrls: ['./friends-item.component.scss']
})
export class FriendsItemComponent {
  @Input() friend: any;

  constructor(public sanitizer: DomSanitizer, private router: Router) {
  }

  get avatarStyle() {
    return this.sanitizer.bypassSecurityTrustStyle('url(data:image/png;base64,' + this.friend.img + ')');
  }

  navigateToDialog(event) {
    event.stopPropagation();
    this.router.navigate(['communication', this.friend._id]);
  }

  navigateToUserPage() {
    this.router.navigate(['user', this.friend._id]);
  }
}
