import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  user:User;

  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService, 
    private toastrService:ToastrService, 
    private router:Router,
    private userService:UserService,
    private localStorageService:LocalStorageService
    ) { }

  ngOnInit(): void {
    this.createLoginForm();
  }


  getUser(email:string){
    this.userService.getByMail(email).subscribe(response=>{
      this.user = response.data;
      this.localStorageService.addCurrentCustomer(this.user);
    })
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email: ["",Validators.required],
      password: ["", Validators.required]
    })
  }

  login(){
    if(this.loginForm.valid){
      let loginModel = Object.assign({},this.loginForm.value)
      this.authService.login(loginModel).subscribe(response=>{
        this.toastrService.success(response.message)
        this.getUser(loginModel.email);
        this.localStorageService.addToken(response.data)
        this.router.navigate([""])
      },responseError=>{
        console.log(responseError)
        this.toastrService.error(responseError.error)
      })
    }
  }

}
