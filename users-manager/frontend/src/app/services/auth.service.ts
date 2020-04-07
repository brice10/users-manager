import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from './model/user';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';

import { Router } from '@angular/router';

import * as baseUrl from './prefix';

@Injectable()
export class AuthService {

    private handleError: HandleError;

    public constructor(
        private http: HttpClient,
        private httpErrorHandler: HttpErrorHandler,
    ) {
        this.handleError = httpErrorHandler.createHandleError('AuthService');
    }

    public login(email: string, password: string): Observable <User[]> {
        const uri = `${baseUrl.SERVER_BASE_URL}user/connexion/${email}/${password}`;
        return this.http
        .get<User[]>(uri)
        .pipe(catchError(this.handleError('login', [])));
    }
}