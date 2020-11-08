import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root' 
})
export class AuthenticateService {
  private loginFlag: boolean;
  private logedinUser: string = "";
  private token:string;  
  private email: string;
  baseUrl:string;
  constructor(private httpClient:HttpClient) {
    this.loginFlag = false;
    this.baseUrl = environment.baseUrl+"user/login";
    this.email = "";
   }
  public setToken(token: string) {
    this.token = token;
  }
  
  public getToken() {
    return this.token;
  }
  
  public getemail() {
    return this.email;
  }
  
  public setemail(email) {
    this.email = email;
  }
  public getLogedInUser() {
    return this.logedinUser;
  }
  
  public setLogedInUser(user) {
    this.logedinUser = user;
  }

  public getLogeInFlag() {
    return this.loginFlag;
  }
  
  public setLogeInFlag(flag) {
    this.loginFlag = flag;
  }

  authenticate(user: string, password: string): Observable<any> {
    let credentials: string = user + ":" + password;
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Basic ' + credentials);
    return this.httpClient.get(this.baseUrl, { headers });
  }
  
  login() {
    this.loginFlag = true;
  }
  logout() {
    this.loginFlag = false;
    this.logedinUser = "";
  }
  islogin() {
    return this.loginFlag;
  }
}
