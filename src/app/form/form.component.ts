import {Component, OnInit} from '@angular/core';
import {Gender} from "../emuns/gender";
import {InputComponent} from "./input/input.component";
import {NgForOf, TitleCasePipe} from "@angular/common";
import {SelectComponent} from "./select/select.component";
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule
} from "@angular/forms";
import {
  NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbSelectModule,
  NbToggleModule
} from "@nebular/theme";
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
    NbCardModule,
    NbInputModule,
    NbSelectModule,
    TitleCasePipe,
    NbToggleModule
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

  inputTypes = [
    'text',
    'color',
    'password',
    'button',
    'hidden',
    'number',
    'checkbox',
    'date',
    'datetime-local',
    'email',
    'file',
    'image',
    'month',
    'radio',
    'range',
    'reset',
    'search',
    'submit',
    'tel',
    'time',
    'week'
  ]

  form: FormGroup = new FormGroup<any>({});
  formCreater: FormGroup = new FormGroup<any>({});

  constructor(private formBuilder: FormBuilder,
              private titleCasePipe: TitleCasePipe) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.buildFormCreater();
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

  buildFormCreater() {
    this.formCreater = this.formBuilder.group({
      label: undefined,
      id: undefined,
      name: undefined,
      placeholder: undefined,
      control: undefined,
      type: 'text',
      createArray: false,
      arrayForWhat: undefined
    });
  }

  pushToInputFieldsArray() {
    const formValue = this.formCreater?.value;
    const camelCasedLabel = this.toCamelCase(formValue.label);
    const inputObject: InputForm = {
      label: formValue.label,
      id: camelCasedLabel,
      name: camelCasedLabel,
      placeholder: formValue.placeholder,
      control: camelCasedLabel,
      type: formValue.type
    }
    if (this.formCreater.get('createArray')?.value) {
      this.form.setControl(this.toCamelCase(this.formCreater.get('arrayForWhat')?.value),
        this.formBuilder.array([this.formBuilder.group({[camelCasedLabel]: this.formBuilder.control(undefined)})]))
    } else {
      this.form.setControl(camelCasedLabel, this.formBuilder.control(undefined));
    }
    console.log('form:::', this.form)
    console.log(inputObject);
    this.inputFormFields.push(inputObject);
    this.formCreater.reset();
  }

  toCamelCase(value: string) {
    const splitString = value.trim().split(' ');
    let camelCasedString = '';
    splitString.forEach((value, i) => {
      if (i === 0) {
        camelCasedString += value.toLowerCase();
      } else {
        camelCasedString += this.titleCasePipe.transform(value);
      }
    });
    return camelCasedString;
  }
}
