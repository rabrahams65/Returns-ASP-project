import { Component, OnInit } from '@angular/core';
import { ReturnService } from './../api/services/return.service';
import { CustomerRm, FaultRm, OwnerRm, ProductRm, ReturnDto, ReturnRm } from '../api/models';
import { AppService } from '../app.service';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../auth/auth.service';
import { CustomerService, FaultService, OwnerService, ProductService, UserService } from '../api/services';


declare var window: any;

@Component({
  selector: 'app-search-returns',
  templateUrl: './search-returns.component.html',
  styleUrls: ['./search-returns.component.css']
})
export class SearchReturnsComponent implements OnInit {

  notAssigned = 'Not Assigned'
  returns: ReturnRm[] = []
  returnsInit: ReturnRm[] = []
  docDateInvisible: boolean = true;
  noDateInvisible: boolean = true;
  noDateChecked = false;
  deleteModal: any;
  returnToDelete: ReturnRm = {};

  customerList: CustomerRm[] = []
  productList: ProductRm[] = []
  faultList: FaultRm[] = []
  ownerList: OwnerRm[] = []
  showToast = false;

  messageFromDetail = '';
  page = 1
  pageSize = 10
  collectionSize = 0
  numberOfResults = 0
  userId = this.notAssigned
  user = this.notAssigned
  customerName = this.notAssigned
  productName = this.notAssigned
  ownerName = this.notAssigned
  faultName = this.notAssigned

  constructor(private returnService: ReturnService, private appService: AppService, private authService: AuthService, private userService: UserService,
    private customerService: CustomerService, private productService: ProductService, private ownerService: OwnerService, private faultService: FaultService) {

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

    this.customerService.searchCustomer().subscribe(c => this.setAllCustomers(c))
    this.productService.searchProduct().subscribe(p => this.setAllProducts(p))
    this.ownerService.searchOwner().subscribe(o => this.setAllOwners(o))
    this.faultService.searchFault().subscribe(f => this.setAllFaults(f))
    //this.userService.f

    

    this.userService.findUser({ email: this.authService.currentUser?.email! }).subscribe(u => {
      this.userId = u.id!;

      this.getUserId();
    })

    this.returnService.searchReturn({}).subscribe(r => {
      this.collectionSize = r.length
      this.numberOfResults = r.length
      this.setReturnsInit(r)
      console.log(r)
    })

    
    //this.returns.filter( r => r = r )
    
  }

  setReturnsInit = (initReturns: ReturnRm[]) => {
    this.returnsInit = initReturns
    console.log('In the setReturnsInit method: ' + this.returnsInit)
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

    this.setReturnsInit

    this.returns = []
    
      this.returnsInit.forEach(items => {

 
          this.customerList.filter(c => items.customerId == c.id).map(c => this.customerName = c.customerName!)

          this.productList.filter(p => items.productId == p.id).map(p => this.productName = p.productName!)

          this.ownerList.filter(o => items.ownerId == o.id).map(o => this.ownerName = o.firstName!)

          this.faultList.filter(f => items.faultId == f.id).map(f => this.faultName = f.name!)

          this.returns.push({
            id: items.id, customerId: this.customerName, productId: this.productName, ownerId: this.ownerName, faultId: this.faultName,
            batchDate: items.batchDate, comment: items.comment, dateUpdated: items.dateUpdated, docDate: items.docDate,
            docNo: items.docNo, qtyOnDoc: items.qtyOnDoc, qtyReturned: items.qtyReturned, resolved: items.resolved, userId: items.userId
          })
      })

    
    
  }

  setCustomerName = (name: string) => {
    this.customerName = name  }

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

  //Sets values upon initilization

  private setAllCustomers(customers: CustomerRm[]) {
    this.customerList = customers
  }

  private setAllProducts(products: ProductRm[]) {
    this.productList = products
  }

  private setAllFaults(faults: FaultRm[]) {
    this.faultList = faults
  }

  private setAllOwners(owners: OwnerRm[]) {
    this.ownerList = owners
  }

}


