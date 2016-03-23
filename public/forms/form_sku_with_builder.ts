import {ControlGroup, FormBuilder, FORM_DIRECTIVES, Validators, AbstractControl} from "angular2/common";
import {Component} from "angular2/core";

@Component({
    selector: "main-app",
    directives: [FORM_DIRECTIVES],
    template: `
        <div class="ui raised segment">
            <h2 class="ui header">Demo Form: Sku</h2>
            <!-- ngFormModel removes the automatic application of the ngForm diretive to the form-->
            <form [ngFormModel]="myForm"
            (ngSubmit)="onSubmit(myForm.value)"
            class="ui form">
                <!-- <div *ngIf="!myForm.valid && myForm.controls['sku'].touched" class="error">Form is invalid</div> -->
                <div class="field" [class.error]="!sku.valid && sku.touched">
                    <!-- <div *ngIf="myForm.hasError('required', 'sku')" class="error">SKU is required</div>-->
                 <label for="skuInput">SKU</label>
                 <input type="text"
                        id="skuInput"
                        placeholder="SKU"
                        [ngFormControl]="myForm.controls['sku']">
                </div>
       <button type="submit" class="ui button">Submit</button>
            </form>

        </div>
`
})
export class FormSkuWithBuilder {
    myForm: ControlGroup;
    sku: AbstractControl;

    constructor(fb:FormBuilder) {
        this.myForm = fb.group({
            'sku': ['', Validators.required]
        });

        this.sku = this.myForm.controls['sku'];
    }

    onSubmit(form:any):void {
        console.log('you submitted value:', form);
    }

}