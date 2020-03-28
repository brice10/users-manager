
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationDrawerComponent } from './components/navigation-drawer/navigation-drawer.component';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { UsersComponent } from './components/users/users.component';
import { AdminsComponent } from './components/admins/admins.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { PersonnelComponent } from './components/personnel/personnel.component';
import { DetailPersonnelComponent } from './components/detail-personnel/detail-personnel.component';

import { HttpClientModule } from '@angular/common/http';

import { HttpErrorHandler } from './services/http-error-handler.service';
import { MessageService } from './services/message.service';
import { AuthService } from './services/auth.service';
import { PersonnelService } from './services/personnel.service';



@NgModule({
  declarations: [
    AppComponent,
    NavigationDrawerComponent,
    MenuBarComponent,
    UsersComponent,
    AdminsComponent,
    ConnexionComponent,
    AccueilComponent,
    PersonnelComponent,
    DetailPersonnelComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [MessageService, HttpErrorHandler, AuthService, PersonnelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
