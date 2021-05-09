
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastContainerModule, ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  car:Car;
  carUpdateForm : FormGroup;

  constructor(private formBuilder:FormBuilder, private toastrService:ToastrService, private carService:CarService, private router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.createCarUpdateForm()
    this.activatedRoute.params.subscribe((params)=>{
      if(params["carId"]){
        this.getCarDetailsById(params["carId"])
      }
    })

  }

  createCarUpdateForm(){
    this.carUpdateForm = this.formBuilder.group({
      brandId:["", Validators.required],
      colorId:["", Validators.required],
      carName:["", Validators.required],
      modelYear:["", Validators.required],
      dailyPrice:["", Validators.required],
      description:["", Validators.required]
    })
  }

  getCarDetailsById(carId:number) {
    this.carService.getCarDetailsById(carId).subscribe((response) => {
        this.car = response.data;
      }); 
  }

  updateCar(){
    if(this.carUpdateForm.valid){
      let carModel = Object.assign({}, this.carUpdateForm.value)
      carModel.id = this.car.id;
      this.carService.update(carModel).subscribe(response =>{
        this.toastrService.success(response.message)
        this.router.navigate(["carlist"])
      },responseError=>{
        if(responseError.error.ValidationErrors.length>0){
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
          this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage, "Doğrulama Hatası")
          }
        }
      })

    } else {
      this.toastrService.error("Formunuz Eksik","Dikkat")
    }    
  }

}
