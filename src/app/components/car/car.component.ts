import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];

  carImageBasePath = 'https://localhost:44350/Images/';
  dataLoaded = true;
  filterText = "";

  constructor(
    private carService: CarService,
    private activatedRouted: ActivatedRoute,
    private toastrService: ToastrService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.activatedRouted.params.subscribe(params=>{
      if(params["brandId"] && params["colorId"]){
        this.getCarsByBrandIdAndColorId(params["brandId"],params["colorId"]);
      }
      else if(params["colorId"]){
        this.getCarsByColor(params["colorId"]);
      }
      else if(params["brandId"]){
        this.getCarsByBrand(params["brandId"]);
      }else {
        this.getCars();
      }
    })
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByColor(colorId: number) {
    this.carService.getCarsByColor(colorId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByBrand(brandId: number) {
    this.carService.getCarsByBrand(brandId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByBrandIdAndColorId(brandId:number, colorId:number) {
    this.carService
      .getCarsByBrandIdAndColorId(brandId,colorId)
      .subscribe((response) => {
        this.cars = response.data;
        console.log("çalıştı")
      });
  }

  getCarImage(car: Car) {
    if (car.imagePath) {
      return car.imagePath;
    } else {
      return 'default.png';
    }
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
