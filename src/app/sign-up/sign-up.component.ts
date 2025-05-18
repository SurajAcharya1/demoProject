import {Component, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {Gender} from "../emuns/gender";
import {NbSelectModule} from "@nebular/theme";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    NgClass,
    NbSelectModule,
    NgForOf,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit{

  signUpForm: FormGroup = new FormGroup({});
  submitted = false;
  gender = Gender.list();

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.buildSignUpForm();
  }

  buildSignUpForm() {
    this.signUpForm = this.formBuilder.group({
      name: [undefined, Validators.required],
      password: [undefined, Validators.required],
      email: [undefined, [Validators.required, Validators.email]],
      username: [undefined, Validators.required],
      gender: [undefined, Validators.required]
    });
  }

  signUp() {
    this.submitted = true;
    if (this.signUpForm.invalid) {
      return;
    }
    console.log(this.signUpForm.value);
    this.authService.signIn(this.signUpForm.value).subscribe({
      next: (res: any)=> {
        console.log(res)
        window.alert('User Registration Successful');
        this.router.navigate(['']);
      }, error: err => {
        console.log(err);
      }
    });
  }
}
