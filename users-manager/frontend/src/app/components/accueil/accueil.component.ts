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

  public allUsers: any[] = [];

  constructor(
    private localStorageService: LocalStorageService,
    private personnelService: PersonnelService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
    private messageService: MessageService,
  ) {
    this.localStorageService.suscribe(this);
   }

  ngOnInit(): void {
    this.deleteBackgroundImage();
  }

  public updateAll(type: string) {
    if(type === 'CONNECT_USER') {
      return this.getAllUsersData();
    }
  }

  public async getAllUsersData() {
    await this.personnelService.getAllUsersInLocal();
    this.allUsers = await this.localStorageService.getAllUsersOnLocalStorage();
  }

  public deleteBackgroundImage() {
    let html = document.querySelector('html');
    html.classList.remove("bg");
  }
}
