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

  constructor() { }

  ngOnInit(): void {
  }

}
