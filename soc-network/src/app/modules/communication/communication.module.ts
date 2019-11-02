import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllDialogsComponent } from './all-dialogs/all-dialogs.component';
import { CommunicationRoutingModule } from './communication.routing.module';
import { DialogListItemComponent } from './dialog-list-item/dialog-list-item.component';
import { MatCardModule } from '@angular/material/card';
@NgModule({
  declarations: [AllDialogsComponent, DialogListItemComponent],
  imports: [
    CommonModule,
    CommunicationRoutingModule,
    MatCardModule
  ]
})
export class CommunicationModule { }
