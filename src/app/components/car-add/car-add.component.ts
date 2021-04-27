import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,FormControl,Validators} from "@angular/forms"
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  carAddForm : FormGroup;
  brands : Brand[] = [];

  constructor(
    private formBuilder:FormBuilder, 
    private carService:CarService,
    private toastrService:ToastrService,
    private router:Router,
    private brandService:BrandService
     ) { }

  ngOnInit(): void {
    this.createCarAddForm();
    this.getBrands();
  }

  createCarAddForm(){
    this.carAddForm = this.formBuilder.group({
      brandId : ["",Validators.required],
      colorId : ["",Validators.required],
      carName : ["",Validators.required],
      modelYear : ["",Validators.required],
      dailyPrice : ["",Validators.required],
      description : ["",Validators.required],
    })
  }

  add(){
    if(this.carAddForm.valid){
      let carModel = Object.assign({},this.carAddForm.value) 
      this.carService.add(carModel).subscribe(response=>{
        this.toastrService.success(response.message,"başarılı")
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

  getBrands(){
    this.brandService.getBrands().subscribe((response)=>{
      this.brands = response.data
    })

  }

}
