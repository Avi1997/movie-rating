import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { AuthenticateService } from './site/authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  baseUrl:string;
  constructor(private http:HttpClient,private authenticationService:AuthenticateService) { 
    this.baseUrl = environment.baseUrl;
  }
  getAllMovies(){
    let token = "Bearer " + this.authenticationService.getToken();
    const httpOption = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': token
      })
    };
    return this.http.get(this.baseUrl+'movie',httpOption);
  }
}
