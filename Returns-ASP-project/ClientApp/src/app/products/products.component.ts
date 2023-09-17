import { Component, OnInit } from '@angular/core';
import { ProductRm } from '../api/models';
import { ProductService } from '../api/services';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private productService: ProductService) { }
  products: ProductRm[] = []

  ngOnInit(): void {

    this.productService.searchProduct().subscribe(p => this.products = p, this.handleError)

  }

  private handleError(err: any) {
    console.log("Response Error. Status: ", err.status)
    console.log("Response Error. Status: ", err.statusText)
    console.log(err);
  }



}
