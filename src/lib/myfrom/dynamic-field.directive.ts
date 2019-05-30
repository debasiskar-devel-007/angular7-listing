/**
 * Created by debasiskar on 17/04/19.
 */
import {
    ComponentFactoryResolver,
    ComponentRef,
    Directive,
    Input,
    OnInit,
    ViewContainerRef
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "./field.interface";
import { InputComponent } from "./input.component";
import { ButtonComponent } from "./button.component";
import { SelectComponent } from "./select.component";
import { DateComponent } from "./date.component";
import { RadiobuttonComponent } from "./radiobutton.component";
import { CheckboxComponent } from "./checkbox.component";

const componentMapper = {
    input: InputComponent,
    button: ButtonComponent,
    select: SelectComponent,
    date: DateComponent,
    radiobutton: RadiobuttonComponent,
    checkbox: CheckboxComponent
};
@Directive({
    selector: "[dynamicField]"
})
export class DynamicFieldDirective implements OnInit {
    @Input() field: FieldConfig;
    @Input() group: FormGroup;
    componentRef: any;
    constructor(
        private resolver: ComponentFactoryResolver,
        private container: ViewContainerRef
    ) {}
    ngOnInit() {
        const factory = this.resolver.resolveComponentFactory(
            componentMapper[this.field.type]
        );
        this.componentRef = this.container.createComponent(factory);
        this.componentRef.instance.field = this.field;
        this.componentRef.instance.group = this.group;
    }
}
