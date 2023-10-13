import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerRm } from '../api/models';
import { CustomerService } from '../api/services';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})

export class AddCustomerComponent implements OnInit {
  @Input() name: string | undefined;

  constructor(private activatedRoute: ActivatedRoute, private customerService: CustomerService, private fb: FormBuilder,
    private router: Router) { }
  customerId = ''
  customer: CustomerRm = {}
  showToast = false
  message = ''
  customerAlreadyExists = 'Customer already exists'
  customerIdFromTemplate = ''
  customerList: CustomerRm[] = []
  shortCodeFromTemplate = ''
  shortCodeAlreadyExists = 'Short Code already exists'

  form = this.fb.group({
    customerName: [''],
    email: [''],
    address: [''],
    shortCode: [''],
  })

  ngOnInit(): void {
    this.customerService.searchCustomer().subscribe(c => this.customerList = c)
  }

  private handleError = (err: any) => {

    if (err.status == 404) {
      this.router.navigate(['/customers'])
    }

    console.log("Response Error. Status: ", err.status)
    console.log("Response Error. Status: ", err.statusText)
    console.log(err);
  }

  save() {
    if (this.customerIdFromTemplate == this.customerAlreadyExists || this.shortCodeFromTemplate == this.shortCodeAlreadyExists) {
      return
    }

    let newCustomer: CustomerRm = {
      customerName: this.form.controls.customerName.value,
      email: this.form.controls.email.value,
      address: this.form.controls.address.value,
      shortCode: this.form.controls.shortCode.value
    }

    this.customerService.createCustomer({ body: newCustomer }).subscribe(() => {
          this.showToast = true
          if (this.form.valid) {
            this.message = 'Customer added successfully'
            console.log('Customer added successfully')
          }
          else if (this.form.valid && !this.form.touched && !this.form.dirty) {
            this.message = 'Nothing added'
            console.log('Nothing added')
          }
          //this.appService.setMessage(this.message);
          //this.appService.showToast(this.showToast)
          this.router.navigate(['/customers'])
    })

  }

  customerExists(customerName: string) {
    this.customerIdFromTemplate = ''
    if (this.customer.customerName?.toLowerCase().trim() != customerName.toLowerCase().trim()) {
      let customerFound = this.customerList.filter(c => c.customerName?.toLowerCase().trim() == customerName.toLowerCase().trim())
      if (customerFound.length > 0) {
        this.customerIdFromTemplate = this.customerAlreadyExists
      }
    }
  }

  shortCodeExists(shortCode: string) {
    this.shortCodeFromTemplate = ''
    if (this.customer.shortCode?.toLowerCase().trim() != shortCode.toLowerCase().trim()) {
      let skuFound = this.customerList.filter(s => s.shortCode?.toLowerCase().trim() == shortCode.toLowerCase().trim())
      if (skuFound.length > 0) {
        this.shortCodeFromTemplate = this.shortCodeAlreadyExists
      }
    }
  }

}
