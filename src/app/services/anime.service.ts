import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Anime } from '../models/anime';
import { AnimeRating } from '../models/anime-rating';
@Injectable({
    providedIn: 'root',
})

export class AnimeService {

    private serverData = JSON;
    private animeData = JSON;
    private animeUrl = 'http://127.0.0.1:8000/anime';  // URL to web api


    constructor( private http: HttpClient ) { }

    getById(id: number): Observable<Anime>{
        return this.http.get<Anime>(`${this.animeUrl}/${id}`);
    }

    getRating(id: number, user: string): Observable<AnimeRating> {
        return this.http.get<AnimeRating>(`${this.animeUrl}/rating/${id}/for/${user}`);
    }

    createRating(rating: AnimeRating) {
        return this.http.post<AnimeRating>(`${this.animeUrl}/rating`, { rating });
    }

    updateRating(rating: AnimeRating) {
        return this.http.put<AnimeRating>(`${this.animeUrl}/rating`, { rating });
    }

    deleteRating(rating: AnimeRating) {
        const id = rating['_id'];
        return this.http.delete(`${this.animeUrl}/rating/${id}`);
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