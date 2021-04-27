import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  apiUrl = 'https://localhost:44350/api/';
  constructor(private httpClient: HttpClient) {}

  getAllByCustomerId(customerId:number) : Observable<ListResponseModel<CreditCard>>{
    let newPath = this.apiUrl + "creditcards/getallbycustomerid?customerid="+customerId
    return this.httpClient.get<ListResponseModel<CreditCard>>(newPath);
  }

  getById(id: number): Observable<SingleResponseModel<CreditCard>> {
    let newPath = this.apiUrl + 'creditcards/getbyid?id='+id;
    return this.httpClient.get<SingleResponseModel<CreditCard>>(newPath);
  }

  add(creditCard:CreditCard):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"creditcards/add",creditCard)
  }

  delete(creditCard:CreditCard):Observable<SingleResponseModel<CreditCard>>{
    return this.httpClient.post<SingleResponseModel<CreditCard>>(this.apiUrl+"creditcards/delete",creditCard)
  }

}
