import { Component, OnInit } from '@angular/core';
import { RentalService } from 'src/app/services/rental.service';
import { RentalDetail } from 'src/app/models/rentalDetail';

@Component({
  selector: 'app-rental',
  templateUrl:'./rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
  rentals : RentalDetail[] = [];
  dataLoaded = false;

  constructor(private rentalService:RentalService) { }

  ngOnInit(): void {
    this.getRentalDetails();
  }

  getRentalDetails () {
      this.rentalService.getRentals().subscribe((response) => {
         this.rentals = response.data;
         this.dataLoaded = true;
    })
  }

}
