import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { AllDialogsComponent } from './all-dialogs/all-dialogs.component';

const routes: Routes = [
  {
    path: '',
    component: AllDialogsComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class CommunicationRoutingModule { }
