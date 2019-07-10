import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//Models
import { Movie } from '../models/movie';
import { MovieRating } from '../models/movie-rating';
import { User } from '../models/user';

//Services
import { MovieService } from '../services/movie.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  currentUser: User;
  routeUsername: string;
  completedList: MovieRating[];
  planToList: MovieRating[];
  watchingList: MovieRating[];
  
  error;

  ratingsLoading: boolean = false;
  isListForUser: boolean = false;

  columns: object[] = [
    {label: 'Title', prop: 'title', numeric: false, link: true},
    {label: 'Rating', prop: 'rating', numeric: true},
    {label: 'Runtime', prop: 'runtime', numeric: true}
  ];

  type: string = 'movie';

  routerProperty: string = 'id';

  constructor(private movieService: MovieService, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService) { 
    if (!this.authenticationService.currentUserValue) { 
      this.router.navigate(['/login']);
    }
    else{
      this.currentUser = this.authenticationService.currentUserValue;
    }
  }

  ngOnInit() {
    this.getUserFromRoute();
    this.getUserRatings();
  }

  getUserFromRoute() {
    this.routeUsername = this.route.snapshot.paramMap.get('user');
    if(this.routeUsername === this.currentUser.uid) {
      this.isListForUser = true;
    }
  }

  getUserRatings() {
    this.ratingsLoading = true;
    this.movieService.getAllRatings(this.routeUsername).subscribe(
      (data) => {
        if(data['ratings']) {
          this.completedList = data['ratings'].filter(rating => rating.list === 'completed');
          this.planToList = data['ratings'].filter(rating => rating.list === 'plan_to_watch');
          this.watchingList = data['ratings'].filter(rating => rating.list === 'watching');
        }
      },
      error => this.error = error,
      () => this.ratingsLoading = false

    );
  }

}
