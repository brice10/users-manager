import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from './../../services/model/user';

import { LocalStorageService } from './../../services/store/localStorage.service';
import { MessageService } from './../../services/message.service';

import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
  providers: [AlertService, MessageService],
})
export class ProfilComponent implements OnInit {

  public personnelData: User;
  constructor(
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private alertService: AlertService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.personnelData = this.localStorageService.getAllUsersOnLocalStorage().find(member => member.id == id);
  }

}
