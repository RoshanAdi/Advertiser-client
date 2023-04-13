import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {Observable} from "rxjs";
const AUTH_API = 'http://localhost:8082/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http: HttpClient) { }

  checkout(checkoutData: string |NgForm){
    console.warn("trigerring")
    return this.http.post(AUTH_API + 'checkout', checkoutData,httpOptions);
  }

}
