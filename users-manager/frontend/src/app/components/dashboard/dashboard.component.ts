import { Component, OnInit } from '@angular/core';

import { User } from '../../services/model/user';

import { LocalStorageService } from './../../services/store/localStorage.service';
import { MessageService } from './../../services/message.service';

import { PersonnelService } from './../../services/personnel.service';
import { UserFormValidatorService } from './../../services/userFormValidator.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [UserFormValidatorService, AlertService,],
})
export class DashboardComponent implements OnInit {
  public allUsers: any[] = [];
  public editedUser: User;
  public user: any = {
    id: '',
    name: '',
    surname: '',
    photoUrl: '',
    poste: '',
    email: '',
    password: '',
  };
  public validForm: boolean = false;
  public errorMessages: any = this.userFormValidatorService.errorMessages;
  public addUserForm: any =  this.userFormValidatorService.addUserForm;
  public fileData: File = null;

  constructor(
    private localStorageService: LocalStorageService,
    private userFormValidatorService: UserFormValidatorService,
    private personnelService: PersonnelService,
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
    private messageService: MessageService,
  ) {
    this.localStorageService.suscribe(this);
   }

  ngOnInit(): void {
    this.getAllUsers();
  }

  public updateAll(type: string) {
    if(type === 'NEW_MESSAGE') {
      return this.displayMessage();
    }
  }

  public async displayMessage() {
    const incomingMessage = this.messageService.incomingMessage;
    if(incomingMessage.type === 'error' && incomingMessage.service === 'PersonnelService' && incomingMessage.operation === 'createUser') {
      this.alertService.warning('Echec de l\'enregistrement, veuillez vérifiez voter connexion internet puis réessayer!');
      await this.localStorageService.deleteMessageOnLocalStorage(incomingMessage);
      return;
    }
    if(incomingMessage.type === 'error' && incomingMessage.service === 'PersonnelService' && incomingMessage.operation === 'updateUser') {
      this.alertService.warning('Echec de la mise à jour, veuillez vérifiez voter connexion internet puis réessayer!');
      await this.localStorageService.deleteMessageOnLocalStorage(incomingMessage);
      return;
    }
    if(incomingMessage.type === 'error' && incomingMessage.service === 'PersonnelService' && incomingMessage.operation === 'deleteUser') {
      this.alertService.warning('Echec de la suppréssion, veuillez vérifiez voter connexion internet puis réessayer!');
      await this.localStorageService.deleteMessageOnLocalStorage(incomingMessage);
      return;
    }

    if(incomingMessage.type === 'success' && incomingMessage.service === 'PersonnelService' && incomingMessage.operation === 'createUser') {
      this.alertService.success('Utilisateur crée avec success !!!');
      await this.localStorageService.deleteMessageOnLocalStorage(incomingMessage);
      return;
    }
    if(incomingMessage.type === 'success' && incomingMessage.service === 'PersonnelService' && incomingMessage.operation === 'updateUser') {
      this.alertService.success('Mise à jour de l\'utilisateur réussie !!!');
      await this.localStorageService.deleteMessageOnLocalStorage(incomingMessage);
      return;
    }
    if(incomingMessage.type === 'success' && incomingMessage.service === 'PersonnelService' && incomingMessage.operation === 'deleteUser') {
      this.alertService.success('Utilisateur supprimé avec success !!!');
      await this.localStorageService.deleteMessageOnLocalStorage(incomingMessage);
      return;
    }
  }

  get name() {
    return this.addUserForm.get('name');
  };
  get surname() {
    return this.addUserForm.get('surname');
  };
  get photoUrl() {
    return this.addUserForm.get('photoUrl');
  }
  get poste() {
    return this.addUserForm.get('poste');
  }
  get email() {
    return this.addUserForm.get('email');
  }
  get password() {
    return this.addUserForm.get('password');
  }

  public getAllUsers() {
    let allUsers = this.localStorageService.getAllUsersOnLocalStorage();
    if(allUsers)
      this.allUsers = allUsers;
  }

  public async fileProgress(file: File) {
    this.fileData = file;
    await this.uploadPhoto();
  }

  public async uploadPhoto() {
    var formData = new FormData();
    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = () => {
      this.user.photoUrl = reader.result as string;
    }
    formData.append('image', this.fileData);
    await this.personnelService.uploadPhoto(formData).subscribe(res => {
      console.log(res);
    });
  }

  public async addUser() {
    this.editedUser = undefined;
    this.user.name = this.user.name.trim();
    this.user.surname = this.user.surname.trim();
    this.user.email = this.user.email.trim();

    if(!this.user.name || !this.user.surname || !this.user.photoUrl || !this.user.email || !this.user.password)
      return;
    
    this.spinner.show('chargement2');
    //this.user.photoUrl = this.user.photoUrl.substr(0, 30);
    await this.personnelService.createUser(this.user).subscribe( async user => {
      if(user) {
        await this.localStorageService.storeOneUserOnLocalStorage(user);
        this.allUsers = await this.localStorageService.getAllUsersOnLocalStorage();
        this.messageService.add({type: 'success', service: 'PersonnelService', operation: 'createUser', message: ''});
        this.reset();
        this.spinner.hide('chargement2');
      }
    });
  }

  public reset(): void {
    this. user = {
      id: '',
      name: '',
      surname: '',
      email: '',
      photoUrl: '',
      poste: '',
      password: '',
    };
  }

  public editUserCurrentInformation(user: User): void {
    this.editedUser = user;
  }

  public async getPersonnelById(id: number) {
    return this.allUsers.find(person => person.id === id);
  }

  notifyPosteChange(poste: string) {
    this.user.poste = poste;
    this.editedUser.poste = poste;
  }

  public async updateUser() {
    this.spinner.show('chargement3');
    await this.personnelService.updateUser(this.editedUser).subscribe(async user => {
      if(user) {
        const index = user
                  ? this.allUsers.findIndex(member => member.id === user.id)
                  : -1;
        if(index > -1) {
          this.allUsers[index] = user;
          await this.localStorageService.storeAllUsersOnLocalStorage(this.allUsers);
          this.messageService.add({type: 'success', service: 'PersonnelService', operation: 'updateUser', message: ''});
        }
      }
      this.spinner.hide('chargement3');
    });
  }

  public async deleteUser(user: User) {
    this.spinner.show('chargement4');
    await this.personnelService.deleteUser(user.id).subscribe(async () => {
      this.allUsers = this.allUsers.length === 1
                    ? []
                    : this.allUsers.filter(member => member !== user);
      await this.localStorageService.storeAllUsersOnLocalStorage(this.allUsers);
      this.messageService.add({type: 'success', service: 'PersonnelService', operation: 'deleteUser', message: ''});
      this.spinner.hide('chargement4');
    });
  }


}
