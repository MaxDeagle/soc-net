import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllDialogsComponent } from './all-dialogs/all-dialogs.component';
import { CommunicationRoutingModule } from './communication.routing.module';

@NgModule({
  declarations: [AllDialogsComponent],
  imports: [
    CommonModule,
    CommunicationRoutingModule
  ]
})
export class CommunicationModule { }
