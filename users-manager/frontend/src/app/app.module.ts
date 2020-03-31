
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationDrawerComponent } from './components/navigation-drawer/navigation-drawer.component';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { PersonnelComponent } from './components/personnel/personnel.component';
import { ProfilComponent } from './components/profil/profil.component';

import { HttpClientModule } from '@angular/common/http';

import { HttpErrorHandler } from './services/http-error-handler.service';
import { MessageService } from './services/message.service';
import { AuthService } from './services/auth.service';
import { PersonnelService } from './services/personnel.service';

import { LocalStorageService  } from './services/store/localStorage.service';
import { ActionsService  } from './services/store/actions.service';

import { NgxSpinnerModule } from 'ngx-spinner';
import { AlertModule } from 'ngx-alerts';



@NgModule({
  declarations: [
    AppComponent,
    NavigationDrawerComponent,
    MenuBarComponent,
    DashboardComponent,
    ConnexionComponent,
    AccueilComponent,
    PersonnelComponent,
    ProfilComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    AppRoutingModule,
    NgxSpinnerModule,
    AlertModule.forRoot({maxMessages: 5, timeout: 5000, position: 'right'}),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [MessageService, HttpErrorHandler, AuthService, PersonnelService, ActionsService, LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
