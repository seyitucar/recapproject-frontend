import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {

  color:Color;
  colorUpdateForm : FormGroup;

  constructor(private formBuilder:FormBuilder, private toastrService:ToastrService, private colorService:ColorService, private router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.createColorUpdateForm()
    this.activatedRoute.params.subscribe((params)=>{
      if(params["colorId"]){
        this.getColorById(params["colorId"])
      }
    })

  }

  createColorUpdateForm(){
    this.colorUpdateForm = this.formBuilder.group({
      colorName:["", Validators.required]
    })
  }

  getColorById(colorId:number){
    this.colorService.getColorById(colorId).subscribe(response =>{
      this.color = response.data
    })
  }

  updateColor(){
    if(this.colorUpdateForm.valid){
      let colorModel = Object.assign({id:this.color.id}, this.colorUpdateForm.value)
      colorModel.brandId = this.color.id
      this.colorService.update(colorModel).subscribe(response =>{
        this.toastrService.success(response.message)
        this.router.navigate(["colors"])
      },responseError => {
        this.toastrService.error(responseError.message , "Hata")
      })
    }else{
      this.toastrService.error("Form eksik","Hata")
    }
  }

}
