import {Component} from "angular2/core";
import {ProductImage} from "./productImage.component.ts";
import {ProductDepartment} from "./productDepartment.component.ts";
import {PriceDisplay} from "./priceDisplay.component.ts";

@Component({
    selector: "<product-row></product-row>",
    inputs: ['product'],
    host: {'class': 'item'},
    directives: [ProductImage, ProductDepartment, PriceDisplay],

    template: `
        <product-image [product]="product"></product-image>
        <div class="content">
            <div class="header">{{ product.name }}</div>
            <div class="meta">
                <div class="product-sku">SKU #{{ product.sku }}</div>
            </div>
             <div class="description">
               <product-department [product]="product"></product-department>
             </div>
        </div>
        <price-display [price]="product.price"></price-display>
    `
})
export class ProductRow {
    constructor() {

    }
}