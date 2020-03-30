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
  providers: [AlertService, MessageService,],
})
export class AccueilComponent implements OnInit {

  public authState: boolean = false;
  public userConnexionData: any = {
    email: '',
    password: '',
  };
  public allUsers: any[] = [];

  constructor(
    private localStorageService: LocalStorageService,
    private personnelService: PersonnelService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.deleteBackgroundImage();
  }

  public getAllUsersData() {
    this.personnelService.getAllUsersInLocal().then(() => {
      this.allUsers = this.localStorageService.getAllUsersOnLocalStorage();
    });
  }

  public onLogout() {
    this.localStorageService.storeAuthStateOnLocalStorage(false);
    this.authState = false;
  }

  public deleteBackgroundImage() {
    let html = document.querySelector('html');
    html.classList.remove("bg");
  }

  public reset(): void {
    this. userConnexionData = {
      email: '',
      password: '',
    };
  }

}
