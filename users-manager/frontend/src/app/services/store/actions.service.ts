import { Injectable } from '@angular/core';

import { LocalStorageService } from './localStorage.service';

import { User } from '../model/user';

@Injectable()
export class ActionsService {
    
    public constructor(
        private localStorageService: LocalStorageService,
    ) {}

    public async connectUser(user: User) {
        await this.localStorageService.storeCurrentUserOnLocalStorage(user);
        await this.localStorageService.storeAuthStateOnLocalStorage(true)
    }

    public async disconnectUser() {
        await this.localStorageService.storeAuthStateOnLocalStorage(false);
        await this.localStorageService.storeCurrentUserOnLocalStorage({id: 0, name: '', surname: '', email: '', poste: '', photoUrl: '', password: ''});
        await this.localStorageService.storeAuthDataOnLocalStorage({});
    }

}
