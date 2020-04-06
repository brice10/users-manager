import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { LocalStorageService } from './../../services/store/localStorage.service';
import { ActionsService } from '../../services/store/actions.service';

import { User } from './../../services/model/user';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
})
export class MenuBarComponent implements OnInit {

  public isAuth: boolean = false;
  public user: User = this.localStorageService.getCurrentUserOnLocalStorage();

  constructor(
    private localStorageService: LocalStorageService,
    private actionsService: ActionsService,
    private router: Router,
  ) { 
    this.localStorageService.suscribe(this);
  }

  ngOnInit(): void {
    this.isAuth = this.localStorageService.getAuthStateOnLocalStorage();
  }

  public updateAll(type: string) {
    if(type === 'CONNECT_USER') {
      return this.updateData();
    }
  }

  public async updateData() {
    this.user = await this.localStorageService.getCurrentUserOnLocalStorage();
    this.isAuth = true;
  }

  public async logout() {
    await this.actionsService.disconnectUser();
    this.user = {
      id: -1,
      name: '',
      surname: '',
      photoUrl: '',
      poste: '',
      email: '',
      password: '',
    }
    this.deleteBackgroundImage();
    this.setBackgroundImage();
    this.router.navigate(['connexion']);
  }

  public setBackgroundImage() {
    let html = document.querySelector('html');
    html.classList.add("bg");
  }

  public deleteBackgroundImage() {
    let html = document.querySelector('html');
    html.classList.remove("bg-dark");
  }

  public checkUserPoste() {
    return this.user.poste === 'administrateur';
  }

}
