import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { LocalStorageService } from './../../services/store/localStorage.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
})
export class MenuBarComponent implements OnInit {

  public isAuth: boolean = false;

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
  ) { 
    
  }

  ngOnInit(): void {
    this.isAuth = this.localStorageService.getAuthStateOnLocalStorage();
    console.log(this.isAuth);
  }

  public logout() {
    this.localStorageService.storeAuthStateOnLocalStorage(false);
    this.router.navigate(['connexion']);
  }

}
