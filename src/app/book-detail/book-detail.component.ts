import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//Models
import { Book } from '../models/book';
import { BookRating } from '../models/book-rating';
import { User } from '../models/user';

//Services
import { BookService } from '../services/book.service';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {

  book: Book;
  currentUser: User;
  genresString: string;
  studiosString: string;
  myRating: BookRating = new BookRating;
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
      {label: 'Reading', value: 'reading'},
      {label: 'Plan To Read', value: 'plan_to_read'},
      {label: 'Read', value: 'read'}
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
  
  constructor(private bookService: BookService, private route: ActivatedRoute, private authenticationService: AuthenticationService) { 
    this.authenticationService.currentUser.subscribe(x => { 
      this.currentUser = x
      if(this.currentUser && this.currentUser.uid) {
        this.disableSubmission = false;
      }
    });

    route.params.subscribe(val => {
      // this.useMockResponse();
      this.getBookDetails();
    });
  }

  ngOnInit() {
    

  }


  getBookDetails() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.bookService.getById(id).subscribe(
      (data: any) => {
        console.log("Data: ", data);
        this.book = data['book'] || {};


      },  
      error => this.error = error
    );

    if(this.currentUser) {
      this.bookService.getRating(id, this.currentUser.uid).subscribe(
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

  useMockResponse() {
    console.log(this.route.snapshot);
    const id = +this.route.snapshot.paramMap.get('id');
    this.book = {"id":"11297","title":"Norwegian Wood","isbn":"0375704027",
                  "image_url":"https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png",
                  "small_image_url":"https://s.gr-assets.com/assets/nophoto/book/50x75-a91bf249278a81aabab721ef782c4a74.png",
                  "publication_year":"2000","publication_month":"9","publication_day":"12","publisher":"Vintage Books",
                  "description":"Toru, a quiet and preternaturally serious young college student in Tokyo, is devoted to Naoko, a beautiful and introspective young woman, but their mutual passion is marked by the tragic death of their best friend years before. Toru begins to adapt to campus life and the loneliness and isolation he faces there, but Naoko finds the pressures and responsibilities of life unbearable. As she retreats further into her own world, Toru finds himself reaching out to others and drawn to a fiercely independent and sexually liberated young woman. A poignant story of one college student's romantic coming-of-age, Norwegian Wood takes us to that distant place of a young man's first, hopeless, and heroic love.",
                  "average_rating":"4.03","ratings_count":"228724","num_pages":"296",
                  "url":"https://www.goodreads.com/book/show/11297.Norwegian_Wood",
                  "authors":[{"name":"Haruki Murakami","role":""},{"name":"Jay Rubin","role":"Translator"}],
                  "similar_books":[{"authors":[{"name":"J.K. Rowling","role":""}],"average_rating":"4.03","isbn":"0545010225","id":"136251","num_pages":"759","title":"Harry Potter and the Deathly Hallows (Harry Potter, #7)","publication_year":"2007"},{"authors":[{"name":"William Golding","role":""}],"average_rating":"4.03","isbn":"0140283331","id":"7624","num_pages":"182","title":"Lord of the Flies","publication_year":"1999"},{"authors":[{"name":"Margaret Atwood","role":""}],"average_rating":"4.03","isbn":"038549081X","id":"38447","num_pages":"344","title":"The Handmaid's Tale","publication_year":"1998"},{"authors":[{"name":"Natsuo Kirino","role":""}],"average_rating":"4.03","isbn":"1400078377","id":"25365","num_pages":"400","title":"Out","publication_year":"2005"},{"authors":[{"name":"Banana Yoshimoto","role":""}],"average_rating":"4.03","isbn":"0571193749","id":"50159","num_pages":"366","title":"Amrita","publication_year":"2001"},{"authors":[{"name":"Yasunari Kawabata","role":""}],"average_rating":"4.03","isbn":"4770030010","id":"83024","num_pages":"160","title":"The Lake","publication_year":"2004"},{"authors":[{"name":"Ryūnosuke Akutagawa","role":""}],"average_rating":"4.03","isbn":"0143039849","id":"35206","num_pages":"268","title":"Rashōmon and Seventeen Other Stories","publication_year":"2006"},{"authors":[{"name":"Sōseki Natsume","role":""}],"average_rating":"4.03","isbn":"0809260956","id":"762476","num_pages":"","title":"Kokoro","publication_year":""},{"authors":[{"name":"Jun'ichirō Tanizaki","role":""}],"average_rating":"4.03","isbn":"0375719318","id":"168822","num_pages":"224","title":"The Secret History of the Lord of Musashi & Arrowroot","publication_year":"2003"},{"authors":[{"name":"Leo Tolstoy","role":""}],"average_rating":"4.03","isbn":"","id":"15823480","num_pages":"964","title":"Anna Karenina","publication_year":"2012"},{"authors":[{"name":"Yukio Mishima","role":""}],"average_rating":"4.03","isbn":"0099282798","id":"62802","num_pages":"336","title":"The Temple of Dawn","publication_year":"2001"},{"authors":[{"name":"Kenzaburō Ōe","role":""}],"average_rating":"4.03","isbn":"0802134637","id":"501635","num_pages":"189","title":"Nip the Buds, Shoot the Kids","publication_year":"1996"}]
    };
    
    if(this.currentUser) {
      this.bookService.getRating(id, this.currentUser.uid).subscribe(
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


  deleteRating() {
    this.disableSubmission = true;
    this.bookService.deleteRating(this.myRating).subscribe(
      (data: any) => {
        if(data.message && data.message === 'ok') {
          this.myRating = new BookRating;
          this.userRatingExisted = false;
          this.saveButtonText = 'Add';
        }
      },  
      error => this.error = error,
      () => this.disableSubmission = false
    );
  }

  saveRating() {
    const primaryAuthor = ('authors' in this.book && this.book.authors.length > 0) ? this.book.authors[0]['name'] : '';
    this.myRating['author'] = primaryAuthor;
    this.myRating['goodreadsId'] = this.book.id;
    this.myRating['isbn'] = this.book.isbn
    this.myRating['title'] = this.book.title;
    this.myRating['totalPages'] = this.book.num_pages;
    this.myRating['userName'] = this.currentUser.uid;
    this.ratingSaving = true;

    if(this.userRatingExisted){
      this.bookService.updateRating(this.myRating).subscribe(
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
      this.bookService.createRating(this.myRating).subscribe(
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


}



