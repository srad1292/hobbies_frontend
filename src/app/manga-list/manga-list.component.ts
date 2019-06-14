import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//Models
import { Manga } from '../models/manga';
import { MangaRating } from '../models/manga-rating';
import { User } from '../models/user';

//Services
import { MangaService } from '../services/manga.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-manga-list',
  templateUrl: './manga-list.component.html',
  styleUrls: ['./manga-list.component.scss']
})
export class MangaListComponent implements OnInit {

  currentUser: User;
  routeUsername: string;
  completedList: MangaRating[];
  planToList: MangaRating[];
  readingList: MangaRating[];
  
  error;

  ratingsLoading: boolean = false;
  isListForUser: boolean = false;

  columns: object[] = [
    {label: 'Title', prop: 'title', numeric: false, link: true},
    {label: 'Rating', prop: 'rating', numeric: true},
    {label: 'Chapters Read', prop: 'chaptersRead', numeric: true},
    {label: 'Volumes Read', prop: 'volumesRead', numeric: true}
  ];

  type: string = 'manga';

  routerProperty: string = 'malId';

  constructor(private mangaService: MangaService, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService) { 
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
    this.mangaService.getAllRatings(this.routeUsername).subscribe(
      (data) => {
        if(data['ratings']) {
          this.completedList = data['ratings'].filter(rating => rating.list === 'completed');
          this.planToList = data['ratings'].filter(rating => rating.list === 'plan_to_read');
          this.readingList = data['ratings'].filter(rating => rating.list === 'reading');
        }
      },
      error => this.error = error,
      () => this.ratingsLoading = false

    );
  }

}
