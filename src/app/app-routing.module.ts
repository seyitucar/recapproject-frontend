import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './components/car/car.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},
  {path:"cars",component:CarComponent},
  {path:"color/:colorId", component:CarComponent},
  {path:"brand/:brandId", component:CarComponent},
  {path:"cars/getbycolorid=?id=:colorId", component:CarComponent},
  {path:"cars/getbybrandid=?id=:brandId", component:CarComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
