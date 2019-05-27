import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';




@Injectable({
    providedIn: 'root',
})

export class ItemSearchService {

    private serverData = JSON;
    private userData = JSON;
    private userUrl = 'http://127.0.0.1:8000/search';  // URL to web api

    //Eventually I will cache previous search results
    // public previousResults: Observable<any[]>;
    // public previousSearchValue: string;
    
    constructor( private http: HttpClient ) { }
    
    searchForItem(itemType: string, searchValue: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.userUrl}/${itemType}/${searchValue}`);
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