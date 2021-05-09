import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {

  currentUser: String;

  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.localStorageService.getCurrentUser();
    
  }

  logOut() {
    this.localStorageService.removeCurrentCustomer();
    this.localStorageService.removeCurrentUserId();
    this.localStorageService.removeRental();
    this.localStorageService.deleteToken();
  }

  isLogin() {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      return false;
    }
  }
}
