import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customerList: any = [
    "Spar",
    "Checkers",
    "Shoprite",
    "Woolworths",
    "Pick n Pay"
    ]

  constructor() { }

  ngOnInit(): void {
  }

}
