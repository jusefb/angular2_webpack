/*
* “@InventoryApp: the top-level component for our application”

 Excerpt From: Felipe Coury, Ari Lerner, Nate Murray, & Carlos Taborda. “ng-book 2.” iBooks.
*
* */
import {Component} from "angular2/core";
import {Product} from "../models/product";
import {ProductList} from "./product.list.component.ts"

@Component({
    selector: "main-app",
    directives:[ProductList],
    template: `
    <div class="ui menu">
    <div class="ui container">
        <a href="#" class="header item">
            ng-book 2
        </a>
        <div class="header item borderless">
            <h1 class="ui header">
                Angular 2 Inventory App
            </h1>
        </div>
    </div>
</div>

        <div class="inventory-app ui main text container">
            <product-list [productList]="products" (onProductSelected)="productWasSelected($event)"></product-list>
        </div>
    `
})
export default class InventoryApp {
    public products:Product[];

    constructor() {
        this.products = [
            new Product(
                'MYSHOES', 'Black Running Shoes',
                '/resources/images/products/black-shoes.jpg',
                ['Men', 'Shoes', 'Running Shoes'],
                109.99),
            new Product(
                'NEATOJACKET', 'Blue Jacket',
                '/resources/images/products/blue-jacket.jpg',
                ['Women', 'Apparel', 'Jackets & Vests'],
                238.99),
            new Product(
                'NICEHAT', 'A Nice Black Hat',
                '/resources/images/products/black-hat.jpg',
                ['Men', 'Accessories', 'Hats'],
                29.99)
        ]
    }

    productWasSelected(product:Product):void {
        console.log('Product clicked: ', product);
    }

}