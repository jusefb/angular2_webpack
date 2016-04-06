import {Component, EventEmitter} from "angular2/core";
import {ProductRow} from "./productRow.component.ts"
import {Product} from "../models/product";

@Component({
    selector: "product-list",
    directives: [ProductRow],
    inputs: ['productList'],
    outputs: ['onProductSelected'],
    host: {"class": "ui list"},
    template: `
            <product-row *ngFor="#myProduct of productList" [product]="myProduct" (click)="clicked(myProduct)" [class.selected]="isSelected(myProduct)"></product-row>
    `
})
export class ProductList {
    productList:Product[];
    onProductSelected:EventEmitter<Product>;
    currentProduct:Product;

    constructor() {
        console.log(this.productList)
        this.onProductSelected = new EventEmitter();
    }

    clicked(product:Product):void {
        this.currentProduct = product;
    }

    isSelected(product:Product):boolean {
        if (!product || !this.currentProduct) {
            return false;
        }
        return product.sku === this.currentProduct.sku;
    }

}