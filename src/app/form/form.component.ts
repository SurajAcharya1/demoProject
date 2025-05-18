import {Component, OnInit} from '@angular/core';
import {Gender} from "../emuns/gender";
import {InputComponent} from "./input/input.component";
import {NgForOf} from "@angular/common";
import {SelectComponent} from "./select/select.component";
import {AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NbButtonModule, NbCardModule} from "@nebular/theme";
import {InputForm} from "../class/InputForm";
import {SelectForm} from "../class/SelectForm";

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    InputComponent,
    NgForOf,
    SelectComponent,
    ReactiveFormsModule,
    NbButtonModule,
    NbCardModule
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {

  inputFormFields: Array<InputForm> = [
    {
      label: 'Name',
      id: 'name',
      name: 'name',
      placeholder: 'Enter Name',
      control: 'name',
      type: "text"
    },
    {
      label: 'Email',
      id: 'email',
      name: 'email',
      placeholder: 'Enter Email',
      control: 'email',
      type: "email"
    },
    {
      label: 'Password',
      id: 'password',
      name: 'password',
      placeholder: 'Enter Password',
      control: 'password',
      type: "password"
    }
  ]

  selectFormFields: Array<SelectForm> = [
    {
      label: 'Gender',
      id: 'gender',
      name: 'gender',
      placeholder: 'Select Gender',
      control: 'gender',
      options: Gender.listWithKeys(),
      value: 'key',
      displayText: 'key'
    }
  ]

  hobbyControls: Array<InputForm> = [
    {
      label: 'About Hobby',
      id: 'desc',
      name: 'desc',
      placeholder: 'Enter About Hobby',
      control: 'desc',
      type: "text"
    }
  ]

  form: FormGroup = new FormGroup<any>({});

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      name: undefined,
      email: undefined,
      password: undefined,
      gender: undefined,
      hobby: this.formBuilder.array([])
    });
  }

  getHobbyControl() {
    return (this.form.get('hobby') as FormArray)?.controls;
  }

  submit() {
    console.log(this.form.value);
  }

  addHobby() {
    const formArray = this.form.get('hobby') as FormArray;
    formArray.push(this.formBuilder.group({
      desc: undefined
    }))
  }

  castToFormGroup (controls: AbstractControl<any>) {
    return controls as FormGroup;
  }
}
