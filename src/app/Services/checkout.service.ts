import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
const AUTH_API = 'http://localhost:8082/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http: HttpClient) { }

  checkout(checkoutData: any){
    this.http.post(AUTH_API + 'checkout', checkoutData, httpOptions).subscribe((result) => {
      console.log(result)
    });
  }

}
