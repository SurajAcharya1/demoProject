import { Component } from '@angular/core';
import {NgTemplateOutlet} from "@angular/common";

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [
    NgTemplateOutlet
  ],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {

}
