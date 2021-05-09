import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl:'./rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
  rentals : Rental[] = [];
  rental : Rental;
  dataLoaded = false;


  constructor(private rentalService:RentalService, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getRentals();

  }

  getRentals () {
      this.rentalService.getRentalDetails().subscribe((response) => {
         this.rentals = response.data;
         this.dataLoaded = true;
    })
  }

  endRental (rental:Rental) {
    this.rentalService.endRental(rental).subscribe((response) => {
       this.rental = response.data;
       this.toastrService.success(response.message);
       this.getRentals();
  },(HttpErrorResponse) => {
    this.toastrService.error(HttpErrorResponse.error.message, 'Hata');
  })
}


  delete(rental:Rental) {
    this.rentalService.delete(rental).subscribe((response) => {
      this.rental = response.data;
      console.log(response.data)
      this.toastrService.success(response.message);
      this.getRentals();
    });
  }

}
