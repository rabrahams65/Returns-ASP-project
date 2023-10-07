import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerRm } from '../api/models';
import { CustomerService } from '../api/services';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

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
    this.activatedRoute.paramMap.subscribe(p => { this.findCustomer(p.get("customerId")); console.log(this.customerId + ' ' + p.get("customerId")) })
    this.customerService.searchCustomer().subscribe(c => this.customerList = c)
  }

  private findCustomer = (customerId: string | null) => {
    this.customerId = customerId ?? 'not passed'

    this.customerService.findCustomer({ id: customerId! }).subscribe(c => {
      this.customer = c
      this.form.controls.customerName.setValue(c.customerName!)
      this.form.controls.email.setValue(c.email!)
      this.form.controls.address.setValue(c.address!)
      this.form.controls.shortCode.setValue(c.shortCode!)
    }, this.handleError)
  }

  private handleError = (err: any) => {

    if (err.status == 404) {
      this.router.navigate(['/customers'])
    }

    console.log("Response Error. Status: ", err.status)
    console.log("Response Error. Status: ", err.statusText)
    console.log(err);
  }

  update() {
    if (this.customerIdFromTemplate == this.customerAlreadyExists || this.shortCodeFromTemplate == this.shortCodeAlreadyExists) {
      return
    }

    let editedCustomer: CustomerRm = {
      id: this.customer.id,
      customerName: this.form.controls.customerName.value,
      email: this.form.controls.email.value,
      address: this.form.controls.address.value,
      shortCode: this.form.controls.shortCode.value
    }

    this.customerService.updateCustomer({ id: this.customer.id!, body: editedCustomer }).subscribe(() => {
      this.customerService.findCustomer({ id: this.customer.id! }).subscribe(c => {
        if (c.id == editedCustomer.id && c.customerName == editedCustomer.customerName && c.email == editedCustomer.email &&
          c.address == editedCustomer.address && c.shortCode == editedCustomer.shortCode) {
          this.showToast = true
          if (this.form.valid) {
            this.message = 'Customer updated successfully'
            console.log('Customer updated successfully')
          }
          else if (this.form.valid && !this.form.touched && !this.form.dirty) {
            this.message = 'Nothing updated'
            console.log('Nothing updated')
          }
          //this.appService.setMessage(this.message);
          //this.appService.showToast(this.showToast)
          this.router.navigate(['/customers'])
        }
      })
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
