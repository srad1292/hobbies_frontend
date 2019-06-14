import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


//Models
import { Manga } from '../models/manga';
import { MangaRating } from '../models/manga-rating';
import { User } from '../models/user';

// Services
import { MangaService } from '../services/manga.service';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-manga-details',
  templateUrl: './manga-details.component.html',
  styleUrls: ['./manga-details.component.scss']
})
export class MangaDetailsComponent implements OnInit {

  // manga: Manga;
  manga: Manga;
  currentUser: User;
  genresString: string;
  authorsString: string;
  myRating: MangaRating = new MangaRating;
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
      {label: 'Completed', value: 'completed'}
  ];


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

  constructor(private mangaService: MangaService, private route: ActivatedRoute, private authenticationService: AuthenticationService) { 
    this.authenticationService.currentUser.subscribe(x => { 
      this.currentUser = x
      if(this.currentUser && this.currentUser.uid) {
        this.disableSubmission = false;
      }
    });
  }

  ngOnInit() {
    // this.useMockResponse();
    this.getMangaDetails();

  }

  deleteRating() {
    this.disableSubmission = true;
    this.mangaService.deleteRating(this.myRating).subscribe(
      (data: any) => {
        if(data.message && data.message === 'ok') {
          //Clear out the rating on the front end
          this.myRating = new MangaRating;
          this.userRatingExisted = false;
          this.saveButtonText = 'Add';
        }
      },  
      error => this.error = error,
      () => this.disableSubmission = false
    );
  }

  getMangaDetails() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.mangaService.getById(id).subscribe(
      (data: any) => {
        console.log(data);
        this.manga = data['manga'] || {};
        const genreTitles = (this.manga.genres || []).map(genreObject => genreObject['name']);
        this.genresString = genreTitles.join(', ') || ''; 
        const authorsTitles = (this.manga.authors || []).map(authorObject => authorObject['name']);
        this.authorsString = authorsTitles.join(', ') || ''; 
      },  
      error => this.error = error
    );

    if(this.currentUser) {
      this.mangaService.getRating(id, this.currentUser.uid).subscribe(
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
    //Get add details that aren't a part of the user form to the save object
    this.myRating['englishTitle'] = this.manga.title_english;
    this.myRating['malId'] = this.manga.mal_id;
    this.myRating['title'] = this.manga.title;
    this.myRating['totalChapters'] = this.manga.chapters;
    this.myRating['totalVolumes'] = this.manga.volumes;
    this.myRating['userName'] = this.currentUser.uid;
    this.ratingSaving = true;

    if(this.userRatingExisted){
      this.mangaService.updateRating(this.myRating).subscribe(
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
      this.mangaService.createRating(this.myRating).subscribe(
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
    this.manga = {
      "mal_id": 21, "url": "https://myanimelist.net/manga/21/Death_Note", "title": "Death Note",
      "title_english": "Death Note", "title_synonyms": [], "title_japanese": "DEATH NOTE",
      "status": "Finished", "image_url": "https://cdn.myanimelist.net/images/manga/2/54453.jpg",
      "type": "Manga", "volumes": 12, "chapters": 108, "publishing": false,
      "published": { "from": "2003-12-01T00:00:00+00:00", "to": "2006-05-15T00:00:00+00:00",
          "prop": {
              "from": {
                  "day": null,
                  "month": null,
                  "year": null
              },
              "to": {
                  "day": null,
                  "month": null,
                  "year": null
              }
          },
          "string": "Dec  1, 2003 to May  15, 2006"
      },
      "rank": 35, "score": 8.75, "scored_by": 131337, "popularity": 7, "members": 214570, "favorites": 25654,
      "synopsis": "A shinigami, as a god of death, can kill any person—provided they see their victim's face and write their victim's name in a notebook called a Death Note. One day, Ryuk, bored by the shinigami lifestyle and interested in seeing how a human would use a Death Note, drops one into the human realm. High school student and prodigy Light Yagami stumbles upon the Death Note and—since he deplores the state of the world—tests the deadly notebook by writing a criminal's name in it. When the criminal dies immediately following his experiment with the Death Note, Light is greatly surprised and quickly recognizes how devastating the power that has fallen into his hands could be. With this divine capability, Light decides to extinguish all criminals in order to build a new world where crime does not exist and people worship him as a god. Police, however, quickly discover that a serial killer is targeting criminals and, consequently, try to apprehend the culprit. To do this, the Japanese investigators count on the assistance of the best detective in the world: a young and eccentric man known only by the name of L. [Written by MAL Rewrite]",
      "background": "Death Note has inspired three live-action films, a TV drama series as well as a stage musical. The series has also inspired numerous copycat crimes outside of Japan.\r\nThe manga was published in English by VIZ Media under the Shonen Jump Advanced imprint from October 10, 2005 and July 3, 2007 and again in 2-in-1 omnibuses (subtitled Black edition) from December 28, 2010 to November 1, 2011. There have been several more rereleases of the series: a special hardcover edition of the first volume on September 16, 2008, a complete box set on October 7, 2008, which included a guidebook titled Death Note 13: How to Read, and a complete omnibus on September 5, 2017. It was also published in Italy by Planet Manga from November 2006 to September 2008; in Brazil by JBC from June 2007 to August 2008, and again in 2-in-1 edition (Black Edition) from June 2013 to December 2013; in Argentina by LARP Editores from May 20, 2009 to April 2012;\r\nand in Spanish by Glénat España from June 30, 2006 to Septmber 30, 2007. Norma Editorial republished the series in Spanish as the Black edition from April 11 to September 27, 2013.",
      "related": {
          "Alternative version": [
              {
                  "mal_id": 3645,
                  "type": "manga",
                  "name": "Death Note",
                  "url": "https://myanimelist.net/manga/3645/Death_Note"
              }
          ],
          "Prequel": [
              {
                  "mal_id": 7458,
                  "type": "manga",
                  "name": "Death Note Another Note: Los Angeles BB Renzoku Satsujin Jiken",
                  "url": "https://myanimelist.net/manga/7458/Death_Note_Another_Note__Los_Angeles_BB_Renzoku_Satsujin_Jiken"
              }
          ],
          "Sequel": [
              {
                  "mal_id": 4941,
                  "type": "manga",
                  "name": "Death Note Tokubetsu-hen",
                  "url": "https://myanimelist.net/manga/4941/Death_Note_Tokubetsu-hen"
              }
          ],
          "Side story": [
              {
                  "mal_id": 8158,
                  "type": "manga",
                  "name": "L Change the WorLd",
                  "url": "https://myanimelist.net/manga/8158/L_Change_the_WorLd"
              },
              {
                  "mal_id": 70815,
                  "type": "manga",
                  "name": "Death Note: L FILE No. 15",
                  "url": "https://myanimelist.net/manga/70815/Death_Note__L_FILE_No_15"
              }
          ],
          "Adaptation": [
              {
                  "mal_id": 1535,
                  "type": "anime",
                  "name": "Death Note",
                  "url": "https://myanimelist.net/anime/1535/Death_Note"
              },
              {
                  "mal_id": 2994,
                  "type": "anime",
                  "name": "Death Note: Rewrite",
                  "url": "https://myanimelist.net/anime/2994/Death_Note__Rewrite"
              }
          ]
      },
      "genres": [
          {
              "mal_id": 7,
              "type": "manga",
              "name": "Mystery",
              "url": "https://myanimelist.net/manga/genre/7/Mystery"
          },
          {
              "mal_id": 8,
              "type": "manga",
              "name": "Drama",
              "url": "https://myanimelist.net/manga/genre/8/Drama"
          },
          {
              "mal_id": 27,
              "type": "manga",
              "name": "Shounen",
              "url": "https://myanimelist.net/manga/genre/27/Shounen"
          },
          {
              "mal_id": 37,
              "type": "manga",
              "name": "Supernatural",
              "url": "https://myanimelist.net/manga/genre/37/Supernatural"
          },
          {
              "mal_id": 40,
              "type": "manga",
              "name": "Psychological",
              "url": "https://myanimelist.net/manga/genre/40/Psychological"
          }
      ],
      "authors": [
          {
              "mal_id": 1888,
              "type": "people",
              "name": "Obata, Takeshi",
              "url": "https://myanimelist.net/people/1888/Takeshi_Obata"
          },
          {
              "mal_id": 2111,
              "type": "people",
              "name": "Ohba, Tsugumi",
              "url": "https://myanimelist.net/people/2111/Tsugumi_Ohba"
          }
      ],
      "serializations": [
          {
              "mal_id": 83,
              "type": "manga",
              "name": "Shounen Jump (Weekly)",
              "url": "https://myanimelist.net/manga/magazine/83/Shounen_Jump_Weekly"
          }
      ]
    }

    const genreTitles = (this.manga.genres || []).map(genreObject => genreObject['name']);
    this.genresString = genreTitles.join(', ') || ''; 
    const authorsTitles = (this.manga.authors || []).map(authorObject => authorObject['name']);
    this.authorsString = authorsTitles.join(', ') || ''; 
    const id = +this.route.snapshot.paramMap.get('id');
    if(this.currentUser) {
      console.log(id, this.currentUser.uid);
      this.mangaService.getRating(id, this.currentUser.uid).subscribe(
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
