import {Component, OnInit} from '@angular/core';
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {SpinnerService} from "../services/spinner.service";
import {AsyncPipe, NgIf} from "@angular/common";
import {LoaderComponent} from "./loader/loader.component";

@Component({
  selector: 'app-global-spinner',
  standalone: true,
  imports: [
    MatProgressSpinner,
    NgIf,
    AsyncPipe,
    LoaderComponent
  ],
  templateUrl: './global-spinner.component.html',
  styleUrl: './global-spinner.component.scss'
})
export class GlobalSpinnerComponent implements OnInit {

  loading: boolean = false;

  constructor(public spinnerService: SpinnerService) {
  }

  ngOnInit(): void {
     this.spinnerService.loading$.subscribe({
       next: value => {
         this.loading = value;
       }
     })
  }

}
