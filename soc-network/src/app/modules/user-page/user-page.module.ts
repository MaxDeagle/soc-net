import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPageRoutingModule } from './user-page.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { UserPageHeaderComponent } from './user-page-header/user-page-header.component';
import { MatButtonModule } from '@angular/material';
import { SharedModule } from '../shared/shared.module';
import { UserPageComponent } from './user-page/user-page.component';

@NgModule({
  declarations: [
    UserPageComponent,
    UserPageHeaderComponent
  ],
  imports: [
    CommonModule,
    UserPageRoutingModule,
    HttpClientModule,
    MatButtonModule,
    SharedModule
  ]
})
export class UserPageModule { }
