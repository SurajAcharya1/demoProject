import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  static USER_API = 'v1/user/'
  static GET_USER = 'getUser'
  static GET_ADMIN = 'getAdmin'
  constructor(private httpClient: HttpClient) { }

  getUser(): Observable<any> {
    return this.httpClient.get(environment.baseApi + UserService.USER_API + UserService.GET_USER);
  }

  getAdmin(): Observable<any> {
    return this.httpClient.get(environment.baseApi + UserService.USER_API + UserService.GET_ADMIN);
  }
}
