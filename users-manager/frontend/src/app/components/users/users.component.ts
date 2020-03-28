import { Component, OnInit, Input } from '@angular/core';

import { User } from '../../services/model/user';
import { PersonnelService } from './../../services/personnel.service'
import { UserFormValidatorService } from './../../services/userFormValidator.service'

import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [UserFormValidatorService],
})
export class UsersComponent implements OnInit {
  public allUsers: any[] = [];
  public editedUser: User;
  public user: any = {
    id: '',
    name: '',
    surname: '',
    email: '',
    photoUrl: '',
    password: '',
  };
  public validForm: boolean = false;
  public errorMessages: any = this.userFormValidatorService.errorMessages;
  public addUserForm: any =  this.userFormValidatorService.addUserForm;

  constructor(
    private userFormValidatorService: UserFormValidatorService,
    private formBuilder: FormBuilder,
    private personnelService: PersonnelService,
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
  get email() {
    return this.addUserForm.get('email');
  }
  get photoUrl() {
    return this.addUserForm.get('photoUrl');
  }
  get password() {
    return this.addUserForm.get('password');
  }

  public async getAllUsers() {
    this.allUsers = this.personnelService.personnelList;
    //await this.userApi.getAllUsers().subscribe(users => (this.allUsers = users));
  }

  public async addUser() {
    this.editedUser = undefined;
    this.user.name = this.user.name.trim();
    this.user.surname = this.user.surname.trim();
    this.user.email = this.user.email.trim();

    if(!this.user.name || !this.user.surname || !this.user.email || !this.user.photoUrl || !this.user.password)
      return;
    
    //await this.userApi.createUser(this.user).subscribe(user => this.allUsers.push(user));
    this.personnelService.createPersonnel(this.user);
    this.reset();
  }

  public reset(): void {
    this. user = {
      id: '',
      name: '',
      surname: '',
      email: '',
      photoUrl: '',
      password: '',
    };
  }

  public async deleteUser(user: User) {
    this.allUsers = this.allUsers.filter(member => member !== user);
    //await this.userApi.deleteUser(user.id).subscribe();
  }

  public editUserCurrentInformation(user: User): void {
    this.editedUser = user;
  }

  public updateUserInformations() {
  
    if(this.editedUser) {
      // await this.userApi.updateUser(this.editedUser).subscribe(user => {
      //   const index = user
      //                 ? this.allUsers.findIndex(member => member.id === this.editedUser.id)
      //                 : -1;
      //   if(index > -1) {
      //     this.allUsers[index] = user;
      //   }
      // });
      this.personnelService.updateUser(this.editedUser);
      this.editedUser = undefined;
    }
  }

}
