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
  providers: [UserFormValidatorService, AlertService, MessageService,],
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

  constructor(
    private localStorageService: LocalStorageService,
    private userFormValidatorService: UserFormValidatorService,
    private personnelService: PersonnelService,
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
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

  public async addUser() {
    this.editedUser = undefined;
    this.user.name = this.user.name.trim();
    this.user.surname = this.user.surname.trim();
    this.user.email = this.user.email.trim();

    if(!this.user.name || !this.user.surname || !this.user.email || !this.user.photoUrl || !this.user.password)
      return;
    
    this.spinner.show('chargement2');
    await this.personnelService.createUser(this.user).subscribe(user => {
      this.localStorageService.storeOneUserOnLocalStorage(user);
      this.allUsers = this.localStorageService.getAllUsersOnLocalStorage();
      this.reset();
      
      this.spinner.hide('chargement2');
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
    console.log(this.editedUser);
    this.spinner.show('chargement3');
    await this.personnelService.updateUser(this.editedUser).subscribe(user => {
        const index = user
                  ? this.allUsers.findIndex(member => member.id === user.id)
                  : -1;
        if(index > -1) {
          this.allUsers[index] = user;
          this.localStorageService.storeAllUsersOnLocalStorage(this.allUsers);
        }
        this.spinner.hide('chargement3');
    });
  }

  public async deleteUser(user: User) {
    this.spinner.show('chargement4');
    await this.personnelService.deleteUser(user.id).subscribe(() => {
      this.allUsers = this.allUsers.length === 1
                    ? []
                    : this.allUsers.filter(member => member !== user);
      this.localStorageService.storeAllUsersOnLocalStorage(this.allUsers);
      this.spinner.hide('chargement4');
    });
  }


}
