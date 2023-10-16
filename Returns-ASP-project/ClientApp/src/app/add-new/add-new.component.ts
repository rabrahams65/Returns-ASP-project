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


  private getUserId = (userId: string) => {
    this.userId = userId
  }

  form = this.fb.group({

    customer: [{ id: '', customerName: '' }, Validators.required],
    product: [{ id: '', productName: '' }, Validators.required],
    qtyOnDoc: [0],
    qtyReturned: [0],
    batchDate: [],
    owner: [{ id: '', firstName: '' }],
    fault: [{ id: '', name: '' }],
    docNo: ['', Validators.required],
    docDate: [,Validators.required],
    resolved: [],
    comment: ['']
  })

  showToast = false;
  message = 'Something went wrong'

  //Gets the id and name of the model in the search criteria
  getModel(modelName: string, type: string) {

    //Get the type of model
    if (type == 'customerType') {
      this.custIdFromTemplate = ''
      this.customerList = []
      this.customerService.searchCustomer().subscribe(c => {
        this.customerList = c
        console.log('2. searchCustomer subscribe call done')

        let customerFound = this.customerList.filter(c => c.customerName?.toLowerCase().trim() == modelName?.toLowerCase().trim())
        console.log('3. customer found length: ' + customerFound.length)

        if (customerFound.length > 0) {
          customerFound.map(c => { this.custIdFromTemplate = c.id!; this.customer.customerName = c.customerName! })
          console.log('4.Get model gets called- custIdfromTemplate: {' + this.custIdFromTemplate + '} model name: ' + modelName)
        }
        else if (customerFound.length <= 0) {
          this.custIdFromTemplate = this.notFound
        }

      })

    }
    if (type == 'productType') {
      this.prodIdFromTemplate = ''
      this.productList = []
      this.productService.searchProduct().subscribe(c => {
        this.productList = c
        console.log('2. searchproduct subscribe call done')

        let productFound = this.productList.filter(c => c.productName?.toLowerCase().trim() == modelName?.toLowerCase().trim())
        console.log('3. product found length: ' + productFound.length)

        if (productFound.length > 0) {
          productFound.map(c => { this.prodIdFromTemplate = c.id!; this.product.productName = c.productName! })
          console.log('4.Get model gets called- prodIdfromTemplate: {' + this.prodIdFromTemplate + '} model name: ' + modelName)
        }
        else if (productFound.length <= 0) {
          this.prodIdFromTemplate = this.notFound
        }

      })

    }
    if (type == 'ownerType') {
      this.ownerIdFromTemplate = ''
      this.ownerList = []
      this.ownerService.searchOwner().subscribe(o => {
        this.ownerList = o
        console.log('2. searchowner subscribe call done')

        let ownerFound = this.ownerList.filter(o => o.firstName?.toLowerCase().trim() == modelName?.toLowerCase().trim())
        console.log('3. owner found length: ' + ownerFound.length)

        if (ownerFound.length > 0) {
          ownerFound.map(o => { this.ownerIdFromTemplate = o.id!; this.owner.firstName = o.firstName! })
          console.log('4.Get model gets called- ownerIdfromTemplate: {' + this.ownerIdFromTemplate + '} model name: ' + this.owner.firstName)
        }
        else if (ownerFound.length <= 0) {
          this.ownerIdFromTemplate = this.notFound
        }

      })

    }
    if (type == 'faultType') {
      this.faultIdFromTemplate = ''
      this.faultList = []
      this.faultService.searchFault().subscribe(f => {
        this.faultList = f
        console.log('2. searchfault subscribe call done')

        let faultFound = this.faultList.filter(f => f.name?.toLowerCase().trim() == modelName?.toLowerCase().trim())
        console.log('3. fault found length: ' + faultFound.length)

        if (faultFound.length > 0) {
          faultFound.map(c => { this.faultIdFromTemplate = c.id!; this.fault.name = c.name! })
          console.log('4.Get model gets called- custIdfromTemplate: {' + this.faultIdFromTemplate + '} model name: ' + modelName)
        }
        else if (faultFound.length <= 0) {
          this.faultIdFromTemplate = this.notFound
        }

      })

    }

  }

  toggleBatch() {
    this.batchDateToggle = !this.batchDateToggle;
  }

  save() {

    this.checkFormValidity()

    if (this.form.invalid) {
      return
    }

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
    this.message = 'Return Saved'
    this.showToast = true


    this.returnService.createReturnReturn({ body: createdReturn }).subscribe(_ => { this.appService.setMessage(this.message); this.appService.showToast(this.showToast) }, this.handleError)
    this.router.navigate(['/search-returns'])
  }

  private checkFormValidity() {
    if (this.getCustomer.value?.customerName == undefined || this.getCustomer.value.customerName == '' || this.getCustomer.value.id == this.notFound)
    {
      this.getCustomer.invalid
      this.custIdFromTemplate = 'none'
    }
    if (this.getProduct.value?.productName == undefined || this.getProduct.value?.productName == '' || this.getProduct.value?.id == this.notFound) {
      this.getProduct.invalid
      this.prodIdFromTemplate = 'none'
    }
    if (this.getFault.value?.name == undefined || this.getFault.value?.name == '' || this.getFault.value?.id == this.notFound) {
      this.getFault.invalid
      this.faultIdFromTemplate = 'none'
    }
    if (this.getOwner.value?.firstName == undefined || this.getOwner.value?.firstName == '' || this.getOwner.value?.id == this.notFound) {
      this.getOwner.invalid
      this.ownerIdFromTemplate = 'none'
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

  newProductForm = this.fb.group({
    productName: [''],
    price: [0.00],
    weight: [0.00],
    shortCode: [''],
  })

  newOwnerForm = this.fb.group({
    ownerFirstName: ['', Validators.required],
    ownerLastName: ['']
  })

  newFaultForm = this.fb.group({
    faultName: ['', Validators.required],
    description: ['']
  })

  //

  //Modal Properties
  customerIdFromModal = ''
  customerShortCodeFromTemplate = ''
  customerAlreadyExists = 'Customer already exists'
  customerShortCodeAlreadyExists = 'Short code already exists'

  productIdFromModal = ''
  productShortCodeFromTemplate = ''
  productAlreadyExists = 'Product already exists'
  productShortCodeAlreadyExists = 'Short code already exists'

  faultIdFromModal = ''
  faultAlreadyExists = 'Fault already exists'

  ownerIdFromModal = ''

  //Open Modal
  openCustomerModal(content: any) {
    this.newCustomerForm.reset()
    this.customerIdFromModal = ''
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

  openProductModal(content: any) {
    console.log("Product Modal opened")
    this.newProductForm.reset()
    this.productIdFromModal = ''
    this.productShortCodeFromTemplate = ''

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
        this.saveNewproduct()
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  openOwnerModal(content: any) {
    this.newOwnerForm.reset()
    this.ownerIdFromModal = ''

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
        this.saveNewOwner()
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  openFaultModal(content: any) {
    this.newFaultForm.reset()
    this.faultIdFromModal = ''

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
        this.saveNewfault()
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  //modal save methods

  saveNewCustomer(): void {
    if (this.customerIdFromModal == this.customerAlreadyExists || this.customerShortCodeFromTemplate == this.customerShortCodeAlreadyExists) {
      return
    }

    let newCustomer: CustomerRm = {
      customerName: this.newCustomerForm.controls.customerName.value?.trim(),
      email: this.newCustomerForm.controls.email.value?.trim(),
      address: this.newCustomerForm.controls.address.value?.trim(),
      shortCode: this.newCustomerForm.controls.shortCode.value?.trim()
    }

    this.customerService.createCustomer({ body: newCustomer }).subscribe(c => {
      //this.showToast = true
      //this.message = 'Customer added successfully'
      console.log('1. Saved, then getModel gest called')
      this.getModel(newCustomer.customerName!, 'customerType')
      console.log('5. Trying to add customer to form')
      this.form.controls.customer.setValue({ id: this.custIdFromTemplate, customerName: newCustomer.customerName! })
      //else if (this.newCustomerForm.valid && !this.form.touched && !this.form.dirty) {
      //  this.message = 'Nothing added'
      //  console.log('Nothing added')
      //}
      //this.appService.setMessage(this.message);
      //this.appService.showToast(this.showToast)
      console.log('6. Trying to set customer {' + newCustomer.customerName + '} The id is: {' + this.custIdFromTemplate + '}')
    })

  }
  saveNewproduct(): void {
    if (this.productIdFromModal == this.productAlreadyExists || this.productShortCodeFromTemplate == this.productShortCodeAlreadyExists) {
      return
    }

    let newProduct: ProductRm = {
      productName: this.newProductForm.controls.productName.value?.trim(),
      price: this.newProductForm.controls.price.value!,
      weight: this.newProductForm.controls.weight.value!,
      shortCode: this.newProductForm.controls.shortCode.value?.trim()
    }

    this.productService.createProduct({ body: newProduct }).subscribe(c => {
      //this.showToast = true
      //this.message = 'product added successfully'
      console.log('1. Saved, then getModel gest called')
      this.getModel(newProduct.productName!, 'productType')
      console.log('5. Trying to add product to form')
      this.form.controls.product.setValue({ id: this.prodIdFromTemplate, productName: newProduct.productName! })
      //else if (this.newproductForm.valid && !this.form.touched && !this.form.dirty) {
      //  this.message = 'Nothing added'
      //  console.log('Nothing added')
      //}
      //this.appService.setMessage(this.message);
      //this.appService.showToast(this.showToast)
      console.log('6. Trying to set product {' + newProduct.productName + '} The id is: {' + this.prodIdFromTemplate + '}')
    })

  }
  saveNewOwner(): void {
    
    let newOwner: OwnerRm = {
      firstName: this.newOwnerForm.controls.ownerFirstName.value?.trim(),
      lastName: this.newOwnerForm.controls.ownerLastName.value?.trim()
    }

    this.ownerService.createOwner({ body: newOwner }).subscribe(c => {
      //this.showToast = true
      //this.message = 'owner added successfully'
      console.log('1. Saved, then getModel gest called')
      this.getModel(newOwner.firstName!, 'ownerType')
      console.log('5. Trying to add new owner:' + newOwner.firstName! +' to form')
      this.form.controls.owner.setValue({ id: this.ownerIdFromTemplate, firstName: newOwner.firstName! })
      //else if (this.newownerForm.valid && !this.form.touched && !this.form.dirty) {
      //  this.message = 'Nothing added'
      //  console.log('Nothing added')
      //}
      //this.appService.setMessage(this.message);
      //this.appService.showToast(this.showToast)
      console.log('6. Trying to set owner {' + newOwner.firstName + '} The id is: {' + this.ownerIdFromTemplate + '}')
    })

  }
  saveNewfault(): void {
    if (this.faultIdFromModal == this.faultAlreadyExists) {
      return
    }

    let newFault: FaultRm = {
      name: this.newFaultForm.controls.faultName.value?.trim(),
      description: this.newFaultForm.controls.description.value?.trim()
    }

    this.faultService.createFault({ body: newFault }).subscribe(c => {
      //this.showToast = true
      //this.message = 'fault added successfully'
      console.log('1. Saved, then getModel gest called')
      this.getModel(newFault.name!, 'faultType')
      console.log('5. Trying to add fault to form')
      this.form.controls.fault.setValue({ id: this.faultIdFromTemplate, name: newFault.name! })
      //else if (this.newfaultForm.valid && !this.form.touched && !this.form.dirty) {
      //  this.message = 'Nothing added'
      //  console.log('Nothing added')
      //}
      //this.appService.setMessage(this.message);
      //this.appService.showToast(this.showToast)
      console.log('6. Trying to set fault {' + newFault.name + '} The id is: {' + this.faultIdFromTemplate + '}')
    })

  }

  //Modal extension Methods

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  customerExists(customerName: string) {
    this.customerIdFromModal = ''
      let customerFound = this.customerList.filter(c => c.customerName?.toLowerCase().trim() == customerName.toLowerCase().trim())
      if (customerFound.length > 0) {
        this.customerIdFromModal = this.customerAlreadyExists
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

  productExists(productName: string) {
    this.productIdFromModal = ''
    let productFound = this.productList.filter(p => p.productName?.toLowerCase().trim() == productName.toLowerCase().trim())
    if (productFound.length > 0) {
      this.productIdFromModal = this.productAlreadyExists
    }
  }

  productShortCodeExists(shortCode: string) {
    this.productShortCodeFromTemplate = ''
    if (this.product.shortCode?.toLowerCase().trim() != shortCode.toLowerCase().trim()) {
      let skuFound = this.productList.filter(s => s.shortCode?.toLowerCase().trim() == shortCode.toLowerCase().trim())
      if (skuFound.length > 0) {
        this.productShortCodeFromTemplate = this.productShortCodeAlreadyExists
      }
    }
  }

  faultExists(faultName: string) {
    this.faultIdFromModal = ''
    let faultFound = this.faultList.filter(f => f.name?.toLowerCase().trim() == faultName.toLowerCase().trim())
    if (faultFound.length > 0) {
      this.faultIdFromModal = this.faultAlreadyExists
    }
  }
}

