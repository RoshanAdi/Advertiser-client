import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ProfileComponent} from "./profile/profile.component";
import {CheckoutComponent} from "./Checkout/checkout/checkout.component";



const routes: Routes=[
  {path:'profile',component:ProfileComponent},
  {path:'checkout',component: CheckoutComponent},

];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
