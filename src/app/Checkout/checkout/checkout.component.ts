import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {CheckoutService} from "../../Services/checkout.service";
import {Customer, CurrencyType, PayhereCheckout, CheckoutParams, Payhere, AccountCategory} from 'payhere-js-sdk'
import {retry} from "rxjs";
import {CheckoutParamsType} from "payhere-js-sdk/lib/interfaces";
Payhere.init("1222880",AccountCategory.SANDBOX)
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
  @ViewChild('sendForm') sendForm1 : any;

  sendCheckOutForm(checkOutDetails:NgForm){
    console.log(checkOutDetails)
    this.checkoutService.checkout(checkOutDetails).subscribe(res=> {
        console.warn("feedback = "+JSON.stringify(res))
      this.checkout(JSON.parse(JSON.stringify(res)))

      },

    );

  }
  onPayhereCheckoutError(errorMsg:any) {
    alert(errorMsg)
  window.location.reload()
  }

  checkout(data:any) {
    console.warn(JSON.stringify(data))
    const customer = new Customer({
      first_name: data.first_name.toString(),
      last_name: data.last_name.toString(),
      phone: data.phone.toString(),
      email: data.email.toString(),
      address: data.address.toString(),
      city: data.city.toString(),
      country: data.country.toString(),

    })

    const checkoutData = new CheckoutParams(<CheckoutParamsType>{


      returnUrl: data.return_url.toString(),
      cancelUrl: data.cancel_url.toString(),
      notifyUrl: data.notify_url.toString(),
      order_id: data.order_id.toString(),
      itemTitle: data.items.toString(),
      currency: CurrencyType.LKR,
      amount: data.amount.toString(),
      hash:data.hash.toString(),

    })
    console.error(checkoutData)
    const checkout = new PayhereCheckout(customer,checkoutData,this.onPayhereCheckoutError)
    checkout.start()
  }
}
