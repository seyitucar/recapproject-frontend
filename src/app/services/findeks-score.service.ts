import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FindeksScore } from '../models/findeksScore';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class FindeksScoreService {

  apiUrl = 'https://localhost:44350/api/';
  constructor(private httpClient: HttpClient) {}

  getById(id: number): Observable<SingleResponseModel<FindeksScore>> {
    let newPath = this.apiUrl + 'findeksscores/getbyid?id='+id;
    return this.httpClient.get<SingleResponseModel<FindeksScore>>(newPath);
  }

  getByCustomerId(customerId:number) : Observable<SingleResponseModel<FindeksScore>>{
    let newPath = this.apiUrl + "findeksscores/getbycustomerid?customerid="+customerId
    return this.httpClient.get<SingleResponseModel<FindeksScore>>(newPath);
  }

  getAll() : Observable<ListResponseModel<FindeksScore>>{
    let newPath = this.apiUrl + "findeksscores/getall"
    return this.httpClient.get<ListResponseModel<FindeksScore>>(newPath);
  }

  add(findeksScore:FindeksScore):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"findeksscores/add",findeksScore)
  }

  delete(findeksScore:FindeksScore):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"findeksscores/add",findeksScore)
  }

  update(findeksScore:FindeksScore):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"findeksscores/add",findeksScore)
  }

}
