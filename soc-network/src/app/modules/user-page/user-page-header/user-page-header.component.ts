import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from 'src/app/providers/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-page-header',
  templateUrl: './user-page-header.component.html',
  styleUrls: ['./user-page-header.component.scss']
})
export class UserPageHeaderComponent implements OnInit {

  @ViewChild('fileInput') fileInputElem: ElementRef;
  @Input() user: any;
  constructor(public sanitizer: DomSanitizer, private userService: UserService, private route: ActivatedRoute, private router: Router) {
    if (this.route.snapshot.params.id) {
      this.isCurrentUser = false;
    }
  }

  isCurrentUser = true;
  isUserInFriends;

  get avatarStyle() {
    return this.sanitizer.bypassSecurityTrustStyle('url(data:image/png;base64,' + this.user.img + ')');
  }

  ngOnInit() {
    if (this.route.snapshot.params.id) {
      this.userService.isFriend(this.route.snapshot.params.id).subscribe((isFriend) => {
        this.isUserInFriends = isFriend;
      });
    }
  }

  loadAvatar() {
    this.fileInputElem.nativeElement.click();
  }

  getFriendButtonText() {
    if (this.isUserInFriends === true) {
      return 'Удалить из друзей';
    } else if (this.isUserInFriends === false) {
      return 'Добавить в друзья';
    } else {
      return '...';
    }
  }

  toggleFriend() {
    if (this.isUserInFriends === true) {
      this.removeFriend();
    } else if (this.isUserInFriends === false) {
      this.addFriend();
    }
  }

  addFriend() {
    this.userService.addFriend(this.route.snapshot.params.id).subscribe(() => {
      this.isUserInFriends = true;
    });
  }

  removeFriend() {
    this.userService.removeFriend(this.route.snapshot.params.id).subscribe(() => {
      this.isUserInFriends = false;
    });
  }

  navigateToDialog() {
    this.router.navigate(['communication', this.user._id]);
  }

  onFileChange(event) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    this.userService.uploadAvatar(formData).subscribe((res) => {
      console.log(res);
    });
  }
}
