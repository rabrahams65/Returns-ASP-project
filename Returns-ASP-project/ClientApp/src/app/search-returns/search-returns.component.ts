import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-returns',
  templateUrl: './search-returns.component.html',
  styleUrls: ['./search-returns.component.css']
})
export class SearchReturnsComponent implements OnInit {

  searchResult: any = [
    "Bread",
    "Milk",
    "Eggs"
  ]

  docDateInvisible: boolean = true;
  noDateInvisible: boolean = true;
  noDateChecked = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleDocDate() {
    this.docDateInvisible = !this.docDateInvisible;
    this.noDateChecked = !this.noDateChecked;
  }

  toggleNoDate(event: any) {
    const value = event.target.value;

    if (value == 'batchDate') {
      this.noDateInvisible = false;
    }
    else {
      this.noDateInvisible = true;
      this.docDateInvisible = true;
      this.noDateChecked = false;
    }
  }

}
