import { Injectable } from '@angular/core';
import { CanActivate, Router, } from '@angular/router';
import { LocalStorageService } from './../../store/localStorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public localStorageService: LocalStorageService, public router: Router) {}

  async canActivate(): Promise<boolean> {
    const isAuth: boolean  = await this.localStorageService.getAuthStateOnLocalStorage();
    if (!isAuth) {
      this.router.navigate(["connexion"]);
      return false;
    }
    return true;
  }
  
}
