import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//Models
import { Movie } from '../models/movie';
import { MovieRating } from '../models/movie-rating';
import { User } from '../models/user';

//Services
import { MovieService } from '../services/movie.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  movie: Movie;
  currentUser: User;
  genresString: string;
  productionString: string;
  myRating: MovieRating = new MovieRating;
  error;
  ratingError;
  savingError;
  ratingLoading: boolean = false;
  ratingSaving: boolean = false;
  disableSubmission: boolean = true;
  userRatingExisted: boolean = false;
  //Can probably remove this and do it easier with a if in html
  saveButtonText: string = 'Add';

  listOptions: Array<object> = [
      {label: '', value: ''},
      {label: 'Watching', value: 'watching'},
      {label: 'Plan To Watch', value: 'plan_to_watch'},
      {label: 'Completed', value: 'completed'}
  ];
  // selectedList: object = {label: 'Select', value: ''};

  ratingOptions: Array<object> = [
    {label: '', value: 0},
    {label: 1, value: 1},
    {label: 2, value: 2},
    {label: 3, value: 3},
    {label: 4, value: 4},
    {label: 5, value: 5},
    {label: 6, value: 6},
    {label: 7, value: 7},
    {label: 8, value: 8},
    {label: 9, value: 9},
    {label: 10, value: 10}
  ];

  constructor(private movieService: MovieService, private route: ActivatedRoute, private authenticationService: AuthenticationService) { 
    this.authenticationService.currentUser.subscribe(x => { 
      this.currentUser = x
      if(this.currentUser && this.currentUser.uid) {
        this.disableSubmission = false;
      }
    });
  }

  ngOnInit() {
    // this.useMockResponse();
    this.getMovieDetails();

  }

  deleteRating() {
    this.disableSubmission = true;
    this.movieService.deleteRating(this.myRating).subscribe(
      (data: any) => {
        if(data.message && data.message === 'ok') {
          this.myRating = new MovieRating;
          this.userRatingExisted = false;
          this.saveButtonText = 'Add';
        }
      },  
      error => this.error = error,
      () => this.disableSubmission = false
    );
  }


  getMovieDetails() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.movieService.getById(id).subscribe(
      (data: any) => {
        this.movie = JSON.parse(data['movie']) || {};
        console.log(this.movie.title);
        const genreTitles = (this.movie.genres || []).map(genreObject => genreObject['name']);
        this.genresString = genreTitles.join(', ') || ''; 
        const productionCompanies = (this.movie.production_companies || []).map(productionObject => productionObject['name']);
        this.productionString = productionCompanies.join(', ') || ''; 
      },  
      error => this.error = error
    );

    if(this.currentUser) {
      this.movieService.getRating(id, this.currentUser.uid).subscribe(
        (data: any) => {
          this.myRating = data['rating'] || {};
          if(data && data.rating) {
            this.userRatingExisted = true;
            this.saveButtonText = 'Update';
          }
        },  
        error => this.ratingError = error
      );
    }
  }

  saveRating() {
    this.myRating['id'] = this.movie.id;
    this.myRating['imdb_id'] = this.movie.imdb_id;
    this.myRating['runtime'] = this.movie.runtime;
    this.myRating['title'] = this.movie.title;
    this.myRating['userName'] = this.currentUser.uid;
    this.ratingSaving = true;

    if(this.userRatingExisted){
      this.movieService.updateRating(this.myRating).subscribe(
        (data: any) => {
          //probably dont need this for update
          this.userRatingExisted = true;
          this.saveButtonText = 'Update';
        },
        error => { 
          this.savingError = error;
        },
        () => {
          this.ratingSaving = false;
        }
      );
    }
    else {
      this.movieService.createRating(this.myRating).subscribe(
        (data: any) => {
          if(data.recordId) {
            this.userRatingExisted = true;
            this.saveButtonText = 'Update';
            this.myRating['_id'] = data.recordId;
          }
            
        },
        error => { 
          this.savingError = error;
        },
        () => {
          this.ratingSaving = false;
        }
      );
    }
  }

  useMockResponse(){
    this.movie = {
      "adult":false,"backdrop_path":"/1dXTsaFxHoF9cas08UjAqE8NqOW.jpg","belongs_to_collection":null,"budget":20000000,
      "genres":[{"id":878,"name":"Science Fiction"},{"id":18,"name":"Drama"},{"id":10749,"name":"Romance"}],
      "homepage":"http://www.eternalsunshine.com","id":38,"imdb_id":"tt0338013","original_language":"en",
      "original_title":"Eternal Sunshine of the Spotless Mind",
      "overview":"Joel Barish, heartbroken that his girlfriend underwent a procedure to erase him from her memory, decides to do the same. However, as he watches his memories of her fade away, he realises that he still loves her, and may be too late to correct his mistake.",
      "popularity":14.842,"poster_path":"/gutwXkVChJkpIrclokNESybj0GC.jpg",
      "production_companies":[{"id":10146,"logo_path":"/xnFIOeq5cKw09kCWqV7foWDe4AA.png","name":"Focus Features","origin_country":"US"},{"id":10039,"logo_path":"/b8w4LldQolMKiLZw4FQJBcXSDGI.png","name":"Anonymous Content","origin_country":"US"}, {"id":10059,"logo_path":null,"name":"This Is That Productions","origin_country":""}],
      "production_countries":[{"iso_3166_1":"US","name":"United States of America"}],
      "release_date":"2004-03-19","revenue":72258126,"runtime":108,"spoken_languages":[{"iso_639_1":"en","name":"English"}],"status":"Released",
      "tagline":"You can erase someone from your mind. Getting them out of your heart is another story.","title":"Eternal Sunshine of the Spotless Mind",
      "video":false,"vote_average":8.1,"vote_count":7570
    };

    const genreTitles = (this.movie.genres || []).map(genreObject => genreObject['name']);
    this.genresString = genreTitles.join(', ') || ''; 
    const productionCompanies = (this.movie.production_companies || []).map(productionObject => productionObject['name']);
    this.productionString = productionCompanies.join(', ') || ''; 
    const id = +this.route.snapshot.paramMap.get('id');
    if(this.currentUser) {
      console.log(id, this.currentUser.uid);
      this.movieService.getRating(id, this.currentUser.uid).subscribe(
        (data: any) => {
          this.myRating = data['rating'] || {};
          if(data && data.rating) {
            this.userRatingExisted = true;
            this.saveButtonText = 'Update';
            console.log(this.userRatingExisted);
          }
        },  
        error => this.ratingError = error
      );
    }
  }

}
