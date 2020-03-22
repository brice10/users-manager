
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { NavigationDrawerComponent } from './components/navigation-drawer/navigation-drawer.component';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { UsersComponent } from './components/users/users.component';

import { HttpClientModule } from '@angular/common/http';

import { HttpErrorHandler } from './services/http-error-handler.service';
import { MessageService } from './services/message.service';


@NgModule({
  declarations: [
    AppComponent,
    NavigationDrawerComponent,
    MenuBarComponent,
    UsersComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    HttpClientModule,
  ],
  providers: [MessageService, HttpErrorHandler],
  bootstrap: [AppComponent]
})
export class AppModule { }
