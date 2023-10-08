import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, map, Observable, OperatorFunction } from 'rxjs';
import { CustomerRm, FaultRm, OwnerRm, ProductRm, ReturnDto, ReturnRm } from '../api/models';
import { CustomerService, FaultService, OwnerService, ProductService, ReturnService, UserService } from '../api/services';
import { AppService } from '../app.service';
import { AuthService } from '../auth/auth.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.css']
})
export class AddNewComponent implements OnInit {

  batchDateToggle = false;
  closeResult = '';

  constructor(private fb: FormBuilder, private returnService: ReturnService, private router: Router, private appService: AppService, private userService: UserService,
    private customerService: CustomerService, private productService: ProductService, private faultService: FaultService, private ownerService: OwnerService,
    private authService: AuthService, private modalService: NgbModal ) { }

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

  notFound = 'Not Found'
  notLoaded = 'Not Loaded'
  formInvalid = ''
  userId = this.notLoaded

  ngOnInit(): void {
    this.userService.findUser({ email: this.authService.currentUser?.email! }).subscribe(u => {
      this.getUserId(u.id!); console.log('The user id in the oninit subscribe call is: ' + this.userId)
    })
    this.customerService.searchCustomer().subscribe(c => this.customerList = c, this.handleError)
    this.productService.searchProduct().subscribe(p => this.productList = p, this.handleError)
    this.faultService.searchFault().subscribe(f => this.faultList = f, this.handleError)
    this.ownerService.searchOwner().subscribe(o => this.ownerList = o, this.handleError)
  }

  private getUserId = (userId: string) => {
    this.userId = userId
  }

  form = this.fb.group({
    customer: ['', Validators.nullValidator],
    product: ['', Validators.nullValidator],
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

  custFormatter = (customer: CustomerRm) => customer.customerName!
  prodFormatter = (product: ProductRm) => product.productName!
  faultFormatter = (fault: FaultRm) => fault.name!
  ownerFormatter = (owner: OwnerRm) => owner.firstName!

  //Gets all customers for searchbox
  searchCust: OperatorFunction<string, readonly { id?: string | undefined | null; name?: string | undefined | null }[]> = (text$: Observable<string>) => {
    

    return text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      filter((term) => term.length >= 2),
      map((term) => this.customerList.filter((customer) => new RegExp(term, 'mi').test(customer.customerName!)).slice(0, 10))
    );
  }

  //Gets all products for searchbox
  searchProd: OperatorFunction<string, readonly { id?: string | undefined | null; name?: string | undefined | null }[]> = (text$: Observable<string>) => {


    return text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      filter((term) => term.length >= 2),
      map((term) => this.productList.filter((product) => new RegExp(term, 'mi').test(product.productName!)).slice(0, 10))
    );
  }

  //Gets all faults for searchbox
  searchFault: OperatorFunction<string, readonly { id?: string | undefined | null; name?: string | undefined | null }[]> = (text$: Observable<string>) => {


    return text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      filter((term) => term.length >= 2),
      map((term) => this.faultList.filter((fault) => new RegExp(term, 'mi').test(fault.name!)).slice(0, 10))
    );
  }

  //Gets all owners for searchbox
  searchOwner: OperatorFunction<string, readonly { id?: string | undefined | null; name?: string | undefined | null }[]> = (text$: Observable<string>) => {


    return text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      filter((term) => term.length >= 2),
      map((term) => this.ownerList.filter((owner) => new RegExp(term, 'mi').test(owner.firstName!)).slice(0, 10))
    );
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
        this.prodIdFromTemplate = this.notFound
      }
    }
    if (type == 'faultType') {
      let faultFound = this.faultList.filter(f => f.name == modelName)
      if (faultFound.length > 0) {
        faultFound.map(f => { this.faultIdFromTemplate = f.id!; this.fault.name = f.name! })
      }
      else {
        this.faultIdFromTemplate = this.notFound
      }
    }
    if (type == 'ownerType') {
      let ownerFound = this.ownerList.filter(o => o.firstName == modelName)
      if (ownerFound.length > 0) {
        ownerFound.map(o => { this.ownerIdFromTemplate = o.id!; this.owner.firstName = o.firstName! })
      }
      else {
        this.ownerIdFromTemplate = this.notFound
      }
    }


  }



  toggleBatch() {
    this.batchDateToggle = !this.batchDateToggle;
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      console.log("Form is invalid")
      console.log("Customer valid?: " + this.getCustomer.valid)
      console.log("Product valid?: " + this.getProduct.valid)
      console.log("Fault valid?: " + this.getFault.valid)
      console.log("Owner valid?: " + this.getOwner.valid)
      console.log("User id is: " + this.userId)
      return
    }

    this.message = 'Return Saved'
    this.showToast = true

    const createdReturn: ReturnDto = {
      docDate: this.form.get('docDate')?.value!,
      customerId: this.custIdFromTemplate,
      productId: this.prodIdFromTemplate,
      qtyOnDoc: this.form.get('qtyOnDoc')?.value!,
      batchDate: this.form.get('batchDate')?.value!,
      ownerId: this.ownerIdFromTemplate,
      faultId: this.faultIdFromTemplate,
      docNo: this.form.get('docNo')?.value!,
      qtyReturned: this.form.get('qtyReturned')?.value!,
      resolved: JSON.parse(this.form.controls.resolved.value!),
      comment: this.form.get('comment')?.value!,
      userId: this.userId!
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

  //modals

  //Modal Forms
  newCustomerForm = this.fb.group({
    customerName: [''],
    email: [''],
    address: [''],
    shortCode: [''],
  })
  //
    //customer Modal
  openCustomerModal(content: any) {
    this.newCustomerForm.reset()
    this.customerIdFromTemplate = ''
    this.customerShortCodeFromTemplate = ''

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
        this.saveNewCustomer()
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
    //customer Modal
  //modal extensions
  customerIdFromTemplate = ''
  customerShortCodeFromTemplate = ''
  customerAlreadyExists = 'Customer already exists'
  customerShortCodeAlreadyExists = 'Short code already exists'


  saveNewCustomer() {
    if (this.customerIdFromTemplate == this.customerAlreadyExists || this.customerShortCodeFromTemplate == this.customerShortCodeAlreadyExists) {
      return
    }

    let newCustomer: CustomerRm = {
      customerName: this.newCustomerForm.controls.customerName.value,
      email: this.newCustomerForm.controls.email.value,
      address: this.newCustomerForm.controls.address.value,
      shortCode: this.newCustomerForm.controls.shortCode.value
    }

    this.customerService.createCustomer({ body: newCustomer }).subscribe(() => {
      this.showToast = true
      if (this.form.valid) {
        this.message = 'Customer added successfully'
        console.log('Customer added successfully')
        this.customerList = []
        this.customerService.searchCustomer().subscribe(c => this.customerList = c, this.handleError)
      }
      else if (this.form.valid && !this.form.touched && !this.form.dirty) {
        this.message = 'Nothing added'
        console.log('Nothing added')
      }
      //this.appService.setMessage(this.message);
      //this.appService.showToast(this.showToast)
      console.log('customer control raw value: ' + this.form.controls.customer.value)
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

  customerShortCodeExists(shortCode: string) {
    this.customerShortCodeFromTemplate = ''
    if (this.customer.shortCode?.toLowerCase().trim() != shortCode.toLowerCase().trim()) {
      let skuFound = this.customerList.filter(s => s.shortCode?.toLowerCase().trim() == shortCode.toLowerCase().trim())
      if (skuFound.length > 0) {
        this.customerShortCodeFromTemplate = this.customerShortCodeAlreadyExists
      }
    }
  }
}

