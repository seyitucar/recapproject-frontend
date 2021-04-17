import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarImageService } from 'src/app/services/car-image.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  carDetail: Car;
  carImages: CarImage[] = [];
  carImageBasePath = "https://localhost:44350/Images/";

  constructor(
    private carDetailService: CarDetailService,
    private activatedRouted: ActivatedRoute,
    private carImageService: CarImageService
  ) {}

  ngOnInit(): void {
    this.activatedRouted.params.subscribe((param) => {
      if (param['carId']) {
        this.getCarDetailsById(param['carId']);
      }

      this.getCarImageByCarId();
    });
  }

  getCarDetailsById(carId: number) {
    this.carDetailService.getCarDetailsById(carId).subscribe((response) => {
      this.carDetail = response.data[0];
    });
  }

  getCarImageByCarId(){
    this.carImageService.getCarImageByCarId(this.activatedRouted.snapshot.params["carId"])
      .subscribe((response) => {
        this.carImages = response.data;
      });
  }

  sliderItemActive(index: number){
    if(index === 0){
      return "carousel-item active";
    }
    else{
      return "carousel-item";
    }
  } 

}
