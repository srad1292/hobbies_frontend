import { Component, Input, OnInit } from '@angular/core';

import { Router } from '@angular/router';

/**
 * This component is a shared component to create a sortable
 * table to display different lists for hobbies based on given
 * input
 * 
 * Use -
 * 
 * <app-list-table [columns]="columns" [data]="watchingList" 
 *      [routerProperty]="routerProperty" [title]="title" [type]="type">
 * Columns: [{label: column header, prop: rating key, numeric: boolean if type number, link: this column used as router link}]
 * data: [rating1, rating2, ..., rating n]
 * routerProperty: the key name to use to link rows to correct route for details
 */
@Component({
  selector: 'app-list-table',
  templateUrl: './list-table.component.html',
  styleUrls: ['./list-table.component.scss']
})
export class ListTableComponent implements OnInit {


  @Input() routerProperty: string;  
  @Input() title: string;
  @Input() type: string;
  @Input() columns: object[];
  @Input() data: any[];

  sortType: string = 'asc';
  previousSortColumn: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  sortColumn(prop: string, numeric: boolean) {
    if(this.previousSortColumn === prop) { 
      this.sortType = this.sortType === 'asc' ? 'desc' : 'asc';
    }
    else {
      this.sortType = 'asc';
    }
    this.previousSortColumn = prop;
    
    this.data.sort((a, b) => {
      if(this.sortType === 'asc') {
        return (a[prop] || '').toString().localeCompare((b[prop] || '').toString(), undefined, {numeric: numeric});
      }
      return (b[prop] || '').toString().localeCompare((a[prop] || '').toString(), undefined, {numeric: numeric});
    });

  }

}
