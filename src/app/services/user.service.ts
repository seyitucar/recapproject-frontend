import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = 'https://localhost:44350/api/';
  constructor(private httpClient:HttpClient) { }

  getById(id:number): Observable<SingleResponseModel<User>> {
    let newPath = this.apiUrl + 'users/getbyid'+id;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }

  getByMail(email:String): Observable<SingleResponseModel<User>> {
    let newPath = this.apiUrl + 'users/getbymail?email='+email;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }

}
