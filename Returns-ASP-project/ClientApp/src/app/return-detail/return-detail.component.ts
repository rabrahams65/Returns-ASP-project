import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReturnDto } from '../api/models';
import { ReturnRm } from '../api/models/return-rm';
import { ReturnService } from '../api/services';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-return-detail',
  templateUrl: './return-detail.component.html',
  styleUrls: ['./return-detail.component.css']
})
export class ReturnDetailComponent implements OnInit, AfterViewInit {
  @ViewChild('resolvedDropdown', { static: true }) resolvedDropdownRef?: ElementRef<HTMLElement>;
  form: FormGroup;

  constructor(private route: ActivatedRoute, private returnService: ReturnService, private router: Router, private authService: AuthService,
    private fb: FormBuilder) {

    this.form = this.fb.group({
      customer: ['', Validators.required],
      product: ['', Validators.required],
      qtyOnDoc: [0],
      qtyReturned: [0],
      batchDate: [],
      owner: [''],
      fault: [''],
      docNo: ['', Validators.required],
      docDate: [, Validators.required],
      resolved: [],
      comment: ['']
    })

    //use again if default resolved dropdown does not work again.
    //this.form.controls['resolved'].setValue("Test", { onlySelf: true });
}


  ngAfterViewInit() {
 
  }

  returnId: string = 'not loaded';
  batchDateDisable = false;
  return: ReturnRm = {};

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

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return
    }

    const createdReturn: ReturnDto = {
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

    this.returnService.createReturnReturn({ body: createdReturn }).subscribe(_ => console.log("Succeeded", console.error))
  }

  //getters
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
