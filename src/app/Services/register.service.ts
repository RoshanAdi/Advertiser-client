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
export class RegisterService {

  constructor(private http: HttpClient) { }

  register(RegisterData: any){
    console.log("username and pass = "+RegisterData)
    this.http.post(AUTH_API + 'register', RegisterData, httpOptions).subscribe((result) => {
      console.log(result)
    });
  }

}
