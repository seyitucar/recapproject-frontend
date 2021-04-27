import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { User } from 'src/app/models/user';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental-add',
  templateUrl: './rental-add.component.html',
  styleUrls: ['./rental-add.component.css'],
})
export class RentalAddComponent implements OnInit {

  car: Car;
  rental : Rental;
  customer:Customer;
  user : User;
  rentalAddForm: FormGroup;

  constructor(
    private rentalService: RentalService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private localStorage : LocalStorageService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{
      if(params["carId"]){
      }
    })

  }



  userInfo(){
    

  }

  createAddRentalForm() {
    this.rentalAddForm = this.formBuilder.group({
      rentDate: ['', Validators.required],
      returnDate: ['', Validators.required]
    });
  }

  startModel(){
    let carModel = Object.assign({},this.rentalAddForm.value) 
    console.log(carModel)  
  }

  rentCar() {
    let carModel = Object.assign({carId:this.car.id,customerId:this.customer.id},this.rentalAddForm.value) 
    console.log(carModel)
 
    this.rentalService.isCarAvailable(carModel).subscribe(
      (response) => {
        this.toastrService.info(response.message,"You are redirected to payment page")
        this.router.navigateByUrl('/payment');
      },
      responseError=>{
        if(responseError.error.ValidationErrors.length>0){
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
          this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage, "Doğrulama Hatası")
          }
        }
      })
  }

}
