import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductRm } from '../api/models';
import { ProductService } from '../api/services';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

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

  form = this.fb.group({
    productName: [''],
    weight: [0.00],
    price: [0.00],
    shortCode: ['']
  })

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(r => this.findProduct(r.get("productId")))
    this.productService.searchProduct().subscribe(p => this.productList = p, this.handleError)
   
  }


  findProduct = (productId: string | null) => {
    this.productId = productId ?? 'Not passed'
    this.productService.findProduct({ id: productId! }).subscribe(p => {
      this.product = p
      this.form.controls.productName.setValue(p.productName!)
      this.form.controls.price.setValue(p.price!)
      this.form.controls.weight.setValue(p.weight!)
      this.form.controls.shortCode.setValue(p.shortCode!)
    }, this.handleError)
  }


  private handleError = (err: any) => {

    if (err.status == 404) {
      this.router.navigate(['/products'])
    }

    console.log("Response Error. Status: ", err.status)
    console.log("Response Error. Status: ", err.statusText)
    console.log(err);
  }

  productTouched() {
    this.form.controls.productName.markAsTouched
  }

  shortCodeTouched() {
    this.form.controls.shortCode.markAsTouched
  }

  touchedOrDirty() {
    //console.log('Product touched: ' + this.form.controls.productName.touched)
    //console.log('Price touched: ' + this.form.controls.price.touched)
    //console.log('Weight touched: ' + this.form.controls.weight.touched)
    //console.log('ShortCode touched: ' + this.form.controls.shortCode.touched)
    
  }

  update () {

    if (this.prodIdFromTemplate == this.productAlreadyExists || this.shortCodeFromTemplate == this.shortCodeAlreadyExists)
      return
    //if (!this.getProductName.touched || !this.getProductName.dirty) {
    //  this.getProductName.setValue(this.product.productName!)
    //}
    //if (!this.getPrice.touched || !this.getPrice.dirty) {
    //  this.getPrice.setValue(this.product.price!)
    //}
    //if (!this.getWeight.touched || !this.getWeight.dirty) {
    //  this.getWeight.setValue(this.product.weight!)
    //}
    //if (!this.getShortCode.touched || !this.getShortCode.dirty) {
    //  this.getShortCode.setValue(this.product.shortCode!)
    //}

      console.log(
        'id :' + this.product.id +
        ' productName :' + this.getProductName.value +
        ' price :' + this.getPrice.value +
        ' weight :' + this.getWeight.value +
        ' shortCode :' + this.getShortCode.value?.toUpperCase()
        )

    let editedProduct: ProductRm = {
      id: this.product.id,
      productName: this.getProductName.value,
      price: this.getPrice.value!,
      weight: this.getWeight.value!,
      shortCode: this.getShortCode.value?.toUpperCase()
    }

    this.productService.updateProduct({ id: this.product.id!, body: editedProduct }).subscribe(() => {
      this.productService.findProduct({ id: editedProduct.id! }).subscribe(p => {
        if (p.id == editedProduct.id && p.productName == editedProduct.productName && p.price == editedProduct.price
          && p.shortCode == editedProduct.shortCode && p.weight == editedProduct.weight) {
          this.router.navigate(['/products'])
        }
      })
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
