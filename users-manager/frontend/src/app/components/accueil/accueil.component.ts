import { Component, OnInit } from '@angular/core';

import { User } from './../../services/model/user';
import { UserFormValidatorService } from './../../services/userFormValidator.service'
import { AuthService } from './../../services/auth.service';

import { Router } from '@angular/router';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss'],
  providers: [UserFormValidatorService,],
})
export class AccueilComponent implements OnInit {

  public authState: boolean = false;
  public userConnexionData: any = {
    email: '',
    password: '',
  };

  constructor(
    private userFormValidatorService: UserFormValidatorService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  public onLogout() {
    this.authService.logout();
    this.authState = this.authService.isAuth;
  }

  public reset(): void {
    this. userConnexionData = {
      email: '',
      password: '',
    };
  }

}
