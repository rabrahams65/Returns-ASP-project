import { Component, OnInit } from '@angular/core';
import { ReturnService } from './../api/services/return.service';
import { ReturnRm } from '../api/models';

@Component({
  selector: 'app-search-returns',
  templateUrl: './search-returns.component.html',
  styleUrls: ['./search-returns.component.css']
})
export class SearchReturnsComponent implements OnInit {

  returns: ReturnRm[] = []

  docDateInvisible: boolean = true;
  noDateInvisible: boolean = true;
  noDateChecked = false;

  constructor(private returnService: ReturnService) { }

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

  search() {
    this.returnService.searchReturn({})
      .subscribe(response => this.returns = response,
        this.handleError)
  }

  private handleError(err: any) {
    console.log("Response Error. Status: ", err.status)
    console.log("Response Error. Status: ", err.statusText)
    console.log(err);
  }

}


