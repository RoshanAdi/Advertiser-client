import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../JwtTokenSetup/_services/auth.service";
import {TokenStorageService} from "../JwtTokenSetup/_services/token-storage.service";
import {AppRoutingModule} from "../app-routing.module";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService:AuthService,private tokenStorage: TokenStorageService, private  router:Router ) {
  }
  isLoggedIn = false;
  isLoginFailed = false;
  SubmitLogin(LoginData:NgForm){
    this.authService.login(LoginData)
      .subscribe(
        token => {
          console.log("token received from login = "+token.token)
          this.tokenStorage.saveToken(token.token);
          this.tokenStorage.saveRefreshToken(token.token);
          this.tokenStorage.saveUser(token);
          console.log("token received from login = "+token.token)
          this.isLoginFailed = false;
          this.isLoggedIn = true;

  this.router.navigate(['/profile']);

        },

      );
  }
}
