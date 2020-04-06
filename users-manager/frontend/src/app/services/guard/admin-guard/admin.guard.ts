import { Injectable } from '@angular/core';
import { CanActivate, Router, } from '@angular/router';
import { LocalStorageService } from './../../store/localStorage.service';

import { User } from './../../model/user';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(public localStorageService: LocalStorageService, public router: Router) {}

  async canActivate(): Promise<boolean> {
    const user: User = await this.localStorageService.getCurrentUserOnLocalStorage();
    if (user.poste !== 'administrateur') {
      const path = 'personnel/' + user.id;
      this.router.navigate([path]);
      return false;
    }
    return true;
  }
  
}
