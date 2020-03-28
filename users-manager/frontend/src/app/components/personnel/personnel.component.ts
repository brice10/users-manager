import { Component, OnInit, Input } from '@angular/core';

import { PersonnelService } from 'src/app/services/personnel.service';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.scss'],
  providers: [PersonnelService,],
})
export class PersonnelComponent implements OnInit {

  public allUsers: any[] = [];
  
  constructor(
    private personnelService: PersonnelService,
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  public getAllUsers() {
    this.allUsers = this.personnelService.personnelList;
  }

}
