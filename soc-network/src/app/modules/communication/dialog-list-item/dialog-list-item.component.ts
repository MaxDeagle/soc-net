import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-dialog-list-item',
  templateUrl: './dialog-list-item.component.html',
  styleUrls: ['./dialog-list-item.component.scss']
})
export class DialogListItemComponent implements OnInit {

  @Input() dialog: any;
  constructor() { }

  ngOnInit() {
  }

}
