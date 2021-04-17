import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root',
})
export class CarDetailService {
  apiUrl = 'https://localhost:44350/api/';

  constructor(private httpClient: HttpClient) {}

  getCarDetailsById(carId: number): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + 'cars/getcardetailsbyid?id='+carId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

}
