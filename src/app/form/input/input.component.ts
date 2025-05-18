import {Component, Input} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {

  @Input() nameOfFormGroup!: FormGroup;
  @Input() label!: string;
  @Input() id!: string;
  @Input() name!: string;
  @Input() placeholder!: string;
  @Input() control!: string;
  @Input() type!: string;

}
