import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';


@Component({
  selector: 'app-car',
  templateUrl:'./car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  carImageBasePath = "https://localhost:44350/Images/";
  dataLoaded = true;

  constructor(private carService:CarService, private activatedRouted:ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRouted.params.subscribe(params=>{
      if(params["colorId"]){
      this.getCarsByColor(params["colorId"])}
      else if(params["brandId"]){
        this.getCarsByBrand(params["brandId"])}   
      else{
        this.getCars();
      }
    })
  }

  getCars() {
    this.carService.getCars().subscribe((response)=>{
      this.cars = response.data
      this.dataLoaded = true;
    })
  }

  getCarsByColor(colorId:number) {
    this.carService.getCarsByColor(colorId).subscribe((response)=>{
      this.cars = response.data
      this.dataLoaded = true;
    })
  }

  getCarsByBrand(brandId:number) {
    this.carService.getCarsByBrand(brandId).subscribe((response)=>{
      this.cars = response.data
      this.dataLoaded = true;
    })
  }
  

  getCarImage(car:Car){

    if(car.imagePath){
      return car.imagePath
    }
    else{
      return 'default.png'
    }
  }

}
