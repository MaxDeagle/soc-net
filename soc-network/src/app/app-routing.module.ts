import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './modules/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/user',
    pathMatch: 'full'
  },
  {
    path: 'user',
    loadChildren: './modules/main-page/main-page.module#MainPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: './modules/auth/auth.module#AuthModule',
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
