import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductRm } from '../api/models';
import { ProductService } from '../api/services';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private router: Router, private fb: FormBuilder) {
    console.log(
      'id :' + this.product.id +
      ' productName :' + this.form.get('productName')?.value +
      ' price :' + this.form.get('price')?.value +
      ' weight :' + this.form.controls.weight.value! +
      ' shortCode :' + this.form.controls.shortCode.value
    )
  }

  product: ProductRm = {}
  productList: ProductRm[] = []
  productId = ''
  productAlreadyExists = 'Product already exists'
  shortCodeAlreadyExists = 'Short Code already exists'
  prodIdFromTemplate = ''
  shortCodeFromTemplate = ''
  showToast = false
  message = ''

  form = this.fb.group({
    productName: [''],
    weight: [0.00],
    price: [0.00],
    shortCode: ['']
  })

  ngOnInit(): void {
    this.productService.searchProduct().subscribe(p => this.productList = p, this.handleError)

  }

  private handleError = (err: any) => {

    if (err.status == 404) {
      this.router.navigate(['/products'])
    }

    console.log("Response Error. Status: ", err.status)
    console.log("Response Error. Status: ", err.statusText)
    console.log(err);
  }

  save() {

    if (this.prodIdFromTemplate == this.productAlreadyExists || this.shortCodeFromTemplate == this.shortCodeAlreadyExists)
      return

    console.log(
      'id :' + this.product.id +
      ' productName :' + this.getProductName.value +
      ' price :' + this.getPrice.value +
      ' weight :' + this.getWeight.value +
      ' shortCode :' + this.getShortCode.value?.toUpperCase()
    )

    let newProduct: ProductRm = {
      id: this.product.id,
      productName: this.getProductName.value,
      price: this.getPrice.value!,
      weight: this.getWeight.value!,
      shortCode: this.getShortCode.value?.toUpperCase()
    }

    this.productService.createProduct({ body: newProduct }).subscribe(() => {
      this.showToast = true
      if (this.form.valid) {
        this.message = 'Product added successfully'
        console.log('Product added successfully')
      }
      else if (this.form.valid && !this.form.touched && !this.form.dirty) {
        this.message = 'Nothing added'
        console.log('Nothing added')
      }
      //this.appService.setMessage(this.message);
      //this.appService.showToast(this.showToast)
      this.router.navigate(['/products'])
    })
  }

  productExists(modelName: string) {
    this.prodIdFromTemplate = ''
    if (this.product.productName?.toLowerCase().trim() != modelName.toLowerCase().trim()) {
      let productFound = this.productList.filter(p => p.productName?.toLowerCase().trim() == modelName.toLowerCase().trim())
      if (productFound.length > 0) {
        this.prodIdFromTemplate = this.productAlreadyExists

      }
    }
  }

  shortCodeExists(shortCode: string) {
    this.shortCodeFromTemplate = ''
    if (this.product.shortCode?.toLowerCase().trim() != shortCode.toLowerCase().trim()) {
      let skuFound = this.productList.filter(s => s.shortCode?.toLowerCase().trim() == shortCode.toLowerCase().trim())
      if (skuFound.length > 0) {
        this.shortCodeFromTemplate = this.shortCodeAlreadyExists
      }
    }
  }

  //getters
  get getProductName() {
    return this.form.controls.productName
  }

  get getPrice() {
    return this.form.controls.price
  }

  get getWeight() {
    return this.form.controls.weight
  }

  get getShortCode() {
    return this.form.controls.shortCode
  }
}
