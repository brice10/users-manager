import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonnelService } from './../../services/personnel.service';

@Component({
  selector: 'app-detail-personnel',
  templateUrl: './detail-personnel.component.html',
  styleUrls: ['./detail-personnel.component.scss']
})
export class DetailPersonnelComponent implements OnInit {

  public personnelData: any = {};
  constructor(
    private route: ActivatedRoute,
    private personnelService: PersonnelService,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.personnelData = this.personnelService.getPersonnelById(id);
  }

}
