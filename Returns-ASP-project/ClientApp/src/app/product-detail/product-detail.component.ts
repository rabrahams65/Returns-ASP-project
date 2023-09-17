import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductRm } from '../api/models';
import { ProductService } from '../api/services';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private router: Router) { }

  product: ProductRm = {}
  productId = ''

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(r => { this.findProduct(r.get("productId")); console.log(this.product.productName)})
  }

  findProduct = (productId: string | null) => {
    this.productId = productId ?? 'Not passed'
    this.productService.findProduct({ id: productId! }).subscribe(p => this.product = p,this.handleError)
  }

  private handleError = (err: any) => {

    if (err.status == 404) {
      this.router.navigate(['/customers'])
    }

    console.log("Response Error. Status: ", err.status)
    console.log("Response Error. Status: ", err.statusText)
    console.log(err);
  }
}
