import { formatDate } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Return, ReturnDto } from '../api/models';
import { ReturnRm } from '../api/models/return-rm';
import { ReturnService } from '../api/services';
import { AuthService } from '../auth/auth.service';
import { AppService } from '../app.service';

@Component({
  selector: 'app-return-detail',
  templateUrl: './return-detail.component.html',
  styleUrls: ['./return-detail.component.css']
})
export class ReturnDetailComponent implements OnInit, AfterViewInit {
  @ViewChild('resolvedDropdown', { static: true }) resolvedDropdownRef?: ElementRef<HTMLElement>;
  //form: FormGroup;

  constructor(private route: ActivatedRoute, private returnService: ReturnService, private router: Router, private authService: AuthService,
    private fb: FormBuilder, @Inject(LOCALE_ID) private locale: string, private appService: AppService) {

/*    this.form = this.fb.group({})*/
    

   

    //use again if default resolved dropdown does not work again.
    //this.form.controls['resolved'].setValue("Test", { onlySelf: true });
}

  ngAfterViewInit() {

  }

  returnId: string = 'not loaded';
  batchDateDisable = false;
  return: ReturnRm = {};
  message = 'Something went wrong...';


  form = this.fb.group({
    customer: ['', Validators.required],
    product: ['', Validators.required],
    qtyOnDoc: [0],
    qtyReturned: [0],
    batchDate: [''],
    owner: [''],
    fault: [''],
    docNo: ['', Validators.required],
    docDate: ['', Validators.required],
    resolved: [true],
    comment: ['']
  })

  ngOnInit(): void {

    //if (!this.authService.currentUser) {
    //  this.router.navigate(['/register-user'])
    //}


    this.route.paramMap.subscribe(p => this.findReturn(p.get("returnId")));


  }
  
  private findReturn = (returnId: string | null) => {
    this.returnId = returnId ?? 'not passed';

    this.returnService.findReturn({ id: this.returnId }).subscribe(r => this.return = r, this.handleError);
  }

  toggleBatch() {
    this.batchDateDisable = !this.batchDateDisable;

    if (this.batchDateDisable == true && this.return.batchDate?.length! > 1) {
      this.form.controls['batchDate'].disable()
      this.form.controls.batchDate.setValue(null)
    }
    else if (this.batchDateDisable == false && this.return.batchDate?.length! > 1) {
      this.form.controls['batchDate'].enable()
    }
    else if (this.batchDateDisable == true ) {
      this.form.controls['batchDate'].enable()
      this.form.controls.batchDate.setValue(null)
    }
    else if (this.batchDateDisable == false) {
      this.form.controls['batchDate'].disable()
    }
  }

  private handleError = (err: any) => {

    if (err.status == 404) {
      this.router.navigate(['/search-returns'])
    }
      
    console.log("Response Error. Status: ", err.status)
    console.log("Response Error. Status: ", err.statusText)
    console.log(err);
  }

  update() {



    console.log(this.batchDate.value + ' ' + this.docDate.value)

    if (!this.customer.touched || !this.customer.dirty) {
      this.form.controls.customer.setValue(this.return.customer!)
    }
    if ((!this.docDate.touched || !this.docDate.dirty) && this.docDate.value != '') {
      this.form.controls.docDate.setValue(formatDate(this.return.docDate!, 'yyyy-MM-dd', this.locale))
    }
    if (!this.docDate.touched || !this.docDate.dirty && this.docDate.value == null) {
      this.form.controls.docDate.setValue(this.return.docDate!)
    }
    if (!this.product.touched || !this.product.dirty) {
      this.form.controls.product.setValue(this.return.product!)
    }
    if (!this.qtyOnDoc.touched || !this.qtyOnDoc.dirty) {
      this.form.controls.qtyOnDoc.setValue(this.return.qtyOnDoc!)
    }
    if ((!this.batchDate.touched || !this.batchDate.dirty) && this.batchDate.value != null) {
      this.form.controls.batchDate.setValue(formatDate(this.return.batchDate!, 'yyyy-MM-dd', this.locale))
    }
    if (!this.batchDate.touched || !this.batchDate.dirty && this.batchDate.value == null) {
      this.form.controls.batchDate.setValue(this.return.batchDate!)
    }
    if (!this.owner.touched || !this.owner.dirty) {
      this.form.controls.owner.setValue(this.return.owner!)
    }
    if (!this.fault.touched || !this.fault.dirty) {
      this.form.controls.fault.setValue(this.return.fault!)
    }
    if (!this.docNo.touched || !this.docNo.dirty) {
      this.form.controls.docNo.setValue(this.return.docNo!)
    }
    if (!this.qtyReturned.touched || !this.qtyReturned.dirty) {
      this.form.controls.qtyReturned.setValue(this.return.qtyReturned!)
    }
    if (!this.resolved.touched || !this.resolved.dirty) {
      this.form.controls.resolved.setValue(this.return.resolved!)
    }
    if (!this.comment.touched || !this.comment.dirty) {
      this.form.controls.comment.setValue(this.return.comment!)
    }

    let editedReturn: Return = {
      id: this.returnId,
      docDate: this.form.controls.docDate.value!,
      customer: this.form.controls.customer.value!,
      product: this.form.controls.product.value!,
      qtyOnDoc: this.form.controls.qtyOnDoc.value!,
      batchDate: this.form.controls.batchDate.value!,
      owner: this.form.controls.owner.value!,
      fault: this.form.controls.fault.value!,
      docNo: this.form.controls.docNo.value!,
      qtyReturned: this.form.controls.qtyReturned.value!,
      resolved: this.form.controls.resolved.value!,
      comment: this.form.controls.comment.value!

    }


    if (this.form.invalid) {
      //this.form.markAllAsTouched();
      return
    }
    if (this.form.valid && this.form.dirty && this.form.touched) {
      this.message = 'Return updated successfully'
    }
    else if (this.form.valid && !this.form.touched && !this.form.dirty) {
      this.message = 'Nothing updated'
    }
  
    this.returnService.updateReturnReturn({ id: this.returnId, body: editedReturn }).subscribe(_ => this.appService.setMessage(this.message),this.handleError)
    this.router.navigate(['/']);
  }

  //getters

  get docDate() {
    return this.form.controls.docDate
  }

  get customer() {
    return this.form.controls.customer
  }

  get product() {
    return this.form.controls.product
  }

  get qtyOnDoc() {
    return this.form.controls.qtyOnDoc
  }

  get batchDate() {
    return this.form.controls.batchDate
  }

  get owner() {
    return this.form.controls.owner
  }

  get fault() {
    return this.form.controls.fault
  }

  get docNo() {
    return this.form.controls.docNo
  }

  get qtyReturned() {
    return this.form.controls.qtyReturned
  }

  get resolved() {
    return this.form.controls.resolved
  }

  get comment() {
    return this.form.controls.comment
  }

}
