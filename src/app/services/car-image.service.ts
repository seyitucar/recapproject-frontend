import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  apiUrl = "https://localhost:44350/api/carImages/";
  constructor(private httpClient: HttpClient) { }

  getCarImageByCarId(carId: number): Observable<ListResponseModel<CarImage>>{
    let newApiUrl = this.apiUrl + "getimagesbycarid?id=" + carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newApiUrl);
  }
}
