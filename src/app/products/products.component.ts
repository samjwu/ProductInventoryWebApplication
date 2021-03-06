import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],

  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate(500)
      ]),
      transition('* => void', [
        animate(500, style({opacity: 0}))
      ])
    ])
  ]
})
export class ProductsComponent implements OnInit {
  products: Product[];

  selectedProduct: Product;

  constructor(private productService: ProductService) { }

  onSelectProduct(product) {
    this.selectedProduct = product;
    this.productService.getProduct(3)
      .subscribe(product => console.log(product));
  }

  ngOnInit() {
    this.getProducts();
  }

  //call getProducts from product.service.ts
  getProducts(): void {
    const products = this.productService.getProducts().subscribe(products => this.products = products);
  }

  save(product): void {
    this.productService.updateProduct(product)
      .subscribe(() => console.log('run save on product'))
  }

  add(name: string, price: number): void {
    this.productService.addProduct({ name, price } as Product)
      .subscribe(product => {
        this.products.push(product);
      });
  }

  delete(productId: number): void {
    this.products = this.products.filter(product => product.id !== productId);
    this.productService.deleteProduct(productId).subscribe();
  }

}
