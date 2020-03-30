import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { User } from './../model/user';

// key that is used to access the data in local storage
const STORAGE_KEY_USERS = 'local_users';
const STORAGE_KEY_AUTH_STATE = 'local_user_auth_state';
const STORAGE_KEY_CURRENT_USER = 'local_current_user';
const STORAGE_KEY_FIRST_CONNEXION = 'local_first_connexion';

@Injectable()
export class LocalStorageService {

    public currentUser: User;
    public allUsers = [];
    public authState: boolean;
    public first_connexion: boolean;
     
    constructor(
        @Inject(LOCAL_STORAGE) private storage: StorageService
    ) { }     
     
    public storeAllUsersOnLocalStorage(users: User[]): void {
        
        // get array of tasks from local storage
        this.allUsers = this.storage.get(STORAGE_KEY_USERS) || [];         
        
        // push new task to array
        this.allUsers =  users;
        
        // insert updated array to local storage
        this.storage.set(STORAGE_KEY_USERS, this.allUsers);              
    }

    public storeOneUserOnLocalStorage(user: User): void {
        
        // get array of tasks from local storage
        this.allUsers = this.storage.get(STORAGE_KEY_USERS) || [];         
        
        // push new task to array
        this.allUsers.push(user);
        
        // insert updated array to local storage
        this.storage.set(STORAGE_KEY_USERS, this.allUsers);            
    }

    public storeAuthStateOnLocalStorage(authState: boolean): void {
        
        // get array of tasks from local storage
        this.authState = this.storage.get(STORAGE_KEY_AUTH_STATE) || undefined;         
        
        // push new task to array
        this.authState =  authState;
        
        // insert updated array to local storage
        this.storage.set(STORAGE_KEY_AUTH_STATE, this.authState);
    }

    public storeCurrentUserOnLocalStorage(currentUser: User): void {
        
        // get array of tasks from local storage
        this.currentUser = this.storage.get(STORAGE_KEY_AUTH_STATE) || undefined;         
        
        // push new task to array
        this.currentUser =  currentUser;
        
        // insert updated array to local storage
        this.storage.set(STORAGE_KEY_CURRENT_USER, this.currentUser);             
    }

    public storeFirstConnexionOnLocalStorage(first_connexion: boolean): void {
        
        // get array of tasks from local storage
        this.first_connexion = this.storage.get(STORAGE_KEY_FIRST_CONNEXION) || undefined;         
        
        // push new task to array
        this.first_connexion =  first_connexion;
        
        // insert updated array to local storage
        this.storage.set(STORAGE_KEY_FIRST_CONNEXION, this.first_connexion);
    }

    public getCurrentUserFirstConnexion() {
        return (this.storage.get(STORAGE_KEY_FIRST_CONNEXION) || undefined);
    }

    public getCurrentUserOnLocalStorage() {
        return (this.storage.get(STORAGE_KEY_CURRENT_USER) || undefined);
    }

    public getAllUsersOnLocalStorage() {
        return (this.storage.get(STORAGE_KEY_USERS) || []);
    }

    public getAuthStateOnLocalStorage() {
        return (this.storage.get(STORAGE_KEY_AUTH_STATE) || undefined);
    }
}