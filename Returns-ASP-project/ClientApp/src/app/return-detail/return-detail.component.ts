import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReturnRm } from '../api/models/return-rm';
import { ReturnService } from '../api/services';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-return-detail',
  templateUrl: './return-detail.component.html',
  styleUrls: ['./return-detail.component.css']
})
export class ReturnDetailComponent implements OnInit, AfterViewInit {
  @ViewChild('batchDateBox', { static: true }) batchDateBoxRef?: ElementRef<HTMLElement>;

  constructor(private route: ActivatedRoute, private returnService: ReturnService, private router: Router, private authService: AuthService,
    private fb: FormBuilder) { }


  ngAfterViewInit() {
    this._batchDate = this.getBatch!
    console.log(this._batchDate+ " after")
  }

  returnId: string = 'not loaded';
  batchDateDisable = false;
  return: ReturnRm = {};
  _batchDate: any;
  form: any;

  ngOnInit(): void {

    //if (!this.authService.currentUser) {
    //  this.router.navigate(['/register-user'])
    //}
    this.route.paramMap.subscribe(p => this.findReturn(p.get("returnId")));

    this.form = this.fb.group({
      customer: [''],
      product: [''],
      qtyOnDoc: [0],
      qtyReturned: [0],
      batchDate: [this.getBatch],
      owner: [''],
      fault: [''],
      docNo: [''],
      docDate: [],
      resolved: [],
      comment: ['']
    })


   
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

  save() {
    console.log("Return submitted for " + this.form.get('customer')?.value! + "."  )
  }

  getBatch(val: any):any {
    return val
  }


}
