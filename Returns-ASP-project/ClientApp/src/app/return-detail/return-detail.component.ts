import { formatDate } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerRm, FaultRm, OwnerRm, ProductRm, ReturnDto } from '../api/models';
import { ReturnRm } from '../api/models/return-rm';
import { CustomerService, FaultService, OwnerService, ProductService, ReturnService, UserService } from '../api/services';
import { AuthService } from '../auth/auth.service';
import { AppService } from '../app.service';
import { debounceTime, distinctUntilChanged, filter, map, Observable, OperatorFunction } from 'rxjs';

@Component({
  selector: 'app-return-detail',
  templateUrl: './return-detail.component.html',
  styleUrls: ['./return-detail.component.css']
})
export class ReturnDetailComponent implements OnInit, AfterViewInit {
  @ViewChild('resolvedDropdown', { static: true }) resolvedDropdownRef?: ElementRef<HTMLElement>;
  //form: FormGroup;

  constructor(private route: ActivatedRoute, private returnService: ReturnService, private router: Router, private authService: AuthService,
    private fb: FormBuilder, @Inject(LOCALE_ID) private locale: string, private appService: AppService, private userService: UserService, private customerService: CustomerService,
    private productService: ProductService, private faultService: FaultService, private ownerService: OwnerService) {

}

  ngAfterViewInit() {

  }

  notFound = 'Not Found'
  notLoaded = 'Not Loaded'

  returnId: string = this.notLoaded
  batchDateDisable = false
  modelInUse = 'none'
  return: ReturnRm = {}
  customer: CustomerRm = {}
  product: ProductRm = {}
  fault: FaultRm = {}
  owner: OwnerRm = {}
  custIdFromTemplate = ''
  prodIdFromTemplate = ''
  faultIdFromTemplate = ''
  ownerIdFromTemplate = ''

  customerList: CustomerRm[] = []
  productList: ProductRm[] = []
  faultList: FaultRm[] = []
  ownerList: OwnerRm[] = []

  message = 'Something went wrong...'
  showToast = false;
  userId = this.notLoaded


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

  custFormatter = (customer: CustomerRm) => customer.customerName!
  prodFormatter = (product: ProductRm) => product.productName!
  faultFormatter = (fault: FaultRm) => fault.name!
  ownerFormatter = (owner: OwnerRm) => owner.firstName!

  //Gets all customers for searchbox
  searchCust: OperatorFunction<string, readonly { id?: string | undefined | null; name?: string | undefined | null }[]> = (text$: Observable<string>) => {
    this.customerService.searchCustomer().subscribe(c => this.customerList = c, this.handleError)

    return text$.pipe(
          debounceTime(200),
          distinctUntilChanged(),
          filter((term) => term.length >= 2),
          map((term) => this.customerList.filter((customer) => new RegExp(term, 'mi').test(customer.customerName!)).slice(0, 10))
      );
  }

