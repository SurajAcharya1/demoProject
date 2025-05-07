import {Component, Inject, OnInit} from '@angular/core';
import {NbCardModule} from "@nebular/theme";
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {AuthService} from "../services/auth.service";
import {LocalStorage, LocalStorageUtil} from "../utils/LocalStorageUtil";

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [
    NbCardModule,
    ReactiveFormsModule,
    NgIf,
    NgClass,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup = new FormGroup({});
  submitted = false;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.buildLoginForm();
  }

  buildLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: [undefined, Validators.required],
      password: [undefined, Validators.required]
    });
  }

  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm.value).subscribe({
      next: (res: any)=> {
        const loginRes: LocalStorage = {
          at: res.accessToken,
          rt: res.refreshToken,
          name: res.name,
          username: res.username,
          email: res.email,
          roleType: res.roleType,
          gender: res.gender
        }
        LocalStorageUtil.setStorage(loginRes);
        this.router.navigate(['/home/dashboard']);
      }, error: err => {
        console.log(err);
      }
    });
  }
}
