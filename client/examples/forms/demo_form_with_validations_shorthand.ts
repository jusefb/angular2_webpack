import {ControlGroup, FormBuilder, Validators, FORM_DIRECTIVES, Control, AbstractControl} from "angular2/common";
import {Component} from "angular2/core";
/**
 * Created by jusefbelkasemi on 14/02/16.
 */

@Component({
    selector: "main-app",
    directives: [FORM_DIRECTIVES],
    template: `
        <div class="ui raised segment">
            <h2 class="ui header">Demo Form: Sku</h2>
            <!-- ngFormModel removes the automatic application of the ngForm diretive to the form-->
            <form [ngFormModel]="myForm"
            (ngSubmit)="onSubmit(myForm)"
            class="ui form">
                <!-- <div *ngIf="!myForm.valid && myForm.controls['sku'].touched" class="error">Form is invalid</div> -->
                <!-- <div [style.display]="'block'" *ngIf="myForm.find('sku').hasError('invalidSku') && myForm.find('sku').touched" class="ui error message">SKU must begin with <span>123</span></div>
                <div class="field" [class.error]="!myForm.find('sku').valid && myForm.find('sku').touched">
                 <!-- <label for="skuInput">SKU</label>
                 <input type="text"
                        id="skuInput"
                        placeholder="SKU"
                        #sku="ngForm"
                        [ngFormControl]="myForm.controls['sku']">
                 <div *ngIf="!myForm.find('sku').valid && myForm.find('sku').touched" class="error">SKU is required (using the find method of the form directive)</div>
                 <div *ngIf="!sku.control.valid && sku.control.touched" class="error">SKU is required (using the export value of the ngFormControl directive)</div>-->
                 <div class="ui info message">
                    The product name is: {{productName}}
                rxr</div>
                 <div class="field">
                 <label for="skuInput">Product Name</label>
                 <input type="text"
                        id="productName"
                        placeholder="Product Name"
                        [ngFormControl]="myForm.controls['productName']"
                        [(ngModel)]="productName">

                </div>
                <button type="submit" class="ui button">Submit</button>
            </form>

        </div>
`
})
export class DemoFormWithValidationsShorthand {
    myForm:ControlGroup;
    sku:AbstractControl;
    productName: string;

    constructor(fb:FormBuilder) {
        //this.myForm = fb.group({
        //    'sku': ['', Validators.compose([Validators.required, skuValidator])]
        //});
        //this.sku = this.myForm.controls['sku'];
        //
        //this.sku.valueChanges.subscribe((value:string) => {
        //    console.log('sku changed to:', value);
        //});
        //
        this.myForm = fb.group({
            'productName': ['', Validators.required]
        });

    }

    onSubmit(form:any):void {
        console.log('you submitted value:', form.value);
    }
}

function skuValidator(control:Control):{ [s: string]: boolean } {
    if (!control.value.match(/^123/)) {
        return {invalidSku: true};
    }
}


