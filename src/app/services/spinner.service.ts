import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor() { }

  private _loading = new BehaviorSubject<boolean>(false);
  readonly loading$ = this._loading.asObservable();


  show() {
    this._loading.next(true);
  }

  hide() {
    this._loading.next(false);
  }
}
