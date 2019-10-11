import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from 'src/app/providers/user/user.service';

@Component({
  selector: 'app-user-page-header',
  templateUrl: './user-page-header.component.html',
  styleUrls: ['./user-page-header.component.scss']
})
export class UserPageHeaderComponent implements OnInit {

  @ViewChild('fileInput') fileInputElem: ElementRef;
  @Input() user: any;
  constructor(public sanitizer: DomSanitizer, private userService: UserService) { }

  get avatarStyle() {
    return this.sanitizer.bypassSecurityTrustStyle('url(data:image/png;base64,' + this.user.img + ')');
  }

  ngOnInit() {
  }

  loadAvatar() {
    this.fileInputElem.nativeElement.click();
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
