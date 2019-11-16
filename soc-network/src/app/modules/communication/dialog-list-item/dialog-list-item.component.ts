import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-dialog-list-item',
  templateUrl: './dialog-list-item.component.html',
  styleUrls: ['./dialog-list-item.component.scss']
})
export class DialogListItemComponent implements OnChanges {

  @Input() dialog: any;
  collocutor;

  constructor(private router: Router, public sanitizer: DomSanitizer) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.dialog && changes.dialog.currentValue) {
      this.collocutor = changes.dialog.currentValue.users.filter((user) => {
        return user._id !== localStorage.getItem('currentUserId');
      })[0];
    }
  }

  navigateToDialog() {
    this.router.navigate(['communication', this.dialog._id]);
  }

  get avatarStyle() {
    return this.sanitizer.bypassSecurityTrustStyle('url(data:image/png;base64,' + this.collocutor.img + ')');
  }

}
