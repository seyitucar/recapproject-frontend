import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  apiUrl = 'https://localhost:44350/api/';
  constructor(private httpClient: HttpClient) {}

  getColors() : Observable<ListResponseModel<Color>>{
    let newPath = this.apiUrl + "colors/getall"
    return this.httpClient.get<ListResponseModel<Color>>(newPath);
  }

  getColorById(colorId: number): Observable<SingleResponseModel<Color>> {
    let newPath = this.apiUrl + 'colors/getbyid?id='+colorId;
    return this.httpClient.get<SingleResponseModel<Color>>(newPath);
  }

  add(color:Color):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"colors/add",color)
  }

  update(color:Color):Observable<ListResponseModel<Color>>{
    return this.httpClient.post<ListResponseModel<Color>>(this.apiUrl+"colors/update",color)
  }

  delete(color:Color):Observable<SingleResponseModel<Color>>{
    return this.httpClient.post<SingleResponseModel<Color>>(this.apiUrl+"colors/delete",color)
  }

}
