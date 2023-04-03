import { Injectable } from '@angular/core';
import {TokenStorageService} from "./token-storage.service";
import jwt_decode from "jwt-decode";
const USER_KEY = 'auth-user';
@Injectable({
  providedIn: 'root'
})
export class UsernameService {
  currentUserName: any;
  currentUserToken:any;
  constructor(private token: TokenStorageService) { }
  getUserName() {
    const user = window.sessionStorage.getItem(USER_KEY);
    console.log("getting user from getuser func = " + user);
    this.currentUserToken = jwt_decode(String(user));
    this.currentUserName = this.currentUserToken.sub

    return this.currentUserName;
  }


}
