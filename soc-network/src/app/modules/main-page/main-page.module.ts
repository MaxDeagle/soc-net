import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import { MainPageRoutingModule } from './main-page.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { UserPageHeaderComponent } from './user-page-header/user-page-header.component';
import { MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [
    MainPageComponent,
    UserPageHeaderComponent
  ],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    HttpClientModule,
    MatButtonModule
  ]
})
export class MainPageModule { }
