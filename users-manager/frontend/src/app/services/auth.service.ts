import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

    public isAuth: boolean = false;

    public constructor() {}

    public login() {
        return new Promise(
            (resolve, reject) => {
                setTimeout(
                        () => { 
                        this.isAuth = true;
                        resolve(true);
                    }, 2000
                );
            }
        );
    }

    public logout() {
        this.isAuth = false;
    }
}