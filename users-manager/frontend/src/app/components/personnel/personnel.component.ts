import { Component, OnInit, Input } from '@angular/core';

import { LocalStorageService } from './../../services/store/localStorage.service';
import { MessageService } from './../../services/message.service';

import { User } from './../../services/model/user';

import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.scss'],
  providers: [AlertService, MessageService],
})
export class PersonnelComponent implements OnInit {

  public user: User;
  public allUsers: any[] = [];
  
  constructor(
    private localStorageService: LocalStorageService,
    private alertService: AlertService,
    private messageService: MessageService,
  ) 
  { 
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  public async getAllUsers() {
    this.allUsers = await this.localStorageService.getAllUsersOnLocalStorage();
    this.user = await this.localStorageService.getCurrentUserOnLocalStorage()
  }

  public checkUserState(id: number) {
    return this.user.poste === 'administrateur'
            ? false
            : (this.user.id !== id);
  }

}
