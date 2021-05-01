import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CreditCard } from 'src/app/models/creditCard';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {

  carImageBasePath = 'https://localhost:44350/Images/';
  creditCardAddForm: FormGroup;
  rental: Rental;
  creditCard : CreditCard;
  car : Car;
  totalPrice: number;
  totalDay: number;
  dayPrice: number;
  customer: Customer;
  cardLimit : number;

  selectedCardType : String = "";
  cardTypes : any =[
    "PayPal",
    "Debit Card",
    "Credit Card"
  ];

  constructor(

    private toastrService: ToastrService,
    private carService: CarService,
    private localStorageService: LocalStorageService,
    private formBuilder:FormBuilder,
    private creditCardService:CreditCardService,
    private router:Router,
  ) {}

  ngOnInit(): void {
    this.rental = this.localStorageService.getRental();
    this.getCarDetailsById(this.rental.carId);
    this.createCreditCardAddForm();

  }

  radioChangeHandler (event:any) {
    this.selectedCardType = event.target.value;
  }

  createCreditCardAddForm(){
    this.creditCardAddForm = this.formBuilder.group({
      nameSurname : ["", Validators.required],
      cardNumber : ["", Validators.required],
      expMonth : ["", Validators.required],
      expYear : ["", Validators.required],
      cvv: ["", Validators.required],
      cardType : ["", Validators.required]
    })
  }

  getCarDetailsById(carId: number) {
    this.carService.getCarDetailsById(carId).subscribe((response) => {
      this.car = response.data;
      this.calculateTotalPrice();
    });
  }

  calculateTotalPrice(): number {
    this.totalDay =
      (new Date(this.rental.returnDate).getTime() -
        new Date(this.rental.rentDate).getTime()) /
      (1000 * 3600 * 24);
    this.totalPrice = this.totalDay * this.car.dailyPrice;
    return this.totalPrice;
  }

  getCarImage() {
    if (this.car.imagePath) {
      return this.car.imagePath;
    } else {
      return "default.png";
    }
  }

  checkOut(){
    if(this.creditCardAddForm.valid){
      let creditCardModel = Object.assign({customerId:this.rental.customerId, cardType:this.selectedCardType, cardLimit:600}, this.creditCardAddForm.value);
      console.log(creditCardModel)
      this.creditCardService.add(creditCardModel).subscribe(response =>{
        console.log(response)
        this.toastrService.success(response.message,"başarılı")
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
