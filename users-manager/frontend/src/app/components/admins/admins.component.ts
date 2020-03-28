import { Component, OnInit, Input } from '@angular/core';

import { User } from './../../services/model/user';
import { UserApi } from '../../services/Api/userApi.service'
import { UserFormValidatorService } from '../../services/userFormValidator.service'

import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss'],
  providers: [UserApi, UserFormValidatorService],
})
export class AdminsComponent implements OnInit {
  public allUsers: User[] = [];
  public editedUser: User;
  public user: User = {
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
    private userApi: UserApi,
    private userFormValidatorService: UserFormValidatorService,
    private formBuilder: FormBuilder,
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

  public processFile(imageInput: any) {
    console.log(imageInput);
    if (imageInput.files[0]) {
      const file: File = imageInput.files[0];
      var pattern1 = /image-jpeg/;
      var pattern2 = /image-png/;
      var pattern3 = /image-jpg/;

      if (!file.type.match(pattern1) || !file.type.match(pattern2) || !file.type.match(pattern3)) {
        alert('Invalid format');
        return;
      }

    }
  }

  public async getAllUsers() {
    await this.userApi.getAllUsers().subscribe(users => (this.allUsers = users));
  }

  public async addUser() {
    console.log(this.name, this.surname, this.email, this.password, this.photoUrl);
    this.editedUser = undefined;
    this.user.name = this.user.name.trim();
    this.user.surname = this.user.surname.trim();
    this.user.email = this.user.email.trim();

    if(!this.user.name || !this.user.surname || !this.user.email || !this.user.photoUrl || !this.user.password)
      return;
    
    await this.userApi.createUser(this.user).subscribe(user => this.allUsers.push(user));
    console.log(this.user.photoUrl);
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
    await this.userApi.deleteUser(user.id).subscribe();
  }

  public editUserCurrentInformation(user: User): void {
    this.editedUser = user;
  }

  public async updateUserInformations() {
    if(this.editedUser) {
      await this.userApi.updateUser(this.editedUser).subscribe(user => {
        const index = user
                      ? this.allUsers.findIndex(member => member.id === this.editedUser.id)
                      : -1;
        if(index > -1) {
          this.allUsers[index] = user;
        }
      });
      this.editedUser = undefined;
    }
  }

}
