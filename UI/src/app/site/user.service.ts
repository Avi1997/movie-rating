import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl:string;
 
  constructor(private http:HttpClient) {  
    this.baseUrl = environment.baseUrl;
  }
  createUser(user) {
    return this.http.post(this.baseUrl+"user/signup", user);
  }
}
