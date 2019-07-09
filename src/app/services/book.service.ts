import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Book } from '../models/book';
import { BookRating } from '../models/book-rating';
@Injectable({
    providedIn: 'root',
})

export class BookService {

    private serverData = JSON;
    private bookData = JSON;
    private bookUrl = 'http://127.0.0.1:8000/book';  // URL to web api


    constructor( private http: HttpClient ) { }

    getById(id: number): Observable<Book>{
        return this.http.get<Book>(`${this.bookUrl}/${id}`);
    }

    getRating(id: number, user: string): Observable<BookRating> {
        return this.http.get<BookRating>(`${this.bookUrl}/rating/${id}/for/${user}`);
    }

    getAllRatings(user: string): Observable<BookRating[]> {
        return this.http.get<BookRating[]>(`${this.bookUrl}/ratings/${user}`);
    }

    createRating(rating: BookRating) {
        return this.http.post<BookRating>(`${this.bookUrl}/rating`, { rating });
    }

    updateRating(rating: BookRating) {
        return this.http.put<BookRating>(`${this.bookUrl}/rating`, { rating });
    }

    deleteRating(rating: BookRating) {
        const id = rating['_id'];
        return this.http.delete(`${this.bookUrl}/rating/${id}`);
    }



   //Eventually I will move error handling to service from component
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