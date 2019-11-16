import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../../../providers/communication/communication.service';


@Component({
  selector: 'app-all-dialogs',
  templateUrl: './all-dialogs.component.html',
  styleUrls: ['./all-dialogs.component.scss']
})

export class AllDialogsComponent implements OnInit {
  dialogs = [];

  constructor(private communicationService: CommunicationService) { }

  ngOnInit() {
    this.communicationService.getDialogs().subscribe((dialogs) => {
      this.dialogs = dialogs;
    });
  }

}
