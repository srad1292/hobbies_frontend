import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from '../models/user';
 
@Injectable({
    providedIn: 'root',
})

export class UserService {

    private serverData = JSON;
    private userData = JSON;
    private userUrl = 'http://127.0.0.1:8000/user';  // URL to web api


    constructor( private http: HttpClient ) { }

    getById(id: number) {
        return this.http.get(`${this.userUrl}/${id}`);
    }

    register(user: User) {
        return this.http.post<User>(`${this.userUrl}/register`, { user });
    }

    update(user: User) {
        return this.http.put(`${this.userUrl}/${user.uid}`, user);
    }

    //Eventually I will move error handling to here once I add my message service
    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error); // log to console instead

            // this.log(`${operation} failed: ${error.error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}