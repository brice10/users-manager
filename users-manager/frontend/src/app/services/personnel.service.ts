
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from './model/user';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';

import { LocalStorageService } from './store/localStorage.service';

import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class PersonnelService {

    private handleError: HandleError;
    
    public constructor(
        private localStorageService: LocalStorageService,
        private http: HttpClient,
        private httpErrorHandler: HttpErrorHandler,
        private spinner: NgxSpinnerService,
    ) {
        this.handleError = httpErrorHandler.createHandleError('PersonnelService');
        this.initAllVariables();
    }

    public initAllVariables() {
        this.getAllUsersInLocal();
    }

    public async getAllUsersInLocal() {
        this.spinner.show('chargement1');
        await this.getAllUsers().subscribe(users => {
            this.spinner.hide('chargement1');
            this.localStorageService.storeAllUsersOnLocalStorage(users);
        });
    }
    
    public getAllUsers(): Observable <User[]> {
        return this.http
        .get<User[]>('http://localhost:8000/api/users')
        .pipe(catchError(this.handleError('getAllUsers', [])));
    }

    public createUser(user: User): Observable <User> {
        return this.http
        .post<User>('http://localhost:8000/api/user', user)
        .pipe(catchError(this.handleError('createUser', user)));
    }

    public updateUser(user: User): Observable <User> {
        const uri = `http://localhost:8000/api/user/${user.id}`;
        return this.http
        .put<User>(uri, user)
        .pipe(catchError(this.handleError('updateUser', user)));
    }

    public deleteUser(id: number): Observable <{}> {
        const uri = `http://localhost:8000/api/user/${id}`;
        return this.http
        .delete(uri)
        .pipe(catchError(this.handleError('deleteUser')));
    }
}