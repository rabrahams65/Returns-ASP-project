import { Component, OnInit } from '@angular/core';
import { CustomerRm } from '../api/models';
import { CustomerService } from '../api/services';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customerList: CustomerRm[] = []

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerService.searchCustomer({}).subscribe(c => this.customerList = c,this.handleError)
  }

  private handleError(err: any) {
    console.log("Response Error. Status: ", err.status)
    console.log("Response Error. Status: ", err.statusText)
    console.log(err);
  }

}
