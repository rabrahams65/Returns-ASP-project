import { Component, OnInit } from '@angular/core';
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
export class ReturnDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private returnService: ReturnService, private router: Router, private authService: AuthService,
              private fb: FormBuilder) { }

  returnId: string = 'not loaded';
  batchDateDisable = false;
  return: ReturnRm = {};

  form = this.fb.group({
    customer: [''],
    product: [''],
    qtyOnDoc: [0],
    qtyReturned: [0],
    batchDate: new FormControl({ value: null, disabled: this.batchDateDisable }),
    owner: [''],
    fault: [''],
    docNo: [''],
    docDate: [],
    resolved: [],
    comment: ['']
    })

  ngOnInit(): void {

    if (!this.authService.currentUser) {
      this.router.navigate(['/register-user'])
    }
    this.route.paramMap.subscribe(p => this.findReturn(p.get("returnId")));

    console.log(this.returnId);
    console.log(this.return);

  }

  private findReturn = (returnId: string | null) => {
    this.returnId = returnId ?? 'not passed';

    this.returnService.findReturn({ id: this.returnId }).subscribe(r => this.return = r, this.handleError);
  }

  toggleBatch() {
    this.batchDateDisable = !this.batchDateDisable;
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


}
