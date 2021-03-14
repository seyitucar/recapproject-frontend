import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerDetailResponseModel } from '../models/customerDetailResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiUrl = 'https://localhost:44350/api/customers/getcustomerdetails';
  constructor(private httpClient: HttpClient) { }

  getCustomers() : Observable<CustomerDetailResponseModel> {
   return this.httpClient.get<CustomerDetailResponseModel>(this.apiUrl);
  }
}
