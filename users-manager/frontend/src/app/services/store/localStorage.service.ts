import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { User } from './../model/user';
import * as types from './UserProfileModuleActionTypes';
import * as keys from './localStorageKeys';

@Injectable()
export class LocalStorageService {

    public tab: any[] = [];
    public currentUser: User;
    public allUsers = [];
    public authData: any;
    public authState: boolean;
    public first_connexion: boolean;
     
    constructor(
        @Inject(LOCAL_STORAGE) private storage: StorageService
    ) { }     
     
    public storeAllUsersOnLocalStorage(users: User[]): void {
        
        // get array of tasks from local storage
        this.allUsers = this.storage.get(keys.STORAGE_KEY_USERS) || [];         
        
        // push new task to array
        this.allUsers =  users;
        
        // insert updated array to local storage
        this.storage.set(keys.STORAGE_KEY_USERS, this.allUsers);              
    }

    public storeOneUserOnLocalStorage(user: User): void {
        
        // get array of tasks from local storage
        this.allUsers = this.storage.get(keys.STORAGE_KEY_USERS) || [];         
        
        // push new task to array
        this.allUsers.push(user);
        
        // insert updated array to local storage
        this.storage.set(keys.STORAGE_KEY_USERS, this.allUsers);            
    }

    public storeAuthStateOnLocalStorage(authState: boolean): void {
        
        // get array of tasks from local storage
        this.authState = this.storage.get(keys.STORAGE_KEY_AUTH_STATE) || undefined;         
        
        // push new task to array
        this.authState =  authState;
        
        // insert updated array to local storage
        this.storage.set(keys.STORAGE_KEY_AUTH_STATE, this.authState);

        if(authState)
            this.notify([types.CONNECT_USER]);
    }

    public storeCurrentUserOnLocalStorage(currentUser: User): void {
        
        // get array of tasks from local storage
        this.currentUser = this.storage.get(keys.STORAGE_KEY_CURRENT_USER) || undefined;         
        
        // push new task to array
        this.currentUser =  currentUser;
        
        // insert updated array to local storage
        this.storage.set(keys.STORAGE_KEY_CURRENT_USER, this.currentUser); 
        
        this.storeAuthDataOnLocalStorage({email: currentUser.email, password: currentUser.password});
    }

    public storeFirstConnexionOnLocalStorage(first_connexion: boolean): void {
        
        // get array of tasks from local storage
        this.first_connexion = this.storage.get(keys.STORAGE_KEY_FIRST_CONNEXION) || undefined;         
        
        // push new task to array
        this.first_connexion =  first_connexion;
        
        // insert updated array to local storage
        this.storage.set(keys.STORAGE_KEY_FIRST_CONNEXION, this.first_connexion);
    }

    public storeAuthDataOnLocalStorage(authData: any): void {
        
        // get array of tasks from local storage
        this.authData = this.storage.get(keys.STORAGE_KEY_AUTH_DATA) || {};         
        
        // push new task to array
        this.authData =  authData;
        
        // insert updated array to local storage
        this.storage.set(keys.STORAGE_KEY_AUTH_DATA, this.authData);
    }

    public getCurrentAuthData() {
        return (this.storage.get(keys.STORAGE_KEY_AUTH_DATA) || {});
    }

    public getCurrentUserFirstConnexion() {
        return (this.storage.get(keys.STORAGE_KEY_FIRST_CONNEXION) || undefined);
    }

    public getCurrentUserOnLocalStorage() {
        return (this.storage.get(keys.STORAGE_KEY_CURRENT_USER) || null);
    }

    public getAllUsersOnLocalStorage() {
        return (this.storage.get(keys.STORAGE_KEY_USERS) || []);
    }

    public getAuthStateOnLocalStorage() {
        return (this.storage.get(keys.STORAGE_KEY_AUTH_STATE) || undefined);
    }

    public suscribe(f: any) {
        this.tab.push(f);
    }

    public notify(types: string[]) {
        this.tab.forEach(f => {
            types.forEach(type => {
                f.updateAll(type);
            });
        });
    }
}