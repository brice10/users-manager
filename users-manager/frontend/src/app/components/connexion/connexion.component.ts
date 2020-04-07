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
  providers: [UserFormValidatorService, AlertService,],
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
  ) {
    this.localStorageService.suscribe(this);
   }

  ngOnInit(): void {
    this.ckeckIfUserIsConnected();
    this.setBackgroundImage();
  }

  public updateAll(type: string) {
    if(type === 'NEW_MESSAGE') {
      return this.displayMessage();
    }
  }

  public async displayMessage() {
    const incomingMessage = this.messageService.incomingMessage;
    if(incomingMessage.type === 'error' && incomingMessage.service === 'AuthService' && incomingMessage.operation === 'login') {
      this.alertService.danger('Erreur de réseau veuillez vérifier votre connextion à internet puis réessayer');
      await this.localStorageService.deleteMessageOnLocalStorage(incomingMessage);
      return;
    }
    //this.alertService.danger('Identifiants incorrects !!!');
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
        if(users && users.length !== 0) {
          this.authState = true;
          await this.actionsService.connectUser(users[0]);
          this.navigate();
        } else
          this.alertService.danger('Identifiants Incorrects !!!');
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
