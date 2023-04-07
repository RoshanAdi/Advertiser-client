import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {CheckoutService} from "../../Services/checkout.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
  amount:any =0
  items:any=""
  public cart = new Map();

  constructor(private checkoutService:CheckoutService) {
  }

  ngOnInit() {
    this.cart.set("dummy product1",300)
    this.cart.set("dummy product2",5000)
   this.getAllItems()
    window.addEventListener('load', function () {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      let forms = document.getElementsByClassName('needs-validation');

      // Loop over them and prevent submission
      Array.prototype.filter.call(forms, function (form) {
        form.addEventListener('submit', function (event:any) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
    this.calTotal()
  }

  getAllItems(){
    var items=this.cart.keys()
    for (let item of items ){
      this.items=this.items+item
      this.items=this.items+","
    }
  }
  removeProduct(product:any){
    this.cart.delete(product)
    this.amount=0
    this.items=""
    this.calTotal()
  }
  calTotal(){
    var keys = this.cart.keys()
    for (let price of keys ){
      this.amount=this.amount+this.cart.get(price)
    }
  }
  sendCheckOutForm(checkOutDetails:NgForm){
    console.log(checkOutDetails)
    this.checkoutService.checkout(checkOutDetails)
  }
}
