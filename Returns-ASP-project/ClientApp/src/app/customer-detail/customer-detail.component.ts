import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerRm } from '../api/models';
import { CustomerService } from '../api/services';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private customerService: CustomerService, private router: Router) { }
  customerId = ''
  customer: CustomerRm = {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(p => { this.findCustomer(p.get("customerId")); console.log(this.customerId + ' ' + p.get("customerId")) })
  }

  private findCustomer = (customerId: string | null) => {
    this.customerId = customerId ?? 'not passed'

    this.customerService.findCustomer({ id: customerId! }).subscribe(c => this.customer = c, this.handleError)
  }

  private handleError = (err: any) => {

    if (err.status == 404) {
      this.router.navigate(['/customers'])
    }

    console.log("Response Error. Status: ", err.status)
    console.log("Response Error. Status: ", err.statusText)
    console.log(err);
  }

}
