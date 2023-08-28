import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReturnDto, ReturnRm } from '../api/models';
import { ReturnService } from '../api/services';
import { AppService } from '../app.service';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.css']
})
export class AddNewComponent implements OnInit {

  batchDateToggle = false;

  constructor(private fb: FormBuilder, private returnService: ReturnService, private router: Router, private appService: AppService) { }

  ngOnInit(): void {
  }

  form = this.fb.group({
    customer: ['', Validators.required],
    product: ['', Validators.required],
    qtyOnDoc: [0],
    qtyReturned: [0],
    batchDate: [],
    owner: [''],
    fault: [''],
    docNo: ['', Validators.required],
    docDate: [,Validators.required],
    resolved: [],
    comment: ['']
  })

  showToast = false;
  message = 'Something went wrong'


  toggleBatch() {
    this.batchDateToggle = !this.batchDateToggle;
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return
    }

    this.message = 'Return Saved'
    this.showToast = true

    const createdReturn: ReturnDto = {
      docDate: this.form.get('docDate')?.value!,
      customer: this.form.get('customer')?.value!,
      product: this.form.get('product')?.value!,
      qtyOnDoc: this.form.get('qtyOnDoc')?.value!,
      batchDate: this.form.get('batchDate')?.value!,
      owner: this.form.get('owner')?.value!,
      fault: this.form.get('fault')?.value!,
      docNo: this.form.get('docNo')?.value!,
      qtyReturned: this.form.get('qtyReturned')?.value!,
      resolved: JSON.parse(this.form.controls.resolved.value!),
      comment: this.form.get('comment')?.value!
    }



    this.returnService.createReturnReturn({ body: createdReturn }).subscribe(_ => { this.appService.setMessage(this.message); this.appService.showToast(this.showToast) }, this.handleError)
    this.router.navigate(['/search-returns'])
  }

  private handleError = (err: any) => {

    if (err.status == 404) {
      this.router.navigate(['/search-returns'])
    }

    console.log("Response Error. Status: ", err.status)
    console.log("Response Error. Status: ", err.statusText)
    console.log(err);
  }

  get customer() {
    return this.form.controls.customer
  }

  get product() {
    return this.form.controls.product
  }

  get docDate() {
    return this.form.controls.docDate
  }

  get docNo() {
    return this.form.controls.docNo
  }

}

