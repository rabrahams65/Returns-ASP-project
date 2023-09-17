import { Component, OnInit } from '@angular/core';
import { ReturnService } from './../api/services/return.service';
import { ReturnDto, ReturnRm } from '../api/models';
import { AppService } from '../app.service';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../api/services';


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
  showToast = false;
  messageFromDetail = '';
  page = 1
  pageSize = 10
  collectionSize = 0
  numberOfResults = 0
  userId = 'Not Assigned'
  user = 'Not Assigned'

  constructor(private returnService: ReturnService, private appService: AppService, private authService: AuthService, private userService: UserService) {

    //this.appService.getMessage.subscribe(m => this.messageFromDetail = m, this.handleError)
    this.appService.getToast.subscribe(t => {
      this.showToast = t;

      if (this.showToast == true) {
        this.appService.getMessage.subscribe(m => this.messageFromDetail = m )
        setTimeout(() => (this.showToast = false), 3000);
      }

    })

  }

  ngOnInit(): void {
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById("staticBackdrop")
    );

    this.returnService.searchReturn({})
      .subscribe(response => { this.returns = response; this.collectionSize = this.returns.length; this.numberOfResults = this.returns.length },
        this.handleError)

    this.userService.findUser({ email: this.authService.currentUser?.email! }).subscribe(u => {
      this.userId = u.id!;

      this.getUserId();
    })
    
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

  search () {

    this.returnService.searchReturn({})
      .subscribe(response => { this.returns = response; this.collectionSize = this.returns.length; this.numberOfResults = this.returns.length },
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
      customerId: returnRm.customerId,
      docDate: returnRm.docDate,
      docNo: returnRm.docNo,
      faultId: returnRm.faultId,
      ownerId: returnRm.ownerId,
      productId: returnRm.productId,
      qtyOnDoc: returnRm.qtyOnDoc,
      qtyReturned: returnRm.qtyReturned,
      resolved: returnRm.resolved,
      userId: returnRm.userId!
    }

    this.returnService.deleteReturnReturn({ body: returnDto }).subscribe(r => {
      this.returns = this.returns.filter(f => f != returnRm);
      this.collectionSize = this.returns.length; this.numberOfResults = this.returns.length
    }, this.handleError)

    this.deleteModal.hide();
  }

  public openDeleteModal = (returnRm: ReturnRm) => {

    this.returnToDelete = returnRm;

  }

  getUserId(): string {
    console.log('The user id is: ' + this.userId)
    return this.userId
  }

}


