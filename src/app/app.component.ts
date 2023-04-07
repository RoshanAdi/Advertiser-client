import { Component } from '@angular/core';
import {AuthService} from "./JwtTokenSetup/_services/auth.service";
import {TokenStorageService} from "./JwtTokenSetup/_services/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public authService:AuthService,private tokenStorageService: TokenStorageService,private  router:Router) {
  }
  title = 'BulkSmsSenderFrontend';
  logOut(){
    this.tokenStorageService.signOut();

    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.tokenStorageService.clean();

        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
    this.router.navigate(['/login']);
  }
}
