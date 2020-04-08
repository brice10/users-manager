import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from './../../services/model/user';

import { LocalStorageService } from './../../services/store/localStorage.service';

import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
  providers: [AlertService,],
})
export class ProfilComponent implements OnInit {

  public personnelData: User;
  public currentUser: User;
  constructor(
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private alertService: AlertService,
  ) {

      const allUsers = this.localStorageService.getAllUsersOnLocalStorage();
      const id = this.route.snapshot.params['id'];
      this.personnelData = allUsers.find(member => member.id == id);
      this.currentUser = this.localStorageService.getCurrentUserOnLocalStorage();
    }

  ngOnInit() {
  }

}
