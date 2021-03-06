import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { AllDialogsComponent } from './all-dialogs/all-dialogs.component';
import { DialogPageComponent } from './dialog-page/dialog-page.component';

const routes: Routes = [
  {
    path: '',
    component: AllDialogsComponent
  },
  {
    path: ':userId',
    component: DialogPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class CommunicationRoutingModule { }
