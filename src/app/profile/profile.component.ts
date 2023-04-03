import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../JwtTokenSetup/_services/token-storage.service";
import {UsernameService} from "../JwtTokenSetup/_services/username.service";
import {HttpClient} from "@angular/common/http";
import jwt_decode from "jwt-decode";
import {NgForm} from "@angular/forms";

const USER_KEY = 'auth-user';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public firstName: String | undefined;
  public lastName: String | undefined;
  public role:string|undefined
  public phone:string|undefined
  public email:string|undefined
  public  ShowInputFields = false
  public  HideDetails = true
  constructor(private tokenStorage: TokenStorageService,private http:HttpClient,private userNameService: UsernameService, ) {
  }
CurrentUser:any
  UserDetails:any
  public URL:string="http://localhost:8082/"
  ngOnInit(): void {
    console.log("printing the username found from token = "+this.userNameService.getUserName())
      const user = window.sessionStorage.getItem(USER_KEY);
    this.CurrentUser = jwt_decode(String(user));
    let Role = String(this.CurrentUser.roles)
    console.warn("role found on token = "+Role.slice(5, ))

    const username = this.userNameService.getUserName()
    this.http
      .get(this.URL+Role.slice(5, )+"/"+username)
      .subscribe(response=> {
        this.UserDetails = JSON.stringify(response);
        const UserDetails = JSON.parse(this.UserDetails);
        this.firstName=UserDetails.firstName
        this.lastName=UserDetails.lastName
        this.email=UserDetails.email
        this.phone=UserDetails.phone
        this.role=UserDetails.role
        console.error(JSON.stringify(response))})
  }
  LoadEdit(){this.ShowInputFields = true
  this.HideDetails=false}
  Update(formData:NgForm){
    const user = window.sessionStorage.getItem(USER_KEY);
    this.CurrentUser = jwt_decode(String(user));
    let Role = String(this.CurrentUser.roles)
    this.http.put(this.URL+Role.slice(5, )+'/'+this.phone, formData)

      .subscribe((result) => {
        console.warn("result", result)                ////remove
      })


    window.location.reload();
  }
}
