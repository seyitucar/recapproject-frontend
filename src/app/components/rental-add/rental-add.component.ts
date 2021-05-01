import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Customer } from 'src/app/models/customer';
import { User } from 'src/app/models/user';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { RentalService } from 'src/app/services/rental.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-rental-add',
  templateUrl: './rental-add.component.html',
  styleUrls: ['./rental-add.component.css'],
})
export class RentalAddComponent implements OnInit {
  
  rentalAddForm: FormGroup;

  car: Car;
  user:User;
  customer : Customer;
  customers : Customer[]=[];
  carId: number;

  constructor(
    private toastrService: ToastrService,
    private carService: CarService,
    private rentalService: RentalService,
    private activatedRoute: ActivatedRoute,
    private formBuilder:FormBuilder,
    private router:Router,
    private localStorageService:LocalStorageService,
    private customerService:CustomerService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetailsById(params['carId']);
        let currentUserId = parseInt(this.localStorageService.getCurrentUserId(),10);
        this.getCustomerByUserId(currentUserId);
        this.createRentalAddForm();
      }
    });
  }

  createRentalAddForm(){
    this.rentalAddForm = this.formBuilder.group({
      rentDate : ["",Validators.required],
      returnDate : ["",Validators.required],
    })
  }

  getCarDetailsById(carId: number) {
    this.carService.getCarDetailsById(carId).subscribe((response) => {
      this.car = response.data;
      console.log(response.data);
    });
  }

  getCustomerByUserId(id:number) {
    this.customerService.getCustomerByUserId(id).subscribe((response) => {
        this.customer = response.data;
        console.log(response.data)
      });
  }


  addRental(){
    if(this.rentalAddForm.valid){
      let rentalModel = Object.assign({carId:this.car.id, customerId:this.customer.id},this.rentalAddForm.value)
      console.log(rentalModel)
      this.localStorageService.addRental(rentalModel)
      this.router.navigate(['/payment/car/'+this.car.id]);
      this.toastrService.success("Ödeme Sayfasına Yönlendiriliyorsunuz");
    } else {
      this.toastrService.error("Formunuz Eksik","Dikkat")
    }    
  }



  // addRental(){
  //   if(this.rentalAddForm.valid){
  //     let rentalModel = Object.assign({carId:this.car.id, customerId:this.customer.id},this.rentalAddForm.value) 
  //     console.log(rentalModel)
  //     this.rentalService.add(rentalModel).subscribe(response=>{
  //       this.toastrService.success(response.message,"Ödeme Sayfasına Yönlendiriliyorsunuz");
  //       this.router.navigate(["payment"]);
  //     },responseError=>{
  //       if(responseError.error.ValidationErrors.length>0){
  //         for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
  //         this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage, "Doğrulama Hatası")
  //         }
  //       }
  //     })

  //   } else {
  //     this.toastrService.error("Formunuz Eksik","Dikkat")
  //   }    
  // }




  //   this.rentalService.isCarAvailable(carModel).subscribe(
  //     (response) => {
  //       this.toastrService.info(response.message,"You are redirected to payment page")
  //       this.router.navigateByUrl('/payment');
  //     },
  //     responseError=>{
  //       if(responseError.error.ValidationErrors.length>0){
  //         for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
  //         this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage, "Doğrulama Hatası")
  //         }
  //       }
  //     })
  // }
}
