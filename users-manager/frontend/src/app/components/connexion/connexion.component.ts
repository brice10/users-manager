import { Component, OnInit, Input } from '@angular/core';

import { User } from './../../services/model/user';
import { UserFormValidatorService } from './../../services/userFormValidator.service'
import { AuthService } from './../../services/auth.service';

import { Router } from '@angular/router';


@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss'],
  providers: [UserFormValidatorService],
})
export class ConnexionComponent implements OnInit {

  public authState: boolean = false;
  public userConnexionData: any = {
    email: '',
    password: '',
  };
  public validForm: boolean = false;
  public errorMessages: any = this.userFormValidatorService.errorMessages;
  public connectUserForm: any =  this.userFormValidatorService.connectUserForm;

  constructor(
    private userFormValidatorService: UserFormValidatorService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.authState = this.authService.isAuth;
  }

  get email() {
    return this.connectUserForm.get('email');
  };
  get password() {
    return this.connectUserForm.get('password');
  }

  public onLogin() {
    this.authService.login().then(
      () => {
        this.authState = this.authService.isAuth;
        this.router.navigate(['user']);
      });
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
