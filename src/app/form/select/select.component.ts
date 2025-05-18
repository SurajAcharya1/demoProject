import {Component, Input, OnInit} from '@angular/core';
import {NbSelectModule} from "@nebular/theme";
import {NgForOf} from "@angular/common";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [
    NbSelectModule,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent implements OnInit {

  @Input() nameOfFormGroup!: FormGroup;
  @Input() label!: string;
  @Input() name!: string;
  @Input() id!: string;
  @Input() placeholder!: string;
  @Input() control!: string;
  @Input() options!: Array<{ [key: string]: any }>;
  @Input() value!: string;
  @Input() displayText!: string;
  @Input() isWholeObjectValue = true;
  ngOnInit(): void {
    console.log(this.options);
  }

}
