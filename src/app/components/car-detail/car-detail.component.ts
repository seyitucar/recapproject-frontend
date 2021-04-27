import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  carDetail : Car;
  cars: Car[] = [];
  carImages: CarImage[] = [];
  carImageBasePath = "https://localhost:44350/Images/";

  constructor(
    private carService : CarService,
    private activatedRouted: ActivatedRoute,
    private carImageService: CarImageService,
    private toastrService:ToastrService,
    private cartService:CartService,
  ) {}

  ngOnInit(): void {
    this.activatedRouted.params.subscribe((params)=>{
      if(params["carId"]){ 
        this.getCarDetailsById(params["carId"]);
        this.getCarImageByCarId(params["carId"]);
      } else {

        this.getCars();
      }
   
    })   
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
    });
  }

  getCarDetailsById(carId:number) {
    this.carService.getCarDetailsById(carId).subscribe((response) => {
        this.carDetail = response.data;
      }); 
  }

  getCarImageByCarId(carId:number){
    this.carImageService.getCarImageByCarId(this.activatedRouted.snapshot.params["carId"])
      .subscribe((response) => {
        this.carImages = response.data;
      });
  }

  getCurrentSlideClass(carImage:CarImage){
    if (carImage === this.carImages[0]) {
      return "carousel-item active"
    }
    return "carousel-item"
  }

  addToCart(car: Car) {
    if (car.modelYear < 2020) {
      this.toastrService.error(
        'Bu araç kiralanamaz',
        car.brandName + ' ' + car.carName
      );
    } else {
      this.toastrService.success(
        'Kiralama Sepetine Eklendi',
        car.brandName + ' ' + car.carName
      );
      this.cartService.addToCart(car);
    }
  }

}