  //Gets all products for searchbox
  searchProd: OperatorFunction<string, readonly { id?: string | undefined | null; name?: string | undefined | null }[]> = (text$: Observable<string>) => {
    this.productService.searchProduct().subscribe(p => this.productList = p, this.handleError)

    return text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      filter((term) => term.length >= 2),
      map((term) => this.productList.filter((product) => new RegExp(term, 'mi').test(product.productName!)).slice(0, 10))
    );
  }

  //Gets all faults for searchbox
  searchFault: OperatorFunction<string, readonly { id?: string | undefined | null; name?: string | undefined | null }[]> = (text$: Observable<string>) => {
    this.faultService.searchFault().subscribe(f => this.faultList = f, this.handleError)

    return text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      filter((term) => term.length >= 2),
      map((term) => this.faultList.filter((fault) => new RegExp(term, 'mi').test(fault.name!)).slice(0, 10))
    );
  }

  //Gets all owners for searchbox
  searchOwner: OperatorFunction<string, readonly { id?: string | undefined | null; name?: string | undefined | null }[]> = (text$: Observable<string>) => {
    this.ownerService.searchOwner().subscribe(o => this.ownerList = o, this.handleError)

    return text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      filter((term) => term.length >= 2),
      map((term) => this.ownerList.filter((owner) => new RegExp(term, 'mi').test(owner.firstName!)).slice(0, 10))
    );
  }


  ngOnInit(): void {

    if (!this.authService.currentUser) {
      this.router.navigate(['/register-user'])
    }

    this.userService.findUser({ email: this.authService.currentUser?.email! }).subscribe(u => {
      this.getUserId(u.id!); console.log('The user id in the oninit subscribe call is: ' + this.userId)
    })

    this.route.paramMap.subscribe(p => this.findReturn(p.get("returnId")));

    console.log('OnInit userEmail = ' + this.authService.currentUser?.email!)

    
  }

  private getUserId = (userId : string)=> {
    this.userId = userId
  }
  
  private findReturn = (returnId: string | null) => {
    this.returnId = returnId ?? 'not passed';

    this.returnService.findReturn({ id: this.returnId }).subscribe(r =>
    {
      this.return = r
      this.customerService.findCustomer({ id: r.customerId! }).subscribe(c => { this.setCustomerName(c); this.custIdFromTemplate = c.id! }, this.handleError)
      this.productService.findProduct({ id: r.productId! }).subscribe(p => { this.setProductName(p); this.prodIdFromTemplate = p.id! }, this.handleError)
      this.faultService.findFault({ id: r.faultId! }).subscribe(f => { this.setFaultName(f); this.faultIdFromTemplate = f.id! }, this.handleError)
      this.ownerService.findOwner({ id: r.ownerId! }).subscribe(o => { this.setOwnerName(o); this.ownerIdFromTemplate = o.id! }, this.handleError)
      //this.userService.findUser({ }) set up endpoint to find user by Id as well
    }
      , this.handleError);
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

  //Gets the id and name of the model in the search criteria
  getModel(modelName: string, type: string) {
    let modelFound: any[] = []

    //Get the type of model
    if (type == 'customerType') {
      let customerFound = this.customerList.filter(c => c.customerName == modelName)
      console.log(customerFound.length)
      if (customerFound.length > 0) {
        customerFound.map(c => { this.custIdFromTemplate = c.id!; this.customer.customerName = c.customerName! })
      }
      else {
        this.custIdFromTemplate = this.notFound
      }
    }

    if (type == 'productType') {
      let productFound = this.productList.filter(p => p.productName == modelName)
      if (productFound.length > 0) {
        productFound.map(p => { this.prodIdFromTemplate = p.id!; this.product.productName = p.productName! })
      }
      else {
        this.prodIdFromTemplate = 'Not Found'
      }
    }
    if (type == 'faultType') {
      let faultFound = this.faultList.filter(f => f.name == modelName)
      if (faultFound.length > 0) {
        faultFound.map(f => { this.faultIdFromTemplate = f.id!; this.fault.name = f.name! })
      }
      else {
        this.faultIdFromTemplate = 'Not Found'
      }
    }
    if (type == 'ownerType') {
      let ownerFound = this.ownerList.filter(o => o.firstName == modelName)
      if (ownerFound.length > 0) {
        ownerFound.map(o => { this.ownerIdFromTemplate = o.id!; this.owner.firstName = o.firstName! })
      }
      else {
        this.ownerIdFromTemplate = 'Not Found'
      }
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

  //Sets values upon initilization

  private setCustomerName(customer: CustomerRm) {
    this.customer = customer
  }

  private setProductName(product: ProductRm) {
    this.product = product
  }

  private setFaultName(fault: FaultRm) {
   this.fault = fault
  }

  private setOwnerName(owner: OwnerRm) {
    this.owner = owner
  }

  //Get by Id's
  //private getCustomerIdByName(customerName: string): string {
  //  let customer = 'Not found'
  //  this.customerService.findByNameCustomer({ name: customerName }).subscribe(c => customerName = c.customerName!)
  //  return customer
  //}

  update() {



    //console.log(this.batchDate.value + ' ' + this.docDate.value)

    if (!this.getCustomer.touched || !this.getCustomer.dirty) {
      this.form.controls.customer.setValue(this.customer.customerName!)
    }
    if ((!this.getDocDate.touched || !this.getDocDate.dirty) && this.getDocDate.value != '') {
      this.form.controls.docDate.setValue(formatDate(this.return.docDate!, 'yyyy-MM-dd', this.locale))
    }
    if (!this.getDocDate.touched || !this.getDocDate.dirty && this.getDocDate.value == null) {
      this.form.controls.docDate.setValue(this.return.docDate!)
    }
    if (!this.getProduct.touched || !this.getProduct.dirty) {
      this.form.controls.product.setValue(this.product.productName!)
    }
    if (!this.getQtyOnDoc.touched || !this.getQtyOnDoc.dirty) {
      this.form.controls.qtyOnDoc.setValue(this.return.qtyOnDoc!)
    }
    if ((!this.getBatchDate.touched || !this.getBatchDate.dirty) && this.getBatchDate.value != null) {
      this.form.controls.batchDate.setValue(formatDate(this.return.batchDate!, 'yyyy-MM-dd', this.locale))
    }
    if (!this.getBatchDate.touched || !this.getBatchDate.dirty && this.getBatchDate.value == null) {
      this.form.controls.batchDate.setValue(this.return.batchDate!)
    }
    if (!this.getOwner.touched || !this.getOwner.dirty) {
      this.form.controls.owner.setValue(this.owner.firstName!)
    }
    if (!this.getFault.touched || !this.getFault.dirty) {
      this.form.controls.fault.setValue(this.fault.name!)
    }
    if (!this.getDocNo.touched || !this.getDocNo.dirty) {
      this.form.controls.docNo.setValue(this.return.docNo!)
    }
    if (!this.getQtyReturned.touched || !this.getQtyReturned.dirty) {
      this.form.controls.qtyReturned.setValue(this.return.qtyReturned!)
    }
    if (!this.getResolved.touched || !this.getResolved.dirty) {
      this.form.controls.resolved.setValue(this.return.resolved!)
    }
    if (!this.getComment.touched || !this.getComment.dirty) {
      this.form.controls.comment.setValue(this.return.comment!)
    }


    //Conver objects to id's
    let editedReturn: ReturnRm = {
      id: this.returnId,
      docDate: this.form.controls.docDate.value!,
      customerId: this.form.controls.customer.value!,
      productId: this.form.controls.product.value!,
      qtyOnDoc: this.form.controls.qtyOnDoc.value!,
      batchDate: this.form.controls.batchDate.value!,
      ownerId: this.form.controls.owner.value!,
      faultId: this.form.controls.fault.value!,
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
      this.showToast = true
    }
    else if (this.form.valid && !this.form.touched && !this.form.dirty) {
      this.message = 'Nothing updated'
      this.showToast = true
    }
  
    this.returnService.updateReturnReturn({ id: this.returnId, body: editedReturn }).subscribe(_ => { this.appService.setMessage(this.message); this.appService.showToast(this.showToast)},this.handleError)
    this.router.navigate(['/']);
  }

  //getters
  get getDocDate() {
    return this.form.controls.docDate
  }

  get getCustomer() {
    return this.form.controls.customer
  }

  get getProduct() {
    return this.form.controls.product
  }

  get getQtyOnDoc() {
    return this.form.controls.qtyOnDoc
  }

  get getBatchDate() {
    return this.form.controls.batchDate
  }

  get getOwner() {
    return this.form.controls.owner
  }

  get getFault() {
    return this.form.controls.fault
  }

  get getDocNo() {
    return this.form.controls.docNo
  }

  get getQtyReturned() {
    return this.form.controls.qtyReturned
  }

  get getResolved() {
    return this.form.controls.resolved
  }

  get getComment() {
    return this.form.controls.comment
  }

}
