import {ControlGroup, FormBuilder, FORM_DIRECTIVES} from "angular2/common";
import {Component} from "angular2/core";

@Component({
    selector: "demo-form-sku-builder",
    directives: [FORM_DIRECTIVES],
    template: `
        <div class="ui raised segment">
            <h2 class="ui header">Demo Form: Sku</h2>
            <form [ngFormModel]="myForm"
            (ngSubmit)="onSubmit(myForm.value)"
            class="ui form">
                <div class="field">
                 <label for="skuInput">SKU</label>
                 <input type="text"
                        id="skuInput"
                        placeholder="SKU"
                        ngControl="sku">
                </div>
       <button type="submit" class="ui button">Submit</button>
            </form>

        </div>
`
})
export class FormSkuWithBuilder {
    myForm:ControlGroup;

    constructor(fb:FormBuilder) {
        this.myForm = fb.group({
            'sku': ['ABC123']
        });
    }

}