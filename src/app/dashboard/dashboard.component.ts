import {Component, computed, OnInit, signal} from '@angular/core';
import {CustomDirectiveDirective} from "../custom-directive.directive";
import {NbButtonModule, NbCardModule, NbInputModule} from "@nebular/theme";
import {NgForOf, TitleCasePipe} from "@angular/common";
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {LocalStorageUtil} from "../utils/LocalStorageUtil";
import {RoleType} from "../emuns/role-type";
import {UserService} from "../services/user.service";
import {finalize} from "rxjs";
import {log} from "node:util";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CustomDirectiveDirective,
    NbButtonModule,
    NbCardModule,
    NbInputModule,
    NgForOf,
    ReactiveFormsModule,
    TitleCasePipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

  time = signal<number>(0);
  ms = signal<number>(0);
  running = signal<boolean>(false);
  interval = signal<any>(null);
  msInterval = signal<any>(null);
  double = computed(() => this.time() * 2);
  demoForm: FormGroup = new FormGroup<any>({});
  localStorage = LocalStorageUtil.getStorage();
  private timerInterval: any;
  private startTimestamp = 0;
  private pausedDuration = 0;
  userData: any;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.demoForm = this.formBuilder.group({
      name: [undefined, Validators.required],
      age: undefined,
      hobby: this.formBuilder.array([])
    })
  }

  addHobby() {
    const formArray = this.demoForm.get('hobby') as FormArray;
    formArray.push(this.formBuilder.group({
      desc: undefined
    }));
  }

  getHobbyControl() {
    return (this.demoForm.get('hobby') as FormArray)?.controls
  }

  removeHobby(index: number) {
    (this.demoForm.get('hobby') as FormArray).removeAt(index);
  }

  startTimer() {
    if (!this.running()) {
      this.running.set(true);
      this.startTimestamp = performance.now() - this.pausedDuration;

      this.timerInterval = setInterval(() => {
        const elapsed = performance.now() - this.startTimestamp;
        this.time.set(Math.floor(elapsed / 1000));
        this.ms.set(Math.floor(elapsed % 1000));
      }, 10); // 10ms refresh is precise enough
    }
  }

  pause(reset = true) {
    if (this.running()) {
      this.running.set(false);
      clearInterval(this.timerInterval);
      this.pausedDuration = performance.now() - this.startTimestamp;

      if (reset) {
        this.time.set(0);
        this.ms.set(0);
        this.pausedDuration = 0;
      }
    }
  }

  submit() {
    console.log(this.demoForm.value);
  }

  getData() {
    if (this.localStorage.roleType === RoleType.ADMIN) {
      this.userService.getAdmin().pipe(
        finalize(() => console.log("hello"))
      ).subscribe({
        next: res => {
          console.log(res);
          this.userData = res;
        }, error: err => {
          console.log(err);
        }
      })
    }
    if (this.localStorage.roleType === RoleType.USER) {
      this.userService.getUser().subscribe({
        next: res => {
          this.userData = res;
        }, error: err => {
          console.log(err);
        }
      })
    }
  }
}
