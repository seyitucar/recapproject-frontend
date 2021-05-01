import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  customers: Customer[] = [];
  customer : Customer;
  dataLoaded = false;

  constructor(private customerService:CustomerService) {}

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    this.customerService.getCustomerDetails().subscribe((response) => {
        this.customers = response.data;
        this.dataLoaded = true;
      });
  }

  getCustomerById(id:number) {
    this.customerService.getById(id).subscribe((response) => {
        this.customer = response.data;
      });
  }

  getCustomerByUserId(id:number) {
    this.customerService.getCustomerByUserId(id).subscribe((response) => {
        this.customer = response.data;
      });
  }

}
