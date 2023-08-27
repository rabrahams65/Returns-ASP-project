import { Component, OnInit } from '@angular/core';
import { ReturnService } from './../api/services/return.service';
import { ReturnDto, ReturnRm } from '../api/models';
import { AppService } from '../app.service';


declare var window: any;

@Component({
  selector: 'app-search-returns',
  templateUrl: './search-returns.component.html',
  styleUrls: ['./search-returns.component.css']
})
export class SearchReturnsComponent implements OnInit {

  returns: ReturnRm[] = []
  docDateInvisible: boolean = true;
  noDateInvisible: boolean = true;
  noDateChecked = false;
  deleteModal: any;
  returnToDelete: ReturnRm = {};
  showToast = true;
  messageFromDetail = '';

  constructor(private returnService: ReturnService, private appService: AppService) {

    this.appService.getMessage.subscribe(m => this.messageFromDetail = m, this.handleError)
    this.appService.getMessage.subscribe(m => { (m == 'Initial Message') ? this.showToast = false : this.showToast = true })

    setTimeout(() => (this.showToast = false), 3000);
  }

  ngOnInit(): void {
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById("staticBackdrop")
    );
  }

  toggleDocDate() {
    this.docDateInvisible = !this.docDateInvisible;
    this.noDateChecked = !this.noDateChecked;
  }

  toggleNoDate(event: any) {
    const value = event.target.value;

    if (value == 'batchDate') {
      this.noDateInvisible = false;
    }
    else {
      this.noDateInvisible = true;
      this.docDateInvisible = true;
      this.noDateChecked = false;
    }
  }

  search() {
    this.returnService.searchReturn({})
      .subscribe(response => this.returns = response,
        this.handleError)
  }

  private handleError(err: any) {
    console.log("Response Error. Status: ", err.status)
    console.log("Response Error. Status: ", err.statusText)
    console.log(err);
  }

  deleteReturn() { 

    var returnRm = this.returnToDelete;

    const returnDto: ReturnDto = {
      id: returnRm.id,
      batchDate: returnRm.batchDate,
      comment: returnRm.comment,
      customer: returnRm.customer,
      docDate: returnRm.docDate,
      docNo: returnRm.docNo,
      fault: returnRm.fault,
      owner: returnRm.owner,
      product: returnRm.product,
      qtyOnDoc: returnRm.qtyOnDoc,
      qtyReturned: returnRm.qtyReturned,
      resolved: returnRm.resolved
    }

    this.returnService.deleteReturnReturn({ body: returnRm }).subscribe(r => this.returns = this.returns.filter(f => f != returnRm), this.handleError)

    this.deleteModal.hide();
  }

  public openDeleteModal = (returnRm: ReturnRm) => {

    this.returnToDelete = returnRm;

  }
}

