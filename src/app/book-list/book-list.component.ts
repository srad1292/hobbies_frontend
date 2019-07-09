import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//Models
import { Book } from '../models/book';
import { BookRating } from '../models/book-rating';
import { User } from '../models/user';

//Services
import { BookService } from '../services/book.service';
import { AuthenticationService } from '../services/authentication.service';
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  currentUser: User;
  routeUsername: string;
  completedList: BookRating[];
  planToList: BookRating[];
  readingList: BookRating[];
  
  error;

  ratingsLoading: boolean = false;
  isListForUser: boolean = false;

  columns: object[] = [
    {label: 'Title', prop: 'title', numeric: false, link: true},
    {label: 'Author', prop: 'author', numeric: false},
    {label: 'Rating', prop: 'rating', numeric: true},
    {label: 'Pages Read', prop: 'pagesRead', numeric: true}
  ];

  type: string = 'book';

  routerProperty: string = 'goodreadsId';

  constructor(private bookService: BookService, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService) { 
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
    this.bookService.getAllRatings(this.routeUsername).subscribe(
      (data) => {
        if(data['ratings']) {
          this.completedList = data['ratings'].filter(rating => rating.list === 'read');
          this.planToList = data['ratings'].filter(rating => rating.list === 'plan_to_read');
          this.readingList = data['ratings'].filter(rating => rating.list === 'reading');
        }
      },
      error => this.error = error,
      () => this.ratingsLoading = false

    );
  }

}
