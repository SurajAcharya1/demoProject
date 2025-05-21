import {Injectable, OnDestroy} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  static AUTH_API = 'v1/auth/'
  static LOGIN = 'login'
  static SIGN_IN = 'sign-in'
  constructor(private httpClient: HttpClient) { }

  login(req: any): Observable<any> {
    return this.httpClient.post(environment.baseApi + AuthService.AUTH_API + AuthService.LOGIN, req);
  }

  signIn(req: any): Observable<any> {
    return this.httpClient.post(environment.baseApi + AuthService.AUTH_API + AuthService.SIGN_IN, req);
  }
}
