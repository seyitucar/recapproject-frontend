import { Component, OnInit } from '@angular/core';
import { CarDetail } from 'src/app/models/carDetail';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl:'./car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: CarDetail[] = [];
  dataLoaded = false;

  constructor(private carService:CarService) {}

  ngOnInit(): void {
    this.getCarDetails();
  }

  getCarDetails() {
    this.carService.getCars().subscribe((response)=>{
      this.cars = response.data
      this.dataLoaded = true;
    })
  }
}
