import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Movie } from '../models/movie';
import { MovieRating } from '../models/movie-rating';
@Injectable({
    providedIn: 'root',
})

export class MovieService {

    private serverData = JSON;
    private movieData = JSON;
    private movieUrl = 'http://127.0.0.1:8000/movie';  // URL to web api


    constructor( private http: HttpClient ) { }

    getById(id: number): Observable<Movie>{
        return this.http.get<Movie>(`${this.movieUrl}/${id}`);
    }

    getRating(id: number, user: string): Observable<MovieRating> {
        return this.http.get<MovieRating>(`${this.movieUrl}/rating/${id}/for/${user}`);
    }

    getAllRatings(user: string): Observable<MovieRating[]> {
        return this.http.get<MovieRating[]>(`${this.movieUrl}/ratings/${user}`);
    }

    createRating(rating: MovieRating) {
        return this.http.post<MovieRating>(`${this.movieUrl}/rating`, { rating });
    }

    updateRating(rating: MovieRating) {
        return this.http.put<MovieRating>(`${this.movieUrl}/rating`, { rating });
    }

    deleteRating(rating: MovieRating) {
        const id = rating['_id'];
        return this.http.delete(`${this.movieUrl}/rating/${id}`);
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