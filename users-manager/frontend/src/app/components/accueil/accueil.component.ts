import { Component, OnInit } from '@angular/core';

import { User } from './../../services/model/user';

import { LocalStorageService } from './../../services/store/localStorage.service';
import { MessageService } from './../../services/message.service';

import { PersonnelService } from './../../services/personnel.service';
import { AuthService } from './../../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'ngx-alerts';

import { Router } from '@angular/router';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss'],
  providers: [AlertService,],
})
export class AccueilComponent implements OnInit {

  public allUsers: any[] = [];
  public user: any;

  constructor(
    private localStorageService: LocalStorageService,
    private personnelService: PersonnelService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
    private messageService: MessageService,
  ) {
    this.localStorageService.suscribe(this);
    this.user = this.localStorageService.getCurrentUserOnLocalStorage();
   }

  ngOnInit(): void {
    this.deleteBackgroundImage();
    this.setBackgroundImage();
  }

  public updateAll(type: string) {
    if(type === 'CONNECT_USER') {
      return this.getAllUsersData();
    } else if(type === 'NEW_MESSAGE') {
      return this.displayMessage();
    }
  }

  public async displayMessage() {
    const incomingMessage = this.messageService.incomingMessage;
    if(incomingMessage.type === 'success' && incomingMessage.service === 'PersonnelService' && incomingMessage.operation === 'getAllUsers' && incomingMessage.message === 'Les données ont bien été mis à jour !!') {
      this.alertService.success(incomingMessage.message);
      await this.localStorageService.deleteMessageOnLocalStorage(incomingMessage);
      return;
    }
    if(incomingMessage.type === 'error' && incomingMessage.service === 'PersonnelService' && incomingMessage.operation === 'getAllUsers') {
      this.alertService.danger('échec de la mise à jour veuillez vérifier votre connexion à internet !');
      await this.localStorageService.deleteMessageOnLocalStorage(incomingMessage);
      return;
    }
  }

  public async getAllUsersData() {
    await this.personnelService.getAllUsersInLocal();
    this.allUsers = await this.localStorageService.getAllUsersOnLocalStorage();
    this.user = await this.localStorageService.getCurrentUserOnLocalStorage();
  }

  public navigatetoPersonnel() {
    this.router.navigate(['personnel']);
  }

  public navigatetoDashboard() {
    this.router.navigate(['dashboard']);
  }

  public navigatetoProfil() {
    const path: string = 'personnel/' + this.user.id;
    this.router.navigate([path]);
  }

  public setBackgroundImage() {
    let html = document.querySelector('html');
    html.classList.add("bg-dark");
  }

  public deleteBackgroundImage() {
    let html = document.querySelector('html');
    html.classList.remove("bg");
  }
}
