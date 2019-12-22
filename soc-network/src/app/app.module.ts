import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './providers/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './providers/user/user.service';
import { SharedModule } from './modules/shared/shared.module';
import { UsersListComponent } from './modules/users-list/users-list/users-list.component';
import { UsersItemComponent } from './modules/users-list/users-item/users-item.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    UsersItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [AuthService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
