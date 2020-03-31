import { Component, OnInit } from '@angular/core';

import { User } from './../../services/model/user';

import { LocalStorageService } from './../../services/store/localStorage.service';
import { ActionsService } from '../../services/store/actions.service';
import { MessageService } from './../../services/message.service';

import { UserFormValidatorService } from './../../services/userFormValidator.service'
import { AuthService } from './../../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'ngx-alerts';

import { Router } from '@angular/router';


@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss'],
  providers: [UserFormValidatorService, AlertService, MessageService,],
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
    private localStorageService: LocalStorageService,
    private actionsService: ActionsService,
    private userFormValidatorService: UserFormValidatorService,
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.ckeckIfUserIsConnected();
    this.setBackgroundImage();
    this.showAlerts();
  }

  showAlerts(): void{
    this.alertService.info('this is an info alert');
    this.alertService.danger('this is a danger alert');
    this.alertService.success('this is a success alert');
    this.alertService.warning('this is a warning alert');
  }   

  get email() {
    return this.connectUserForm.get('email');
  };
  get password() {
    return this.connectUserForm.get('password');
  }

  public async onLogin() {
    const isAuth: boolean  = this.localStorageService.getAuthStateOnLocalStorage();
    if(isAuth === true) {
      this.authState = true;
      this.navigate();
    } else {
      this.spinner.show('chargement5');
      await this.authService.login(this.userConnexionData.email, this.userConnexionData.password).subscribe(async users => {
        if(!users || users.length === 0) {
          alert("Identifiants incorrects");
        } else {
          this.authState = true;
          await this.actionsService.connectUser(users[0]);
          this.navigate();
        }
        this.spinner.hide('chargement5');
      });
    }
  }

  public navigate() {
    this.deleteBackgroundImage();
    this.router.navigate(['/accueil'])
  }

  public ckeckIfUserIsConnected() {
    this.authState = this.localStorageService.getAuthStateOnLocalStorage();
    if(this.authState) {
      this.router.navigate(['accueil']);
    }
  }

  public setBackgroundImage() {
    let html = document.querySelector('html');
    html.classList.add("bg");
  }

  public deleteBackgroundImage() {
    let html = document.querySelector('html');
    html.classList.remove("bg");
  }

  public onLogout() {
    this.authState = this.localStorageService.getAuthStateOnLocalStorage();
    this.router.navigate(['connexion']);
  }

  public reset(): void {
    this. userConnexionData = {
      email: '',
      password: '',
    };
  }

}
