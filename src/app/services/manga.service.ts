import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Manga } from '../models/manga';
import { MangaRating } from '../models/manga-rating';
@Injectable({
    providedIn: 'root',
})

export class MangaService {

    private serverData = JSON;
    private mangaData = JSON;
    private mangaUrl = 'http://127.0.0.1:8000/manga';  // URL to web api


    constructor( private http: HttpClient ) { }

    getById(id: number): Observable<any>{
        return this.http.get<any>(`${this.mangaUrl}/${id}`);
    }

    getRating(id: number, user: string): Observable<MangaRating> {
        return this.http.get<MangaRating>(`${this.mangaUrl}/rating/${id}/for/${user}`);
    }

    getAllRatings(user: string): Observable<MangaRating[]> {
        return this.http.get<MangaRating[]>(`${this.mangaUrl}/ratings/${user}`);
    }

    createRating(rating: MangaRating) {
        return this.http.post<MangaRating>(`${this.mangaUrl}/rating`, { rating });
    }

    updateRating(rating: MangaRating) {
        return this.http.put<MangaRating>(`${this.mangaUrl}/rating`, { rating });
    }

    deleteRating(rating: MangaRating) {
        const id = rating['_id'];
        return this.http.delete(`${this.mangaUrl}/rating/${id}`);
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