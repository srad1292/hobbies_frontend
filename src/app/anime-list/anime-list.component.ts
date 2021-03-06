import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//Models
import { Anime } from '../models/anime';
import { AnimeRating } from '../models/anime-rating';
import { User } from '../models/user';

//Services
import { AnimeService } from '../services/anime.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-anime-list',
  templateUrl: './anime-list.component.html',
  styleUrls: ['./anime-list.component.scss']
})
export class AnimeListComponent implements OnInit {

  currentUser: User;
  routeUsername: string;
  completedList: AnimeRating[];
  planToList: AnimeRating[];
  watchingList: AnimeRating[];
  
  error;

  ratingsLoading: boolean = false;
  isListForUser: boolean = false;

  columns: object[] = [
    {label: 'Title', prop: 'title', numeric: false, link: true},
    {label: 'Rating', prop: 'rating', numeric: true},
    {label: 'Episodes Watched', prop: 'episodesSeen', numeric: true}
  ];

  type: string = 'anime';

  routerProperty: string = 'malId';

  constructor(private animeService: AnimeService, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService) { 
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
    this.animeService.getAllRatings(this.routeUsername).subscribe(
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
