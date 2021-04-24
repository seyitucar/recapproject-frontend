import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {

  brand:Brand;
  brandUpdateForm : FormGroup;

  constructor(private formBuilder:FormBuilder, private toastrService:ToastrService, private brandService:BrandService, private router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.createBrandUpdateForm()
    this.activatedRoute.params.subscribe((params)=>{
      if(params["brandId"]){
        this.getBrandById(params["brandId"])
      }
    })

  }

  createBrandUpdateForm(){
    this.brandUpdateForm = this.formBuilder.group({
      brandName:["", Validators.required]
    })
  }

  getBrandById(brandId:number){
    this.brandService.getBrandById(brandId).subscribe(response =>{
      this.brand = response.data
    })
  }

  updateBrand(){
    if(this.brandUpdateForm.valid){
      let brandModel = Object.assign({id:this.brand.id}, this.brandUpdateForm.value)
      brandModel.brandId = this.brand.id
      this.brandService.update(brandModel).subscribe(response =>{
        this.toastrService.success(response.message)
        this.router.navigate(["brands"])
      },responseError => {
        this.toastrService.error(responseError.message , "Hata")
      })
    }else{
      this.toastrService.error("Form eksik","Hata")
    }
  }

}
