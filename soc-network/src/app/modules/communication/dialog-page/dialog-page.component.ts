import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommunicationService } from '../../../providers/communication/communication.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dialog-page',
  templateUrl: './dialog-page.component.html',
  styleUrls: ['./dialog-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogPageComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  dialog: any;
  messages = [];
  newMessageText: string;

  constructor(private route: ActivatedRoute, private communicationService: CommunicationService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.communicationService.getDialog(this.route.snapshot.params.userId).subscribe((dialog) => {
      this.dialog = dialog;
      this.messages = dialog.messages;

      this.cd.detectChanges();

      this.scrollToBottom();

      this.cd.detectChanges();
    });
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { console.error(err); }
  }

  sendMessage() {
    if (this.newMessageText) {
      this.communicationService.sendMessage(this.newMessageText, this.dialog._id).subscribe((message) => {
        this.newMessageText = '';
        this.dialog.messages.push(message);
      });
    }
  }

  isCurrentUserMessage(message: any) {
    return message.author._id === localStorage.getItem('currentUserId');
  }

}
