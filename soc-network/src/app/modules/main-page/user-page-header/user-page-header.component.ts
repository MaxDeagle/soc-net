import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user-page-header',
  templateUrl: './user-page-header.component.html',
  styleUrls: ['./user-page-header.component.scss']
})
export class UserPageHeaderComponent implements OnInit {

  @Input() user: any;
  constructor(public sanitizer: DomSanitizer) { }

  get avatarStyle() {
    return this.sanitizer.bypassSecurityTrustStyle('url( ' + this.user.img + ')');
  }

  ngOnInit() {
  }

}
