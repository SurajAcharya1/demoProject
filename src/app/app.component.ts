import {Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {GlobalSpinnerComponent} from "./global-spinner/global-spinner.component";
import {MatProgressBar} from "@angular/material/progress-bar";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatProgressSpinner,
    GlobalSpinnerComponent,
    MatProgressBar
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Demo-Project';
}
