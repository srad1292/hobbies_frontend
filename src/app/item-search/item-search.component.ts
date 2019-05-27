import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//Services
import { ItemSearchService } from '../services/item-search.service';

@Component({
  selector: 'app-item-search',
  templateUrl: './item-search.component.html',
  styleUrls: ['./item-search.component.scss']
})
export class ItemSearchComponent implements OnInit {

  isSearching: boolean = false;

  searchType: string = 'Anime';
  searchValue: string = '';

  animeFields: string[] = ['title', 'synopsis', 'episodes', 'score', 'start_date', 'end_date'];
  searchResults: any[];

  constructor(private itemSearchService: ItemSearchService, private router: Router) { }

  ngOnInit() {
  }

  goToItemDetails(item) {
    switch(this.searchType) {
      case 'Anime':
        let animeId = item.mal_id;
        this.router.navigate([`/anime/${animeId}`]);
        break;
      
      default:
        break;
    }
  }

  search() {
    this.isSearching = true;
    this.itemSearchService.searchForItem(this.searchType, this.searchValue)
    .subscribe(
      (data: any[]) => { console.log(data); this.searchResults = data || [] },
      error => { console.log(error); },
      () => { this.isSearching = false; }
    )
  }



}
