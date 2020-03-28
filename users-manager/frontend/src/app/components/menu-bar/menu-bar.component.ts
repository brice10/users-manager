import { Component, OnInit } from '@angular/core';

import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
})
export class MenuBarComponent implements OnInit {

  public isAuth: boolean = false;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.isAuth = this.authService.isAuth;
  }

}
