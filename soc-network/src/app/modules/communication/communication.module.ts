import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllDialogsComponent } from './all-dialogs/all-dialogs.component';
import { CommunicationRoutingModule } from './communication.routing.module';
import { DialogListItemComponent } from './dialog-list-item/dialog-list-item.component';
import { SharedModule } from '../shared/shared.module';
import { DialogPageComponent } from './dialog-page/dialog-page.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material';
@NgModule({
  declarations: [AllDialogsComponent, DialogListItemComponent, DialogPageComponent],
  imports: [
    CommonModule,
    CommunicationRoutingModule,
    SharedModule,
    FormsModule,
    MatButtonModule
  ]
})
export class CommunicationModule { }
