import { Injectable } from '@angular/core';
import { Rental } from '../models/rental';
import { TokenModel } from '../models/tokenModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  addToken(token:TokenModel){
    localStorage.setItem("token",token.token);
    localStorage.setItem("expiration",token.expiration);
  }

  getToken(){
    return localStorage.getItem("token");
  }

  deleteToken(){
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }

  addCurrentCustomer(user:User){
    localStorage.setItem("currentUser",user.firstName+" "+user.lastName);
  }

  removeCurrentCustomer(){
    localStorage.removeItem("currentUser");
  }

  addCurrentUserId(user:User){
    localStorage.setItem("currentUserId",user.id.toString());
  }

  getCurrentUserId(){
    return localStorage.getItem("currentUserId")
  }

  removeCurrentUserId(){
    localStorage.removeItem("currentUserId");
  }

  addRental(rentalModel:Rental){
    localStorage.setItem("rentalModel",JSON.stringify(rentalModel));
  }

  getRental(){
    return JSON.parse(localStorage.getItem("rentalModel")) 
  }

  removeRental(){
    localStorage.removeItem("rentalModel");
  }

  getCurrentUser(){
    return localStorage.getItem("curentUser")
  }

}
